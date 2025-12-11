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
      className="w-full mb-0 block rounded-none overflow-hidden bg-transparent shadow-none border-0"
      style={
        {
          breakInside: "avoid",
          position:"relative",
      
          borderColor: "rgba(16,24,40,0.14)",
        } as React.CSSProperties
      }
      whileHover={{
        scale: 1.22,
        y: -4,
        boxShadow: "0 12px 30px rgba(16,24,40,0.12)",
      }}
      whileTap={{
        scale: 1.08,
        y: -2,
        boxShadow: "0 8px 18px rgba(16,24,40,0.10)",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      role="button"
      tabIndex={0}
    >
      <div className="w-full">
    <motion.div initial={{ filter: "grayscale(1)" }} whileHover={{ filter: "grayscale(0)" }}>
  <Image
    src={image}
    alt={title}
    width={400}
    height={400}
    loading="lazy"
    className="w-[150px] h-[204px] object-fill"
  />
</motion.div>
      </div>
       

      {/* <div className="p-3">
        <h3 className="text-sm font-medium font-heading">{title}</h3>
        {description ? (
          <p className="mt-1 text-xs text-primary/70">{description}</p>
        ) : null}
        {typeof price === "number" ? (
          <div className="mt-2 text-sm font-semibold">
            ₹ {price.toLocaleString()}
          </div>
        ) : null}
      </div> */}
    </motion.article>
  );
};

export default ProductCard;
