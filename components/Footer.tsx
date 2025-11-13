"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-white mt-12">
     
      <div className="max-w-6xl mx-auto border-t border-[#d18a42]" />

   
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
       
        <div className="md:col-span-1">
          <h3 className="text-[27px] font-bold text-gray-900 mb-4 -mt-4">
            Sign up for our newsletter
          </h3>
          <p className="text-[9px] text-gray-600 mb-4">
            Be the first to know about our special offers, news, and updates.
          </p>

          
          <form className="flex items-center space-x-2 w-full max-w-sm mt-10">
            <Input
              type="email"
              placeholder="Email Address"
              className="flex-grow border-[#d18a42] focus-visible:ring-0 focus-visible:border-[#d18a42] rounded-full text-sm"
            />
            <Button
              type="submit"
              variant="ghost"
              className="border border-[#d18a42] rounded-full text-black hover:text-[#d18a42] transition-colors"
            >
              Sign Up
            </Button>
          </form>
        </div>

       
        <div className="ml-40">
          <h4 className="font-semibold text-black mb-3">Lorem Ipsum</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
          </ul>
        </div>

        <div className="ml-30">
          <h4 className="font-semibold text-black mb-3">Lorem Ipsum</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
          </ul>
        </div>

        <div className="ml-20">
          <h4 className="font-semibold text-black mb-3">Lorem Ipsum</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
            <li>Lorem</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
