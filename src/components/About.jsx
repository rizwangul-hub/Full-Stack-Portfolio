import { motion } from "framer-motion";
import AboutImage from "../assets/image/About image.jpeg";

import "../index.css";
import { AnimatedParagraph } from "@/animation/AnimatedParagraph";

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#050510] py-[100px] px-5 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-[50px]">
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center"
        >
          <div className="relative w-[360px] h-[360px] rounded-[25px] flex justify-center items-center overflow-hidden animated-border-box">
            <div className="relative w-[90%] h-[90%] bg-[#050510] rounded-[20px] z-10 flex justify-center items-center">
              <img
                src={AboutImage}
                alt="About Me"
                className="w-full h-full object-cover rounded-[20px]"
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center md:text-left"
        >
          <h4 className="text-cyan-400 text-[18px] mb-[10px]">About Me</h4>

          <h2 className="text-white text-[36px] font-bold mb-5">
            MERN Stack Developer
          </h2>

          <AnimatedParagraph
            text="I am a passionate MERN Stack Developer specializing in building modern, responsive, and scalable web applications. With expertise in MongoDB, Express.js, React.js, and Node.js, I transform ideas into powerful digital solutions that deliver exceptional user experiences.I enjoy creating full_stack applications such as AI_powered platforms, SaaS products, management systems, e_commerce websites, portfolios, dashboards, and custom business solutions. My focus is on writing clean, maintainable code, optimizing performance, and designing intuitive interfaces that users love.I am constantly exploring new technologies and AI innovations to build smarter, faster, and more impactful web applications that solve real-world problems.
"
            className="max-w-[600px] text-gray-400 leading-8"
          />

          {/* INFO BOXES */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-[#0a0a1a] p-5 rounded-[15px] text-center"
            >
              <h3 className="text-cyan-400 text-[28px] font-bold">1+</h3>
              <span className="text-gray-400 text-[14px]">
                Years Experience
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-[#0a0a1a] p-5 rounded-[15px] text-center"
            >
              <h3 className="text-cyan-400 text-[28px] font-bold">10+</h3>
              <span className="text-gray-400 text-[14px]">
                Projects Completed
              </span>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="bg-[#0a0a1a] p-5 rounded-[15px] text-center"
            >
              <h3 className="text-cyan-400 text-[28px] font-bold">100%</h3>
              <span className="text-gray-400 text-[14px]">Passion</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
