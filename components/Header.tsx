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
  <div className="w-full h-[25px] bg-[#2F6B54]" />
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
            className="px-6 py-3 rounded-full bg-[#2F6B54] text-white text-sm uppercase hover:bg-[#225743] transition-all"
          >
            Explore
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm uppercase">
          
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#1b4937]"
            >
              {item.label}
            </Link>
          ))}

          <SignedOut>
            <SignInButton>
              <button className="hover:text-[#1b4937] uppercase">Login</button>
            </SignInButton>
            <a
  href="https://www.instagram.com/kaashthkala?igsh=eXR3dzVodG14c3c0"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-[#1b4937] transition-colors"
  aria-label="Instagram"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm4.25 3.5A4.75 4.75 0 1 0 16.75 12 4.756 4.756 0 0 0 12 7.5zm0 2A2.75 2.75 0 1 1 9.25 12 2.753 2.753 0 0 1 12 9.5zm5.5-.75a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
  </svg>
</a>

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
            className="px-8 py-4 rounded-full bg-[#2F6B54] text-white text-lg hover:bg-[#1b4937] transition-all"
          >
            Explore
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#1b4937]"
            >
              {item.label}
            </Link>
          ))}

          <SignedOut>
            <SignInButton>
              <button className="hover:text-[#1b4937] uppercase">Login</button>
            </SignInButton>
            <a
  href="https://www.instagram.com/kaashthkala?igsh=eXR3dzVodG14c3c0"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => setMenuOpen(false)}
  className="hover:text-[#1b4937] transition-colors"
  aria-label="Instagram"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm4.25 3.5A4.75 4.75 0 1 0 16.75 12 4.756 4.756 0 0 0 12 7.5zm0 2A2.75 2.75 0 1 1 9.25 12 2.753 2.753 0 0 1 12 9.5zm5.5-.75a1 1 0 1 1-1-1 1 1 0 0 1 1 1z" />
  </svg>
</a>

          </SignedOut>

          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          </SignedIn>
        </div>
      )}

      <div className="h-[1px] w-full bg-[#2F6B54]" />
    </header>
  );
};

export default Header;