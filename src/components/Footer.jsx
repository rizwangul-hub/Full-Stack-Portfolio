import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedinIn, FaTiktok, FaGlobe, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../assets/image/logo.png"; // Falls back to logo or custom avatar

export const Footer = () => {
  const links = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "About me", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact me", href: "#contact" },
  ];

  return (
    <footer id="footer" className="w-full bg-[#030712] border-t border-zinc-900/80 pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-12 overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8 relative z-10">
        
        {/* Footer Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative group cursor-pointer"
        >
          <img
            className="w-16 h-16 rounded-full border border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all duration-300 object-cover"
            src={logo}
            alt="Logo"
            onError={(e) => {
              // fallback if logo is not found
              e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200";
            }}
          />
        </motion.div>

        {/* Footer Navigation Links */}
        <nav className="w-full max-w-xl">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 list-none p-0 m-0">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-zinc-400 hover:text-orange-500 font-medium text-[15px] sm:text-base tracking-wide transition-colors duration-300 block py-1 cursor-pointer"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Address and Social Actions row */}
        <div className="w-full flex flex-col items-center gap-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl">
            
            {/* Email Pill Button */}
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:rizwangul535@gmail.com"
              className="flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full border border-zinc-800/80 hover:border-orange-500 bg-zinc-950/40 hover:bg-orange-500 text-zinc-300 hover:text-white text-sm font-medium transition-all duration-300 shadow-lg w-full sm:w-auto cursor-pointer"
            >
              <FaEnvelope className="w-4 h-4" />
              <span>rizwangul535@gmail.com</span>
            </motion.a>

            {/* Social Media Link icons */}
            <div className="flex items-center justify-center gap-4 py-2">
              <a
                href="https://www.instagram.com/mernstackdeveloper2426?igsh=NXkwZDl3bWd5dWVt/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-850 bg-zinc-950/40 hover:bg-orange-500 text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:scale-110"
                title="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              
              <a
                href="https://www.linkedin.com/in/rizwan-ullah-446676302/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-850 bg-zinc-950/40 hover:bg-orange-500 text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>

              <a
                href="https://www.tiktok.com/@mernstackdeveloper?_r=1&_t=ZS-970O0o2220f"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-850 bg-zinc-950/40 hover:bg-orange-500 text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:scale-110"
                title="TikTok"
              >
                <FaTiktok className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/rizwangul-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-850 bg-zinc-950/40 hover:bg-orange-500 text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:scale-110"
                title="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            </div>

            {/* Phone Call Pill Button */}
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="tel:+923255984244"
              className="flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-full border border-zinc-800/80 hover:border-orange-500 bg-zinc-950/40 hover:bg-orange-500 text-zinc-300 hover:text-white text-sm font-medium transition-all duration-300 shadow-lg w-full sm:w-auto cursor-pointer"
            >
              <FaPhone className="w-3.5 h-3.5" />
              <span>+92 3255984244</span>
            </motion.a>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="w-full max-w-2xl h-[1px] bg-zinc-900/60 mt-4" />

        {/* copyright metadata */}
        <p className="text-zinc-500 text-xs sm:text-sm tracking-wide">
          © {new Date().getFullYear()}. All rights reserved. Designed by{" "}
          <span className="text-zinc-400 hover:text-orange-500 cursor-pointer transition-colors">
            Rizwan Ullah
          </span>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
