"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Droplets, Wind, ThermometerSun, Shirt } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const careSteps = [
  { icon: Droplets, title: "Washing", step: "01", color: "from-blue-500/10 to-transparent", instructions: [
    "Machine wash cold (30°C) on a gentle cycle",
    "Use a mild, pH-neutral detergent — avoid bleach",
    "Turn shirts inside out to protect the fabric face",
    "Wash similar colors together to prevent bleeding",
  ]},
  { icon: ThermometerSun, title: "Drying", step: "02", color: "from-amber-500/10 to-transparent", instructions: [
    "Line dry in shade — avoid direct sunlight",
    "Never tumble dry premium cotton or linen",
    "Remove promptly after washing to reduce wrinkles",
    "Shape collar and cuffs by hand while damp",
  ]},
  { icon: Wind, title: "Ironing", step: "03", color: "from-green-500/10 to-transparent", instructions: [
    "Iron on medium heat while slightly damp",
    "For linen: iron on high heat with steam",
    "Always iron collar and cuffs from the edge inward",
    "Use a pressing cloth for dark-colored fabrics",
  ]},
  { icon: Shirt, title: "Storage", step: "04", color: "from-purple-500/10 to-transparent", instructions: [
    "Hang on wooden or padded hangers — never wire",
    "Button the top button to maintain collar shape",
    "Allow space between garments for air circulation",
    "Store in a cool, dry place away from direct light",
  ]},
];

export default function CarePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 60, opacity: 0, skewY: 3 }, { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: "power3.out" });
    }
    if (stepsRef.current) {
      const cards = stepsRef.current.querySelectorAll(".care-card");
      cards.forEach((card, idx) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
          }
        );
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-black">
      <Navbar />

      <section className="pt-40 pb-24 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-6">Garment Care</p>
          <h1 className="hero-anim font-serif font-bold text-5xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Fabric care</h1>
          <p className="hero-anim text-sm md:text-base text-black/80 font-medium max-w-lg leading-relaxed">A great shirt deserves great care. Follow these guidelines to ensure your Arama fabrics maintain their beauty for years to come.</p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      {/* Care Steps with Connection Lines */}
      <section className="px-6 md:px-12 pb-24">
        <div ref={stepsRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className={`care-card bg-white p-10 md:p-14 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-500`}>
                  {/* Gradient background accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color}`} />

                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-serif font-bold text-black/10 tracking-tight">{step.step}</span>
                    <div className="w-[1px] h-8 bg-black/10" />
                    <Icon className="w-5 h-5 stroke-[1.2] opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                    <h3 className="font-serif font-bold text-2xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>{step.title}</h3>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {step.instructions.map((instruction, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm text-black/90 font-medium leading-relaxed group-hover:text-black/70 transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-black/15 mt-2 flex-shrink-0 group-hover:bg-black/30 transition-colors duration-300" />
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pro Tips */}
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto bg-black text-white p-10 md:p-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-4">Pro Tip</p>
              <h2 className="font-serif font-bold text-3xl md:text-4xl lowercase tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>The 24-hour rule</h2>
              <p className="text-sm text-white/50 leading-relaxed max-w-lg">
                After wearing, hang your shirt on a cedar hanger for 24 hours before washing. This allows the fabric to breathe, releases wrinkles naturally, and extends the life of the garment. Most premium shirts only need washing after 2–3 wears.
              </p>
            </div>
            <div className="flex-shrink-0 text-center md:text-right">
              <p className="font-serif font-bold text-7xl md:text-8xl text-white/10 tracking-tight">24h</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/20 mt-2">Rest before wash</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
