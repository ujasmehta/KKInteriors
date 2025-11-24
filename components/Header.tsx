"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const routeLabelMap: Record<string, string> = {
    "/": "HOME",
    "/catalogue": "CATALOGUE",
    "/about": "ABOUT US",
    "/contact": "CONTACT US",
  };

  const label = routeLabelMap[pathname] || "";

  return (
    <header className="w-full bg-white">
      {label && (
        <div className="bg-[#d18a42] px-2 ">
          <span className="text-gray-800 text-sm tracking-wide">{label}</span>
        </div>
      )}

      <div className="flex items-center justify-between py-4 px-6 w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center z-20">
          <Image
            src="/logo.png"
            alt="Kashth Kala Logo"
            width={180}
            height={56}
            className="object-contain cursor-pointer hover:opacity-90 transition-opacity"
            priority
          />
        </Link>

        <button
          className="md:hidden z-20"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        <nav className="hidden md:flex items-center space-x-6 text-sm uppercase">
          <a href="#product-section" className="hover:text-[#d18a42]">
            Products
          </a>
          <a href="#about-section" className="hover:text-[#d18a42]">
            About Us
          </a>
          <a href="#contact-section" className="hover:text-[#d18a42]">
            Contact Us
          </a>

          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 hover:text-[#d18a42]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="hover:text-[#d18a42] uppercase">
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
            </SignedIn>
          </div>
        </nav>
      </div>

      <div className="h-[1px] w-full bg-[#d18a42]" />
    </header>
  );
};

export default Header;
