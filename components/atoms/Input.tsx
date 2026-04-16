import React from "react";
import { motion } from "framer-motion";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-[#000C22]/80 dark:text-[#D8F4F7]/80">
            {label}
          </label>
        )}
        <motion.div whileTap={{ scale: 0.995 }}>
          <input
            ref={ref}
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-[#011B3B] transition-all
              ${
                error
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-[#000C22]/10 dark:border-[#D8F4F7]/10 focus:border-[#2ACED1] focus:ring-[#2ACED1]/20"
              }
              outline-none focus:ring-4 ${className}`}
            {...props}
          />
        </motion.div>
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";
