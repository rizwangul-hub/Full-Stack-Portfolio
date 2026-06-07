import React from "react";
import ProjectCard from "./ProjectCard";
import { FiFolder } from "react-icons/fi";

export const ProjectList = ({
  projects,
  loading,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  // 1. Loading Skeleton Screen
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="flex flex-col h-[400px] rounded-2xl bg-zinc-950/20 border border-zinc-900 overflow-hidden shadow-xl animate-pulse"
          >
            <div className="w-full aspect-video bg-zinc-900" />
            <div className="p-6 flex-grow space-y-4">
              <div className="h-6 w-2/3 bg-zinc-900 rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-zinc-900 rounded" />
                <div className="h-4 w-5/6 bg-zinc-900 rounded" />
                <div className="h-4 w-4/5 bg-zinc-900 rounded" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-5 w-12 bg-zinc-900 rounded-full" />
                <div className="h-5 w-14 bg-zinc-900 rounded-full" />
                <div className="h-5 w-10 bg-zinc-900 rounded-full" />
              </div>
              <div className="flex gap-4 pt-4 border-t border-zinc-900">
                <div className="h-8 w-24 bg-zinc-900 rounded" />
                <div className="h-8 w-24 bg-zinc-900 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4 rounded-3xl bg-zinc-950/20 border border-zinc-900 max-w-xl mx-auto shadow-2xl backdrop-blur-sm">
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 mb-4 animate-bounce">
          <FiFolder className="w-8 h-8" />
        </div>

        <h4 className="text-lg font-bold text-white tracking-wide mb-1">
          No Projects Found
        </h4>
        <p className="text-zinc-400 text-sm max-w-sm mb-6">
          There are currently no projects available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProjectList;
