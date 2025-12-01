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
      <div className="w-full h-[2px] bg-orange-500" />
      <div className="flex-1 overflow-hidden">
        <ProductMasonry />
      </div>
    </div>
  );
};

export default Page;
