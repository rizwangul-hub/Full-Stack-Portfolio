import { motion } from "framer-motion";
import {
  Globe,
  Database,
  Smartphone,
  Server,
  Cloud,
  Code2,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  techStack: string[];
  icon: React.ReactNode;
};

const services: Service[] = [
  {
    title: "Frontend Development",
    description:
      "Responsive and interactive web applications using modern React ecosystems.",
    techStack: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite", "TypeScript", "Redux", "Bootstrap",],
    icon: <Globe size={30} />,
  },
  {
    title: "Backend Development",
    description:
      "Scalable APIs and server-side applications built with Node.js and Express.",
    techStack: ["Node.js", "Express.js", "JWT", "REST APIs", "supbase"],
    icon: <Server size={30} />,
  },
  {
    title: "Database Design",
    description:
      "Efficient database architecture and optimization for production systems.",
    techStack: ["MongoDB", "Mongoose", "supabase"],
    icon: <Database size={30} />,
  },
  {
    title: "Full Stack Applications",
    description:
      "End-to-end web solutions from UI implementation to deployment.",
    techStack: ["MERN Stack", "Authentication", "CRUD", "Cloudinary", "Stripe", "multirole authentication", "authorization"],
    icon: <Code2 size={30} />,
  },
  {
    title: "Cloud Deployment",
    description:
      "Deployment, monitoring and optimization of production-ready applications.",
    techStack: ["Vercel", ],
    icon: <Cloud size={30} />,
  },
  {
    title: "Mobile Friendly UI",
    description:
      "Mobile-first interfaces ensuring a seamless user experience.",
    techStack: ["Responsive Design", "PWA", "Tailwind"],
    icon: <Smartphone size={30} />,
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-24 px-6 lg:px-16 bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="text-center mb-16">
          <span className="text-cyan-400 font-medium tracking-widest uppercase">
            What I Offer
          </span>

          <h2
            id="services-heading"
            className="text-4xl md:text-5xl font-bold mt-4"
          >
            My Services
          </h2>

          <p className="max-w-2xl mx-auto text-gray-400 mt-4">
            Building modern digital experiences using the MERN stack,
            scalable architecture and clean UI design.
          </p>
        </div>

        {/* Grid */}

        <div
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              role="listitem"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              aria-label={service.title}
              className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 transition-all duration-300 hover:border-cyan-400/40"
            >
              {/* Glow Effect */}

              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />

              <div className="relative z-10">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-6">
                  {service.icon}
                </div>

                <h3 className="text-2xl font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}