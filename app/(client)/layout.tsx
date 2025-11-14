
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Manrope } from "next/font/google";
import "../globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "KK Interiors",
  description: "Elegant, timeless furniture collections by KK Interiors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${cormorant.variable} ${inter.variable} ${manrope.variable} bg-background text-primary font-body`}>
          <Header />
          <main className="min-h-screen w-full px-0 py-12">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
