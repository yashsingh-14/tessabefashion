"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, Menu, ShoppingBag } from "lucide-react";
import gsap from "gsap";
import MenuOverlay from "./MenuOverlay";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const svgTextRef = useRef<SVGTextElement>(null);
  const beFashionRef = useRef<HTMLSpanElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Fade in the navbar container
    tl.fromTo(
      navRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    );

    // Menu button slides in from left
    tl.fromTo(
      menuBtnRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.2"
    );

    // Show logo container
    if (logoRef.current) {
      tl.set(logoRef.current, { opacity: 1 }, "-=0.5");
    }

    // Handwriting animation for "tessa" SVG text
    if (svgTextRef.current) {
      const textLength = svgTextRef.current.getComputedTextLength?.() || 200;
      
      // Set initial state: text is "invisible" (stroke dash hides it)
      gsap.set(svgTextRef.current, {
        strokeDasharray: textLength,
        strokeDashoffset: textLength,
        fill: "transparent",
        stroke: "currentColor",
        strokeWidth: 1.5,
      });

      // Animate: draw the stroke (handwriting effect)
      tl.to(
        svgTextRef.current,
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: "power2.inOut",
        },
        "-=0.3"
      );

      // Then fill in the text color
      tl.to(
        svgTextRef.current,
        {
          fill: "currentColor",
          strokeWidth: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }

    // "be fashion" fades in after
    if (beFashionRef.current) {
      tl.fromTo(
        beFashionRef.current,
        { opacity: 0, x: -10 },
        { opacity: 0.9, x: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
    }

    // Action buttons slide in from right with stagger
    if (actionsRef.current) {
      const buttons = actionsRef.current.querySelectorAll("button, a");
      tl.fromTo(
        buttons,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.5"
      );
    }
  }, []);

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-transparent text-white hover:bg-[#E9E6E1] hover:text-black hover:shadow-sm" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between px-6 py-6 md:px-12">
          {/* Left: Menu */}
          <button ref={menuBtnRef} onClick={() => setMenuOpen(true)} className="flex items-center gap-3 cursor-pointer group" style={{ opacity: 0 }}>
            <Menu className="w-5 h-5 stroke-[1.5] group-hover:opacity-70 transition-opacity" />
            <span className="hidden md:block text-xs uppercase tracking-[0.2em] font-medium group-hover:opacity-70 transition-opacity">Menu</span>
          </button>

          {/* Center: Logo with Handwriting Animation */}
          <div ref={logoRef} className="absolute left-1/2 -translate-x-1/2" style={{ opacity: 0 }}>
            <Link href="/" className="flex flex-col items-start group">
              {/* SVG Text for handwriting animation */}
              <svg 
                viewBox="0 0 160 50" 
                className="h-[40px] md:h-[48px] w-auto overflow-visible transition-transform duration-500 group-hover:-translate-y-1"
                aria-label="tessa"
              >
                <text
                  ref={svgTextRef}
                  x="0"
                  y="38"
                  className="font-serif"
                  style={{ 
                    fontSize: "48px", 
                    letterSpacing: "-0.02em",
                    fill: "transparent",
                  }}
                >
                  tessa
                </text>
              </svg>
              <span 
                ref={beFashionRef}
                className="font-sans text-[11px] md:text-xs lowercase tracking-wide mt-0 ml-14 md:ml-20"
                style={{ opacity: 0 }}
              >
                be fashion
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div ref={actionsRef} className="flex items-center gap-6">
            <Link href="/search" className="hidden md:flex items-center gap-2 group" style={{ opacity: 0 }}>
              <span className="text-xs uppercase tracking-[0.2em] font-medium group-hover:opacity-70 transition-opacity">Search</span>
              <Search className="w-4 h-4 stroke-[1.5] group-hover:opacity-70 transition-opacity" />
            </Link>
            
            <Link href="/cart" className="hidden md:flex items-center gap-2 group" style={{ opacity: 0 }}>
              <span className="text-xs uppercase tracking-[0.2em] font-medium group-hover:opacity-70 transition-opacity">Cart</span>
              <ShoppingBag className="w-4 h-4 stroke-[1.5] group-hover:opacity-70 transition-opacity" />
            </Link>

            {/* Mobile specific icons */}
            <Link href="/search" className="md:hidden" style={{ opacity: 0 }}>
              <Search className="w-5 h-5 stroke-[1.5]" />
            </Link>
            <Link href="/cart" className="md:hidden" style={{ opacity: 0 }}>
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
