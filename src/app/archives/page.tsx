"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const fabrics = [
  { name: "Egyptian Cotton", origin: "Partner Selected", weight: "120s Two-Ply", image: "/images/fabric-1.jpg", desc: "The gold standard. Hand-selected for its ultra-fine, silk-like touch.", tag: "Best Seller" },
  { name: "Pure Irish Linen", origin: "Normandy Sourced", weight: "Medium Weight", image: "/images/fabric-2.jpg", desc: "Breathable elegance, meticulously processed for a soft, natural drape.", tag: "Seasonal" },
  { name: "Brushed Flannel", origin: "Arama Signature", weight: "Heavy Weight", image: "/images/pexels-bem-partington-1065018897-20531142.jpg", desc: "Utilizing our proprietary brushing process for unparalleled softness.", tag: "Exclusive" },
  { name: "Italian Poplin", origin: "Export Grade", weight: "Light Weight", image: "/images/pexels-chris-f-38966-7755387.jpg", desc: "Crisp, refined, and the cornerstone of our global export collection.", tag: "Export" },
];

export default function ArchivesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 60, opacity: 0, skewY: 3 }, { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: "power3.out" });
    }
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".archive-card");
      cards.forEach((card) => {
        gsap.fromTo(card, { y: 100, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
        });
      });
    }
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current.querySelectorAll(".cta-anim"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-black relative">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-12 relative overflow-hidden">
        <div ref={heroRef} className="max-w-7xl mx-auto relative z-10">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-6">The Archives</p>
          <h1 className="hero-anim font-serif font-bold text-6xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Mumbai&apos;s finest<br />fabric library</h1>
          <p className="hero-anim text-sm md:text-base text-black/80 font-medium max-w-lg leading-relaxed">A living collection of the world&apos;s most extraordinary textiles, curated over 11+ years of manufacturing excellence in Lower Parel.</p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      {/* Fabric Grid with Enhanced Hover */}
      <section className="px-6 md:px-12 pb-24">
        <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {fabrics.map((fabric, idx) => (
            <div key={fabric.name} className="archive-card group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden mb-6">
                <Image src={fabric.image} alt={fabric.name} fill className="object-cover transition-all duration-700 group-hover:scale-110" />
                {/* Multi-layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Number badge */}
                <div className="absolute top-6 left-6"><span className="text-xs font-mono text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1">0{idx + 1}</span></div>
                {/* Tag badge */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white bg-black/50 backdrop-blur-sm px-4 py-2">{fabric.tag}</span>
                </div>
                {/* Info panel slides up */}
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-2">{fabric.origin} · {fabric.weight}</p>
                  <Link href="/contact" className="inline-block bg-white text-black text-xs uppercase tracking-[0.2em] px-6 py-3 font-medium hover:bg-black hover:text-white transition-colors duration-300">
                    Request Sample
                  </Link>
                </div>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif font-bold text-2xl lowercase tracking-tight mb-2 transition-transform duration-300 group-hover:translate-x-1" style={{ letterSpacing: "-0.02em" }}>{fabric.name}</h3>
                  <p className="text-sm text-black/80 font-medium">{fabric.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs uppercase tracking-[0.15em] text-black/90 font-medium font-medium mb-1">{fabric.origin}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-black/90 font-medium font-medium">{fabric.weight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Request Sample CTA */}
      <section className="px-6 md:px-12 pb-32">
        <div ref={ctaRef} className="max-w-7xl mx-auto bg-black text-white p-12 md:p-20 text-center">
          <p className="cta-anim text-xs uppercase tracking-[0.4em] text-white/30 mb-6">Wholesale Inquiry</p>
          <h2 className="cta-anim font-serif font-bold text-4xl md:text-6xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>
            Request fabric<br />samples today
          </h2>
          <p className="cta-anim text-sm text-white/40 max-w-md mx-auto leading-relaxed mb-10">
            Get hands-on with our premium fabrics. We ship complimentary swatch books to verified garment manufacturers and fashion houses worldwide.
          </p>
          <Link href="/contact" className="cta-anim inline-block bg-white text-black px-12 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-100 transition-all duration-300 hover:-translate-y-0.5">
            Request Samples
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
