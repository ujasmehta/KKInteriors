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
      
      className="w-full mb-0 block rounded-none overflow-hidden bg-transparent shadow-none border-0"
      style={
        {
          breakInside: "avoid",
          borderColor: "rgba(16,24,40,0.14)",
        } as React.CSSProperties
      }
      
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
      <div className="w-full">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
         
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            objectFit:"cover",
            margin:"0 ",
            willChange: "filter, transform",
            border: "1px solid black",
          }}
          
          initial={{ filter: "grayscale(1)" }}
          whileHover={{ filter: "grayscale(0)" }}
          whileTap={{ filter: "grayscale(0)" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="object-cover block"
        />
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