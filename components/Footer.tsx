"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-primary/70">
          © {new Date().getFullYear()} KK Interiors
        </div>
        <div className="flex gap-4 text-sm">
          <a href="#privacy" className="hover:text-accent">
            Privacy
          </a>
          <a href="#terms" className="hover:text-accent">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
