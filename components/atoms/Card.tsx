import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface CardProps extends HTMLMotionProps<"div"> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white dark:bg-[#000C22]/90 backdrop-blur-md rounded-2xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";
