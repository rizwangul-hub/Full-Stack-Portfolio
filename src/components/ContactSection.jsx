import React from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import { FiMail, FiMessageSquare, FiMapPin } from "react-icons/fi";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative bg-[#050510] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background blurs */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Get In{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Have a project in mind, looking for a collaboration, or just want to connect? Send a message and let's build something exceptional.
          </p>
        </motion.div>

        {/* Section Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Direct Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 text-left space-y-8"
          >
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white tracking-wide">
                Contact Information
              </h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Prefer direct communication? Reach out via email or connect through my social profiles.
              </p>
            </div>

            <div className="space-y-6">
              {/* Direct Email Card */}
              <div className="flex gap-4 p-4 rounded-xl bg-zinc-950/20 border border-zinc-900/80 backdrop-blur-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-indigo-400">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">Email Address</span>
                  <a
                    href="mailto:rizwangul535@gmail.com"
                    className="text-sm font-medium text-white hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    rizwangul535@gmail.com
                  </a>
                </div>
              </div>

              {/* Chat Card */}
              <div className="flex gap-4 p-4 rounded-xl bg-zinc-950/20 border border-zinc-900/80 backdrop-blur-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-purple-400">
                  <FiMessageSquare className="w-5 h-5" />
                </div>
                <div>
  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">
    Live Chat
  </span>
  <a
    href="https://wa.me/923179500901"
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm font-medium text-white hover:text-green-400 transition-colors"
  >
    Chat with me on WhatsApp
  </a>
</div>
              </div>

              {/* Location Card */}
              <div className="flex gap-4 p-4 rounded-xl bg-zinc-950/20 border border-zinc-900/80 backdrop-blur-sm">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 text-blue-400">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">
    Location
  </span>
  <p className="text-sm font-medium text-white">
    Peshawar, KPK, Pakistan (GMT+5)
  </p>
</div>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
