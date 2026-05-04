"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // Parallax effect on the video when scrolling
    gsap.to(videoRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Intro text sequence
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-small-text", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.5 }
    )
    .fromTo(".hero-title span", 
      { yPercent: 120 },
      { yPercent: 0, duration: 1.5, ease: "power4.out", stagger: 0.2 },
      "-=1.2"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Cinematic Full-Screen Video */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover opacity-80"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          {/* Using the provided high-quality local video */}
          <source src="/videos/6272385-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
      </div>

      {/* Cinematic Intro Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 text-center mt-16 pointer-events-none">
        <span className="hero-small-text text-xs md:text-sm uppercase tracking-[0.4em] mb-6 font-light">
          Mumbai Heritage Since 2013
        </span>
        
        <h1 className="hero-title font-serif text-4xl md:text-7xl lg:text-8xl tracking-widest mb-6 leading-tight flex flex-col pointer-events-auto">
          <div className="overflow-hidden"><span className="block">Master Tailoring.</span></div>
          <div className="overflow-hidden"><span className="block">Arama Legacy.</span></div>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">Scroll to Discover</span>
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[scroll-down_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-down {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(200%); }
        }
      `}} />
    </section>
  );
}
