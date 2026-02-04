"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const ref = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen) onClose();
  });
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        ref={ref}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-[#d18a42] text-xl cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-start mt-16 px-6 space-y-6 text-sm font-medium">
          <Link href="/" className="text-black hover:text-[#d18a42]">
            Home
          </Link>
          <Link href="/product" className="text-black hover:text-[#d18a42]">
            Products
          </Link>
          <Link href="/about" className="text-black hover:text-[#d18a42]">
            About Us
          </Link>
          <Link href="/contact" className="text-black hover:text-[#d18a42]">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
