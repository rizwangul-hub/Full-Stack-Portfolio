import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { MotionConfig } from "framer-motion";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/SkillsSection";
import Services from "./components/ServicesSection";
import Projects from "./components/ProjectSection";
import Contact from "./components/ContactSection";
import Footer from "./components/Footer";
import FloatingAdminButton from "./components/FloatingAdminButton";
import AdminUnlockModal from "./components/AdminUnlockModal";
import Header from "./components/Navbar";
import AIToolkit from "./components/AIToolkit";

function App() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio-shell text-white min-h-screen relative">

        <div className="portfolio-ambient" aria-hidden="true" />


        <Header />
        <main className="relative z-10 bg-transparent">
          <Hero />
          <About />
          <Skills />
          <AIToolkit />
          <Services />
          <Projects />
          <Contact />
          <Footer />
        </main>

        <FloatingAdminButton onClickUnlock={() => setIsAdminModalOpen(true)} />
        <AdminUnlockModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
        />
        <Toaster position="top-right" />
      </div>
    </MotionConfig>
  );
}

export default App;

