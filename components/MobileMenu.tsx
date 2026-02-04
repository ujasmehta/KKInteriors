"use client";
import { AlignLeft, X } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden text-black hover:text-[#d18a42] transition-colors"
      >
        {open ? <X className="w-6 h-6" /> : <AlignLeft className="w-6 h-6" />}
      </button>

      <Sidebar isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default MobileMenu;
