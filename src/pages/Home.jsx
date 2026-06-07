import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  TrendingUp,
  Brain,
  ShieldCheck,
  CheckCircle,
  FileSpreadsheet,
  Cpu,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const supportedExams = [
    { name: "PMA Long Course", category: "Military" },
    { name: "Pakistan Army / Navy / Air Force", category: "Military" },
    { name: "MDCAT (Medical Entry)", category: "Medical" },
    { name: "ECAT (Engineering Entry)", category: "Engineering" },
    { name: "PPSC / FPSC / NTS / GAT", category: "Government" },
    { name: "ASF / FIA / Police Tests", category: "Civil Services" },
    { name: "UDC / LDC / WAPDA Exams", category: "Civil Services" },
  ];

  const features = [
    {
      title: "AI Mock Exam Generator",
      description: "Generates realistic entrance exams aligned with current syllabus formats using GPT/Gemini models.",
      icon: Cpu,
    },
    {
      title: "Real Exam Engine Simulator",
      description: "Simulates actual timed environments (100 Questions = 100 Minutes) with bookmarking and auto-submission.",
      icon: Zap,
    },
    {
      title: "AI Results & Study Planner",
      description: "Identifies weak subject areas and generates custom daily, weekly, and monthly calendars to fix them.",
      icon: Brain,
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white transition-colors duration-300">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center overflow-hidden">
        {/* Colorful glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl z-10"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-500/25 text-sky-400">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Test Preparation Engine
          </span>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Ace Government & Competitive Exams with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
              SmartPrep AI
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Generate custom syllabus mock exams, track your subject weaknesses, and let AI build your daily study planner calendar.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 active:scale-98 font-bold text-sm text-white rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
            >
              Get Started Free
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
            
            <a
              href="#exams"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-850 active:scale-98 font-bold text-sm text-slate-300 rounded-2xl transition"
            >
              View Supported Exams
            </a>
          </div>
        </motion.div>
      </section>

      {/* STATISTICS */}
      <section className="bg-slate-900/40 border-y border-slate-800 backdrop-blur-sm py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h4 className="text-3xl md:text-4xl font-black text-indigo-400">12,000+</h4>
            <p className="text-xs text-slate-500 font-bold uppercase mt-2">Mock Tests Taken</p>
          </div>
          <div>
            <h4 className="text-3xl md:text-4xl font-black text-emerald-400">94.8%</h4>
            <p className="text-xs text-slate-500 font-bold uppercase mt-2">Accuracy Prediction</p>
          </div>
          <div>
            <h4 className="text-3xl md:text-4xl font-black text-amber-400">15+</h4>
            <p className="text-xs text-slate-500 font-bold uppercase mt-2">Entrance Exams Covered</p>
          </div>
          <div>
            <h4 className="text-3xl md:text-4xl font-black text-sky-400">4.9/5</h4>
            <p className="text-xs text-slate-500 font-bold uppercase mt-2">Student Satisfaction</p>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight">How It Works</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            SmartPrep AI leverages advanced generative intelligence layers to simulate and guide your preparation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-8 bg-slate-900/30 border border-slate-800 rounded-3xl space-y-4 hover:border-indigo-500/30 transition group"
              >
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center transition group-hover:scale-105">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">{feat.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SUPPORTED EXAMS GRID */}
      <section id="exams" className="max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight">Supported Entrance Exams</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            We support military intelligence tests, medical portals, engineering formats, and civil services exams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportedExams.map((exam) => (
            <div
              key={exam.name}
              className="p-6 bg-slate-900/50 border border-slate-800/80 rounded-2xl flex items-center justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-slate-100">{exam.name}</h4>
                <span className="inline-block text-[10px] uppercase font-bold text-indigo-400">
                  {exam.category}
                </span>
              </div>
              <GraduationCap className="w-5 h-5 text-slate-500" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="p-12 bg-gradient-to-r from-indigo-900 to-indigo-950 rounded-3xl border border-indigo-500/20 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight">Ready to Ace Your Exam?</h2>
          <p className="text-indigo-200 text-sm max-w-md mx-auto leading-relaxed">
            Create an account, pick your target syllabus, and generate your first AI mock exam inside our simulator.
          </p>
          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-indigo-950 font-black text-sm rounded-2xl shadow-lg transition duration-200"
            >
              Register Account Now
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© 2026 SmartPrep AI Exam Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
