import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ContactInput = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  disabled,
  rows = 4,
}) => {
  const isTextarea = type === "textarea";

  return (
    <div className="flex flex-col text-left space-y-1.5 w-full">
      <label htmlFor={id} className="text-xs font-semibold text-zinc-400 tracking-wide">
        {label}
      </label>
      
      <div className="relative">
        {isTextarea ? (
          <textarea
            id={id}
            rows={rows}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-4 py-3 rounded-xl bg-zinc-950/45 border ${
              error
                ? "border-red-500/50 focus:border-red-500"
                : "border-zinc-800/60 focus:border-indigo-500/80"
            } text-white placeholder-zinc-600 focus:outline-none focus:ring-1 ${
              error ? "focus:ring-red-500" : "focus:ring-indigo-500"
            } transition-all duration-300 resize-none text-sm leading-relaxed`}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`w-full px-4 py-3 rounded-xl bg-zinc-950/45 border ${
              error
                ? "border-red-500/50 focus:border-red-500"
                : "border-zinc-800/60 focus:border-indigo-500/80"
            } text-white placeholder-zinc-600 focus:outline-none focus:ring-1 ${
              error ? "focus:ring-red-500" : "focus:ring-indigo-500"
            } transition-all duration-300 text-sm`}
          />
        )}

        {/* Input border glowing accent indicator on focus */}
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-transparent peer-focus:border-indigo-500/20 transition-all duration-300" />
      </div>

      {/* Validation Error reporting */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="text-xs font-medium text-red-400 pl-1 mt-1 leading-normal"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactInput;
