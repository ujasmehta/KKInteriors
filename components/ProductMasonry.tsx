"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion, Variants } from "framer-motion";
import { sanityClient, urlFor } from "@/lib/sanity";

type Product = {
  id: string;
  title: string;
  price?: number;
  description?: string;
  images: string[];
};

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

    async function loadProducts() {
      const query = `*[_type == "piece"]{
        _id,
        title,
        description,
        price,
        image
      }`;

      const data = await sanityClient.fetch(query);

      const formatted: Product[] = data.map((doc: any) => ({
        id: doc._id,
        title: doc.title,
        price: doc.price,
        description: doc.description,
        images: [
          urlFor(doc.image)
            .width(1000)
            .height(1300)
            .fit("crop")
            .auto("format")
            .quality(90)
            .url(),
        ],
      }));

      if (mounted) {
        setProducts(limit ? formatted.slice(0, limit) : formatted);
      }
    }

    loadProducts();
    return () => {
      mounted = false;
    };
  }, [limit]);

  const gap = 10;

  return (
    <section className="w-full px-0 py-8">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <div
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4"
          style={{
            columnGap: gap,
            columnWidth: "180px",
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
              className="group"
              style={{
                breakInside: "avoid",
                marginBottom: gap,
                transformStyle: "preserve-3d",
              }}
            >
              <ProductCard
                title={p.title}
                image={p.images[0]}
                price={p.price}
                description={p.description}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
