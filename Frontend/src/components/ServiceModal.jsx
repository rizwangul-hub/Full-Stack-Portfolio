import React, { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import { portfolioAPI } from "../services/api";
import toast from "react-hot-toast";

export const ServiceModal = ({ isOpen, onClose, service, onSaved }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("Globe");
  const [techStack, setTechStack] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(service);

  useEffect(() => {
    if (service && isOpen) {
      setTitle(service.title || "");
      setDescription(service.description || "");
      setIconName(service.iconName || "Globe");
      setTechStack(service.techStack?.join(", ") || "");
    } else if (!isOpen) {
      setTitle("");
      setDescription("");
      setIconName("Globe");
      setTechStack("");
    }
  }, [service, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    setLoading(true);
    const payload = {
      title,
      description,
      iconName,
      techStack,
    };

    try {
      let res;
      if (isEdit) {
        res = await portfolioAPI.updateService(service._id, payload);
      } else {
        res = await portfolioAPI.createService(payload);
      }

      if (res.data.success) {
        toast.success(`Service ${isEdit ? "updated" : "added"} successfully!`);
        onSaved?.();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectModal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Service" : "Add Service"}>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">Service Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Frontend Development, React Native Apps"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">Description *</label>
          <textarea
            rows={3}
            required
            placeholder="Brief overview of the service offered..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">Icon Style</label>
          <select
            value={iconName}
            onChange={(e) => setIconName(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500 transition-all text-sm"
          >
            <option value="Globe">Globe (Frontend / Web)</option>
            <option value="Server">Server (Backend / APIs)</option>
            <option value="Database">Database (Architecture / Optimization)</option>
            <option value="Code2">Code2 (Full Stack / MERN)</option>
            <option value="Smartphone">Smartphone (React Native / Mobile)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">
            Tech Stack Tags (comma separated)
          </label>
          <input
            type="text"
            placeholder="React, Next.js, Tailwind CSS, Vite"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer text-sm disabled:opacity-50 flex items-center justify-center min-w-[120px]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Add Service"
            )}
          </button>
        </div>
      </form>
    </ProjectModal>
  );
};

export default ServiceModal;
