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
    <div className="h-screen w-full bg-white font-['Inter'] text-gray-800 overflow-hidden flex flex-col">
      
    
      <div className="overflow-hidden flex-shrink-0 h-[calc(100vh-160px)]">
        <ProductMasonry />
      </div>

     <div className="w-full  bg-[#d18a42] px-4 py-1 text-center">
  <span className="text-black text-sm tracking-wide">
    © {new Date().getFullYear()} KK Interiors. All rights reserved.
  </span>
</div>

    </div>
  );
};

export default Page;
