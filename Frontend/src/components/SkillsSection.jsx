import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Atom,
  Server,
  Database,
  GitBranch,
  Globe,
  Code2,
  Terminal,
  Cloud,
  Plus,
  Edit3,
  Trash2,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { portfolioAPI } from "../services/api";
import SkillModal from "./SkillModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import toast from "react-hot-toast";

const iconMap = {
  Atom: <Atom size={30} />,
  Server: <Server size={30} />,
  Database: <Database size={30} />,
  GitBranch: <GitBranch size={30} />,
  Cloud: <Cloud size={30} />,
  Terminal: <Terminal size={30} />,
};

const defaultSkills = [
  {
    category: "Frontend",
    iconName: "Atom",
    technologies: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Framer Motion", "Bootstrap"],
  },
  {
    category: "Backend",
    iconName: "Server",
    technologies: ["Node.js", "Express.js", "REST APIs", "JWT"],
  },
  {
    category: "Database",
    iconName: "Database",
    technologies: ["MongoDB", "Mongoose", "Supabase"],
  },
  {
    category: "Version Control & Deployment",
    iconName: "GitBranch",
    technologies: ["Git", "GitHub", "Vercel"],
  },
  {
    category: "React Native",
    iconName: "Cloud",
    technologies: ["React Native", "Expo"],
  },
  {
    category: "Tools",
    iconName: "Terminal",
    technologies: ["VS Code", "Postman", "cloudinary", "stripe", "supabase"],
  },
];

export default function SkillsSection() {
  const { isAdmin } = useAdmin();
  const [skills, setSkills] = useState(defaultSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchSkills = async () => {
    try {
      const res = await portfolioAPI.getPortfolio();
      if (res.data.success && res.data.data.skills?.length > 0) {
        setSkills(res.data.data.skills);
      }
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setSelectedSkill(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!skillToDelete?._id) return;
    setDeleteLoading(true);
    try {
      const res = await portfolioAPI.deleteSkill(skillToDelete._id);
      if (res.data.success) {
        toast.success("Skill category deleted.");
        setSkillToDelete(null);
        fetchSkills();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete skill.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen bg-transparent py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <p className="uppercase tracking-[8px] text-cyan-400 text-sm">
            Expertise
          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-white mt-4">
            My Skills
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Building scalable MERN stack applications with modern tools,
            responsive interfaces and secure backend architecture.
          </p>

          {isAdmin && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20 cursor-pointer text-sm"
              >
                <Plus size={16} />
                Add Skill Category
              </button>
            </div>
          )}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill._id || skill.category}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="group relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#0b0f24] shadow-2xl p-8"
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

              {isAdmin && skill._id && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    className="p-2 rounded-full bg-black/70 border border-zinc-800 text-cyan-400 hover:text-white hover:bg-indigo-600 transition-all cursor-pointer"
                    title="Edit Skill"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => setSkillToDelete(skill)}
                    className="p-2 rounded-full bg-black/70 border border-zinc-800 text-red-400 hover:text-white hover:bg-red-600 transition-all cursor-pointer"
                    title="Delete Skill"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              <div className="relative z-10">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6"
                >
                  {iconMap[skill.iconName] || <Atom size={30} />}
                </motion.div>

                <h3 className="text-2xl font-semibold text-white mb-5">
                  {skill.category}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full text-sm bg-zinc-900 border border-cyan-500/20 text-cyan-300 hover:border-cyan-400 transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Floating Tech */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="flex justify-center gap-10 mt-20 text-cyan-400"
        >
          <Globe size={40} />
          <Code2 size={40} />
          <Database size={40} />
          <Server size={40} />
        </motion.div>
      </div>

      <SkillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        skill={selectedSkill}
        onSaved={fetchSkills}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(skillToDelete)}
        onClose={() => setSkillToDelete(null)}
        onConfirm={handleConfirmDelete}
        projectName={skillToDelete?.category || "this skill"}
        loading={deleteLoading}
      />
    </section>
  );
}