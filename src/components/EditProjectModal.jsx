import React, { useState, useEffect, useRef } from "react";
import ProjectModal from "./ProjectModal";
import { projectAPI } from "../services/api";
import toast from "react-hot-toast";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";

export const EditProjectModal = ({ isOpen, onClose, project, onProjectUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (project && isOpen) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setLiveLink(project.liveLink || "");
      setGithubLink(project.githubLink || "");
      setTechnologies(project.technologies?.join(", ") || "");
      setImagePreview(project.image || "");
      setImageFile(null);
    }
  }, [project, isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !liveLink.trim() || !imagePreview) {
      toast.error("Title, Description, Live Link and Project Image are required");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("liveLink", liveLink);
    formData.append("githubLink", githubLink);
    formData.append("technologies", technologies);
    
    // Only upload a new file if the user picked one
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await projectAPI.update(project._id, formData);
      if (response.data.success) {
        toast.success("Project updated successfully!");
        onProjectUpdated();
        onClose();
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Failed to update project.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectModal isOpen={isOpen} onClose={onClose} title="Edit Project">
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">Project Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Portfolio Builder"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">Description *</label>
          <textarea
            required
            placeholder="Describe the project..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            rows={3}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm resize-none"
          />
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-400 block">Live Demo Link *</label>
            <input
              type="url"
              required
              placeholder="https://example.com"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-400 block">GitHub Repo (Optional)</label>
            <input
              type="url"
              placeholder="https://github.com/username/repo"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Technologies */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">
            Technologies (comma separated)
          </label>
          <input
            type="text"
            placeholder="React, Tailwind, Node.js"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm"
          />
        </div>

        {/* Image upload */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">Project Image *</label>
          
          {imagePreview ? (
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 h-40 bg-zinc-900">
              <img
                src={imagePreview}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-650/80 hover:bg-red-600 text-white transition-all cursor-pointer shadow-lg"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-zinc-900/50"
            >
              <FiUploadCloud className="w-8 h-8 text-zinc-500" />
              <div className="text-center">
                <p className="text-xs font-medium text-zinc-300">Click to upload new image</p>
                <p className="text-[10px] text-zinc-500 mt-1">PNG, JPG or WEBP up to 5MB</p>
              </div>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
            accept="image/*"
          />
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 transition-all cursor-pointer text-sm"
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
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </ProjectModal>
  );
};

export default EditProjectModal;
