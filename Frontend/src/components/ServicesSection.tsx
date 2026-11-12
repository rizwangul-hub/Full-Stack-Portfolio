import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Database,
  Smartphone,
  Server,
  Code2,
  Plus,
  Edit3,
  Trash2,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { portfolioAPI } from "../services/api";
import ServiceModal from "./ServiceModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import toast from "react-hot-toast";

type ServiceItem = {
  _id?: string;
  title: string;
  description: string;
  techStack: string[];
  iconName?: string;
};

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe size={30} />,
  Server: <Server size={30} />,
  Database: <Database size={30} />,
  Code2: <Code2 size={30} />,
  Smartphone: <Smartphone size={30} />,
};

const defaultServices: ServiceItem[] = [
  {
    title: "Frontend Development",
    description:
      "Responsive and interactive web applications using modern React ecosystems.",
    techStack: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite", "TypeScript", "Redux", "Bootstrap"],
    iconName: "Globe",
  },
  {
    title: "Backend Development",
    description:
      "Scalable APIs and server-side applications built with Node.js and Express.",
    techStack: ["Node.js", "Express.js", "JWT", "REST APIs", "Supabase"],
    iconName: "Server",
  },
  {
    title: "Database Design",
    description:
      "Efficient database architecture and optimization for production systems.",
    techStack: ["MongoDB", "Mongoose", "Supabase"],
    iconName: "Database",
  },
  {
    title: "Full Stack Applications",
    description:
      "End-to-end web solutions from UI implementation to deployment.",
    techStack: ["MERN Stack", "Authentication", "CRUD", "Cloudinary", "Stripe", "multirole authentication", "authorization"],
    iconName: "Code2",
  },
  {
    title: "React Native App Applications",
    description:
      "Cross-platform mobile applications with modern UI, smooth performance, and native-like experience.",
    techStack: ["React Native", "Expo", "Firebase", "REST APIs", "Authentication"],
    iconName: "Smartphone",
  },
  {
    title: "Mobile Friendly UI",
    description:
      "Mobile-first interfaces ensuring a seamless user experience.",
    techStack: ["Responsive Design", "PWA", "Tailwind"],
    iconName: "Smartphone",
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
  const { isAdmin } = useAdmin();
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceItem | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await portfolioAPI.getPortfolio();
      if (res.data.success && res.data.data.services?.length > 0) {
        setServices(res.data.data.services);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenAdd = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete?._id) return;
    setDeleteLoading(true);
    try {
      const res = await portfolioAPI.deleteService(serviceToDelete._id);
      if (res.data.success) {
        toast.success("Service deleted.");
        setServiceToDelete(null);
        fetchServices();
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete service.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-24 px-6 lg:px-16 bg-transparent text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
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

          {isAdmin && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20 cursor-pointer text-sm"
              >
                <Plus size={16} />
                Add Service
              </button>
            </div>
          )}
        </div>

        {/* Grid */}
        <div
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.article
              key={service._id || service.title}
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
              className="group relative rounded-3xl border border-cyan-400/20 bg-[#0b0f24] shadow-2xl p-8 transition-all duration-300 hover:border-cyan-400/50"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />

              {isAdmin && service._id && (
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(service)}
                    className="p-2 rounded-full bg-black/70 border border-zinc-800 text-cyan-400 hover:text-white hover:bg-indigo-600 transition-all cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => setServiceToDelete(service)}
                    className="p-2 rounded-full bg-black/70 border border-zinc-800 text-red-400 hover:text-white hover:bg-red-600 transition-all cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              <div className="relative z-10">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 mb-6">
                  {iconMap[service.iconName || "Globe"] || <Globe size={30} />}
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

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
        onSaved={fetchServices}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(serviceToDelete)}
        onClose={() => setServiceToDelete(null)}
        onConfirm={handleConfirmDelete}
        projectName={serviceToDelete?.title || "this service"}
        loading={deleteLoading}
      />
    </section>
  );
}