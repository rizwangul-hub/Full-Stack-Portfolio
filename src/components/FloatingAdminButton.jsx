import React from "react";
import { motion } from "framer-motion";
import { FiLock, FiUnlock, FiLogOut } from "react-icons/fi";
import { useAdmin } from "../context/AdminContext";

export const FloatingAdminButton = ({ onClickUnlock }) => {
  const { isAdmin, logout } = useAdmin();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {isAdmin && (
        <motion.button
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-900/60 hover:bg-red-900/50 text-red-200 hover:text-white text-xs font-medium backdrop-blur-md transition-all shadow-lg cursor-pointer"
        >
          <FiLogOut className="w-3.5 h-3.5" />
          Log Out Admin
        </motion.button>
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={isAdmin ? null : onClickUnlock}
        className={`flex items-center justify-center w-12 h-12 rounded-full border shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer ${
          isAdmin
            ? "bg-indigo-950/60 border-indigo-500/50 text-indigo-300 shadow-indigo-500/10"
            : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 shadow-black/40"
        }`}
        title={isAdmin ? "Admin Mode Active" : "Unlock Admin Settings"}
      >
        {isAdmin ? (
          <motion.div
            animate={{ rotate: 180 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            <FiUnlock className="w-5 h-5 text-indigo-400" />
          </motion.div>
        ) : (
          <FiLock className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingAdminButton;
