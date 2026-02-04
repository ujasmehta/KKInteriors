"use client";

import React, { useEffect } from "react";
import ProductMasonry from "@/components/ProductMasonry";

const Page = () => {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="h-screen w-full bg-white font-['Inter'] text-gray-800 overflow-hidden">
      <div className="h-screen overflow-hidden">
        <ProductMasonry />
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full bg-[#2F6B54] px-4 py-1 text-center z-10">
        <span className="text-white text-sm tracking-wide">
          © {new Date().getFullYear()} Kaashthkala. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Page; 
