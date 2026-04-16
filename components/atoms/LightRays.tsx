"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface LightRaysProps {
  intensity?: number;
}

export const LightRays: React.FC<LightRaysProps> = ({ intensity = 0.5 }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Expanded rays for a 180-degree spread (-90 to 90)
  const rays = [
    { angle: -90, delay: 0.1 },
    { angle: -75, delay: 0.3 },
    { angle: -60, delay: 0 },
    { angle: -45, delay: 0.4 },
    { angle: -30, delay: 0.2 },
    { angle: -15, delay: 0.5 },
    { angle: 0, delay: 0.1 },
    { angle: 15, delay: 0.3 },
    { angle: 30, delay: 0.05 },
    { angle: 45, delay: 0.4 },
    { angle: 60, delay: 0.2 },
    { angle: 75, delay: 0.6 },
    { angle: 90, delay: 0.15 },
  ];

  return (
    <div 
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[400px] pointer-events-none overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex items-end justify-center">
        {rays.map((ray, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ 
              opacity: isHovered ? intensity * 3.5 : intensity, // Even stronger intensity on hover
              scaleY: isHovered ? 1.2 : 1,
            }}
            transition={{
              duration: 2.5,
              delay: ray.delay,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              bottom: 0,
              width: "10px", // Slightly wider for more impact
              height: "800px",
              background: "linear-gradient(to top, rgba(255,255,255,0.8), rgba(255,255,255,0))",
              transformOrigin: "bottom center",
              rotate: `${ray.angle}deg`,
              filter: "blur(20px)", // More blur for softer, bigger rays
            }}
          />
        ))}
        
        {/* Central glow base */}
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1.2,
            opacity: isHovered ? 1.0 : 0.6,
          }}
          className="absolute bottom-[-100px] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
    </div>
  );
};
