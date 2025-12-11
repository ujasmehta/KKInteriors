"use client";

import React from "react";
import Hero from "@/components/Hero";
import ProductDetail from "@/components/ProductDetail";
import ProductMasonry from "@/components/ProductMasonry";
import ContactPage from "../contact/page";
import AboutSection from "../about/page";

const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <section className="py-12">
        <ProductMasonry />
      </section>

      <section className="-mt-30">
        <AboutSection />
      </section>

      <Hero />
      <ProductDetail />

      <section className="mt-20">
        <ContactPage />
      </section>
    </div>
  );
};

export default ExplorePage;
