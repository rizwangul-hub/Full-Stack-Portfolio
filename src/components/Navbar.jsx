import { useState } from "react";
import logo from "../assets/image/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950 text-white">
      <div className="flex items-center justify-between px-5 md:px-10 py-4">

        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="Logo"
            className="w-16 md:w-20 animate-spin-y"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <nav className="flex gap-12">
            <a href="#" className="nav-link">
              Home
            </a>
            <a href="#services" className="nav-link">
              Service
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#skills" className="nav-link">
              Skills
            </a>
            <a href="#project" className="nav-link">
              Project
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
            <a href="#footer" className="nav-link">
              Footer
            </a>
          </nav>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 text-white font-bold hover:scale-105 transition duration-300"
          >
            Contact Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-[3px] bg-white"></span>
          <span className="w-6 h-[3px] bg-white"></span>
          <span className="w-6 h-[3px] bg-white"></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-slate-950 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] py-5" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-5">
          <a href="#" onClick={() => setIsOpen(false)} className="nav-link">
            Home
          </a>
          <a
            href="#services"
            onClick={() => setIsOpen(false)}
            className="nav-link"
          >
            Service
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="nav-link"
          >
            About
          </a>
          <a
            href="#skills"
            onClick={() => setIsOpen(false)}
            className="nav-link"
          >
            Skills
          </a>
          <a
            href="#project"
            onClick={() => setIsOpen(false)}
            className="nav-link"
          >
            Project
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="nav-link"
          >
            Contact
          </a>
          <a
            href="#footer"
            onClick={() => setIsOpen(false)}
            className="nav-link"
          >
            Footer
          </a>

          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 text-white font-bold"
          >
            Contact Me
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;