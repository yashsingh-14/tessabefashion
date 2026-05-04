import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Watermark from "@/components/Watermark";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tessa Be Fashion | Premium Fabric Shirts",
  description: "Bespoke shirts crafted from the world's finest fabrics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col font-sans text-[#000000] select-none relative bg-[#E9E6E1] bg-[url('/images/fabric-texture-bg.png')] bg-cover bg-center bg-fixed"
      >
        {/* Semi-transparent overlay with blur for text readability */}
        <div className="fixed inset-0 bg-[#E9E6E1]/50 backdrop-blur-sm pointer-events-none z-0" />
        <div className="relative z-10 flex flex-col min-h-full">
          <Watermark />
          <SmoothScroll>
            {children}
          </SmoothScroll>

          {/* Anti-Copy Script (Optional Protection) */}
          <script dangerouslySetInnerHTML={{ __html: `
            document.addEventListener('contextmenu', (e) => e.preventDefault());
            document.onkeydown = function(e) {
              if(e.keyCode == 123) return false;
              if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
              if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
              if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
              if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
            }
          `}} />
        </div>
      </body>
    </html>
  );
}
