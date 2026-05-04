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
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation timeline on page load
    const tl = gsap.timeline({ delay: 0.5 });

    // Fade in the entire nav bar
    tl.fromTo(
      navRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    // Menu button slides in from left
    tl.fromTo(
      menuBtnRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.3"
    );

    // Logo drops in from top
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.4)" },
        "-=0.5"
      );
    }

    // Action buttons slide in from right with stagger
    if (actionsRef.current) {
      const buttons = actionsRef.current.querySelectorAll("button");
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

          {/* Center: Logo */}
          <div ref={logoRef} className="absolute left-1/2 -translate-x-1/2" style={{ opacity: 0 }}>
            <Link href="/" className="flex flex-col items-start group">
              <span className="font-serif text-4xl md:text-5xl lowercase tracking-tight leading-none transition-transform duration-500 group-hover:-translate-y-1" style={{ letterSpacing: "-0.02em" }}>tessa</span>
              <span className="font-sans text-[11px] md:text-xs lowercase tracking-wide opacity-90 mt-1 ml-14 md:ml-20 transition-opacity duration-500 group-hover:opacity-100">be fashion</span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div ref={actionsRef} className="flex items-center gap-6">
            <button className="hidden md:flex items-center gap-2 group" style={{ opacity: 0 }}>
              <span className="text-xs uppercase tracking-[0.2em] font-medium group-hover:opacity-70 transition-opacity">Search</span>
              <Search className="w-4 h-4 stroke-[1.5] group-hover:opacity-70 transition-opacity" />
            </button>
            
            <button className="hidden md:flex items-center gap-2 group" style={{ opacity: 0 }}>
              <span className="text-xs uppercase tracking-[0.2em] font-medium group-hover:opacity-70 transition-opacity">Cart</span>
              <ShoppingBag className="w-4 h-4 stroke-[1.5] group-hover:opacity-70 transition-opacity" />
            </button>

            {/* Mobile specific icons */}
            <button className="md:hidden" style={{ opacity: 0 }}>
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            <button className="md:hidden" style={{ opacity: 0 }}>
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
