import { useState } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/image/portfolio-logo.png";

const links = [
  ["#home", "Home"],
  ["#about", "About"],
  ["#skills", "Skills"],
  ["#services", "Services"],
  ["#projects", "Projects"],
  ["#contact", "Contact"],
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="portfolio-header sticky top-0 z-50" onKeyDown={(event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        event.currentTarget.querySelector("button")?.focus();
      }
    }}>
      <div className="portfolio-scroll-progress" aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3 sm:px-8">
        <a href="#home" onClick={() => setIsOpen(false)} className="flex items-center gap-3 font-semibold text-white">
          <img src={logo} alt="" className="h-9 w-9 object-contain" />
          Rizwan Ullah
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {links.map(([href, label]) => <a key={href} href={href} className="portfolio-nav-link">{label}</a>)}
        </nav>
        <a href="#contact" className="portfolio-action hidden lg:inline-flex">
          Let’s talk <FiArrowUpRight aria-hidden="true" />
        </a>
        <button
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="portfolio-action inline-flex lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!isOpen} className="portfolio-mobile-nav lg:hidden">
        {links.map(([href, label]) => (
          <a key={href} href={href} className="portfolio-nav-link" onClick={() => setIsOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}



