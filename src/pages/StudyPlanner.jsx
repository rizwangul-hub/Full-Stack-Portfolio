import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  Sparkles,
  BookOpen,
  CheckSquare,
  Square,
  AlertCircle,
} from "lucide-react";
import API from "../api/api";
import toast from "react-hot-toast";

export default function StudyPlanner() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("daily"); // 'daily' | 'weekly' | 'monthly'

  useEffect(() => {
    API.get("/students/study-plan")
      .then((res) => {
        if (res.data.success) {
          setPlan(res.data.plan);
        }
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Could not load study calendar.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleToggleTask = async (taskType, taskId) => {
    // Optimistic UI update
    setPlan((prev) => {
      if (!prev) return null;
      const next = { ...prev };
      if (taskType === "daily") {
        next.dailyPlan = next.dailyPlan.map((t) =>
          t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
        );
      } else if (taskType === "weekly") {
        next.weeklyPlan = next.weeklyPlan.map((t) =>
          t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
        );
      } else if (taskType === "monthly") {
        next.monthlyPlan = next.monthlyPlan.map((t) =>
          t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
        );
      }
      return next;
    });

    try {
      const res = await API.post("/students/study-plan/toggle", { taskType, taskId });
      if (res.data.success) {
        toast.success("Task status updated!");
      }
    } catch (err) {
      toast.error("Failed to update task state.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  // Calculate percentages
  const getProgressPercent = (planList) => {
    if (!planList || planList.length === 0) return 0;
    const completed = planList.filter((p) => p.isCompleted).length;
    return Math.round((completed / planList.length) * 100);
  };

  const currentList =
    activeTab === "daily"
      ? plan.dailyPlan
      : activeTab === "weekly"
      ? plan.weeklyPlan
      : plan.monthlyPlan;

  const currentPercent = getProgressPercent(currentList);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-white p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER PANEL */}
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-sky-400">
              <Sparkles className="w-3.5 h-3.5" />
              AI Generated Schedule
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">AI Study Planner</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md">
              Customized based on your performance data for the <strong>{plan.examType}</strong>.
            </p>
          </div>

          <div className="w-full md:w-48 space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Overall Progress</span>
              <span className="text-indigo-600 dark:text-sky-400">{currentPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full transition-all duration-300"
                style={{ width: `${currentPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* STUDY TIME TIP */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-2xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>Study Suggestion: Allocate around {plan.availableHoursPerDay || 4} hours today focusing strictly on the topics listed in the planner checklist.</span>
        </div>

        {/* TABS CONTROLLER */}
        <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-px">
          {["daily", "weekly", "monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-sm font-extrabold tracking-wide uppercase transition relative cursor-pointer ${
                activeTab === tab
                  ? "text-indigo-600 dark:text-sky-400"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              {tab} Plan
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600 dark:bg-sky-400"
                />
              )}
            </button>
          ))}
        </div>

        {/* TASKS CHECKLISTS */}
        <div className="space-y-4">
          {currentList.length === 0 ? (
            <p className="text-center text-slate-500 text-sm py-12">No tasks generated for this planner mode yet.</p>
          ) : (
            currentList.map((task) => (
              <div
                key={task._id}
                onClick={() => handleToggleTask(activeTab, task._id)}
                className={`p-5 bg-white dark:bg-slate-900 border rounded-2xl shadow-sm flex items-start gap-4 transition hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer ${
                  task.isCompleted
                    ? "border-emerald-500/30 dark:border-emerald-500/25 bg-emerald-500/5"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                <button className="mt-0.5 text-indigo-500">
                  {task.isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <div className="space-y-1">
                  <h4 className={`text-sm font-extrabold ${task.isCompleted ? "line-through text-slate-400" : ""}`}>
                    {task.day || task.week || task.month}
                  </h4>
                  <ul className="list-disc list-inside text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    {task.topics ? task.topics.map((t, idx) => (
                      <li key={idx} className="leading-relaxed">{t}</li>
                    )) : (
                      <li>{task.focus || task.goals?.join(", ")}</li>
                    )}
                  </ul>
                  {task.hours && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-bold mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      {task.hours} Hours Required
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
