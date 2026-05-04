"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MacroZoomGallery from "@/components/pdp/MacroZoomGallery";
import ProductSelectors from "@/components/pdp/ProductSelectors";
import ProductActions from "@/components/pdp/ProductActions";

// Mock Data for Phase 3
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


export default function ProductPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-white text-black relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] mb-12 text-neutral-500">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <span className="cursor-pointer hover:text-black transition-colors">Shirts</span>
          <span>/</span>
          <span className="text-black font-medium">{MOCK_PRODUCT.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Image Gallery (Sticky) */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-32">
              <MacroZoomGallery images={MOCK_PRODUCT.images} />
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="lg:col-span-5 flex flex-col pt-8 lg:pt-0">
            {/* Header */}
            <h1 className="font-serif text-4xl md:text-5xl lowercase tracking-tight mb-4">
              {MOCK_PRODUCT.name}
            </h1>
            <p className="text-xl font-light tracking-wide mb-8">
              {MOCK_PRODUCT.price}
            </p>
            <p className="text-sm leading-relaxed text-neutral-600 mb-12">
              {MOCK_PRODUCT.description}
            </p>

            {/* Selectors */}
            <ProductSelectors 
              label="Collar Style" 
              options={MOCK_PRODUCT.collars} 
              defaultSelected="spread" 
            />
            
            <ProductSelectors 
              label="Fit Profile" 
              options={MOCK_PRODUCT.fits} 
              defaultSelected="slim" 
            />
            
            <ProductSelectors 
              label="Neck Size (EU)" 
              options={MOCK_PRODUCT.sizes} 
              defaultSelected="40" 
            />

            {/* Actions (Add to cart, details accordions) */}
            <ProductActions />
          </div>

        </div>
      </div>
    </main>
  );
}
