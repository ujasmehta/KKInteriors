"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
      className="w-full block bg-transparent shadow-none border-0 rounded-none"
      style={{
        breakInside: "avoid",
        position: "relative",
        borderColor: "rgba(16,24,40,0.14)",
      }}
      whileHover={{
        scale: 1.06,
        y: -2,
        boxShadow: "0 6px 16px rgba(16,24,40,0.12)",
      }}
      whileTap={{
        scale: 1.03,
        y: -1,
        boxShadow: "0 3px 8px rgba(16,24,40,0.10)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      role="button"
      tabIndex={0}
    >
      <motion.div initial={{ filter: "grayscale(1)" }} whileHover={{ filter: "grayscale(0)" }}>
        <div className="w-full flex justify-center items-center">
          <Image
            src={image}
            alt={title}
            width={160}
            height={180}
            loading="eager"
            className="w-[250px] h-[250px] object-contain"
          />
        </div>
      </motion.div>
      {/* Add title/desc/price here if desired */}
    </motion.article>
  );
};

export default ProductCard;