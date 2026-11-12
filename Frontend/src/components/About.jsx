import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AboutImage from "../assets/image/About image.jpeg";
import "../index.css";
import { useAdmin } from "../context/AdminContext";
import { portfolioAPI } from "../services/api";
import { FiEdit3 } from "react-icons/fi";
import ProfileImageModal from "./ProfileImageModal";

export default function About() {
  const { isAdmin } = useAdmin();
  const [currentAboutImg, setCurrentAboutImg] = useState(AboutImage);
  const [projectsCompleted, setProjectsCompleted] = useState("15+");
  const [yearsExperience, setYearsExperience] = useState("1+");
  const [passion, setPassion] = useState("100%");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    portfolioAPI
      .getPortfolio()
      .then((res) => {
        if (res.data.success) {
          const { profile, totalProjects } = res.data.data;
          if (profile?.aboutImage) {
            setCurrentAboutImg(profile.aboutImage);
          }
          if (profile?.yearsExperience) {
            setYearsExperience(profile.yearsExperience);
          }
          if (profile?.passion) {
            setPassion(profile.passion);
          }
          if (profile?.customProjectsCount !== null && profile?.customProjectsCount !== undefined) {
            setProjectsCompleted(`${profile.customProjectsCount}+`);
          } else if (typeof totalProjects === "number") {
            setProjectsCompleted(`${totalProjects}+`);
          }
        }
      })
      .catch((err) => console.error("Error fetching about profile:", err));
  }, []);

  const handleProfileUpdated = (profile) => {
    if (profile?.aboutImage) {
      setCurrentAboutImg(profile.aboutImage);
    }
  };

  return (
    <section
      id="about"
      className="bg-transparent py-[100px] px-5 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-[50px]">
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative w-[360px] h-[460px] rounded-[25px] flex justify-center items-center overflow-hidden animated-border-box group">
            <div className="relative w-[90%] h-[90%] bg-[#050510] rounded-[20px] z-10 flex justify-center items-center overflow-hidden">
              <img
                src={currentAboutImg}
                alt="Rizwan Ullah"
                loading="lazy"
                decoding="async"
                onError={() => setCurrentAboutImg(AboutImage)}
                className="w-full h-full object-cover rounded-[20px]"
              />
              {isAdmin && (
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 border border-cyan-500/50 text-cyan-300 hover:text-white hover:bg-indigo-600 transition-all text-xs font-semibold backdrop-blur-md shadow-xl cursor-pointer"
                >
                  <FiEdit3 className="w-3.5 h-3.5" />
                  Change Image
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center md:text-left"
        >
          <h4 className="text-cyan-400 text-[18px] mb-[10px]">About Me</h4>

          <h2 className="text-white text-[36px] font-bold mb-5">
            MERN Stack Developer
          </h2>

          <div className="max-w-[600px] space-y-4 text-slate-300 leading-7">
            <p>
              I build <strong>web and mobile applications</strong> with MongoDB, Express,
              React, Node.js, and React Native.
            </p>
            <p>
              My work includes dashboards, e-commerce sites, management systems,
              SaaS products, and AI-powered tools. I focus on responsive interfaces,
              maintainable code, and performance.
            </p>
          </div>

          {/* INFO BOXES */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-[#0c1022] p-5 rounded-[15px] text-center border border-white/10 shadow-xl"
            >
              <h3 className="text-cyan-400 text-[28px] font-bold">{yearsExperience}</h3>
              <span className="text-gray-400 text-[14px]">
                Years Experience
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-[#0c1022] p-5 rounded-[15px] text-center border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
            >
              <h3 className="text-cyan-400 text-[28px] font-bold">{projectsCompleted}</h3>
              <span className="text-gray-400 text-[14px]">
                Projects Completed
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-[#0c1022] p-5 rounded-[15px] text-center border border-white/10 shadow-xl"
            >
              <h3 className="text-cyan-400 text-[28px] font-bold">{passion}</h3>
              <span className="text-gray-400 text-[14px]">Passion</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <ProfileImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        section="about"
        currentImage={currentAboutImg}
        onUpdated={handleProfileUpdated}
      />
    </section>
  );
}

