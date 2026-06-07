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
} from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: <Atom size={30} />,
    technologies: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Framer Motion", "Bootstrap"],
  },
  {
    category: "Backend",
    icon: <Server size={30} />,
    technologies: ["Node.js", "Express.js", "REST APIs", "JWT"],
  },
  {
    category: "Database",
    icon: <Database size={30} />,
    technologies: ["MongoDB", "Mongoose", "Supabase"],
  },
  {
    category: "Version Control",
    icon: <GitBranch size={30} />,
    technologies: ["Git", "GitHub"],
  },
  {
    category: "Deployment",
    icon: <Cloud size={30} />,
    technologies: ["Vercel"],
  },
  {
    category: "Tools",
    icon: <Terminal size={30} />,
    technologies: ["VS Code", "Postman", "cloudinary", "stripe", "supbase"],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative min-h-screen bg-black py-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
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
        </motion.div>

        {/* Skills Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
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
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >
              {/* Glow */}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />

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
                  {skill.icon}
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
    </section>
  );
}