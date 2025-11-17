"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  image: string;
  price?: number;
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  price,
  description,
}) => {
  return (
    <motion.article
      layout
      className="w-full block rounded-md overflow-hidden bg-white border border-gray-200"
      style={{ breakInside: "avoid" }}
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {/* Small compact aspect ratio */}
      <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
          initial={{ filter: "grayscale(1)" }}
          whileHover={{ filter: "grayscale(0)" }}
          transition={{ duration: 0.25 }}
        />
      </div>

      <div className="p-2">
        <h3 className="text-sm font-semibold">{title}</h3>

        {description && (
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {description}
          </p>
        )}

        {typeof price === "number" && (
          <div className="mt-1 text-sm font-bold text-gray-900">
            ₹ {price.toLocaleString()}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ProductCard;
