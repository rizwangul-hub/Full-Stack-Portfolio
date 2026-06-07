import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import Pagination from "./Pagination";
import { projectAPI } from "../services/api";
import { FiAlertTriangle, FiPlus } from "react-icons/fi";
import { useAdmin } from "../context/AdminContext";
import CreateProjectModal from "./CreateProjectModal";
import EditProjectModal from "./EditProjectModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import toast from "react-hot-toast";

export default function ProjectSection() {
  const { isAdmin } = useAdmin();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const limit = 6;

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectAPI.getAll(page, limit);
      if (response.data.success) {
        setProjects(response.data.data);
        setTotalPages(response.data.pagination?.pages ?? 1);
      } else {
        setError("Unable to load projects. Please try again later.");
      }
    } catch (err) {
      console.error("Fetch projects error:", err);
      setError("Failed to retrieve projects. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleProjectCreated = () => {
    setIsCreateOpen(false);
    fetchProjects();
  };

  const handleProjectUpdated = () => {
    setIsEditOpen(false);
    setSelectedProject(null);
    fetchProjects();
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
        fetchProjects();
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

  return (
    <section
      id="projects"
      className="relative bg-[#0a0b14] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[280px] h-[280px] rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row lg:items-end lg:justify-between mb-16">
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
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20"
            >
              <FiPlus className="w-4 h-4" />
              Add Project
            </button>
          )}
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
              projects={projects}
              loading={loading}
              isAdmin={isAdmin}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
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
