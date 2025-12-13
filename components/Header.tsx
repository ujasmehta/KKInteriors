"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const routeLabelMap: Record<string, string> = {
    "/": "HOME",
    "/catalogue": "CATALOGUE",
    "/explore": "EXPLORE",
    "/about": "ABOUT US",
    "/contact": "CONTACT US",
  };

  const label = routeLabelMap[pathname] || "";

  const navItems = [
    { label: "Products", href: "/catalogue" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white relative">
      {label && (
        <div className="bg-[#d18a42] px-2">
          <span className="text-gray-800 text-sm tracking-wide">{label}</span>
        </div>
      )}

      <div className="flex items-center justify-between py-4 px-6 w-full max-w-7xl mx-auto relative">
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

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <Link
            href="/catalogue"
            className="px-6 py-3 rounded-full bg-[#d18a42] text-white text-sm uppercase hover:bg-[#b67434] transition-all"
          >
            Explore
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm uppercase">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#d18a42]"
            >
              {item.label}
            </Link>
          ))}

          <SignedOut>
            <SignInButton>
              <button className="hover:text-[#d18a42] uppercase">Login</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          </SignedIn>
        </nav>

        <button
          className="md:hidden z-30"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
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
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-8 text-lg uppercase z-10 transition-all duration-300">
          <Link
            href="/catalogue"
            onClick={() => setMenuOpen(false)}
            className="px-8 py-4 rounded-full bg-[#d18a42] text-white text-lg hover:bg-[#b67434] transition-all"
          >
            Explore
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#d18a42]"
            >
              {item.label}
            </Link>
          ))}

          <SignedOut>
            <SignInButton>
              <button className="hover:text-[#d18a42] uppercase">Login</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          </SignedIn>
        </div>
      )}

      <div className="h-[1px] w-full bg-[#d18a42]" />
    </header>
  );
};

export default Header;
