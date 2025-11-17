"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const ContactModal = ({
  open,
  onClose,
  title = "Send Us a Message",
  children,
}: any) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 tracking-wide text-gray-800">
          {title}
        </h2>

        {children}
      </motion.div>
    </div>
  );
};

export default ContactModal;
