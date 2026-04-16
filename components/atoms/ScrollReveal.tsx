"use client";

import React from "react";
import { motion } from "framer-motion";

type Direction = "left" | "right" | "top" | "bottom";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const directionMap = {
  left:   { x: -60, y: 0 },
  right:  { x: 60,  y: 0 },
  top:    { x: 0,   y: -60 },
  bottom: { x: 0,   y: 60 },
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "bottom",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}) => {
  const offset = directionMap[direction];

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth deceleration
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
