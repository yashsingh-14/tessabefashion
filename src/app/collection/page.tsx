"use client";

import { useRef, useEffect, useState } from "react";
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
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    // Hero text animation
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const elements = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(elements,
        { y: 60, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, []);

  // Filter products with animation
  useEffect(() => {
    const filtered = activeFilter === "All"
      ? products
      : products.filter(p => p.category === activeFilter);

    setFilteredProducts(filtered);

    // Animate the grid cards in after filter change
    requestAnimationFrame(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".product-card");
        gsap.fromTo(cards,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }
        );
      }
    });
  }, [activeFilter]);

  const filterCount = (cat: string) => {
    if (cat === "All") return products.length;
    return products.filter(p => p.category === cat).length;
  };

  return (
    <main className="min-h-screen bg-transparent text-black relative">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 overflow-hidden">
        <div ref={heroRef} className="max-w-7xl mx-auto relative z-10">
          <p className="hero-anim text-sm uppercase tracking-[0.4em] text-black/80 font-bold mb-6">The Collection</p>
          <h1 className="hero-anim font-serif font-bold text-6xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8 font-bold text-black" style={{ letterSpacing: "-0.02em" }}>
            Every shirt,<br />a statement
          </h1>
          <p className="hero-anim text-base md:text-lg text-black/90 font-medium max-w-lg leading-relaxed">
            Explore our curated selection of meticulously crafted shirts, each representing the pinnacle of fabric quality and 11+ years of tailoring expertise from our Mumbai atelier.
          </p>
          <div className="hero-anim w-24 h-[2px] bg-black/60 mt-10" />
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-6 md:px-12 pb-16 sticky top-20 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 bg-white/40 backdrop-blur-md py-4 -mx-4 px-4 rounded-sm border border-black/5">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`group relative px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium border transition-all duration-500 overflow-hidden ${
                  activeFilter === filter
                    ? "bg-black text-white border-black"
                    : "bg-transparent text-black/90 font-medium border-black/20 hover:border-black hover:text-black"
                }`}
              >
                <span className="relative z-10">{filter}</span>
                <span className={`ml-2 relative z-10 text-[10px] ${activeFilter === filter ? "text-white/50" : "text-black/90 font-medium font-medium"}`}>
                  ({filterCount(filter)})
                </span>
                {/* Hover fill animation */}
                <div className={`absolute inset-0 bg-black transition-transform duration-500 origin-left ${
                  activeFilter === filter ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
                {activeFilter !== filter && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.2em] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    {filter} <span className="ml-2 text-[10px] text-white/50">({filterCount(filter)})</span>
                  </span>
                )}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2 text-xs text-black/70 font-bold">
              <span className="uppercase tracking-[0.2em]">{filteredProducts.length} items</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 pb-32">
        <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product, idx) => (
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
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quick view overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="inline-block bg-white text-black text-xs uppercase tracking-[0.2em] px-6 py-3 font-medium hover:bg-black hover:text-white transition-colors duration-300">
                    Quick View
                  </span>
                </div>

                {/* Category tag */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
                  <span className="text-[10px] font-mono text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="relative">
                <p className="text-xs uppercase tracking-[0.2em] text-black/70 font-bold mb-2 transition-colors duration-300 group-hover:text-black/90 font-medium">{product.category}</p>
                <h3 className="font-serif font-bold text-lg lowercase tracking-tight mb-1 transition-transform duration-300 group-hover:translate-x-1">{product.name}</h3>
                <p className="text-sm text-black/90 font-medium font-light">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-6">Bespoke Service</p>
          <h2 className="font-serif font-bold text-4xl md:text-6xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>
            Can&apos;t find what<br />you&apos;re looking for?
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed mb-10">
            Our master tailors can create a shirt to your exact specifications. Choose from over 100 premium fabrics and customize every detail.
          </p>
          <Link href="/contact" className="inline-block bg-white text-black px-12 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-100 transition-colors duration-300">
            Start Bespoke Order
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
