"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const showcaseItems = [
  {
    title: "The Agarwal Standard",
    subtitle: "Egyptian Cotton",
    description: "Each yarn is hand-selected by our founding partners for its length, luster, and strength. The result is a fabric that drapes like water and feels like a second skin \u2014 a testament to 11 years of mastery.",
    image: "/images/pexels-chris-f-38966-7755387.jpg",
  },
  {
    title: "Meticulous Processing",
    subtitle: "Pure Irish Linen",
    description: "Harvested from the flax fields of Normandy, our linen undergoes Arama's meticulous proprietary softening process while retaining its natural, breathable character, refined for the modern wardrobe.",
    image: "/images/pexels-bem-partington-1065018897-20531142.jpg",
  },
];

export default function ParallaxShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const panels = sectionRef.current.querySelectorAll(".showcase-panel");

    panels.forEach((panel) => {
      const img = panel.querySelector(".showcase-img");
      const text = panel.querySelector(".showcase-text");
      const number = panel.querySelector(".showcase-number");
      const line = panel.querySelector(".showcase-line");

      // Image parallax - moves slower than scroll
      if (img) {
        gsap.fromTo(img,
          { yPercent: -15, scale: 1.15 },
          {
            yPercent: 15, scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          }
        );
      }

      // Text reveal
      if (text) {
        gsap.fromTo(text,
          { y: 100, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 65%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Big number fade in
      if (number) {
        gsap.fromTo(number,
          { x: -60, opacity: 0 },
          {
            x: 0, opacity: 0.06, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 70%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Decorative line grows
      if (line) {
        gsap.fromTo(line,
          { scaleY: 0 },
          {
            scaleY: 1, duration: 1, ease: "power2.inOut",
            scrollTrigger: {
              trigger: panel,
              start: "top 60%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#E9E6E1] relative">
      {showcaseItems.map((item, idx) => (
        <div
          key={item.title}
          className={`showcase-panel grid grid-cols-1 lg:grid-cols-2 min-h-screen relative overflow-hidden ${
            idx % 2 !== 0 ? "lg:direction-rtl" : ""
          }`}
        >
          {/* Image Side */}
          <div className={`relative h-[60vh] lg:h-auto overflow-hidden ${idx % 2 !== 0 ? "lg:order-2" : ""}`}>
            <div className="showcase-img absolute inset-0">
              <Image
                src={item.image}
                alt={item.subtitle}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>

          {/* Text Side */}
          <div className={`relative flex items-center px-8 md:px-16 lg:px-24 py-24 ${idx % 2 !== 0 ? "lg:order-1" : ""}`}>
            {/* Giant background number */}
            <span className="showcase-number absolute top-1/2 -translate-y-1/2 left-8 font-serif font-bold text-[20vw] lg:text-[15vw] text-black/0 leading-none pointer-events-none select-none" style={{ letterSpacing: "-0.05em" }}>
              0{idx + 1}
            </span>

            {/* Decorative vertical line */}
            <div className="showcase-line absolute left-0 top-[15%] w-[1px] h-[70%] bg-black/10 origin-top hidden lg:block" />

            <div className="showcase-text relative z-10 max-w-lg">
              <p className="text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-4">{item.subtitle}</p>
              <h3 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>
                {item.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-black/90 font-medium mb-10">
                {item.description}
              </p>
              <a href="#" className="inline-flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-medium group">
                <span className="group-hover:opacity-60 transition-opacity">Explore Fabric</span>
                <span className="w-10 h-[1px] bg-black group-hover:w-16 transition-all duration-500" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
