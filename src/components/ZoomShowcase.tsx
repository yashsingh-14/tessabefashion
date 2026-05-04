"use client";

import ZoomParallax from "./ZoomParallax";

const zoomImages = [
  { src: "/images/fabric-1.jpg", alt: "Archive 1" },
  { src: "/images/pexels-bem-partington-1065018897-20531142.jpg", alt: "Archive 2" },
  { src: "/images/fabric-2.jpg", alt: "Archive 3" },
  { src: "/images/pexels-chris-f-38966-7755387.jpg", alt: "Archive 4" },
  { src: "/images/fabric-1.jpg", alt: "Archive 5" },
  { src: "/images/pexels-bem-partington-1065018897-20531142.jpg", alt: "Archive 6" },
  { src: "/images/fabric-2.jpg", alt: "Archive 7" },
];

export default function ZoomShowcase() {
  return (
    <section className="relative w-full bg-black">
      <ZoomParallax images={zoomImages} />
    </section>
  );
}
