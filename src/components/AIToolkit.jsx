import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaMagic, FaBrain, FaGem, FaGithub } from "react-icons/fa";
import { FiCode, FiZap, FiLayers, FiStar } from "react-icons/fi";

const tools = [
  {
    icon: FaRobot,
    title: "ChatGPT",
    subtitle: "Problem-solving, ideation, and intelligent conversations.",
    features: [
      "Debugging through natural language",
      "Content generation for docs and blogs",
      "Code optimization recommendations",
      "AI-assisted architecture thinking",
    ],
    accent: "from-cyan-400 to-blue-500",
  },
  {
    icon: FiCode,
    title: "Cursor",
    subtitle: "AI-powered coding assistant for rapid developer flow.",
    features: [
      "Rapid development shortcuts",
      "Smart refactoring guidance",
      "Productivity-enhancing workflows",
      "Context-aware code completions",
    ],
    accent: "from-blue-500 to-indigo-500",
  },
  {
    icon: FaMagic,
    title: "Antigravity",
    subtitle: "Generate polished UI and component scaffolding fast.",
    features: [
      "Visual UI generation",
      "Component scaffolding instantly",
      "Project acceleration with templates",
      "Design assistance for modern interfaces",
    ],
    accent: "from-purple-500 to-fuchsia-500",
  },
  {
    icon: FaBrain,
    title: "Claude",
    subtitle: "Deep research, planning, and documentation support.",
    features: [
      "Research and technical discovery",
      "Software architecture planning",
      "Documentation generation",
      "Requirement analysis summaries",
    ],
    accent: "from-emerald-400 to-cyan-500",
  },
  {
    icon: FaGem,
    title: "Gemini",
    subtitle: "Powerful code analysis and idea generation.",
    features: [
      "Code review and analysis",
      "Brainstorming breakthrough ideas",
      "AI-assisted development support",
      "Creative feature ideation",
    ],
    accent: "from-emerald-500 to-blue-400",
  },
  {
    icon: FaGithub,
    title: "GitHub Copilot",
    subtitle: "Intelligent code completion for faster delivery.",
    features: [
      "Boilerplate generation",
      "Faster coding workflow",
      "Productivity-first tooling",
      "Smart inline suggestions",
    ],
    accent: "from-sky-400 to-violet-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const AIToolkit = () => {
  return (
    <section className="relative isolate overflow-hidden px-6 py-16 sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_28%)]" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute right-0 top-20 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.94))]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-12 max-w-4xl text-center sm:mx-auto"
        >
          <p className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300 shadow-inner shadow-cyan-500/5">
            AI Development Toolkit
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Empowering your workflow with AI-native development tools.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Leveraging cutting-edge AI tools to accelerate development, improve
            code quality, enhance creativity, and deliver modern web
            applications faster.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.article
                key={tool.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-500"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.12),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.12),_transparent_20%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-4 top-4 h-0.5 bg-white/5 blur-sm" />

                <div className="relative z-10 flex items-center gap-4">
                  <span
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${tool.accent} text-2xl text-white shadow-lg shadow-cyan-500/20`}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                      {tool.title}
                    </p>
                    <p className="mt-1 max-w-xs text-sm text-slate-300">
                      {tool.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {tool.features.map((feature) => (
                    <div key={feature} className="flex gap-3">
                      <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-white/5 text-cyan-300 ring-1 ring-white/10">
                        <FiStar className="h-4 w-4" />
                      </span>
                      <p className="text-sm leading-6 text-slate-200">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between text-sm text-slate-400">
                  <span className="font-medium text-slate-200">Explore</span>
                  <span className="flex items-center gap-2 text-cyan-300 transition-all duration-300 group-hover:text-white">
                    View details
                    <FiZap className="h-4 w-4" />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AIToolkit;
