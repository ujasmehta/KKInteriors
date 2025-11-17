"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Hero from "@/components/Hero";
import ProductDetail from "@/components/ProductDetail";
import ProductMasonry from "@/components/ProductMasonry";
import ContactUs from "@/components/ContactUs";
import ContactPage from "./contact/page";

const Page = () => {
  return (
    <div className="min-h-screen bg-white font-['Inter'] text-gray-800 overflow-x-hidden">
      <ProductMasonry />

      <main
        id="about-section"
        className="max-w-4xl mx-auto px-4 py-16 sm:py-24"
      >
        <h2 className="text-3xl sm:text-4xl font-poppins text-black tracking-widest text-center mb-10 sm:mb-16 uppercase">
          ABOUT US
        </h2>

        <div className="mx-auto w-full max-w-4xl h-64 sm:h-70 border border-gray-300 rounded-lg mb-10 sm:mb-16 shadow-inner bg-gray-300 flex items-center justify-center">
          <span className="text-gray-400 text-lg font-light">
            Content / Image Placeholder
          </span>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Nam ante euiusmod eu semper
            neque. Tempor magna vitae auctor magna neque varius vitae donec. In
            dignissim molestie sed pharetra ac vulputate massa nisl et.
            Adipiscing pellentesque nec viverra gravida lectus non sit netus
            vitus. Aliquam ullamcorper felis nibh viverra id ut elementum quis.
            Vel iaculis vitae ornare ac pellentesque nec elementum. Duis pretium
            massa vel molestie auctor massa vel efficitur. Vitae ne porta
            faucibus ut. Non nec lacus vel tibulum morbi vestibulum massa.
          </p>
        </div>
      </main>

      <Hero />
      <ProductDetail />

      <ContactPage />
    </div>
  );
};

export default Page;
