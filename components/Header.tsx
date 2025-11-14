
import React from "react";
import Image from "next/image";
import Link from "next/link";

  return (
    <header className="w-full bg-white">
      {/* top accent — full bleed */}
      <div className="h-3 bg-[#d18a42]" />

      {/* full-width row with no left/right container padding */}
      <div className="flex items-center justify-between py-4 px-0 w-full">
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
          <Link
            href="/product"
            className="text-black hover:text-[#d18a42] transition-colors duration-300"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-black hover:text-[#d18a42] transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-black hover:text-[#d18a42] transition-colors duration-300"
          >
            Contact Us
          </Link>

          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-black hover:text-[#d18a42] transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
              />
            </svg>
            <Link
              href="/login"
              className="text-black hover:text-[#d18a42] transition-colors duration-300"
            >
              Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
