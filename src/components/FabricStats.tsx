"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { number: 11, suffix: "+", label: "Years of Mastery" },
  { number: 15, suffix: "+", label: "Countries Exported" },
  { number: 100, suffix: "+", label: "Premium Fabrics" },
  { number: 50, suffix: "Cr+", label: "Annual Turnover" },
];

export default function FabricStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Heading reveal
    if (headingRef.current) {
      gsap.fromTo(headingRef.current, 
        { y: 80, opacity: 0, skewY: 4 },
        {
          y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // Decorative line grows
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.5, ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // Each stat counter animates
    if (statsRef.current) {
      const items = statsRef.current.querySelectorAll(".stat-item");
      
      items.forEach((item, idx) => {
        const numEl = item.querySelector(".stat-number");
        const labelEl = item.querySelector(".stat-label");
        const target = stats[idx].number;

        // Number counting animation
        gsap.fromTo({ val: 0 }, { val: 0 }, {
          val: target,
          duration: 2,
          delay: idx * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
          onUpdate: function() {
            if (numEl) {
              numEl.textContent = Math.round(this.targets()[0].val) + stats[idx].suffix;
            }
          }
        });

        // Fade up the stat block
        gsap.fromTo(item,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, delay: idx * 0.15, ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-40 md:py-56 px-6 md:px-12 bg-black text-white overflow-hidden">
      {/* Background grain texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-24">
          <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-6">By The Numbers</p>
          <h2 ref={headingRef} className="font-serif text-5xl md:text-7xl lg:text-8xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            A legacy in<br />every thread
          </h2>
          <div ref={lineRef} className="w-24 h-[1px] bg-white/20 mx-auto mt-10 origin-left" />
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="stat-item text-center lg:border-r lg:last:border-r-0 border-white/10 px-8">
              <p className="stat-number font-serif text-6xl md:text-7xl lg:text-8xl tracking-tight mb-4" style={{ letterSpacing: "-0.03em" }}>
                0{stat.suffix}
              </p>
              <p className="stat-label text-xs uppercase tracking-[0.3em] text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
