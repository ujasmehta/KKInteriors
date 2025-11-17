"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="w-full bg-white">
      <div className="h-3 bg-[#d18a42]" />

      <div className="flex items-center justify-between py-4 px-6 w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Kashth Kala Logo"
            width={180}
            height={56}
            className="object-contain cursor-pointer hover:opacity-90 transition-opacity"
            priority
          />
        </Link>

        <nav className="flex items-center space-x-6 text-sm uppercase">
          <a
            href="#product-section"
            className="text-black hover:text-[#d18a42] transition-colors duration-300"
          >
            Products
          </a>

          <a
            href="#about-section"
            className="text-black hover:text-[#d18a42] transition-colors duration-300"
          >
            About Us
          </a>

          <a
            href="#contact-section"
            className="text-black hover:text-[#d18a42] transition-colors duration-300"
          >
            Contact Us
          </a>

          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-black hover:text-[#d18a42] transition-colors duration-300 mr-4 -ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-black hover:text-[#d18a42] transition-colors duration-300 cursor-pointer uppercase ">
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
    </header>
  );
};

export default Header;
