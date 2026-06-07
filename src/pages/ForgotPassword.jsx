import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send } from "lucide-react";
import API from "../api/api";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const response = await API.post("/auth/forgot-password", { email });
      setLoading(false);
      if (response.data.success) {
        setSent(true);
        toast.success("Password reset link sent to your email!");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12 bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl relative text-slate-800 dark:text-white"
      >
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-sky-400 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>

        {!sent ? (
          <>
            <h2 className="text-2xl font-extrabold tracking-tight">Forgot Password?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
              Enter your email and we'll send you a password reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-600 focus:outline-none rounded-2xl text-sm transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 font-bold text-white text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition duration-200"
              >
                {loading ? "Sending..." : "Send Reset Link"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Check your Inbox</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
              We've dispatched a password recovery email to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-sm font-bold text-indigo-600 dark:text-sky-400 hover:underline"
            >
              Didn't receive email? Try again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
