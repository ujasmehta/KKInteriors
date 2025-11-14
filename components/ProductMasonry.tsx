"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion, Variants } from "framer-motion";

type Product = {
  id: number;
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
      .then((data: Product[]) => {
        if (!mounted) return;
        const list = Array.isArray(data) ? data : [];
        setProducts(limit ? list.slice(0, limit) : list);
      })
      .catch(() => {
        setProducts([]);
      });
    return () => {
      mounted = false;
    };
  }, [limit]);

  const gap = 2; // pixels for both horizontal and vertical gap

  return (
    // full-bleed section
    <section className="w-full px-0 py-8">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <div
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4"
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
                  marginBottom: gap, // same as columnGap
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

      {/* optional inner centered area for headings / descriptions */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        {/* e.g. title/CTA centered here when needed */}
      </div>
    </section>
  );
}
