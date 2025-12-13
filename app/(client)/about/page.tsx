"use client";

import React from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about-section"
      className="bg-[#FAF8F4] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <p className="text-xs tracking-[0.35em] text-gray-500 mb-4">
            WHO WE ARE
          </p>
          <h2 className="text-4xl sm:text-5xl font-poppins font-semibold text-gray-900 leading-tight">
            Crafting Stories in <span className="text-[#C07B56]">Wood</span>,
            <br />
            Culture & Detail
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[420px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                alt="Kaashthkala Interior Craftsmanship"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute -bottom-6 left-6 bg-white px-6 py-4 rounded-2xl shadow-lg">
              <p className="text-xs tracking-wide text-gray-500">ESTABLISHED</p>
              <p className="text-sm font-semibold text-gray-900">
                Rooted in Indian Craft
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-10"
          >
            <p className="text-base leading-relaxed text-gray-700">
              <strong>काष्ठकला</strong> is a collaborative studio of interior
              designers, architects, engineers, and skilled craftsmen — united
              by a shared purpose: to uplift artisans and reinterpret India’s
              traditional craftsmanship through contemporary design
              sensibilities.
            </p>

            <p className="text-base leading-relaxed text-gray-700">
              Our collective experience across design and execution allows us to
              translate ideas into handcrafted furniture, interior artefacts,
              landscape installations, and bespoke spatial elements — each piece
              narrating a story of material, process, and human touch.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 mb-3">
                  WHAT WE DO
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  We collaborate with local artisans and employ techniques such
                  as carving, print‑making, dyeing, welding, and surface
                  explorations — all developed within dedicated workshops under
                  careful design supervision.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
                <h3 className="text-sm font-semibold tracking-wide text-gray-900 mb-3">
                  VISION & MISSION
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  To take Indian craftsmanship global through sustainable,
                  customized, and user‑centric creations across wood, metal,
                  fabric, stone, glass, cane, clay, and mixed media — while
                  preserving the soul of handmade design.
                </p>
              </div>
            </div>

            <div className="pt-8 flex justify-center">
              <a
                href="https://www.instagram.com/kaashthkala?igsh=eXR3dzVodG14c3c0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-4 text-sm font-medium rounded-full bg-gray-900 text-white hover:bg-[#C07B56] transition-all duration-300 shadow-lg"
              >
                <FaInstagram className="text-lg" />
                Follow our journey
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
