"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, when: "beforeChildren" },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.995 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  hover: { scale: 1.03, transition: { duration: 0.25 } },
};

export default function Hero() {
  return (
    <section className="pt-16 pb-12">
      <motion.div
        className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div variants={item}>
          <motion.h1
            className="text-4xl lg:text-5xl font-heading leading-tight"
            variants={item}
          >
            Modern craft. Curated furniture & interiors.
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-gray-700 max-w-prose"
            variants={item}
          >
            Handcrafted furniture with a focus on material, detail and
            timelessness. Explore the collection or book a consultation.
          </motion.p>

          <motion.div className="mt-8 flex flex-wrap gap-3" variants={item}>
            <motion.a
              href="#product"
              className="px-5 py-3 rounded-md bg-accent text-white inline-block"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              Shop Collection
            </motion.a>

            <motion.a
              href="#contact"
              className="px-5 py-3 rounded-md border border-border inline-block"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
            >
              Book Consultation
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div className="hidden lg:block" variants={item}>
          <motion.div
            className="w-full h-72 bg-secondary rounded-lg border border-border flex items-center justify-center overflow-hidden"
            variants={imageVariants}
            initial="hidden"
            animate="show"
            whileHover="hover"
          >
            <span className="text-primary/50">Hero image</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
