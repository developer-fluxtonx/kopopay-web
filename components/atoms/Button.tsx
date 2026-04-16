import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "action" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    let variantStyles = "";
    if (variant === "primary") {
      variantStyles = "bg-gradient-primary-button text-white shadow-lg hover:shadow-xl";
    } else if (variant === "action") {
      variantStyles = "bg-gradient-action-button text-white shadow-md hover:shadow-lg";
    } else if (variant === "secondary") {
      variantStyles = "bg-[#D8F4F7] text-[#000C22] hover:bg-[#DCFCFF]";
    } else if (variant === "outline") {
      variantStyles = "border border-[#000C22]/20 text-[#000C22] dark:border-white/20 dark:text-white hover:bg-black/5 dark:hover:bg-white/5";
    }

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-8 py-3.5 text-lg font-medium",
    }[size];

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center justify-center rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-[#2ACED1] focus:ring-offset-2 ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
