"use client";

import React, { useState } from 'react';
import Image from 'next/image';

// --- Data for the image accordion ---
const accordionItems = [
  {
    id: 1,
    title: 'Egyptian Cotton',
    imageUrl: '/images/fabric-1.jpg',
  },
  {
    id: 2,
    title: 'Premium Silk',
    imageUrl: '/images/fabric-2.jpg',
  },
  {
    id: 3,
    title: 'Sustainable Linen',
    imageUrl: '/images/pexels-chris-f-38966-7755387.jpg',
  },
  {
    id: 4,
    title: 'Custom Blends',
    imageUrl: '/images/pexels-bem-partington-1065018897-20531142.jpg',
  },
  {
    id: 5,
    title: 'Artisan Jacquard',
    imageUrl: '/images/fabric-1.jpg',
  },
];

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter }: { item: any, isActive: boolean, onMouseEnter: () => void }) => {
  return (
    <div
      className={`
        relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out
        ${isActive ? 'w-[250px] md:w-[400px]' : 'w-[50px] md:w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        className="absolute inset-0 object-cover"
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors duration-500"></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white font-serif text-lg md:text-xl whitespace-nowrap tracking-wide
          transition-all duration-300 ease-in-out z-10 drop-shadow-md
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0 opacity-100' // Active state: horizontal, bottom-center
              // Inactive state: vertical, positioned at the bottom, for all screen sizes
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90 opacity-70'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};


// --- Main App Component ---
export default function FabricAccordion() {
  const [activeIndex, setActiveIndex] = useState(2);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white font-sans pt-0 pb-16 md:pb-24">
      <section className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-6 font-semibold">Our Expertise</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 leading-[0.95] tracking-tight lowercase">
              Discover our<br />signature weaves
            </h2>
            <p className="mt-8 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Explore the pinnacle of textile craftsmanship, from sustainable linens to luxurious export-grade silks tailored for global fashion houses.
            </p>
            <div className="mt-10">
              <a
                href="#collection"
                className="inline-block bg-gray-900 text-white text-sm tracking-[0.2em] uppercase px-10 py-4 rounded-sm shadow-md hover:bg-black hover:-translate-y-1 transition-all duration-300"
              >
                View Collection
              </a>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full lg:w-7/12 mt-10 lg:mt-0">
            <div className="flex flex-row items-center justify-center lg:justify-end gap-2 md:gap-4 overflow-x-auto p-4 hide-scrollbar">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
