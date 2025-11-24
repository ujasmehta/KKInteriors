"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Hero from "@/components/Hero";
import ProductDetail from "@/components/ProductDetail";
import ProductMasonry from "@/components/ProductMasonry";
import ContactUs from "@/components/ContactUs";
import ContactPage from "./contact/page";
import AboutSection from "@/components/AboutSection";

const Page = () => {
  return (
    <div className="min-h-screen bg-white font-['Inter'] text-gray-800 overflow-x-hidden">
      <ProductMasonry />

      <AboutSection />

      <Hero />
      <ProductDetail />

      <ContactPage />
    </div>
  );
};

export default Page;
