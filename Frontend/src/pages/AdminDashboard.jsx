import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Settings,
  Database,
  BarChart,
  Trash2,
  Lock,
  Unlock,
  Upload,
  Plus,
  Sparkles,
} from "lucide-react";
import API from "../api/api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics"); // 'analytics' | 'users' | 'questions' | 'ai-settings'
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [aiSettings, setAiSettings] = useState({ aiProvider: "gemini", openaiKey: "", geminiKey: "" });
  const [loading, setLoading] = useState(true);
  
  // Importer state
  const [file, setFile] = useState(null);
  const [uploadExamType, setUploadExamType] = useState("PMA Long Course");
  const [importType, setImportType] = useState("excel"); // 'excel' | 'pdf'
  const [uploading, setUploading] = useState(false);

  // Manual Question state
  const [questionForm, setQuestionForm] = useState({
    statement: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    category: "",
    difficulty: "Medium",
    examType: "PMA Long Course",
    explanation: "",
  });

  const exams = [
    "PMA Long Course",
    "Pakistan Army",
    "Pakistan Navy",
    "Pakistan Air Force",
    "ASF",
    "FIA",
    "Police",
    "UDC",
    "LDC",
    "WAPDA",
    "PPSC",
    "FPSC",
    "MDCAT",
    "ECAT",
    "NTS",
    "GAT",
    "ISSB Preparation",
  ];

  useEffect(() => {
    loadDashboardData();
  }, [activeTab]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      if (activeTab === "analytics") {
        const res = await API.get("/admin/analytics");
        if (res.data.success) setAnalytics(res.data.analytics);
      } else if (activeTab === "users") {
        const res = await API.get("/admin/users");
        if (res.data.success) setUsers(res.data.users);
      } else if (activeTab === "ai-settings") {
        const res = await API.get("/admin/ai-settings");
        if (res.data.success) setAiSettings(res.data.settings);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async (userId) => {
    try {
      const res = await API.put(`/admin/users/${userId}/block`);
      if (res.data.success) {
        toast.success(res.data.message);
        setUsers(users.map((u) => (u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u)));
      }
    } catch (err) {
      toast.error("Failed to alter block state.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
    try {
      const res = await API.delete(`/admin/users/${userId}`);
      if (res.data.success) {
        toast.success("User deleted successfully.");
        setUsers(users.filter((u) => u._id !== userId));
      }
    } catch (err) {
      toast.error("Failed to delete user.");
    }
  };

  const handleAiSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/ai-settings", aiSettings);
      if (res.data.success) {
        toast.success("AI credentials updated!");
        setAiSettings(res.data.settings);
      }
    } catch (err) {
      toast.error("Could not save AI config.");
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please choose a file to upload.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("examType", uploadExamType);

    setUploading(true);
    toast.loading("Processing file parser and registering MCQs...", { id: "uploader" });

    const endpoint = importType === "excel" ? "/tests/admin/import-excel" : "/tests/admin/import-pdf";

    try {
      const res = await API.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        toast.success(res.data.message, { id: "uploader" });
        setFile(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "File parsing error.", { id: "uploader" });
    } finally {
      setUploading(false);
    }
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();
    const formatted = {
      statement: questionForm.statement,
      options: [questionForm.optionA, questionForm.optionB, questionForm.optionC, questionForm.optionD],
      correctAnswer: questionForm.correctAnswer,
      category: questionForm.category,
      difficulty: questionForm.difficulty,
      examType: questionForm.examType,
      explanation: questionForm.explanation,
    };

    try {
      const res = await API.post("/admin/question", formatted);
      if (res.data.success) {
        toast.success("Question created successfully!");
        setQuestionForm({
          statement: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctAnswer: "",
          category: "",
          difficulty: "Medium",
          examType: "PMA Long Course",
          explanation: "",
        });
      }
    } catch (err) {
      toast.error("Could not register question.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-white p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* TABS ROW */}
        <div className="flex flex-wrap gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
          {[
            { id: "analytics", label: "Analytics Overview", icon: BarChart },
            { id: "users", label: "User Accounts", icon: Users },
            { id: "questions", label: "Questions & Importer", icon: Database },
            { id: "ai-settings", label: "AI & Providers settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* LOADING SHIMMER */}
        {loading && activeTab !== "questions" ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* TAB CONTENT: ANALYTICS */}
            {activeTab === "analytics" && analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Registrations</p>
                  <h3 className="text-3xl font-black mt-2">{analytics.totalUsers}</h3>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Active (Last 7d)</p>
                  <h3 className="text-3xl font-black mt-2 text-indigo-600 dark:text-sky-400">{analytics.activeUsers}</h3>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total Mock Tests</p>
                  <h3 className="text-3xl font-black mt-2">{analytics.totalTests}</h3>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">AI Switching State</p>
                  <h3 className="text-xl font-extrabold mt-2 uppercase text-emerald-500">{analytics.activeAiProvider}</h3>
                </div>
              </div>
            )}

            {/* TAB CONTENT: USERS LIST */}
            {activeTab === "users" && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-100 dark:border-slate-800">
                      <tr>
                        <th className="px-6 py-4">Student</th>
                        <th className="px-6 py-4">Target Exam</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Streak</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {users.map((u) => (
                        <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <img src={u.profileImage} alt="Profile" className="w-8 h-8 rounded-xl object-cover" />
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                              <p className="text-xs text-slate-500">{u.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">{u.desiredExam}</td>
                          <td className="px-6 py-4 text-xs text-slate-500">{u.city || "Not Provided"}</td>
                          <td className="px-6 py-4 font-bold text-indigo-600 dark:text-sky-400">{u.streak}d</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                              u.isBlocked ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                            }`}>
                              {u.isBlocked ? "Blocked" : "Active"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleToggleBlock(u._id)}
                                className={`p-2 rounded-xl border transition ${
                                  u.isBlocked
                                    ? "border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10"
                                    : "border-red-500/30 text-red-500 hover:bg-red-500/10"
                                }`}
                              >
                                {u.isBlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u._id)}
                                className="p-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: QUESTIONS MANAGER & IMPORTER */}
            {activeTab === "questions" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* FILE UPLOAD / IMPORTER */}
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Upload className="w-5 h-5 text-indigo-500" />
                    Bulk Question Importer
                  </h3>

                  <form onSubmit={handleFileUpload} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Import Document Format</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-1.5 text-sm font-semibold cursor-pointer">
                          <input
                            type="radio"
                            name="importType"
                            checked={importType === "excel"}
                            onChange={() => setImportType("excel")}
                            className="text-indigo-600 focus:ring-0"
                          />
                          Excel Sheet (.xlsx)
                        </label>
                        <label className="flex items-center gap-1.5 text-sm font-semibold cursor-pointer">
                          <input
                            type="radio"
                            name="importType"
                            checked={importType === "pdf"}
                            onChange={() => setImportType("pdf")}
                            className="text-indigo-600 focus:ring-0"
                          />
                          PDF Document
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Target Exam Category</label>
                      <select
                        value={uploadExamType}
                        onChange={(e) => setUploadExamType(e.target.value)}
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm"
                      >
                        {exams.map((exam) => (
                          <option key={exam} value={exam}>{exam}</option>
                        ))}
                      </select>
                    </div>

                    {/* Drag and Drop Container */}
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-sky-400 p-8 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition relative">
                      <input
                        type="file"
                        accept={importType === "excel" ? ".xlsx" : ".pdf"}
                        onChange={(e) => setFile(e.target.files[0])}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload className="w-10 h-10 text-indigo-500 mb-3" />
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {file ? file.name : `Select or drop your ${importType === "excel" ? "Excel" : "PDF"} document here`}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Maximum file size 5MB</p>
                    </div>

                    <button
                      type="submit"
                      disabled={uploading}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-98 font-bold text-white text-sm rounded-2xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50"
                    >
                      {uploading ? "Uploading and parsing..." : "Process and Import Document"}
                    </button>
                  </form>
                </div>

                {/* MANUAL CREATOR */}
                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Plus className="w-5 h-5 text-indigo-500" />
                    Add Manual MCQ
                  </h3>

                  <form onSubmit={handleCreateQuestion} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Question Statement</label>
                      <textarea
                        required
                        value={questionForm.statement}
                        onChange={(e) => setQuestionForm({ ...questionForm, statement: e.target.value })}
                        placeholder="What is the force required to...?"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none min-h-[60px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Option A</label>
                        <input
                          type="text"
                          required
                          value={questionForm.optionA}
                          onChange={(e) => setQuestionForm({ ...questionForm, optionA: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Option B</label>
                        <input
                          type="text"
                          required
                          value={questionForm.optionB}
                          onChange={(e) => setQuestionForm({ ...questionForm, optionB: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Option C</label>
                        <input
                          type="text"
                          required
                          value={questionForm.optionC}
                          onChange={(e) => setQuestionForm({ ...questionForm, optionC: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Option D</label>
                        <input
                          type="text"
                          required
                          value={questionForm.optionD}
                          onChange={(e) => setQuestionForm({ ...questionForm, optionD: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Correct Answer (Match Option Text)</label>
                        <input
                          type="text"
                          required
                          value={questionForm.correctAnswer}
                          onChange={(e) => setQuestionForm({ ...questionForm, correctAnswer: e.target.value })}
                          placeholder="Exact text of correct option"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subject / Category</label>
                        <input
                          type="text"
                          required
                          value={questionForm.category}
                          onChange={(e) => setQuestionForm({ ...questionForm, category: e.target.value })}
                          placeholder="e.g. Physics, Biology"
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Exam Syllabus</label>
                        <select
                          value={questionForm.examType}
                          onChange={(e) => setQuestionForm({ ...questionForm, examType: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                        >
                          {exams.map((exam) => (
                            <option key={exam} value={exam}>{exam}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Difficulty</label>
                        <select
                          value={questionForm.difficulty}
                          onChange={(e) => setQuestionForm({ ...questionForm, difficulty: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Explanation (Optional)</label>
                      <input
                        type="text"
                        value={questionForm.explanation}
                        onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                        placeholder="Why is this answer correct?"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 hover:scale-[1.01] active:scale-99 font-bold text-white text-xs rounded-xl transition duration-150 cursor-pointer"
                    >
                      Save Question
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB CONTENT: AI SETTINGS */}
            {activeTab === "ai-settings" && (
              <div className="max-w-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
                  AI Switching Layer
                </h3>

                <form onSubmit={handleAiSettingsSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Active AI Service Model</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="aiProvider"
                          value="gemini"
                          checked={aiSettings.aiProvider === "gemini"}
                          onChange={(e) => setAiSettings({ ...aiSettings, aiProvider: e.target.value })}
                          className="text-indigo-600"
                        />
                        Google Gemini API
                      </label>
                      
                      <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="aiProvider"
                          value="openai"
                          checked={aiSettings.aiProvider === "openai"}
                          onChange={(e) => setAiSettings({ ...aiSettings, aiProvider: e.target.value })}
                          className="text-indigo-600"
                        />
                        OpenAI GPT Model
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">OpenAI Secret Key</label>
                      <input
                        type="password"
                        value={aiSettings.openaiKey}
                        onChange={(e) => setAiSettings({ ...aiSettings, openaiKey: e.target.value })}
                        placeholder="sk-••••••••••••••••••••"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Google Gemini API Key</label>
                      <input
                        type="password"
                        value={aiSettings.geminiKey}
                        onChange={(e) => setAiSettings({ ...aiSettings, geminiKey: e.target.value })}
                        placeholder="AIzaSy••••••••••••••••••••"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-98 font-bold text-white text-sm rounded-2xl shadow-lg transition"
                  >
                    Save Config Credentials
                  </button>
                </form>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
