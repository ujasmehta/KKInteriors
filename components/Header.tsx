import React from "react";
import Image from "next/image";
import Link from "next/link"; 

const Header = () => {
  return (
    <header className="w-full bg-white">
      
      <div className="h-3 bg-[#d18a42]" />

     
      <div className="flex items-center justify-between py-4 px-8">
       
        <Link href="/" className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Kashth Kala Logo"
            width={220} 
            height={120}
            className="object-contain cursor-pointer hover:opacity-90 transition-opacity"
            priority
          />
        </Link>

       
        <nav className="relative flex items-center space-x-8 text-sm uppercase mb-10">
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

        
          <div className="absolute -bottom-7 -left-180 right-5 border-t-2 border-[#d18a42]" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
