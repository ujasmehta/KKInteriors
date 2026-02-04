import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Manrope } from "next/font/google";
import "../globals.css";

import Header from "@/components/Header";
import ConditionalFooter from "@/components/ConditionalFooter";
import { Toaster } from "sonner";
import Script from "next/script";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Kaashthkala",
  description: "Elegant, timeless furniture collections by KK Interiors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-5WF36TXFF7"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5WF36TXFF7');
          `}
        </Script>

        <body
          className={`${cormorant.variable} ${inter.variable} ${manrope.variable} bg-background text-primary font-body`}
        >
          <Header />

          <main className="w-full">{children}</main>

         
          <ConditionalFooter />

          <Toaster position="top-center" richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
