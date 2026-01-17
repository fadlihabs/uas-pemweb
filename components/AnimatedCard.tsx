import { motion } from "framer-motion";
import React from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className={`
        ${className}
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-2xl
        p-8
        shadow-xl
        cursor-pointer
        hover:shadow-2xl
        hover:border-indigo-300/40
        transition-all
      `}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
