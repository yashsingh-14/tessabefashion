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
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !videoContainerRef.current || !textRef.current) return;

    // Animate the clip-path from a small circle to full screen
    gsap.fromTo(
      videoContainerRef.current,
      {
        clipPath: "inset(35% 35% 35% 35% round 12px)",
      },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top -20%",
          scrub: 0.8,
        },
      }
    );

    // Fade and parallax the intro text
    gsap.to(textRef.current, {
      y: -120,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 10%",
        scrub: 1,
      },
    });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] bg-[#E9E6E1]"
    >
      {/* Intro Text */}
      <div
        ref={textRef}
        className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6 z-10"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-black/40 mb-6">The Process</p>
        <h2 className="font-serif text-4xl md:text-7xl lg:text-8xl lowercase tracking-tight text-black mb-6" style={{ letterSpacing: "-0.02em" }}>
          Crafted by hand
        </h2>
        <p className="text-sm md:text-base text-black/50 max-w-md leading-relaxed">
          Every stitch is a commitment to perfection. Every thread tells the story of our Mumbai heritage and 11+ years of craftsmanship.
        </p>
      </div>

      {/* Video Container with animated clip-path */}
      <div className="sticky top-0 h-screen w-full z-20">
        <div
          ref={videoContainerRef}
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "inset(35% 35% 35% 35% round 12px)" }}
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
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-white text-center px-6">
            <p className="text-xs uppercase tracking-[0.4em] opacity-70 mb-4">From Mill to Wardrobe</p>
            <h3 className="font-serif text-3xl md:text-5xl lowercase tracking-tight mb-4">
              Where tradition meets precision
            </h3>
            <div className="w-12 h-[1px] bg-white/40 mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
