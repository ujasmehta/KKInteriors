"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PairedProduct {
  _id: string | number;
  title: string;
  images?: string;
}

interface PairWithProductsProps {
  products: PairedProduct[];
}

const WaveAccent = () => (
  <svg
    className="w-full h-2 my-1"
    viewBox="0 0 100 8"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 4C10 8 20 0 30 4C40 8 50 0 60 4C70 8 80 0 90 4C95 6 100 4"
      stroke="#B8946E"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const PairWithProducts: React.FC<PairWithProductsProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

 
  const visibleProducts = [
    products[currentIndex],
    products[(currentIndex + 1) % products.length],
    products[(currentIndex + 2) % products.length],
  ].filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-20 sm:pt-32 pb-16">
      <h2 className="text-xl font-medium uppercase text-gray-800 mb-2">
        PRODUCTS THIS CAN PAIR WITH
      </h2>
      <WaveAccent />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {visibleProducts.map((product, index) => (
          <motion.div
            key={product._id || index}
            className="w-full h-64 border border-gray-300 rounded-sm bg-gray-50 flex items-center justify-center shadow-md cursor-pointer"
            whileHover={{ scale: 1.05, rotateX: 2, rotateY: 2 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            {product.images ? (
              <img
                src={product.images}
                alt={product.title}
                className="w-full h-full object-cover rounded-sm"
              />
            ) : (
              <span className="text-gray-400 text-lg">{product.title}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PairWithProducts;
