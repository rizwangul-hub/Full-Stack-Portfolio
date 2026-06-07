import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import { adminAPI } from "../services/api";
import { useAdmin } from "../context/AdminContext";
import toast from "react-hot-toast";

export const AdminUnlockModal = ({ isOpen, onClose }) => {
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      toast.error("Access code is required");
      return;
    }

    setLoading(true);
    try {
      const response = await adminAPI.unlock(accessCode);
      if (response.data.success) {
        login(response.data.token);
        toast.success(response.data.message || "Admin mode activated!");
        setAccessCode("");
        onClose();
      }
    } catch (error) {
      console.error(error);
      const errMsg =
        error.response?.data?.message || "Verification failed. Check your code.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectModal isOpen={isOpen} onClose={onClose} title="Unlock Admin Access">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="access-code"
            className="text-sm font-medium text-zinc-400 block"
          >
            Access Secret Code
          </label>
          <input
            id="access-code"
            type="password"
            placeholder="••••••••"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
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
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer text-sm disabled:opacity-50 flex items-center justify-center min-w-[80px]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Unlock"
            )}
          </button>
        </div>
      </form>
    </ProjectModal>
  );
};

export default AdminUnlockModal;
