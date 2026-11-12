import { useState, useEffect } from "react";


import heroImg from "../assets/image/hero-portrait.jpg";
import mycv from "../assets/image/RizwanCV.pdf";
import { useAdmin } from "../context/AdminContext";
import { portfolioAPI } from "../services/api";
import { FiArrowDown, FiArrowUpRight, FiCode, FiEdit3 } from "react-icons/fi";
import ProfileImageModal from "./ProfileImageModal";

export default function Hero() {
  const { isAdmin } = useAdmin();
  const [currentHeroImg, setCurrentHeroImg] = useState(heroImg);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    portfolioAPI
      .getPortfolio()
      .then((res) => {
        if (res.data.success && res.data.data.profile?.heroImage) {
          setCurrentHeroImg(res.data.data.profile.heroImage);
        }
      })
      .catch((err) => console.error("Error fetching hero profile:", err));
  }, []);

  const handleProfileUpdated = (profile) => {
    if (profile?.heroImage) {
      setCurrentHeroImg(profile.heroImage);
    }
  };

  return (
    <section id="home" className="portfolio-hero">
      <div className="portfolio-hero-copy">
        <p className="portfolio-kicker">
          <span className="portfolio-kicker-mark" aria-hidden="true" />
          Full-stack developer
        </p>
        <h1>Rizwan <span>Ullah</span></h1>
        <p className="portfolio-intro">
          I turn ambitious ideas into polished web and mobile experiences — from
          the first interface to the systems running behind it.
        </p>
        <ul className="portfolio-hero-stack" aria-label="Core technologies">
          {["React", "React Native", "Node.js", "MongoDB"].map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="portfolio-hero-actions">
          <a href="#projects" className="portfolio-action portfolio-action-primary">
            View projects <FiArrowDown aria-hidden="true" />
          </a>
          <a href={mycv} target="_blank" rel="noopener noreferrer" className="portfolio-action">
            View CV <FiArrowUpRight aria-hidden="true" />
          </a>
          <a
            href="https://wa.me/923179500901?text=Hello%20Rizwan%2C%20I%20would%20like%20to%20hire%20you%20for%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-nav-link"
          >
            Hire me <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="portfolio-portrait">
        <div className="portfolio-portrait-frame">
          <img
            src={currentHeroImg}
            alt="Rizwan Ullah"
            fetchPriority="high"
            onError={() => setCurrentHeroImg(heroImg)}
          />
          <div className="portfolio-portrait-note" aria-hidden="true">
            <span className="portfolio-portrait-note-icon"><FiCode /></span>
            <span>
              <strong>Ideas into interfaces</strong>
              <small>Web · Mobile · AI</small>
            </span>
          </div>
          {isAdmin && (
            <button
              onClick={() => setIsImageModalOpen(true)}
              className="absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 border border-cyan-500/50 text-cyan-300 hover:text-white hover:bg-indigo-600 transition-all text-xs font-semibold backdrop-blur-md shadow-xl cursor-pointer"
            >
              <FiEdit3 className="w-3.5 h-3.5" />
              Change Hero Image
            </button>
          )}
        </div>
      </div>

      <ProfileImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        section="hero"
        currentImage={currentHeroImg}
        onUpdated={handleProfileUpdated}
      />
    </section>
  );
}
