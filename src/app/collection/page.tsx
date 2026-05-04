"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  { id: "classic-oxford", name: "The Classic Oxford", price: "$295", category: "Formal", image: "/images/fabric-1.jpg" },
  { id: "italian-poplin", name: "Italian Poplin", price: "$325", category: "Formal", image: "/images/fabric-2.jpg" },
  { id: "egyptian-cotton", name: "Egyptian Cotton Slim", price: "$345", category: "Premium", image: "/images/pexels-bem-partington-1065018897-20531142.jpg" },
  { id: "irish-linen", name: "Pure Irish Linen", price: "$310", category: "Casual", image: "/images/pexels-chris-f-38966-7755387.jpg" },
  { id: "brushed-flannel", name: "Brushed Flannel", price: "$275", category: "Casual", image: "/images/fabric-1.jpg" },
  { id: "twill-weave", name: "Royal Twill Weave", price: "$365", category: "Premium", image: "/images/fabric-2.jpg" },
  { id: "micro-check", name: "Micro Check Poplin", price: "$285", category: "Formal", image: "/images/pexels-chris-f-38966-7755387.jpg" },
  { id: "herringbone", name: "Herringbone Elegance", price: "$355", category: "Premium", image: "/images/pexels-bem-partington-1065018897-20531142.jpg" },
];

const filters = ["All", "Formal", "Casual", "Premium"];

export default function CollectionPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero text animation
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const elements = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(elements,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }

    // Grid cards stagger animation
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".product-card");
      gsap.fromTo(cards,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#E9E6E1] text-black relative">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-40 pb-24 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/40 mb-6">The Collection</p>
          <h1 className="hero-anim font-serif text-6xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>
            Every shirt,<br />a statement
          </h1>
          <p className="hero-anim text-sm md:text-base text-black/50 max-w-lg leading-relaxed">
            Explore our curated selection of meticulously crafted shirts, each representing the pinnacle of fabric quality and 11+ years of tailoring expertise from our Mumbai atelier.
          </p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4">
          {filters.map((filter, idx) => (
            <button
              key={filter}
              className={`px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium border transition-all duration-300 ${
                idx === 0
                  ? "bg-black text-white border-black"
                  : "bg-transparent text-black/60 border-black/20 hover:border-black hover:text-black"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 pb-32">
        <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="product-card group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 mb-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                
                {/* Quick view overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block bg-white text-black text-xs uppercase tracking-[0.2em] px-6 py-3 font-medium">
                    Quick View
                  </span>
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-2">{product.category}</p>
              <h3 className="font-serif text-lg lowercase tracking-tight mb-1">{product.name}</h3>
              <p className="text-sm text-black/60">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
