import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, HelpCircle, ArrowUpRight } from "lucide-react";
import API from "../api/api";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState("");

  const exams = [
    { value: "", label: "All Competitive Exams" },
    { value: "PMA Long Course", label: "PMA Long Course" },
    { value: "Pakistan Air Force", label: "Air Force" },
    { value: "Pakistan Navy", label: "Navy" },
    { value: "MDCAT", label: "MDCAT" },
    { value: "ECAT", label: "ECAT" },
  ];

  useEffect(() => {
    setLoading(true);
    API.get(`/tests/leaderboard${selectedExam ? `?examType=${selectedExam}` : ""}`)
      .then((res) => {
        if (res.data.success) {
          setLeaderboard(res.data.leaderboard);
        }
      })
      .catch((err) => {
        console.error("Error loading leaderboard:", err.message);
        // Fallback mock leaderboard if backend fails or database is empty
        mockFallbackLeaderboard();
      })
      .finally(() => setLoading(false));
  }, [selectedExam]);

  const mockFallbackLeaderboard = () => {
    setLeaderboard([
      { id: "1", name: "Rizwan Gul", desiredExam: "PMA Long Course", averageScore: 94.5, totalAttempts: 12, maxScore: 98, profileImage: "https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png" },
      { id: "2", name: "Ayesha Malik", desiredExam: "MDCAT", averageScore: 91.2, totalAttempts: 15, maxScore: 96, profileImage: "https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png" },
      { id: "3", name: "Hamza Abbasi", desiredExam: "Pakistan Air Force", averageScore: 89.0, totalAttempts: 8, maxScore: 92, profileImage: "https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png" },
      { id: "4", name: "Zainab Bibi", desiredExam: "ECAT", averageScore: 86.4, totalAttempts: 10, maxScore: 90, profileImage: "https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png" },
      { id: "5", name: "Bilal Khan", desiredExam: "PMA Long Course", averageScore: 82.1, totalAttempts: 6, maxScore: 88, profileImage: "https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png" },
    ]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  // Top 3 Podium
  const podiumUsers = leaderboard.slice(0, 3);
  const remainingUsers = leaderboard.slice(3);

  // Position mappings for podium design
  const podiumPositions = [
    { index: 1, style: "h-40 bg-amber-500/10 border-amber-500/30 text-amber-500 order-2 md:-translate-y-4", trophy: Trophy, label: "1st Place" },
    { index: 0, style: "h-32 bg-slate-500/10 border-slate-500/30 text-slate-500 order-1", trophy: Medal, label: "2nd Place" },
    { index: 2, style: "h-28 bg-orange-500/10 border-orange-500/30 text-orange-500 order-3", trophy: Medal, label: "3rd Place" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-white p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER PANEL */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <Trophy className="w-8 h-8 text-amber-500" />
              SmartPrep Standings
            </h1>
            <p className="text-sm text-slate-500 mt-1">Compare mock scores with peers nationwide.</p>
          </div>

          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold focus:outline-none"
          >
            {exams.map((e) => (
              <option key={e.value} value={e.value}>{e.label}</option>
            ))}
          </select>
        </div>

        {/* PODIUM DISPLAYS */}
        {podiumUsers.length > 0 && (
          <div className="flex flex-col md:flex-row items-end justify-center gap-4 pt-8">
            {podiumPositions.map((pos) => {
              const u = podiumUsers[pos.index];
              if (!u) return null;
              const TrophyIcon = pos.trophy;

              return (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: pos.index * 0.1 }}
                  className={`w-full md:w-56 p-6 border rounded-3xl flex flex-col items-center justify-between text-center shadow-lg relative ${pos.style}`}
                >
                  <TrophyIcon className="w-10 h-10 mb-2 animate-bounce" />
                  
                  <div className="space-y-1">
                    <img src={u.profileImage} alt={u.name} className="w-10 h-10 rounded-full mx-auto border object-cover mb-1" />
                    <h4 className="font-extrabold text-sm truncate w-40">{u.name}</h4>
                    <p className="text-[10px] text-slate-500 truncate w-40">{u.desiredExam}</p>
                  </div>

                  <div className="mt-3">
                    <span className="text-xl font-black">{u.averageScore}%</span>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mt-0.5">{pos.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* REMAINING USERS TABLE */}
        {remainingUsers.length > 0 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Target Exam</th>
                    <th className="px-6 py-4">Attempts</th>
                    <th className="px-6 py-4">Max Score</th>
                    <th className="px-6 py-4 text-right">Avg Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {remainingUsers.map((u, idx) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850">
                      <td className="px-6 py-4 font-black text-slate-400">#{idx + 4}</td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <img src={u.profileImage} alt="" className="w-6 h-6 rounded-full" />
                        <span className="font-bold">{u.name}</span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-xs text-slate-600 dark:text-slate-400">{u.desiredExam}</td>
                      <td className="px-6 py-4 text-slate-500">{u.totalAttempts}</td>
                      <td className="px-6 py-4 font-bold text-emerald-500">{u.maxScore}%</td>
                      <td className="px-6 py-4 text-right font-extrabold text-indigo-600 dark:text-sky-400">{u.averageScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
