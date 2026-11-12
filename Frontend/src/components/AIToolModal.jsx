import React, { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import { portfolioAPI } from "../services/api";
import toast from "react-hot-toast";

export const AIToolModal = ({ isOpen, onClose, tool, onSaved }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [iconName, setIconName] = useState("FaRobot");
  const [accent, setAccent] = useState("from-cyan-400 to-blue-500");
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(tool);

  useEffect(() => {
    if (tool && isOpen) {
      setTitle(tool.title || "");
      setSubtitle(tool.subtitle || "");
      setIconName(tool.iconName || "FaRobot");
      setAccent(tool.accent || "from-cyan-400 to-blue-500");
      setFeatures(tool.features?.join("\n") || "");
    } else if (!isOpen) {
      setTitle("");
      setSubtitle("");
      setIconName("FaRobot");
      setAccent("from-cyan-400 to-blue-500");
      setFeatures("");
    }
  }, [tool, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Tool title is required");
      return;
    }

    setLoading(true);
    const payload = {
      title,
      subtitle,
      iconName,
      accent,
      features,
    };

    try {
      let res;
      if (isEdit) {
        res = await portfolioAPI.updateAITool(tool._id, payload);
      } else {
        res = await portfolioAPI.createAITool(payload);
      }

      if (res.data.success) {
        toast.success(`AI Tool ${isEdit ? "updated" : "added"} successfully!`);
        onSaved?.();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save AI tool.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectModal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit AI Tool" : "Add AI Tool"}>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-400 block">Tool Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Codex, GitHub Agent, Cursor"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-400 block">Icon</label>
            <select
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500 transition-all text-sm"
            >
              <option value="FaRobot">FaRobot (Robot / Codex)</option>
              <option value="FiCode">FiCode (Code / Cursor)</option>
              <option value="FaMagic">FaMagic (Magic / Antigravity)</option>
              <option value="FaBrain">FaBrain (Brain / Claude)</option>
              <option value="FaGem">FaGem (Gem / Gemini)</option>
              <option value="FaGithub">FaGithub (GitHub / GitHub Agent)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">Subtitle</label>
          <input
            type="text"
            placeholder="e.g. AI-powered coding assistant for rapid workflow"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">Gradient Accent</label>
          <select
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-indigo-500 transition-all text-sm"
          >
            <option value="from-cyan-400 to-blue-500">Cyan to Blue</option>
            <option value="from-blue-500 to-indigo-500">Blue to Indigo</option>
            <option value="from-purple-500 to-fuchsia-500">Purple to Fuchsia</option>
            <option value="from-emerald-400 to-cyan-500">Emerald to Cyan</option>
            <option value="from-emerald-500 to-blue-400">Emerald to Blue</option>
            <option value="from-sky-400 to-violet-500">Sky to Violet</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">
            Features (one per line)
          </label>
          <textarea
            rows={4}
            placeholder={"Rapid development shortcuts\nSmart refactoring guidance\nProductivity-enhancing workflows"}
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm resize-none"
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
              "Add AI Tool"
            )}
          </button>
        </div>
      </form>
    </ProjectModal>
  );
};

export default AIToolModal;
