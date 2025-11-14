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
    <footer className="w-full bg-white pt-12">
      {/* Horizontal Line */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px w-full bg-[#d18a42]/60" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-800">
              Sign up for our newsletter
            </h3>
            <p className="mt-2 text-[10px] text-gray-600 max-w-xs">
              Be the first to hear about our special offers, news, and launches.
            </p>

            {/* Newsletter Input/Form */}
            <form className="mt-6 flex border border-primary/20 rounded-lg p-1 max-w-xs">
              <Input
                type="email"
                placeholder="Email address"
                className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-10"
              />
              <Button
                type="submit"
                variant="ghost"
                className="text-sm text-primary/70 hover:text-accent font-normal h-10"
              >
                Sign up
              </Button>
            </form>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-3 grid grid-cols-3 gap-8">
            {["Column ", "Column ", "Column "].map((title, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-semibold uppercase text-gray-700">{title}</h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {["Lorem", "Ipsum", "Dolor", "Sit"].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-accent transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Copyright / Links */}
      <div className="w-full border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-primary/50">
            {year && <>© {year} KK Interiors</>}
          </div>
          <div className="flex gap-4 text-xs">
            <a href="#privacy" className="text-primary/50 hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-primary/50 hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
