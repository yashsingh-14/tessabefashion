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

const timeline = [
  { year: "2013", title: "The Founding", description: "Arama Tessile LLP was incorporated in Mumbai by Rahul & Anjlee Agarwal with a singular mission: to bring world-class textile manufacturing to India\u2019s fashion industry." },
  { year: "2017", title: "GST & Expansion", description: "With GST registration and formalized operations, Arama scaled rapidly \u2014 onboarding garment makers and fabric houses across Maharashtra and beyond." },
  { year: "2020", title: "The Lower Parel Atelier", description: "A dedicated 4th-floor facility at Kewal Industrial Estate, Senapati Bapat Marg \u2014 our state-of-the-art manufacturing hub for premium cotton fabrics." },
  { year: "2022", title: "Global Reach", description: "Exports crossed $0.5M annually, serving garment manufacturers in 15+ countries. Domestic turnover reached the \u20B925\u2013100 Cr range." },
  { year: "2024", title: "Tessa Be Fashion", description: "The launch of our consumer-facing brand, bringing the same mill-quality fabrics and meticulous craftsmanship directly to discerning individuals worldwide." },
];

export default function StoryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 80, opacity: 0, skewY: 3 }, { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: "power3.out" });
    }
    if (quoteRef.current) {
      gsap.fromTo(quoteRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: quoteRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
    }
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll(".timeline-item");
      items.forEach((item, idx) => {
        gsap.fromTo(item, { x: idx % 2 === 0 ? -80 : 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 80%", toggleActions: "play none none reverse" } });
      });
    }
    if (valuesRef.current) {
      const cards = valuesRef.current.querySelectorAll(".value-card");
      gsap.fromTo(cards, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: valuesRef.current, start: "top 75%", toggleActions: "play none none reverse" } });
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#E9E6E1] text-black relative">
      <Navbar />
      <section className="relative pt-40 pb-32 px-6 md:px-12 overflow-hidden">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/40 mb-6">Our Story</p>
          <h1 className="hero-anim font-serif text-6xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-10" style={{ letterSpacing: "-0.02em" }}>Born from<br />obsession</h1>
          <p className="hero-anim text-sm md:text-base text-black/50 max-w-xl leading-relaxed">Founded in November 2013 in the heart of Mumbai&apos;s textile district, Arama Tessile LLP was born from a deeply personal obsession with the feeling of extraordinary fabric against skin. What began as a small manufacturing operation on Kalbadevi Road has grown into a ₹50Cr+ enterprise serving garment makers across 15 countries.</p>
        </div>
      </section>

      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <Image src="/images/pexels-bem-partington-1065018897-20531142.jpg" alt="Our Atelier" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <section className="py-32 md:py-48 px-6 md:px-12">
        <div ref={quoteRef} className="max-w-4xl mx-auto text-center">
          <span className="font-serif text-8xl md:text-9xl text-black/5 leading-none block mb-8">&ldquo;</span>
          <p className="font-serif text-2xl md:text-4xl leading-snug tracking-tight italic font-light mb-12 -mt-16" style={{ letterSpacing: "-0.01em" }}>We didn&apos;t start Arama to build a business. We started it because we couldn&apos;t find fabrics that matched our standards. So we decided to make them ourselves — from the finest mills in Italy, Ireland, and Egypt.</p>
          <div className="w-12 h-[1px] bg-black/20 mx-auto mb-6" />
          <p className="text-xs uppercase tracking-[0.3em] font-medium">Rahul & Anjlee Agarwal</p>
          <p className="text-xs uppercase tracking-[0.2em] text-black/40 mt-1">Founders, Arama Tessile LLP</p>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-4">The Journey</p>
            <h2 className="font-serif text-5xl md:text-7xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>Milestones</h2>
          </div>
          <div ref={timelineRef} className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />
            {timeline.map((item, idx) => (
              <div key={idx} className={`timeline-item flex flex-col md:flex-row items-start md:items-center gap-8 mb-20 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className={`flex-1 ${idx % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-3">{item.year}</p>
                  <h3 className="font-serif text-3xl md:text-4xl lowercase tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{item.description}</p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 bg-black flex-shrink-0 hidden md:block" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 md:py-48 px-6 md:px-12 bg-[#E9E6E1]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.4em] text-black/40 mb-4">What We Believe</p>
            <h2 className="font-serif text-5xl md:text-7xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>Our values</h2>
          </div>
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "47-Point Inspection", desc: "Every fabric passes through a rigorous 47-point quality inspection before it leaves our atelier. We would rather destroy a roll than let a flaw reach your hands." },
              { title: "Mill-Direct Sourcing", desc: "We source directly from the finest mills in Italy, Ireland, and Egypt. No middlemen, no compromises — just the purest raw materials, hand-selected for quality." },
              { title: "Timeless Over Trendy", desc: "We manufacture for decades, not seasons. An Arama fabric is engineered to look as impeccable after years of wear as it does the day it arrives from our loom." },
            ].map((value) => (
              <div key={value.title} className="value-card border-t border-black/10 pt-8">
                <h3 className="font-serif text-2xl lowercase tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>{value.title}</h3>
                <p className="text-sm leading-relaxed text-black/50">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
