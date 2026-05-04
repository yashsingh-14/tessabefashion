"use client";

import InfiniteGallery from "./InfiniteGallery";

const archiveImages = [
  { src: "/images/fabric-1.jpg", alt: "Fabric Archive 1" },
  { src: "/images/pexels-bem-partington-1065018897-20531142.jpg", alt: "Fabric Archive 2" },
  { src: "/images/fabric-2.jpg", alt: "Fabric Archive 3" },
  { src: "/images/pexels-chris-f-38966-7755387.jpg", alt: "Fabric Archive 4" },
  { src: "/images/fabric-1.jpg", alt: "Fabric Archive 5" },
  { src: "/images/pexels-bem-partington-1065018897-20531142.jpg", alt: "Fabric Archive 6" },
  { src: "/images/fabric-2.jpg", alt: "Fabric Archive 7" },
  { src: "/images/pexels-chris-f-38966-7755387.jpg", alt: "Fabric Archive 8" },
];

export default function WebGLShowcase() {
  return (
    <section className="relative w-full py-32 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-black to-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-16 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-4">The Archives</p>
        <h2 className="font-serif text-4xl md:text-6xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          Infinite dimension
        </h2>
        <p className="text-sm text-white/50 mt-6 max-w-md mx-auto">
          Explore our vast library of premium fabrics in an immersive 3D space. Scroll or use arrow keys.
        </p>
      </div>

      <div className="relative z-10 w-full h-[60vh] md:h-[80vh] border-y border-white/10">
        <InfiniteGallery images={archiveImages} speed={1.5} />
      </div>
    </section>
  );
}
