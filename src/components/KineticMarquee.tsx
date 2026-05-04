"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MARQUEE_TEXT_1 = "ARAMA HERITAGE • MASTER TAILORING • MUMBAI CRAFTSMANSHIP • ";
const MARQUEE_TEXT_2 = "PRINTED COTTON • WOVEN EXCELLENCE • HANDCRAFTED DETAILS • ";

export default function KineticMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!row1Ref.current || !row2Ref.current || !sectionRef.current) return;

    // Row 1: moves LEFT on scroll
    gsap.to(row1Ref.current, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

    // Row 2: moves RIGHT on scroll
    gsap.to(row2Ref.current, {
      xPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-[#E9E6E1]"
    >
      {/* Decorative thin line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 md:h-24 bg-black/15" />

      {/* Row 1 */}
      <div className="overflow-hidden mb-6">
        <div
          ref={row1Ref}
          className="flex whitespace-nowrap"
          style={{ transform: "translateX(0%)" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={`r1-${i}`}
              className="font-serif font-bold text-[8vw] md:text-[6vw] uppercase tracking-tight text-black/25 leading-none flex-shrink-0"
              style={{ letterSpacing: "-0.02em" }}
            >
              {MARQUEE_TEXT_1}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 */}
      <div className="overflow-hidden">
        <div
          ref={row2Ref}
          className="flex whitespace-nowrap"
          style={{ transform: "translateX(-50%)" }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={`r2-${i}`}
              className="font-serif font-bold text-[8vw] md:text-[6vw] uppercase tracking-tight text-black/25 leading-none flex-shrink-0 italic"
              style={{ letterSpacing: "-0.02em" }}
            >
              {MARQUEE_TEXT_2}
            </span>
          ))}
        </div>
      </div>

      {/* Center Statement */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-black/90 font-medium mb-4 font-medium">Since 2013</p>
          <h2 className="font-serif font-bold text-4xl md:text-6xl lg:text-7xl lowercase tracking-tighter text-black leading-[0.9]" style={{ letterSpacing: "-0.03em" }}>
            The art of<br />being dressed
          </h2>
          <div className="w-16 h-[1px] bg-black/50 mx-auto mt-8" />
        </div>
      </div>
    </section>
  );
}
