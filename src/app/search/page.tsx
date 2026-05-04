"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const suggestions = ["Egyptian Cotton", "Pure Linen", "Summer 24", "Oxford Shirts", "Bespoke"];

const mockResults = [
  { id: "classic-oxford", name: "The Classic Oxford", category: "Formal", image: "/images/fabric-1.jpg" },
  { id: "italian-poplin", name: "Italian Poplin", category: "Premium", image: "/images/fabric-2.jpg" },
  { id: "egyptian-cotton", name: "Egyptian Cotton Slim", category: "Formal", image: "/images/pexels-bem-partington-1065018897-20531142.jpg" },
  { id: "irish-linen", name: "Pure Irish Linen", category: "Casual", image: "/images/pexels-chris-f-38966-7755387.jpg" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();

    // Entrance animation
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(".search-header", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(".search-input-wrap",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1, ease: "expo.out" },
      "-=0.4"
    )
    .fromTo(".search-suggestion",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" },
      "-=0.6"
    );
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true);
      // Animate results in
      gsap.fromTo(".result-card", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
    } else {
      setIsSearching(false);
    }
  }, [query]);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#E9E6E1] text-black relative">
      <Navbar />

      <section className="pt-40 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="search-header mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-black/40 mb-4">Discovery</p>
            <h1 className="font-serif text-5xl md:text-7xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              What are you looking for?
            </h1>
          </div>

          {/* Search Input */}
          <div className="search-input-wrap relative mb-12 origin-left">
            <div className="flex items-center border-b border-black/20 focus-within:border-black transition-colors duration-500 pb-4">
              <SearchIcon className="w-6 h-6 stroke-[1.2] mr-6 opacity-30" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search our archives..."
                className="w-full bg-transparent text-2xl md:text-4xl font-serif lowercase tracking-tight focus:outline-none placeholder:text-black/10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button onClick={() => setQuery("")} className="ml-4 p-2 hover:bg-black/5 rounded-full transition-colors">
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              )}
            </div>
          </div>

          {/* Suggestions */}
          {!isSearching && (
            <div className="flex flex-wrap justify-center gap-3">
              <span className="search-suggestion text-xs uppercase tracking-[0.2em] text-black/30 mr-2 py-2">Suggestions:</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="search-suggestion px-6 py-2 border border-black/10 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Results Grid */}
      {isSearching && (
        <section className="px-6 md:px-12 pb-32">
          <div ref={resultsRef} className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12 border-b border-black/5 pb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">Results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs uppercase tracking-[0.3em] text-black/40">{mockResults.length} items found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mockResults.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="result-card group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 mb-5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-2">{item.category}</p>
                  <h3 className="font-serif text-lg lowercase tracking-tight mb-2">{item.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {query.length > 2 && mockResults.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-black/30">No archives match your request.</p>
        </div>
      )}

      <Footer />
    </main>
  );
}
