"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MaskedVideoReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !videoContainerRef.current) return;

    // Animate the clip-path from a centered box to full screen
    gsap.fromTo(
      videoContainerRef.current,
      {
        clipPath: "inset(15% 15% 15% 15% round 12px)",
      },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#E9E6E1] overflow-hidden"
    >
      {/* Video Container with animated clip-path */}
      <div className="relative h-screen w-full overflow-hidden">
        <div
          ref={videoContainerRef}
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "inset(15% 15% 15% 15% round 12px)" }}
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/8306452-uhd_4096_2160_25fps.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Overlay Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
            <p className="text-xs uppercase tracking-[0.4em] opacity-70 mb-4">From Mill to Wardrobe</p>
            <h3 className="font-serif font-bold text-3xl md:text-5xl lowercase tracking-tight mb-4">
              Where tradition meets precision
            </h3>
            <div className="w-12 h-[1px] bg-white/40 mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
