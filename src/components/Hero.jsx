import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import heroImg from "../assets/image/about.png";

export default function Hero() {
  return (
    <div
      id="home"
      className="min-h-[93vh] flex flex-col lg:flex-row items-center justify-between px-[8%] gap-10 overflow-hidden"
    >
      {/* LEFT SIDE */}
      <div className="left flex-1">
        {/* Hi I am */}
        <motion.h3
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-slate-400 text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px]"
        >
          Hi, I am
        </motion.h3>

        {/* Name */}
        <motion.h2
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sky-400 text-[35px] sm:text-[42px] md:text-[50px] lg:text-[58px] font-bold"
        >
          Rizwan Ullah
        </motion.h2>

        {/* Skills */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-pink-500 text-[28px] sm:text-[38px] md:text-[50px] lg:text-[68px] font-bold mt-4 md:ml-[50px] min-h-[90px]"
        >
          <TypeAnimation
            sequence={[
              "MERN Stack Developer",
              1500,
              "",
              500,
              "Full Stack Developer",
              1500,
              "",
              500,
              "Creative Designer",
              1500,
              "",
              500,
            ]}
            speed={50}
            deletionSpeed={70}
            repeat={Infinity}
            cursor={true}
          />
        </motion.h1>

        {/* Buttons */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap gap-4 mt-8"
        >
          <button className="px-7 py-3 rounded-[30px] bg-gradient-to-r from-sky-400 to-green-500 text-slate-900 hover:-translate-y-1 duration-300">
            <a
              href="https://wa.me/923179500901?text=Hello%20Rizwan%2C%20I%20would%20like%20to%20hire%20you%20for%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
            >
              Hire Me
            </a>
          </button>

          <button className="px-7 py-3 rounded-[30px] border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900 duration-300">
            <a
              href="/src/assets/image/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check My CV
            </a>
          </button>
        </motion.div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -20, 0],
        }}
        transition={{
          opacity: { duration: 1.5 },
          scale: { duration: 1.2 },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="flex-1 flex justify-center"
      >
        <div className="animated-border">
          <img
            src={heroImg}
            alt="Rizwan"
            className="w-[280px] sm:w-[350px] md:w-[420px] lg:w-[600px]  object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
