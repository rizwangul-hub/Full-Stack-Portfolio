import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiEdit3, FiTrash2 } from "react-icons/fi";

export const ProjectCard = ({ project, isAdmin, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      id="project"
      className="relative flex flex-col h-full rounded-2xl bg-zinc-950/45 hover:bg-zinc-900/35 border border-zinc-800/60 hover:border-indigo-500/40 backdrop-blur-lg overflow-hidden shadow-xl transition-all duration-300 group"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        {isAdmin && (
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              type="button"
              onClick={() => onEdit?.(project)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/70 border border-zinc-800 text-white hover:bg-indigo-600/90 transition-all"
              title="Edit project"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(project)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/70 border border-zinc-800 text-white hover:bg-red-600/90 transition-all"
              title="Delete project"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        )}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent opacity-80" />
      </div>

      <div className="flex flex-col flex-grow p-6 text-left">
        <h4 className="text-lg font-bold text-white tracking-wide mb-2 group-hover:text-indigo-400 transition-colors duration-200">
          {project.title}
        </h4>

        <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 tracking-wider uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-4 mt-auto border-t border-zinc-900/60 pt-4">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600/90 hover:bg-indigo-650 px-4 py-2 rounded-lg transition-all shadow-md shadow-indigo-500/10"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-4 py-2 rounded-lg transition-all"
            >
              <FiGithub className="w-3.5 h-3.5" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
