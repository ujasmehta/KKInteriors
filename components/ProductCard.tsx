"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  image: string;
  price?: number;
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, price, description }) => {
  return (
    <motion.article
      layout
      className="inline-block w-full mb-4 rounded-md overflow-hidden bg-white shadow-sm group"
      style={{ breakInside: "avoid" }}
    >
      <div className="w-full">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-auto object-cover block filter grayscale group-hover:grayscale-0 hover:grayscale-0 transition duration-300 ease-out"
          style={{ willChange: "filter, transform" }}
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium font-heading">{title}</h3>
        {description ? <p className="mt-1 text-xs text-primary/70">{description}</p> : null}
        {typeof price === "number" ? (
          <div className="mt-2 text-sm font-semibold">₹ {price.toLocaleString()}</div>
        ) : null}
      </div>
    </motion.article>
  );
};

export default ProductCard;
