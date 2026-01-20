"use client";

import React, { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import { motion, Variants } from "framer-motion";

type GalleryItem = {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  images: string[];
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
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
  const [items, setItems] = useState<GalleryItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<{ animationFrame?: number }>({});

  // Fetch gallery
  useEffect(() => {
    let mounted = true;

    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data: GalleryItem[]) => {
        if (!mounted) return;
        setItems(limit ? data.slice(0, limit) : data);
      })
      .catch(() => setItems([]));

    return () => {
      mounted = false;
    };
  }, [limit]);

  // Mouse edge scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = -1;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
    };

    const handleMouseLeave = () => {
      mouseX = -1;
    };

    const scroll = () => {
      if (mouseX >= 0) {
        const rect = container.getBoundingClientRect();
        const edgeSize = 150;
        let speed = 0;

        // Scroll right
        if (mouseX > rect.right - edgeSize) {
          speed = ((mouseX - (rect.right - edgeSize)) / edgeSize) * 15;
          container.scrollLeft += speed;
        }
        // Scroll left
        else if (mouseX < rect.left + edgeSize) {
          speed = ((rect.left + edgeSize - mouseX) / edgeSize) * 15;
          container.scrollLeft -= speed;
        }
      }

      scrollRef.current.animationFrame = requestAnimationFrame(scroll);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    scrollRef.current.animationFrame = requestAnimationFrame(scroll);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (scrollRef.current.animationFrame) {
        cancelAnimationFrame(scrollRef.current.animationFrame);
      }
    };
  }, []);

  const gap = 0;

  return (
    <section
      className="w-full overflow-x-auto no-scrollbar overflow-y-visible"
      ref={containerRef}
    >
      <div className="min-w-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div
            className="columns-4 sm: columns-6 md:columns-8 lg:columns-10 xl:columns-12"
            style={{
              columnGap: gap,
              perspective: 1200,
              width: "100%",
              maxHeight: "calc(3 * 250px)",
            }}
          >
            {items.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                whileHover={{
                  scale: 1.16,
                  zIndex: 50,
                  boxShadow: "0 12px 30px rgba(16,24,40,0.10)",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="group relative"
                style={
                  {
                    breakInside: "avoid",
                    marginBottom: gap,
                    position: "relative",
                    zIndex: 1,
                  } as React.CSSProperties
                }
              >
                <ProductCard
                  title={item.title}
                  image={(item.images && item.images[0]) || "/placeholder.png"}
                  description={item.description}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
