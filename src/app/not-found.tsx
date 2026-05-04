"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.2 });
    const els = containerRef.current.querySelectorAll(".anim");
    tl.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <main
      className="min-h-screen bg-transparent text-black flex items-center justify-center px-6 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Floating background "404" with parallax */}
      <p
        className="absolute font-serif font-bold text-[40vw] md:text-[30vw] leading-none tracking-tight text-black/[0.03] select-none transition-transform duration-[2000ms] ease-out"
        style={{
          letterSpacing: "-0.05em",
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      >
        404
      </p>

      <div ref={containerRef} className="text-center max-w-2xl relative z-10">
        <p className="anim text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-6">Page Not Found</p>
        <h1 className="anim font-serif font-bold text-4xl md:text-6xl lowercase tracking-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
          This thread seems<br />to have unravelled
        </h1>
        <p className="anim text-sm text-black/80 font-medium leading-relaxed mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us guide you back to our collection.
        </p>

        {/* Search on 404 */}
        <div className="anim max-w-sm mx-auto mb-10">
          <div className="flex items-center border-b border-black/20 focus-within:border-black transition-colors duration-500 pb-3">
            <input
              type="text"
              placeholder="Search our archives..."
              className="w-full bg-transparent text-sm font-light focus:outline-none placeholder:text-black/20 text-center"
            />
          </div>
        </div>

        <div className="anim flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="bg-black text-white px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-all duration-300 hover:-translate-y-0.5">
            Return Home
          </Link>
          <Link href="/collection" className="border border-black/20 px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:border-black hover:bg-black hover:text-white transition-all duration-300">
            View Collection
          </Link>
        </div>
      </div>
    </main>
  );
}
