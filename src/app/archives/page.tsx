"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const fabrics = [
  { name: "Egyptian Cotton", origin: "Partner Selected", weight: "120s Two-Ply", image: "/images/fabric-1.jpg", desc: "The gold standard. Hand-selected for its ultra-fine, silk-like touch." },
  { name: "Pure Irish Linen", origin: "Normandy Sourced", weight: "Medium Weight", image: "/images/fabric-2.jpg", desc: "Breathable elegance, meticulously processed for a soft, natural drape." },
  { name: "Brushed Flannel", origin: "Arama Signature", weight: "Heavy Weight", image: "/images/pexels-bem-partington-1065018897-20531142.jpg", desc: "Utilizing our proprietary brushing process for unparalleled softness." },
  { name: "Italian Poplin", origin: "Export Grade", weight: "Light Weight", image: "/images/pexels-chris-f-38966-7755387.jpg", desc: "Crisp, refined, and the cornerstone of our global export collection." },
];

export default function ArchivesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" });
    }
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".archive-card");
      cards.forEach((card, idx) => {
        gsap.fromTo(card, { y: 100, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, delay: idx * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
        });
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#E9E6E1] text-black relative">
      <Navbar />
      <section className="pt-40 pb-24 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/40 mb-6">The Archives</p>
          <h1 className="hero-anim font-serif text-6xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Mumbai&apos;s finest<br />fabric library</h1>
          <p className="hero-anim text-sm md:text-base text-black/50 max-w-lg leading-relaxed">A living collection of the world&apos;s most extraordinary textiles, curated over 11+ years of manufacturing excellence in Lower Parel.</p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {fabrics.map((fabric, idx) => (
            <div key={fabric.name} className="archive-card group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden mb-6">
                <Image src={fabric.image} alt={fabric.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute top-6 left-6"><span className="text-xs font-mono text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1">0{idx + 1}</span></div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl lowercase tracking-tight mb-2" style={{ letterSpacing: "-0.02em" }}>{fabric.name}</h3>
                  <p className="text-sm text-black/50">{fabric.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs uppercase tracking-[0.15em] text-black/30 mb-1">{fabric.origin}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-black/30">{fabric.weight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
