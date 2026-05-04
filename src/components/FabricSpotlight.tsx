"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const fabrics = [
  {
    id: 1,
    name: "Egyptian Cotton",
    description: "Woven with an ultra-fine 120s two-ply yarn, delivering an exceptionally smooth, silk-like touch against the skin.",
    image: "/images/pexels-bem-partington-1065018897-20531142.jpg",
  },
  {
    id: 2,
    name: "Pure Irish Linen",
    description: "Breathable and naturally textured. The quintessential fabric for elegant, relaxed summer tailoring.",
    image: "/images/pexels-chris-f-38966-7755387.jpg",
  },
  {
    id: 3,
    name: "Brushed Flannel",
    description: "Expertly milled for a cashmere-soft finish. Providing warmth without sacrificing a sharp, tailored silhouette.",
    image: "/images/fabric-2.jpg",
  },
  {
    id: 4,
    name: "Italian Poplin",
    description: "A tightly woven, lustrous cotton poplin from the finest Italian mills. Crisp, refined, and impossibly smooth.",
    image: "/images/fabric-1.jpg",
  }
];

export default function FabricSpotlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Horizontal scroll effect
    gsap.to(slider, {
      xPercent: -100 + (100 / fabrics.length),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => "+=" + slider.offsetWidth,
        pin: true,
        scrub: 1,
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="h-screen w-full overflow-hidden bg-[#E9E6E1]">
      <div className="absolute top-12 left-12 z-10 mix-blend-difference">
        <h2 className="font-serif text-3xl text-white uppercase tracking-[0.2em]">The Archives</h2>
      </div>

      <div 
        ref={sliderRef}
        className="flex h-full w-[400vw]"
      >
        {fabrics.map((fabric, idx) => (
          <div key={fabric.id} className="w-[100vw] h-full flex items-center justify-center relative px-24">
            
            <div className="relative w-full max-w-6xl aspect-[21/9] overflow-hidden group">
              <Image 
                src={fabric.image}
                alt={fabric.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-700 group-hover:opacity-40"></div>
              
              <div className="absolute bottom-12 left-12 max-w-md text-white">
                <p className="text-xs uppercase tracking-[0.3em] mb-3 opacity-80">0{idx + 1} / 0{fabrics.length}</p>
                <h3 className="font-serif text-4xl mb-4">{fabric.name}</h3>
                <p className="text-sm font-light leading-relaxed opacity-0 translate-y-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">
                  {fabric.description}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
