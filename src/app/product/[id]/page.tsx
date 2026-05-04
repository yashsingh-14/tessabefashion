"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MacroZoomGallery from "@/components/pdp/MacroZoomGallery";
import ProductSelectors from "@/components/pdp/ProductSelectors";
import ProductActions from "@/components/pdp/ProductActions";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Mock Data
const MOCK_PRODUCT = {
  id: "classic-oxford",
  name: "The Classic Oxford",
  price: "$295",
  description: "A masterclass in understated elegance. The Classic Oxford is meticulously tailored from the finest Italian cotton, featuring a timeless silhouette that transitions effortlessly from day to evening.",
  images: [
    { id: "img1", url: "/images/fabric-1.jpg", alt: "Shirt Front" },
    { id: "img2", url: "/images/pexels-bem-partington-1065018897-20531142.jpg", alt: "Fabric Detail" },
    { id: "img3", url: "/images/pexels-chris-f-38966-7755387.jpg", alt: "Collar Detail" }
  ],
  collars: [
    { id: "spread", label: "Spread" },
    { id: "cutaway", label: "Cutaway" },
    { id: "button-down", label: "Button Down" }
  ],
  fits: [
    { id: "slim", label: "Tailored Slim" },
    { id: "classic", label: "Classic Regular" }
  ],
  sizes: [
    { id: "38", label: "38" }, { id: "39", label: "39" }, { id: "40", label: "40" },
    { id: "41", label: "41" }, { id: "42", label: "42" }, { id: "43", label: "43" }
  ]
};

const relatedProducts = [
  { id: "italian-poplin", name: "Italian Poplin", price: "$325", category: "Formal", image: "/images/fabric-2.jpg" },
  { id: "egyptian-cotton", name: "Egyptian Cotton Slim", price: "$345", category: "Premium", image: "/images/pexels-bem-partington-1065018897-20531142.jpg" },
  { id: "irish-linen", name: "Pure Irish Linen", price: "$310", category: "Casual", image: "/images/pexels-chris-f-38966-7755387.jpg" },
  { id: "brushed-flannel", name: "Brushed Flannel", price: "$275", category: "Casual", image: "/images/fabric-1.jpg" },
];

export default function ProductPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Animate product details
    if (detailsRef.current) {
      const els = detailsRef.current.querySelectorAll(".detail-anim");
      gsap.fromTo(els,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 }
      );
    }

    // Animate gallery
    if (galleryRef.current) {
      gsap.fromTo(galleryRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }

    // Animate related products
    if (relatedRef.current) {
      const cards = relatedRef.current.querySelectorAll(".related-card");
      gsap.fromTo(cards,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: relatedRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-white text-black relative">
      <Navbar />

      <div className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] mb-12 text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors duration-300">Home</Link>
            <span>/</span>
            <Link href="/collection" className="hover:text-black transition-colors duration-300">Collection</Link>
            <span>/</span>
            <span className="text-black font-medium">{MOCK_PRODUCT.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

            {/* Left Column: Image Gallery (Sticky) */}
            <div ref={galleryRef} className="lg:col-span-7">
              <div className="lg:sticky lg:top-32">
                <MacroZoomGallery images={MOCK_PRODUCT.images} />
              </div>
            </div>

            {/* Right Column: Product Details */}
            <div ref={detailsRef} className="lg:col-span-5 flex flex-col pt-8 lg:pt-0">
              {/* Header */}
              <p className="detail-anim text-xs uppercase tracking-[0.3em] text-black/70 font-bold mb-3">Premium Collection</p>
              <h1 className="detail-anim font-serif font-bold text-4xl md:text-5xl lowercase tracking-tight mb-4">
                {MOCK_PRODUCT.name}
              </h1>
              <p className="detail-anim text-xl font-light tracking-wide mb-8">
                {MOCK_PRODUCT.price}
              </p>

              {/* Decorative line */}
              <div className="detail-anim w-16 h-[1px] bg-black/15 mb-8" />

              <p className="detail-anim text-sm leading-relaxed text-neutral-600 mb-12">
                {MOCK_PRODUCT.description}
              </p>

              {/* Selectors */}
              <div className="detail-anim">
                <ProductSelectors
                  label="Collar Style"
                  options={MOCK_PRODUCT.collars}
                  defaultSelected="spread"
                />
              </div>

              <div className="detail-anim">
                <ProductSelectors
                  label="Fit Profile"
                  options={MOCK_PRODUCT.fits}
                  defaultSelected="slim"
                />
              </div>

              <div className="detail-anim">
                <ProductSelectors
                  label="Neck Size (EU)"
                  options={MOCK_PRODUCT.sizes}
                  defaultSelected="40"
                />
              </div>

              {/* Actions (Add to cart, details accordions) */}
              <div className="detail-anim">
                <ProductActions />
              </div>

              {/* Trust Badges */}
              <div className="detail-anim mt-12 pt-8 border-t border-black/5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { label: "Free Shipping", sub: "Orders ₹5,000+" },
                    { label: "47-Point QC", sub: "Every fabric" },
                    { label: "Easy Returns", sub: "14-day policy" },
                  ].map((badge) => (
                    <div key={badge.label} className="py-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-black/70 mb-1">{badge.label}</p>
                      <p className="text-[10px] text-black/90 font-medium font-medium">{badge.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="px-6 md:px-12 py-24 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-4">Complete The Look</p>
            <h2 className="font-serif font-bold text-4xl md:text-5xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              You may also like
            </h2>
          </div>

          <div ref={relatedRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="related-card group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 mb-5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block bg-white text-black text-xs uppercase tracking-[0.2em] px-6 py-3 font-medium">
                      Quick View
                    </span>
                  </div>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/70 font-bold mb-2">{product.category}</p>
                <h3 className="font-serif font-bold text-lg lowercase tracking-tight mb-1">{product.name}</h3>
                <p className="text-sm text-black/90 font-medium">{product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
