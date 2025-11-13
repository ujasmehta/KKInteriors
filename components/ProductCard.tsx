"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  image: string;
  price?: number;
  description?: string;
}

const Card = ({ title, image, price, description }: ProductCardProps) => {
  return (
    <motion.article
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      className="inline-block w-full mb-4 rounded-md overflow-hidden bg-white shadow-sm"
      style={{ breakInside: "avoid" }}
    >
      <div className="w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-cover block"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium font-heading">{title}</h3>
        {description ? (
          <p className="mt-1 text-xs text-primary/70">{description}</p>
        ) : null}
        {price ? (
          <div className="mt-2 text-sm font-semibold">
            ₹ {price.toLocaleString()}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
};

export default Card;
