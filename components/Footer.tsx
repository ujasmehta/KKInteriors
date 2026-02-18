"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

 return (
  <footer className="w-full bg-white border-t border-gray-200 mt-16">
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Brand Info */}
        <div>
          <h2 className="text-lg font-semibold text-[#2F6B54]">
            KK Interiors
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-sm">
            Creating elegant and timeless interiors with quality craftsmanship
            and thoughtful design.
          </p>
        </div>

      <div className="w-full border-t border-[#d18a42]/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            {year && <>© {year} Kaashthkala </>}
          </p>

          <form className="mt-4 flex max-w-sm">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-r-none h-10"
            />
            <Button
              type="submit"
              className="rounded-l-none h-10 text-white bg-[#2F6B54] hover:bg-[#1f4d3a] cursor-pointer"
            >
              Subscribe
            </Button>
          </form>
        </div>

      </div>
    </div>

    {/* Bottom Section */}
    <div className="border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          {year && <>© {year} KK Interiors. All rights reserved.</>}
        </p>

        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#privacy" className="hover:text-[#2F6B54]">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-[#2F6B54]">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
);

};

export default Footer;
