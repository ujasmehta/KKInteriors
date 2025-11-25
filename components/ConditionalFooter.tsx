"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null; 

  return <Footer />;
}
