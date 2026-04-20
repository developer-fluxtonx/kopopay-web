import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  panelClassName?: string;
  bodyClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  panelClassName = "",
  bodyClassName = "",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full bg-white dark:bg-[#011B3B] rounded-2xl shadow-2xl overflow-hidden border border-black/10 dark:border-white/10 ${panelClassName}`}
          >
            <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-black/20">
              {title && <h3 className="font-semibold text-lg">{title}</h3>}
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 opacity-60 hover:opacity-100" />
              </button>
            </div>
            <div className={`p-6 ${bodyClassName}`}>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
