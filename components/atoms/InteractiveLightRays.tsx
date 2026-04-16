"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

export const InteractiveLightRays = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerWidth = 1400; 
  const containerHeight = 400; 
  const centerX = containerWidth / 2;
  const centerY = containerHeight;

  const rays = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      angle: (i / 59) * 180 - 180, 
      length: 220 + Math.random() * 280,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div 
      className="relative w-full max-w-[1400px] h-[400px] mx-auto pointer-events-none overflow-hidden"
    >
      <svg 
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {rays.map((ray) => {
          const rad = (ray.angle * Math.PI) / 180;
          // Base straight targets
          const targetX = centerX + Math.cos(rad) * ray.length;
          const targetY = centerY + Math.sin(rad) * ray.length;

          // Dispersion targets (spread further and slightly change angle)
          const disperseLength = ray.length + 50;
          const disperseRad = ((ray.angle + (ray.angle < -90 ? -10 : 10)) * Math.PI) / 180;
          const disperseX = centerX + Math.cos(disperseRad) * disperseLength;
          const disperseY = centerY + Math.sin(disperseRad) * disperseLength;

          return <RayItem 
            key={ray.id} 
            ray={ray} 
            startX={centerX} 
            startY={centerY} 
            targetX={targetX} 
            targetY={targetY} 
            disperseX={disperseX}
            disperseY={disperseY}
            isHovered={isHovered}
          />;
        })}

        <circle cx={centerX} cy={centerY} r="60" fill="url(#centralGlow)" opacity="0.4" />
        <defs>
          <radialGradient id="centralGlow">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      
      <div 
        className="absolute inset-0 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
};

const RayItem = ({ ray, startX, startY, targetX, targetY, disperseX, disperseY, isHovered }: any) => {
  // Use current target based on hover state
  const currentEndX = isHovered ? disperseX : targetX;
  const currentEndY = isHovered ? disperseY : targetY;

  const midX = (startX + currentEndX) / 2;
  const midY = (startY + currentEndY) / 2;

  return (
    <>
      <motion.path
        // Removed the wavy distortion. Now it just animates between base and dispersed straight lines.
        d={`M ${startX} ${startY} Q ${midX} ${midY} ${currentEndX} ${currentEndY}`}
        animate={isHovered ? {} : {
          // Subtle swaying motion in non-hover state
          d: [
            `M ${startX} ${startY} Q ${midX - 5} ${midY + 5} ${currentEndX} ${currentEndY}`,
            `M ${startX} ${startY} Q ${midX + 5} ${midY - 5} ${currentEndX} ${currentEndY}`,
            `M ${startX} ${startY} Q ${midX - 5} ${midY + 5} ${currentEndX} ${currentEndY}`,
          ]
        }}
        transition={{
          d: isHovered 
            ? { type: "spring", stiffness: 45, damping: 12 } 
            : { duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" },
          strokeOpacity: { duration: 0.3 }
        }}
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity={isHovered ? 0.6 : 0.25}
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      
      <motion.circle
        cx={currentEndX}
        cy={currentEndY}
        initial={false}
        animate={{
          cx: currentEndX,
          cy: currentEndY,
          r: isHovered ? 3.5 : 2,
          opacity: isHovered ? 0.9 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 45,
          damping: 12,
        }}
        fill="#FFFFFF"
        filter="url(#glow)"
      />
    </>
  );
};
