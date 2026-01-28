"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  title: string;
  image: string;
  price?: number;
  description?: string;
  category?: string;
  collection?: string;
}

const CatalogueProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  price,
  description,
  category,
  collection,
}) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  return (
    <>
      {/* Product Card */}
      <motion.article
        layout
        className="w-full mb-0 block rounded-lg overflow-hidden bg-white shadow-md border border-gray-200"
        style={{ breakInside: "avoid" } as React.CSSProperties}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          className="relative overflow-hidden cursor-zoom-in"
          onClick={() => setIsZoomOpen(true)}
        >
          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-64 object-contain"
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />

          {category && (
            <span className="absolute top-3 left-3 bg-[#d18a42] text-white text-xs px-3 py-1 rounded-full shadow-md">
              {category}
            </span>
          )}
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h2>

          {description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
              {description}
            </p>
          )}

          {price !== undefined && (
            <p className="text-[#d18a42] font-bold text-md mb-2">
              ₹{price}
            </p>
          )}

          {collection && (
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              {collection}
            </span>
          )}
        </div>
      </motion.article>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomOpen(false)}
          >
            <motion.img
              src={image}
              alt={title}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg bg-white p-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Close button */}
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 text-white text-3xl font-bold"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CatalogueProductCard;
