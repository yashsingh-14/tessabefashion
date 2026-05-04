"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const shirts = [
  {
    id: 1,
    name: "The Signature Oxford",
    fabric: "Heavyweight Cotton",
    price: "$245",
    image: "/images/fabric-1.jpg"
  },
  {
    id: 2,
    name: "Riviera Poplin",
    fabric: "Silky Two-Ply",
    price: "$210",
    image: "/images/fabric-2.jpg"
  },
  {
    id: 3,
    name: "Amalfi Linen",
    fabric: "Breathable Weave",
    price: "$280",
    image: "/images/pexels-bem-partington-1065018897-20531142.jpg"
  },
  {
    id: 4,
    name: "Midnight Silk",
    fabric: "100% Mulberry Silk",
    price: "$450",
    image: "/images/pexels-chris-f-38966-7755387.jpg"
  }
];

export default function FeaturedCollection() {
  return (
    <section className="pt-12 pb-32 px-6 md:px-12 bg-[#E9E6E1]">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="font-serif text-5xl tracking-wide mb-4">Curated Essentials</h2>
            <p className="text-sm uppercase tracking-[0.2em] opacity-60">The Foundation of a Modern Wardrobe</p>
          </div>
          <Link href="/collection" className="group flex items-center gap-4 text-xs uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
            View All Shirts
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {shirts.map((shirt) => (
            <Link href={`/product/${shirt.id}`} key={shirt.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-neutral-200">
                <Image 
                  src={shirt.image}
                  alt={shirt.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-90"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-lg mb-1">{shirt.name}</h3>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">{shirt.fabric}</p>
                </div>
                <span className="text-sm">{shirt.price}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
