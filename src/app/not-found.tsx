"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.2 });
    const els = containerRef.current.querySelectorAll(".anim");
    tl.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" });
  }, []);

  return (
    <main className="min-h-screen bg-[#E9E6E1] text-black flex items-center justify-center px-6">
      <div ref={containerRef} className="text-center max-w-2xl">
        <p className="anim font-serif text-[20vw] md:text-[15vw] leading-none tracking-tight text-black/5 mb-8" style={{ letterSpacing: "-0.05em" }}>404</p>
        <p className="anim text-xs uppercase tracking-[0.4em] text-black/40 mb-6 -mt-16 md:-mt-24">Page Not Found</p>
        <h1 className="anim font-serif text-3xl md:text-5xl lowercase tracking-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
          This thread seems to have unravelled
        </h1>
        <p className="anim text-sm text-black/50 leading-relaxed mb-12 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us guide you back to our collection.
        </p>
        <div className="anim flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="bg-black text-white px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors duration-300">
            Return Home
          </Link>
          <Link href="/collection" className="border border-black/20 px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:border-black transition-colors duration-300">
            View Collection
          </Link>
        </div>
      </div>
    </main>
  );
}
