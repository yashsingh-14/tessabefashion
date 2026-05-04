"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const leftImages = [
  { src: "/images/fabric-1.jpg", alt: "Egyptian Cotton Weave" },
  { src: "/images/pexels-bem-partington-1065018897-20531142.jpg", alt: "Artisan Stitching" },
  { src: "/images/fabric-2.jpg", alt: "Premium Thread Detail" },
  { src: "/images/pexels-chris-f-38966-7755387.jpg", alt: "Loom Craftsmanship" },
  { src: "/images/fabric-1.jpg", alt: "Fabric Drape" },
];

const centerImages = [
  { src: "/images/pexels-chris-f-38966-7755387.jpg", alt: "Heritage Weaving" },
  { src: "/images/fabric-1.jpg", alt: "Cotton Fields" },
  { src: "/images/pexels-bem-partington-1065018897-20531142.jpg", alt: "Master Tailoring" },
];

const rightImages = [
  { src: "/images/fabric-2.jpg", alt: "Silk Finishing" },
  { src: "/images/fabric-1.jpg", alt: "Pattern Design" },
  { src: "/images/pexels-chris-f-38966-7755387.jpg", alt: "Quality Inspection" },
  { src: "/images/pexels-bem-partington-1065018897-20531142.jpg", alt: "Mumbai Atelier" },
  { src: "/images/fabric-2.jpg", alt: "Export Grade Fabric" },
];

export default function StickyGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headerRef.current) return;
    const els = headerRef.current.querySelectorAll(".gallery-anim");
    gsap.fromTo(els,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 80%", toggleActions: "play none none reverse" }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative">
      {/* Header - Full screen intro */}
      <div ref={headerRef} className="h-screen w-full grid place-content-center bg-white px-6">
        <div className="text-center">
          <p className="gallery-anim text-xs uppercase tracking-[0.4em] text-gray-500 mb-6">The Gallery</p>
          <h2 className="gallery-anim font-serif font-bold text-4xl md:text-7xl lg:text-8xl lowercase tracking-tight leading-[0.95] text-gray-900" style={{ letterSpacing: "-0.02em" }}>
            Craftsmanship<br />in every thread
          </h2>
          <p className="gallery-anim text-sm text-gray-600 mt-8 max-w-md mx-auto leading-relaxed">
            A visual journey through our atelier — from raw cotton to finished luxury.
          </p>
          <div className="gallery-anim w-16 h-[1px] bg-gray-300 mx-auto mt-10" />
          <p className="gallery-anim text-[10px] uppercase tracking-[0.3em] text-gray-400 mt-6">Scroll to explore ↓</p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white w-full px-2 md:px-4 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-2">
          {/* Left Column - Scrolls */}
          <div className="col-span-1 md:col-span-4 grid gap-2">
            {leftImages.map((img, i) => (
              <figure key={`left-${i}`} className="w-full overflow-hidden rounded-sm">
                <div className="relative w-full h-64 md:h-96">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-500" />
                </div>
              </figure>
            ))}
          </div>

          {/* Center Column - Sticky */}
          <div className="hidden md:grid sticky top-0 h-screen w-full col-span-4 gap-2 grid-rows-3">
            {centerImages.map((img, i) => (
              <figure key={`center-${i}`} className="w-full h-full overflow-hidden rounded-sm">
                <div className="relative w-full h-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-500" />
                </div>
              </figure>
            ))}
          </div>

          {/* Right Column - Scrolls */}
          <div className="col-span-1 md:col-span-4 grid gap-2">
            {rightImages.map((img, i) => (
              <figure key={`right-${i}`} className="w-full overflow-hidden rounded-sm">
                <div className="relative w-full h-64 md:h-96">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-500" />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="bg-white py-20 text-center overflow-hidden">
        <h3 className="font-serif font-bold text-[14vw] md:text-[10vw] uppercase leading-none bg-gradient-to-r from-neutral-300 to-neutral-400 bg-clip-text text-transparent font-semibold tracking-tight">
          arama
        </h3>
      </div>
    </section>
  );
}
