"use client";

import React, { useEffect, useState, useRef } from "react";
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
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<{ animationFrame?: number }>({});

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let mouseX = -1;
    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; };
    const handleMouseLeave = () => { mouseX = -1; };
    const scroll = () => {
      if (mouseX >= 0) {
        const rect = container.getBoundingClientRect();
        const edgeSize = 150;
        let speed = 0;
        if (mouseX > rect.right - edgeSize)
          speed = ((mouseX - (rect.right - edgeSize)) / edgeSize) * 15, container.scrollLeft += speed;
        else if (mouseX < rect.left + edgeSize)
          speed = ((rect.left + edgeSize - mouseX) / edgeSize) * 15, container.scrollLeft -= speed;
      }
      scrollRef.current.animationFrame = requestAnimationFrame(scroll);
    };
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    scrollRef.current.animationFrame = requestAnimationFrame(scroll);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (scrollRef.current.animationFrame) cancelAnimationFrame(scrollRef.current.animationFrame);
    };
  }, []);

  const HEADER_HEIGHT = 72;
  const GREEN_LINE_HEIGHT = 4;
  const GALLERY_BOTTOM_PADDING = 16;
  const HOVER_SCALE_EXTRA = 28; // px (adjust for scale and shadow)
  const GRID_HEIGHT = `calc(100vh - ${HEADER_HEIGHT + GREEN_LINE_HEIGHT + GALLERY_BOTTOM_PADDING + HOVER_SCALE_EXTRA}px)`;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white font-['Inter'] text-gray-800">
      {/* Masonry Gallery */}
      <section
        className="w-full overflow-x-auto no-scrollbar overflow-y-visible"
        ref={containerRef}
        style={{ paddingBottom: GALLERY_BOTTOM_PADDING + GREEN_LINE_HEIGHT + HOVER_SCALE_EXTRA }}
      >
        <div className="min-w-max py-4">
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <div
              className="
                grid
                grid-rows-2
                grid-flow-col
                auto-cols-[minmax(0,_10rem)]
                gap-0
                w-full
              "
              style={{
                height: GRID_HEIGHT,
                maxHeight: GRID_HEIGHT,
                minHeight: GRID_HEIGHT,
                overflow: "visible",
              }}
            >
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{
                    scale: 1.08,
                    zIndex: 900,
                    boxShadow: "0 12px 30px rgba(16,24,40,0.10)",
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="group relative flex items-stretch justify-stretch aspect-square w-full h-full"
                  style={{
                    zIndex: hovered === item.id ? 900 : 800,
                  }}
                >
                  <img
                    src={(item.images && item.images[0]) || "/placeholder.png"}
                    alt="Gallery image"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 block"
                    style={{
                      margin: 0,
                      padding: 0,
                      display: "block",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Fixed thin green line footer - 1/3 width, centered. z-[1000]: always above gallery */}
      <div className="fixed left-0 right-0 bottom-0 flex justify-center pointer-events-none z-[1000]">
        <div className="bg-[#2F6B54] h-1 w-1/3 rounded"></div>
      </div>
    </div>
  );
}