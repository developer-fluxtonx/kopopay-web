"use client";

import React from "react";
import { motion } from "framer-motion";

export const GlobalBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#F2FCFC] dark:bg-[#000E22]">
      {/* Light Greenish Wash behind grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D8F4F7]/40 via-transparent to-transparent dark:from-[#01253D]/40 dark:via-transparent to-transparent z-0" />

      {/* 3D Dotted Grid - Using more greenish color #14C9C1 */}
      <div className="absolute inset-0 flex items-start justify-center z-0" style={{ perspective: "1000px" }}>
        <motion.div
          animate={{
            backgroundPositionY: ["0px", "60px"],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
          className="w-[200vw] h-[150vh] opacity-[0.25] dark:opacity-[0.35]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' fill='%2314C9C1'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
            transformOrigin: "top center",
            transform: "rotateX(60deg) translateZ(-200px) translateY(-10%)",
          }}
        />
      </div>

      {/* Subtle radial glow to soften the edges into the solid background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(242,252,252,0.8)_80%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,14,34,0.9)_80%)] z-10" />

      {/* Bottom fade out for pages */}
      <div className="absolute bottom-0 inset-x-0 h-[40vh] bg-gradient-to-t from-[#F2FCFC] dark:from-[#000E22] to-transparent z-10" />
    </div>
  );
};
