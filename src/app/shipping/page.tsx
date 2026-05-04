"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package, RotateCcw, Globe, Clock } from "lucide-react";

const policies = [
  { icon: Package, title: "Free Shipping", desc: "Complimentary shipping on all orders above ₹5,000 within India. International orders above $150 ship free via DHL Express." },
  { icon: Clock, title: "Delivery Timeline", desc: "Domestic orders: 5–7 business days. International orders: 10–14 business days. Bespoke orders may require an additional 2–3 weeks." },
  { icon: Globe, title: "International Shipping", desc: "We ship to 15+ countries. All international shipments include tracking and are fully insured against loss or damage during transit." },
  { icon: RotateCcw, title: "Easy Returns", desc: "Not satisfied? Return unworn, unaltered items within 14 days of delivery for a full refund. We provide a prepaid return label for domestic orders." },
];

export default function ShippingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" });
    }
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".policy-card");
      gsap.fromTo(cards, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "power3.out" });
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#E9E6E1] text-black">
      <Navbar />
      <section className="pt-40 pb-24 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/40 mb-6">Policies</p>
          <h1 className="hero-anim font-serif text-5xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Shipping &<br />returns</h1>
          <p className="hero-anim text-sm md:text-base text-black/50 max-w-lg leading-relaxed">We believe in effortless luxury — from the moment you place your order to the moment it arrives at your door.</p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div ref={cardsRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <div key={policy.title} className="policy-card border border-black/10 p-10 md:p-14 hover:border-black/30 transition-colors duration-500">
                <Icon className="w-6 h-6 stroke-[1.2] mb-8 opacity-40" />
                <h3 className="font-serif text-2xl lowercase tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>{policy.title}</h3>
                <p className="text-sm leading-relaxed text-black/50">{policy.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto bg-black text-white p-10 md:p-16">
          <h2 className="font-serif text-3xl md:text-4xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Return conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-white/60 leading-relaxed">
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3"><span className="text-white/30 mt-1">01</span> Items must be unworn, unwashed, and in original packaging</li>
              <li className="flex items-start gap-3"><span className="text-white/30 mt-1">02</span> All tags and labels must be attached and intact</li>
              <li className="flex items-start gap-3"><span className="text-white/30 mt-1">03</span> Bespoke and monogrammed orders are non-returnable</li>
            </ul>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3"><span className="text-white/30 mt-1">04</span> Refunds are processed within 5–7 business days</li>
              <li className="flex items-start gap-3"><span className="text-white/30 mt-1">05</span> Exchange requests must be made within 14 days</li>
              <li className="flex items-start gap-3"><span className="text-white/30 mt-1">06</span> For bulk orders, contact wholesale@tessabefashion.com</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
