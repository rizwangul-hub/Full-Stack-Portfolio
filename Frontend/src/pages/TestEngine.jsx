import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle,
  Clock,
  HelpCircle,
  Flag,
  RotateCcw,
} from "lucide-react";
import API from "../api/api";
import toast from "react-hot-toast";

export default function TestEngine() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionId: selectedOptionText }
  const [markedForReview, setMarkedForReview] = useState(new Set()); // Set of questionIds
  const [timeRemaining, setTimeRemaining] = useState(0); // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  // Fetch test details on mount
  useEffect(() => {
    API.get(`/tests/details/${testId}`)
      .then((res) => {
        if (res.data.success) {
          setTest(res.data.test);
          const durationSeconds = (res.data.test.duration || 10) * 60;
          setTimeRemaining(durationSeconds);
          setTotalSeconds(durationSeconds);
        }
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Could not fetch exam layout.");
        navigate("/dashboard");
      })
      .finally(() => setLoading(false));
  }, [testId]);

  // Countdown timer logic
  useEffect(() => {
    if (timeRemaining <= 0 && test) {
      if (timeRemaining === 0) {
        handleAutoSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, test]);

  const handleSelectOption = (option) => {
    const qId = test.questions[currentIndex]._id;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleToggleReview = () => {
    const qId = test.questions[currentIndex]._id;
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      return next;
    });
  };

  const handleBookmarkQuestion = async () => {
    const qId = test.questions[currentIndex]._id;
    try {
      const res = await API.post("/tests/bookmark", { questionId: qId });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Error bookmarking question");
    }
  };

  const handleAutoSubmit = () => {
    toast.error("Time is up! Submitting your answers automatically...", { duration: 5000 });
    submitAnswers();
  };

  const submitAnswers = async () => {
    setIsSubmitting(true);
    toast.loading("Grading your answers and generating AI analysis...", { id: "submit-grading" });
    
    try {
      const answersArray = Object.keys(selectedAnswers).map((qId) => ({
        questionId: qId,
        selectedAnswer: selectedAnswers[qId],
      }));

      // Calculate time taken
      const timeTaken = totalSeconds - timeRemaining;

      const res = await API.post("/tests/submit", {
        testId,
        answers: answersArray,
        timeTaken,
      });

      if (res.data.success) {
        toast.success("Test submitted successfully!", { id: "submit-grading" });
        navigate(`/results/${res.data.result._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit answers.", { id: "submit-grading" });
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  const currentQuestion = test.questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] text-slate-800 dark:text-white p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR: QUESTION STATUS GRID */}
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <h3 className="font-bold text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-500" />
                Exam Progress
              </h3>
              <span className="text-xs font-extrabold text-indigo-600 dark:text-sky-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">
                {answeredCount}/{test.questions.length} Answered
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2.5">
              {test.questions.map((q, idx) => {
                const isAnswered = !!selectedAnswers[q._id];
                const isMarked = markedForReview.has(q._id);
                const isActive = idx === currentIndex;

                let gridStyle = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
                if (isAnswered) gridStyle = "bg-emerald-500 text-white font-extrabold";
                if (isMarked) gridStyle = "bg-amber-500 text-white font-extrabold";
                if (isActive) gridStyle += " ring-2 ring-indigo-600 dark:ring-sky-400 scale-105";

                return (
                  <button
                    key={q._id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition transform active:scale-95 cursor-pointer ${gridStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-3.5 h-3.5 bg-emerald-500 rounded-md" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-3.5 h-3.5 bg-amber-500 rounded-md" />
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-3.5 h-3.5 bg-slate-100 dark:bg-slate-800 rounded-md" />
              <span>Unanswered</span>
            </div>
          </div>
        </div>

        {/* MAIN PANEL: QUESTION PANEL & TIMERS */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* HEADER TIMERS */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <h2 className="font-extrabold text-sm md:text-base text-slate-800 dark:text-white truncate max-w-[200px] md:max-w-md">
                {test.title}
              </h2>
            </div>
            
            <div className="flex items-center gap-2 text-red-500 dark:text-red-400 font-extrabold bg-red-500/10 px-4 py-2 rounded-xl">
              <Clock className="w-5 h-5 animate-pulse" />
              <span className="font-mono text-base">{formatTime(timeRemaining)}</span>
            </div>
          </div>

          {/* QUESTION BOX */}
          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-6 min-h-[400px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Topic tags */}
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-sky-400 rounded-full text-xs font-bold">
                    {currentQuestion.category} • {currentQuestion.difficulty}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleBookmarkQuestion}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-500"
                      title="Bookmark Question"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleToggleReview}
                      className={`p-1.5 rounded-lg border transition flex items-center gap-1 text-xs font-bold ${
                        markedForReview.has(currentQuestion._id)
                          ? "border-amber-500 bg-amber-500/10 text-amber-500"
                          : "border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                      }`}
                    >
                      <Flag className="w-4 h-4" />
                      <span>Review</span>
                    </button>
                  </div>
                </div>

                {/* Statement */}
                <h3 className="text-lg md:text-xl font-bold leading-relaxed">
                  <span className="text-slate-400 mr-2">Q{currentIndex + 1}.</span>
                  {currentQuestion.statement}
                </h3>

                {/* Options List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((opt, i) => {
                    const isSelected = selectedAnswers[currentQuestion._id] === opt;
                    const letter = ["A", "B", "C", "D"][i];

                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(opt)}
                        className={`p-4 border rounded-2xl flex items-center gap-4 transition text-left cursor-pointer ${
                          isSelected
                            ? "border-indigo-600 dark:border-sky-400 bg-indigo-600/5 dark:bg-sky-400/5 text-indigo-700 dark:text-sky-400 font-extrabold ring-1 ring-indigo-600"
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/30"
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black border transition ${
                            isSelected
                              ? "bg-indigo-600 border-indigo-600 text-white"
                              : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm font-semibold">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CONTROLS ROW */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-8">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 font-bold text-xs transition disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentIndex === test.questions.length - 1 ? (
                <button
                  onClick={submitAnswers}
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-extrabold text-white text-xs shadow-lg shadow-indigo-500/25 transition cursor-pointer"
                >
                  Submit Exam
                  <CheckCircle className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-750 font-bold text-xs text-white transition cursor-pointer"
                >
                  Skip & Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
