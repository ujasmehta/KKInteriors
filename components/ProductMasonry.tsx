"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion, Variants } from "framer-motion";

type Product = {
  id: string;
  slug?: string;
  title: string;
  price?: number;
  description?: string;
  images: string[];
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function ProductMasonry({ limit }: { limit?: number }) {
  const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  let mounted = true;
  fetch("/api/products")
    .then((r) => r.json())
    .then((data: any[]) => {
      if (!mounted) return;

      
      const list: Product[] = data.map((p) => ({
        id: p._id,
        title: p.title,
        description: p.description,
        price: p.price,
        images: p.images ? [p.images] : [],
      }));

      setProducts(limit ? list.slice(0, limit) : list);
    })
    .catch(() => setProducts([]));

  return () => {
    mounted = false;
  };
}, [limit]);


  const gap = 0; 

  return (
    
    <section className="w-full px-0 py-0">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <div
          className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6"
          style={{
            columnGap: gap,
            perspective: 1200,
            width: "100%",
            overflow: "hidden",
          }}
        >
          {products.map((p) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              layout
              whileHover={{
                y: -6,
                rotate: -1,
                scale: 1.02,
                boxShadow: "0 12px 30px rgba(16,24,40,0.08)",
              }}
              whileTap={{ scale: 0.995 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="group"
              style={
                {
                  breakInside: "avoid",
                  WebkitColumnBreakInside: "avoid",
                  marginBottom: gap, 
                  transformStyle: "preserve-3d",
                } as any
              }
            >
              <ProductCard
                title={p.title}
                image={(p.images && p.images[0]) || "/placeholder.png"}
                price={p.price}
                description={p.description}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      
      <div className="max-w-6xl mx-auto px-4 mt-6">
      
      </div>
    </section>
  );
}