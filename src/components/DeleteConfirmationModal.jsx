import React from "react";
import ProjectModal from "./ProjectModal";

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  projectName,
  loading,
}) => {
  return (
    <ProjectModal isOpen={isOpen} onClose={onClose} title="Delete Project">
      <div className="space-y-4 text-left">
        <p className="text-zinc-300 text-sm leading-relaxed">
          Are you sure you want to permanently delete the project{" "}
          <span className="font-semibold text-white">"{projectName}"</span>? This
          action is irreversible and will remove all associated data.
        </p>

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
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-red-650 hover:bg-red-600 text-white font-medium shadow-lg hover:shadow-red-950/40 transition-all cursor-pointer text-sm disabled:opacity-50 flex items-center justify-center min-w-[100px]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </ProjectModal>
  );
};

export default DeleteConfirmationModal;
