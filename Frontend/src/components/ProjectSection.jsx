import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectList from "./ProjectList";
import { projectAPI } from "../services/api";
import { FiAlertTriangle, FiPlus, FiLoader } from "react-icons/fi";
import { useAdmin } from "../context/AdminContext";
import CreateProjectModal from "./CreateProjectModal";
import EditProjectModal from "./EditProjectModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import toast from "react-hot-toast";

export default function ProjectSection() {
  const { isAdmin } = useAdmin();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const limit = 6;

  const fetchProjects = async (pageToFetch = 1, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const response = await projectAPI.getAll(pageToFetch, limit);
      if (response.data.success) {
        if (append) {
          setProjects((prev) => [...prev, ...response.data.data]);
        } else {
          setProjects(response.data.data);
        }
        setTotalPages(response.data.pagination?.totalPages ?? 1);
      } else {
        setError("Unable to load projects. Please try again later.");
      }
    } catch (err) {
      console.error("Fetch projects error:", err);
      setError("Failed to retrieve projects. Please verify your connection.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProjects(page, page > 1);
  }, [page]);

  const handleProjectCreated = () => {
    setIsCreateOpen(false);
    if (page === 1) {
      fetchProjects(1, false);
    } else {
      setPage(1);
    }
  };

  const handleProjectUpdated = () => {
    setIsEditOpen(false);
    setSelectedProject(null);
    if (page === 1) {
      fetchProjects(1, false);
    } else {
      setPage(1);
    }
  };

  const handleOpenEdit = (project) => {
    setSelectedProject(project);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (project) => {
    setProjectToDelete(project);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    setDeleteLoading(true);
    try {
      const response = await projectAPI.delete(projectToDelete._id);
      if (response.data.success) {
        toast.success("Project deleted successfully!");
        setProjectToDelete(null);
        if (page === 1) {
          fetchProjects(1, false);
        } else {
          setPage(1);
        }
      } else {
        toast.error(response.data.message || "Failed to delete project.");
      }
    } catch (error) {
      console.error(error);
      const errMsg =
        error.response?.data?.message || "Failed to delete project.";
      toast.error(errMsg);
    } finally {
      setDeleteLoading(false);
    }
  };

  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    "MERN Stack",
    "Full Stack",
    "Creative Designer",
    "React Native Developer",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category?.toLowerCase() === activeFilter.toLowerCase(),
        );

  return (
    <section
      id="projects"
      className="relative bg-transparent text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[280px] h-[280px] rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row lg:items-end lg:justify-between mb-8">
          <div className="text-center lg:text-left">
            <p className="text-cyan-400 uppercase tracking-[8px] text-sm font-semibold">
              Featured Works
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">My Projects</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto lg:mx-0 mt-4">
              A selection of web applications and frontend experiences built
              with React, Node.js and modern web technologies.
            </p>
          </div>

          {isAdmin && (
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
            >
              <FiPlus className="w-4 h-4" />
              Add Project
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 font-semibold"
                  : "bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {error ? (
          <div className="rounded-3xl bg-zinc-950/70 border border-red-600/20 p-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <FiAlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              Unable to load projects
            </h3>
            <p className="mt-2 text-sm text-zinc-400">{error}</p>
          </div>
        ) : (
          <>
            <ProjectList
              projects={filteredProjects}
              loading={loading}
              isAdmin={isAdmin}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
            {page < totalPages && (
              <div className="flex justify-center mt-16">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={loadingMore}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-zinc-950/40 backdrop-blur-md border border-zinc-800 text-white font-bold transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] disabled:opacity-50 cursor-pointer disabled:cursor-default"
                >
                  {loadingMore ? (
                    <FiLoader className="w-5 h-5 animate-spin text-cyan-400" />
                  ) : (
                    <>
                      <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent transition-all duration-300">
                        Load More Projects
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
      <EditProjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={selectedProject}
        onProjectUpdated={handleProjectUpdated}
      />
      <DeleteConfirmationModal
        isOpen={Boolean(projectToDelete)}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleConfirmDelete}
        projectName={projectToDelete?.title || "this project"}
        loading={deleteLoading}
      />
    </section>
  );
}
