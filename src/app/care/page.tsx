"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Droplets, Wind, ThermometerSun, Shirt } from "lucide-react";

const careSteps = [
  { icon: Droplets, title: "Washing", instructions: [
    "Machine wash cold (30°C) on a gentle cycle",
    "Use a mild, pH-neutral detergent — avoid bleach",
    "Turn shirts inside out to protect the fabric face",
    "Wash similar colors together to prevent bleeding",
  ]},
  { icon: ThermometerSun, title: "Drying", instructions: [
    "Line dry in shade — avoid direct sunlight",
    "Never tumble dry premium cotton or linen",
    "Remove promptly after washing to reduce wrinkles",
    "Shape collar and cuffs by hand while damp",
  ]},
  { icon: Wind, title: "Ironing", instructions: [
    "Iron on medium heat while slightly damp",
    "For linen: iron on high heat with steam",
    "Always iron collar and cuffs from the edge inward",
    "Use a pressing cloth for dark-colored fabrics",
  ]},
  { icon: Shirt, title: "Storage", instructions: [
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
      tl.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" });
    }
    if (stepsRef.current) {
      const cards = stepsRef.current.querySelectorAll(".care-card");
      gsap.fromTo(cards, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, delay: 0.5, ease: "power3.out" });
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#E9E6E1] text-black">
      <Navbar />
      <section className="pt-40 pb-24 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/40 mb-6">Garment Care</p>
          <h1 className="hero-anim font-serif text-5xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Fabric care</h1>
          <p className="hero-anim text-sm md:text-base text-black/50 max-w-lg leading-relaxed">A great shirt deserves great care. Follow these guidelines to ensure your Arama fabrics maintain their beauty for years to come.</p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div ref={stepsRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {careSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="care-card bg-white p-10 md:p-14">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs text-black/20 font-mono">0{idx + 1}</span>
                  <Icon className="w-5 h-5 stroke-[1.2] opacity-40" />
                  <h3 className="font-serif text-2xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>{step.title}</h3>
                </div>
                <ul className="flex flex-col gap-4">
                  {step.instructions.map((instruction, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-black/60 leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-black/20 mt-2 flex-shrink-0"></span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
