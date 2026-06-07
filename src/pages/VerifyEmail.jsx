import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { verifyUserEmail } = useAuth();
  
  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState("Verifying your email, please wait...");

  useEffect(() => {
    if (token) {
      verifyUserEmail(token)
        .then((res) => {
          if (res.success) {
            setStatus("success");
            setMessage(res.message || "Your email has been verified successfully!");
          } else {
            setStatus("error");
            setMessage(res.message || "Invalid or expired verification token.");
          }
        })
        .catch(() => {
          setStatus("error");
          setMessage("An unexpected error occurred during email verification.");
        });
    } else {
      setStatus("error");
      setMessage("No verification token found in link.");
    }
  }, [token]);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-12 bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl text-center text-slate-800 dark:text-white"
      >
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
            <h3 className="text-xl font-bold">Verifying Email</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
            <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">Success!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
            <Link
              to="/login"
              className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-2xl shadow-lg transition duration-200"
            >
              Sign In to SmartPrep
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <XCircle className="w-16 h-16 text-red-500" />
            <h3 className="text-2xl font-extrabold text-red-600 dark:text-red-400">Verification Failed</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
            <Link
              to="/register"
              className="mt-6 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-bold rounded-2xl transition duration-200"
            >
              Register Again
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
