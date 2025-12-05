"use client";

import React from "react";
import { motion } from "framer-motion";

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
  return (
    <motion.article
      layout
      className="w-full mb-0 block rounded-lg overflow-hidden bg-white shadow-md border border-gray-200"
      style={{ breakInside: "avoid" } as React.CSSProperties}
      whileHover={{
        y: -6,
        rotate: -1,
        scale: 1.02,
        boxShadow: "0 12px 30px rgba(16,24,40,0.08)",
      }}
      whileTap={{
        y: -3,
        rotate: -0.5,
        scale: 0.995,
        boxShadow: "0 8px 18px rgba(16,24,40,0.08)",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      role="button"
      tabIndex={0}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-64 object-contain transition-transform duration-500 hover:scale-110"
        />
        {category && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
            {category}
          </span>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>

        {description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-3">
            {description}
          </p>
        )}

        {price !== undefined && (
          <p className="text-[#d18a42] font-bold text-md mb-2">₹{price}</p>
        )}

        {collection && (
          <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
            {collection}
          </span>
        )}
      </div>
    </motion.article>
  );
};

export default CatalogueProductCard;
