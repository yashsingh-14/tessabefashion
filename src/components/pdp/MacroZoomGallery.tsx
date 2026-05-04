"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MacroZoomGalleryProps {
  images: { id: string; url: string; alt: string }[];
}

export default function MacroZoomGallery({ images }: MacroZoomGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate percentage position of cursor within the container (0-100%)
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset to center smoothly when mouse leaves
    setMousePosition({ x: 50, y: 50 });
  };

  const currentImage = images[currentIndex];

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image Gallery Container */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-100 cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* The base unzoomed image */}
            <Image
              src={currentImage.url}
              alt={currentImage.alt}
              fill
              priority
              className="object-cover transition-opacity duration-300"
              style={{ opacity: isHovering ? 0 : 1 }}
            />
            
            {/* The zoomed image overlaid on top, scaled up and positioned based on mouse */}
            <motion.div
              className="absolute inset-0 z-10 w-full h-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovering ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${currentImage.url})`,
                  backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                  backgroundSize: '250%', // 2.5x Zoom level
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setCurrentIndex(idx)}
            className="relative aspect-[4/5] bg-neutral-100 overflow-hidden"
          >
            <div className={`absolute inset-0 z-10 border-2 transition-colors duration-300 ${currentIndex === idx ? 'border-black' : 'border-transparent hover:border-black/20'}`} />
            <Image
              src={img.url}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
