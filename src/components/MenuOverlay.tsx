"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import gsap from "gsap";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collection" },
  { label: "The Archives", href: "/archives" },
  { label: "Our Story", href: "/story" },
  { label: "Contact", href: "/contact" },
];

const secondaryLinks = [
  { label: "Shipping & Returns", href: "/shipping" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Care Instructions", href: "/care" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      // Slide in the overlay
      tl.to(overlayRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      });

      // Stagger animate each menu link
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll(".menu-link");
        tl.fromTo(
          links,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.3"
        );
      }

      // Fade in secondary links
      if (secondaryRef.current) {
        tl.fromTo(
          secondaryRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );
      }

      // Fade in footer
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        );
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = "";

      gsap.to(overlayRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black text-white"
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 md:right-12 z-[110] group flex items-center gap-3"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium opacity-70 group-hover:opacity-100 transition-opacity hidden md:block">
          Close
        </span>
        <X className="w-6 h-6 stroke-[1.5] opacity-70 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Content Grid */}
      <div
        ref={contentRef}
        className="h-full w-full flex flex-col justify-between px-8 md:px-16 lg:px-24 py-24"
      >
        {/* Main Navigation Links */}
        <div className="flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
            {/* Primary Links */}
            <div ref={linksRef} className="lg:col-span-7">
              <nav className="flex flex-col gap-2">
                {menuLinks.map((link, idx) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="menu-link group flex items-baseline gap-6 py-3 overflow-hidden"
                  >
                    <span className="text-sm text-white/30 font-mono tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="font-serif font-bold text-5xl md:text-7xl lg:text-8xl lowercase tracking-tight transition-all duration-500 group-hover:translate-x-6 group-hover:text-white/70" style={{ letterSpacing: "-0.02em" }}>
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Secondary Links */}
            <div ref={secondaryRef} className="lg:col-span-5 flex flex-col justify-end lg:pl-12">
              <div className="border-l border-white/10 pl-8">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-6">Information</p>
                <nav className="flex flex-col gap-4">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={onClose}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Row */}
        <div ref={footerRef} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-bold text-2xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>tessa</span>
            <span className="font-sans text-[10px] lowercase tracking-wide opacity-60">be fashion</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors">Pinterest</a>
            <a href="#" className="text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}
