import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  Zap,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  FileText,
  Calendar,
  BookOpen,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import API from "../api/api";
import toast from "react-hot-toast";

// Branding palettes by exam type
const brandingConfigs = {
  "Pakistan Air Force": {
    bg: "from-sky-50 to-blue-100 dark:from-slate-950 dark:to-slate-900",
    primary: "text-blue-600 dark:text-sky-400",
    accent: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",
    border: "border-blue-100 dark:border-blue-900/50",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    stages: ["Verbal Intelligence", "English Test", "Physics Test", "Mathematics Test", "Personality Test"],
  },
  "PMA Long Course": {
    bg: "from-emerald-50 to-green-100 dark:from-slate-950 dark:to-slate-900",
    primary: "text-emerald-600 dark:text-emerald-400",
    accent: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25",
    border: "border-emerald-100 dark:border-emerald-900/50",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    stages: ["Verbal Intelligence", "Non-Verbal Intelligence", "Academic Test (English/GK/Studies)"],
  },
  "Pakistan Army": {
    bg: "from-emerald-50 to-green-100 dark:from-slate-950 dark:to-slate-900",
    primary: "text-emerald-600 dark:text-emerald-400",
    accent: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25",
    border: "border-emerald-100 dark:border-emerald-900/50",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    stages: ["Intelligence Test", "Academic Entrance Paper"],
  },
  "Pakistan Navy": {
    bg: "from-cyan-50 to-blue-100 dark:from-slate-950 dark:to-slate-900",
    primary: "text-cyan-600 dark:text-cyan-400",
    accent: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/25",
    border: "border-cyan-100 dark:border-cyan-900/50",
    badge: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    stages: ["Intelligence Test", "Academic Navy Syllabus"],
  },
  MDCAT: {
    bg: "from-teal-50 to-emerald-100 dark:from-slate-950 dark:to-slate-900",
    primary: "text-teal-600 dark:text-teal-400",
    accent: "bg-teal-600 hover:bg-teal-500 shadow-teal-500/25",
    border: "border-teal-100 dark:border-teal-900/50",
    badge: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
    stages: ["Biology Section", "Chemistry Section", "Physics Section", "English Section", "Logical Reasoning"],
  },
  ECAT: {
    bg: "from-orange-50 to-amber-100 dark:from-slate-950 dark:to-slate-900",
    primary: "text-orange-600 dark:text-orange-400",
    accent: "bg-orange-600 hover:bg-orange-500 shadow-orange-500/25",
    border: "border-orange-100 dark:border-orange-900/50",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    stages: ["Mathematics Section", "Physics Section", "Chemistry Section", "English Entry Test"],
  },
  "Engineering Entry Tests": {
    bg: "from-orange-50 to-amber-100 dark:from-slate-950 dark:to-slate-900",
    primary: "text-orange-600 dark:text-orange-400",
    accent: "bg-orange-600 hover:bg-orange-500 shadow-orange-500/25",
    border: "border-orange-100 dark:border-orange-900/50",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    stages: ["Mathematics", "Physics", "Chemistry"],
  },
  Generic: {
    bg: "from-indigo-50 to-slate-100 dark:from-slate-950 dark:to-slate-900",
    primary: "text-indigo-600 dark:text-sky-400",
    accent: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25",
    border: "border-slate-200 dark:border-slate-800",
    badge: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    stages: ["Syllabus Revision", "Core English Prep", "General Knowledge Drill", "Timed Mock Practice"],
  },
};

export default function ExamDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingTest, setGeneratingTest] = useState(false);
  const [countdown, setCountdown] = useState("");

  const examType = user?.desiredExam || "PMA Long Course";
  const brand = brandingConfigs[examType] || brandingConfigs.Generic;

  // Retrieve user exam countdown timer
  useEffect(() => {
    const examDates = {
      MDCAT: "2026-08-30T09:00:00",
      ECAT: "2026-07-15T09:00:00",
      "PMA Long Course": "2026-10-10T09:00:00",
      "Pakistan Air Force": "2026-09-12T09:00:00",
      Generic: "2026-11-20T09:00:00",
    };

    const targetDateStr = examDates[examType] || examDates.Generic;
    const target = new Date(targetDateStr).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setCountdown("Exam Day!");
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setCountdown(`${days}d ${hours}h left`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [examType]);

  useEffect(() => {
    API.get("/tests/stats")
      .then((res) => {
        if (res.data.success) {
          setStats(res.data.stats);
          setHistory(res.data.history);
        }
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Could not load statistics.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleGenerateAiTest = async (subject = "") => {
    setGeneratingTest(true);
    toast.loading("AI is compiling your simulated test...", { id: "generator" });
    try {
      const res = await API.post("/tests/generate", {
        examType,
        count: 10, // 10 questions mock for quick testing
        category: subject,
      });

      if (res.data.success) {
        toast.success("AI Mock Test Ready!", { id: "generator" });
        navigate(`/test-engine/${res.data.test._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to generate mock test", { id: "generator" });
    } finally {
      setGeneratingTest(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  // Sample data for charts
  const progressData = history.length > 0
    ? history.slice().reverse().map((r, i) => ({ name: `Mock ${i + 1}`, score: r.score }))
    : [
        { name: "Week 1", score: 40 },
        { name: "Week 2", score: 55 },
        { name: "Week 3", score: 70 },
        { name: "Week 4", score: 85 },
      ];

  const subjectChartData = stats?.weakSubjects.map((sub) => ({ subject: sub, score: 45 }))
    .concat(stats?.strongSubjects.map((sub) => ({ subject: sub, score: 88 }))) || [
      { subject: "GK", score: 85 },
      { subject: "English", score: 75 },
      { subject: "Science", score: 55 },
      { subject: "Intelligence", score: 62 },
    ];

  return (
    <div className={`min-h-screen bg-gradient-to-b ${brand.bg} text-slate-800 dark:text-white p-6 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HERO BANNER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 backdrop-blur-md relative overflow-hidden">
          <div className="space-y-3 z-10">
            <span className={`inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-xs font-bold ${brand.badge}`}>
              Active Syllabus: {examType}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Prepare for <span className={`${brand.primary}`}>{examType}</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl text-sm leading-relaxed">
              Ace your upcoming examination with custom-tailored AI simulation exams. Train on your subject weaknesses.
            </p>
          </div>
          
          <div className="flex flex-row items-center gap-4 z-10">
            <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl flex items-center gap-3">
              <Calendar className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500">Countdown</p>
                <p className="font-extrabold text-sm text-indigo-600 dark:text-sky-400">{countdown}</p>
              </div>
            </div>

            <button
              onClick={() => handleGenerateAiTest()}
              disabled={generatingTest}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-extrabold text-white text-sm transition transform hover:scale-[1.03] active:scale-98 cursor-pointer ${brand.accent}`}
            >
              Generate AI Mock Test
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-600 dark:text-sky-400 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Tests Taken</p>
              <h3 className="text-2xl font-black mt-0.5">{stats?.totalAttempts || 0}</h3>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Average Score</p>
              <h3 className="text-2xl font-black mt-0.5">{stats?.averageScore || 0}%</h3>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Accuracy</p>
              <h3 className="text-2xl font-black mt-0.5">{stats?.accuracy || 0}%</h3>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Active Streak</p>
              <h3 className="text-2xl font-black mt-0.5">{stats?.streak || 0} Days</h3>
            </div>
          </div>
        </div>

        {/* DOUBLE COLUMN: GRAPH & RECOMMENDATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* PROGRESS CHART */}
          <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Attempt Progress Chart
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI COACH AND SUCCESS INSIGHTS */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                AI SmartCoach Insights
              </h3>
              
              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl text-sm leading-relaxed mb-4">
                "{stats?.recommendation}"
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Success Prediction Chance</span>
                  <span className={`${brand.primary}`}>{stats?.successPrediction || 0}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"
                    style={{ width: `${stats?.successPrediction || 0}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-bold">Global Rank:</span>
              <span className="font-extrabold text-indigo-600 dark:text-sky-400">Top 12%</span>
            </div>
          </div>
        </div>

        {/* DOUBLE COLUMN: SYLLABUS STAGES CHECKLIST & RADAR MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* SYLLABUS progression */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Syllabus Stages
            </h3>
            
            <div className="space-y-4">
              {brand.stages.map((stage, i) => (
                <div
                  key={stage}
                  onClick={() => handleGenerateAiTest(stage)}
                  className="flex items-center justify-between p-3.5 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-sky-400/30 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black">
                      {i + 1}
                    </div>
                    <span className="text-sm font-bold">{stage}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* RADAR CHART ANALYSIS */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-500" />
              Competency Radar
            </h3>
            <div className="h-60 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectChartData}>
                  <PolarGrid stroke="#475569" />
                  <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={11} />
                  <Radar name="Syllabus Mastery" dataKey="score" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* STREAKS & BADGES PANEL */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Achievements & Badges
            </h3>

            {stats?.badges.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">Earn badges by passing mock tests with high scores!</p>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {stats?.badges.map((badge) => (
                  <div key={badge} className="flex flex-col items-center text-center p-2 border border-slate-100 dark:border-slate-800 rounded-2xl">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center shadow-inner">
                      <Award className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold mt-2 truncate w-full">{badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
