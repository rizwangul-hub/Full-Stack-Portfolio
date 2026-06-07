import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
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
    <div className="bg-[#020617] text-white min-h-screen overflow-hidden">
      <Header />
      <main className="relative">
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
  );
}

export default App;
