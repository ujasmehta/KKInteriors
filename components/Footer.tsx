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
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px w-full bg-[#2F6B54]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Sign up for our newsletter
            </h3>
            <p className="mt-2 text-xs text-gray-600 max-w-xs">
              Be the first to hear about our special offers, news, and launches.
            </p>

            <form className="mt-6 flex border border-[#d18a42]/40 rounded-full p-1 max-w-xs">
              <Input
                type="email"
                placeholder="Email address"
                className="flex-grow border-none focus-visible:ring-0 text-sm h-10"
              />
              <Button
                type="submit"
                className="h-10 px-5 rounded-full bg-[#2F6B54] text-white text-sm hover:bg-[#144130] transition-all"
              >
                Sign up
              </Button>
            </form>
          </div>

          <div className="lg:col-span-3 grid grid-cols-3 gap-8">
            {["Column", "Column", "Column"].map((title, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-semibold uppercase text-gray-700">
                  {title}
                </h4>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {["Lorem", "Ipsum", "Dolor", "Sit"].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="hover:text-[#123527] transition-colors"
                      >
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

      <div className="w-full border-t border-[#d18a42]/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            {year && <>© {year} KK Interiors</>}
          </p>

          <div className="flex gap-4 text-xs">
            <a
              href="#privacy"
              className="text-gray-500 hover:text-[#d18a42] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-gray-500 hover:text-[#d18a42] transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
