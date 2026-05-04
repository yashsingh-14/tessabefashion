"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote: "The moment I felt the fabric, I knew this wasn't just a shirt — it was an experience. Nothing else compares.",
    author: "Alessandro M.",
    title: "Creative Director, Milan",
  },
  {
    quote: "Tessa has redefined what I expect from tailoring. The attention to every single detail is simply extraordinary.",
    author: "James H.",
    title: "CEO, London",
  },
  {
    quote: "I've purchased bespoke from Savile Row to Naples. Tessa rivals them all at a fraction of the wait.",
    author: "Raj K.",
    title: "Entrepreneur, Mumbai",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate on testimonial change
  useEffect(() => {
    if (!quoteRef.current || !authorRef.current) return;

    const tl = gsap.timeline();

    // Exit
    tl.to([quoteRef.current, authorRef.current], {
      opacity: 0, y: -20, duration: 0.3, ease: "power2.in",
    });

    // Enter
    tl.fromTo(
      [quoteRef.current, authorRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    );
  }, [active]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Section heading animation
    const heading = sectionRef.current.querySelector(".test-heading");
    if (heading) {
      gsap.fromTo(heading,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }

    // Large decorative quotes
    const deco = sectionRef.current.querySelector(".deco-quote");
    if (deco) {
      gsap.fromTo(deco,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1, opacity: 0.04, duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-40 md:py-56 px-6 md:px-12 bg-[#1a1a1a] text-white overflow-hidden">
      {/* Decorative giant quote mark */}
      <div className="deco-quote absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[40vw] leading-none text-white/0 pointer-events-none select-none">
        &ldquo;
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Heading */}
        <div className="test-heading mb-20">
          <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-4">Testimonials</p>
          <h2 className="font-serif text-4xl md:text-5xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            Words from our patrons
          </h2>
        </div>

        {/* Quote */}
        <div className="min-h-[200px] flex flex-col items-center justify-center">
          <div ref={quoteRef}>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug tracking-tight mb-12 italic font-light" style={{ letterSpacing: "-0.01em" }}>
              &ldquo;{testimonials[active].quote}&rdquo;
            </p>
          </div>
          <div ref={authorRef}>
            <p className="text-sm uppercase tracking-[0.2em] font-medium mb-1">{testimonials[active].author}</p>
            <p className="text-xs uppercase tracking-[0.15em] text-white/40">{testimonials[active].title}</p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-16">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                active === idx ? "bg-white w-8" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
