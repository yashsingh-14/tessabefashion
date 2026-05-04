"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package, RotateCcw, Globe, Clock, ChevronDown, Truck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const policies = [
  { icon: Package, title: "Free Shipping", desc: "Complimentary shipping on all orders above ₹5,000 within India. International orders above $150 ship free via DHL Express.", stat: "₹5,000+", statLabel: "Free threshold" },
  { icon: Clock, title: "Delivery Timeline", desc: "Domestic orders: 5–7 business days. International orders: 10–14 business days. Bespoke orders may require an additional 2–3 weeks.", stat: "5–7", statLabel: "Business days" },
  { icon: Globe, title: "International Shipping", desc: "We ship to 15+ countries. All international shipments include tracking and are fully insured against loss or damage during transit.", stat: "15+", statLabel: "Countries" },
  { icon: RotateCcw, title: "Easy Returns", desc: "Not satisfied? Return unworn, unaltered items within 14 days of delivery for a full refund. We provide a prepaid return label for domestic orders.", stat: "14", statLabel: "Day returns" },
];

const faqs = [
  { q: "How long does standard shipping take?", a: "Domestic orders within India are delivered in 5–7 business days. We use BlueDart for reliable, tracked delivery to all pin codes." },
  { q: "Do you ship internationally?", a: "Yes! We ship to 15+ countries via DHL Express. International orders typically arrive within 10–14 business days. All shipments are fully insured." },
  { q: "Can I track my order?", a: "Absolutely. Once your order ships, you'll receive a tracking number via email and WhatsApp. You can track your package in real-time on our website." },
  { q: "What is your return policy?", a: "We offer a 14-day return window for unworn, unaltered items with all tags attached. Bespoke and monogrammed orders are non-returnable." },
  { q: "How do exchanges work?", a: "Request an exchange within 14 days of delivery. We'll send you a prepaid return label and ship the replacement as soon as we receive the original item." },
  { q: "Is there a fee for returns?", a: "Domestic returns are free — we provide a prepaid label. For international returns, a flat $15 shipping fee applies." },
];

const shippingSteps = [
  { step: "01", title: "Order Placed", desc: "Confirmation email & WhatsApp notification" },
  { step: "02", title: "Quality Check", desc: "47-point inspection before packaging" },
  { step: "03", title: "Handcrafted Packaging", desc: "Premium tissue-wrapped, branded box" },
  { step: "04", title: "Shipped", desc: "Tracking number sent via email" },
  { step: "05", title: "Delivered", desc: "Signature confirmation at your door" },
];

function FaqItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-black/5">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-7 text-left group"
      >
        <h3 className="font-serif font-bold text-lg md:text-xl lowercase tracking-tight pr-8 transition-colors duration-300 group-hover:text-black/70">{q}</h3>
        <ChevronDown className={`w-5 h-5 stroke-[1.5] text-black/90 font-medium font-medium flex-shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-40 pb-7" : "max-h-0"}`}>
        <p className="text-sm text-black/80 font-medium leading-relaxed max-w-2xl">{a}</p>
      </div>
    </div>
  );
}

export default function ShippingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 60, opacity: 0, skewY: 3 }, { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: "power3.out" });
    }
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".policy-card");
      gsap.fromTo(cards, { y: 50, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, delay: 0.5, ease: "power3.out" });
    }
    if (stepsRef.current) {
      const steps = stepsRef.current.querySelectorAll(".step-item");
      gsap.fromTo(steps, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: stepsRef.current, start: "top 75%", toggleActions: "play none none reverse" }
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-black">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-6">Policies</p>
          <h1 className="hero-anim font-serif font-bold text-5xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Shipping &<br />returns</h1>
          <p className="hero-anim text-sm md:text-base text-black/80 font-medium max-w-lg leading-relaxed">We believe in effortless luxury — from the moment you place your order to the moment it arrives at your door.</p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      {/* Policy Cards with Stats */}
      <section className="px-6 md:px-12 pb-24">
        <div ref={cardsRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <div key={policy.title} className="policy-card border border-black/10 p-10 md:p-14 hover:border-black/30 transition-all duration-500 group hover:-translate-y-1 hover:shadow-lg bg-white/50 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-8">
                  <Icon className="w-6 h-6 stroke-[1.2] opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="text-right">
                    <p className="font-serif font-bold text-3xl tracking-tight">{policy.stat}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/90 font-medium font-medium mt-1">{policy.statLabel}</p>
                  </div>
                </div>
                <h3 className="font-serif font-bold text-2xl lowercase tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>{policy.title}</h3>
                <p className="text-sm leading-relaxed text-black/80 font-medium">{policy.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Shipping Process Steps */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-4">The Journey</p>
            <h2 className="font-serif font-bold text-4xl md:text-5xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>From our atelier to your door</h2>
          </div>
          <div ref={stepsRef} className="max-w-3xl mx-auto">
            {shippingSteps.map((step, idx) => (
              <div key={step.step} className="step-item flex items-start gap-8 mb-8 last:mb-0 group">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-xs font-mono text-black/90 font-medium font-medium group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-500">
                    {step.step}
                  </div>
                  {idx < shippingSteps.length - 1 && <div className="w-[1px] h-8 bg-black/10" />}
                </div>
                <div className="pt-3">
                  <h4 className="font-serif font-bold text-lg lowercase tracking-tight mb-1">{step.title}</h4>
                  <p className="text-sm text-black/70 font-bold">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto bg-black text-white p-10 md:p-16">
          <h2 className="font-serif font-bold text-3xl md:text-4xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Return conditions</h2>
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

      {/* FAQ Accordion */}
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-4">Support</p>
            <h2 className="font-serif font-bold text-4xl md:text-5xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>Frequently asked</h2>
          </div>
          <div className="border-t border-black/10">
            {faqs.map((faq, idx) => (
              <FaqItem
                key={idx}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === idx}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
