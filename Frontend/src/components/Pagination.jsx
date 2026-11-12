import React from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-8 mt-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 hover:border-zinc-700 transition-all cursor-pointer disabled:cursor-not-allowed"
        title="Previous Page"
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-900 rounded-xl p-1">
        {pageNumbers.map((number) => {
          const isActive = number === currentPage;
          return (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className="relative px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors duration-300 focus:outline-none"
              style={{
                color: isActive ? "#ffffff" : "#a1a1aa", // text-zinc-400 vs white
              }}
            >
              {/* Sliding Active Background */}
              {isActive && (
                <motion.div
                  layoutId="activeBubble"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{number}</span>
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 hover:border-zinc-700 transition-all cursor-pointer disabled:cursor-not-allowed"
        title="Next Page"
      >
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
