import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.01,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function AnimatedParagraph({ text, className = "" }) {
  return (
    <motion.p
      className={`max-w-[600px] break-words ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letter}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.p>
  );
}