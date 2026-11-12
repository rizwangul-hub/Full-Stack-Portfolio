import React, { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import { portfolioAPI } from "../services/api";
import toast from "react-hot-toast";

export const SkillModal = ({ isOpen, onClose, skill, onSaved }) => {
  const [category, setCategory] = useState("");
  const [iconName, setIconName] = useState("Atom");
  const [technologies, setTechnologies] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(skill);

  useEffect(() => {
    if (skill && isOpen) {
      setCategory(skill.category || "");
      setIconName(skill.iconName || "Atom");
      setTechnologies(skill.technologies?.join(", ") || "");
    } else if (!isOpen) {
      setCategory("");
      setIconName("Atom");
      setTechnologies("");
    }
  }, [skill, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);
    const payload = {
      category,
      iconName,
      technologies,
    };

    try {
      let res;
      if (isEdit) {
        res = await portfolioAPI.updateSkill(skill._id, payload);
      } else {
        res = await portfolioAPI.createSkill(payload);
      }

      if (res.data.success) {
        toast.success(`Skill ${isEdit ? "updated" : "added"} successfully!`);
        onSaved?.();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save skill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectModal isOpen={isOpen} onClose={onClose} title={isEdit ? "Edit Skill" : "Add New Skill"}>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">Category Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Frontend, Backend, Database, React Native"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
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
            <option value="Atom">Atom (Frontend / React)</option>
            <option value="Server">Server (Backend / Node)</option>
            <option value="Database">Database (MongoDB / SQL)</option>
            <option value="GitBranch">GitBranch (DevOps / Version Control)</option>
            <option value="Cloud">Cloud (Mobile / Cloud)</option>
            <option value="Terminal">Terminal (Tools / Utilities)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">
            Technologies (comma separated)
          </label>
          <input
            type="text"
            placeholder="React, Next.js, Tailwind CSS, JavaScript"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
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
              "Add Skill"
            )}
          </button>
        </div>
      </form>
    </ProjectModal>
  );
};

export default SkillModal;
