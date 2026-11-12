import React, { useState, useRef } from "react";
import ProjectModal from "./ProjectModal";
import { portfolioAPI } from "../services/api";
import toast from "react-hot-toast";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";

export const ProfileImageModal = ({ isOpen, onClose, section, currentImage, onUpdated }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(currentImage || "");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const isHero = section === "hero";
  const title = isHero ? "Update Hero Section Image" : "Update About Me Section Image";

  React.useEffect(() => {
    setImagePreview(currentImage || "");
    setImageFile(null);
  }, [currentImage, isOpen]);

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
    if (!imageFile) {
      toast.error("Please select a new image to upload");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    if (isHero) {
      formData.append("heroImage", imageFile);
    } else {
      formData.append("aboutImage", imageFile);
    }

    try {
      const response = await portfolioAPI.updateProfile(formData);
      if (response.data.success) {
        toast.success(`${isHero ? "Hero" : "About"} image updated successfully!`);
        onUpdated?.(response.data.data);
        onClose();
      }
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || "Failed to upload image.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectModal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-zinc-400 block">
            Select New {isHero ? "Hero" : "About Me"} Image *
          </label>

          {imagePreview ? (
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 h-48 bg-zinc-900 flex justify-center items-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-full object-contain"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/80 hover:bg-red-600 text-white transition-all cursor-pointer shadow-lg"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 rounded-lg p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-zinc-900/50"
            >
              <FiUploadCloud className="w-10 h-10 text-cyan-400" />
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
            disabled={loading || !imageFile}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-medium shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer text-sm disabled:opacity-50 flex items-center justify-center min-w-[120px]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Save Image"
            )}
          </button>
        </div>
      </form>
    </ProjectModal>
  );
};

export default ProfileImageModal;
