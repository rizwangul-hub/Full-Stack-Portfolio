import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

export const ProjectModal = ({ isOpen, onClose, title, children }) => {
  // Listen for escape key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg bg-zinc-950/90 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Gradient Line Accent at the Top */}
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600" />

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-900 bg-zinc-950/50">
              <h3 className="text-xl font-semibold text-white tracking-wide">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
