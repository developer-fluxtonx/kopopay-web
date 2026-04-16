"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollProgressRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  // New props for finer control
  opacityRange?: [number, number, number, number];
  opacityOutput?: [number, number, number, number];
  yRange?: [number, number, number, number];
}

export const ScrollProgressReveal: React.FC<ScrollProgressRevealProps> = ({
  children,
  className = "",
  direction = "up",
  distance = 50,
  opacityRange = [0, 0.3, 0.6, 1],
  opacityOutput = [0, 1, 1, 0],
  yRange = [0, 0.45, 0.55, 1],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of this specific element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress (0 to 1) to animation values
  const opacity = useTransform(scrollYProgress, opacityRange, opacityOutput);
  
  const rawY = useTransform(
    scrollYProgress, 
    yRange, 
    [direction === "up" ? distance : -distance, 0, 0, direction === "up" ? -distance : distance]
  );
  
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [
        direction === "left" ? distance : direction === "right" ? -distance : 0,
        0,
        0,
        direction === "left" ? -distance : direction === "right" ? distance : 0
    ]
  );

  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.92, 1, 1, 0.92]);

  // Use springs for a high-end "weighted" feel
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothOpacity = useSpring(opacity, springConfig);
  const smoothY = useSpring(rawY, springConfig);
  const smoothX = useSpring(rawX, springConfig);
  const smoothScale = useSpring(scale, springConfig);

  return (
    <motion.div
      ref={containerRef}
      style={{
        opacity: smoothOpacity,
        y: smoothY,
        x: smoothX,
        scale: smoothScale,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
