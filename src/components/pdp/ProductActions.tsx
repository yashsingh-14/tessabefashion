"use client";

import { useState } from "react";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductActions() {
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("details");

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-8 mt-10">
      
      {/* Quantity & Add to Cart */}
      <div className="flex gap-4 h-14">
        {/* Quantity Selector */}
        <div className="flex items-center justify-between border border-black w-32 px-4">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-1 hover:opacity-50 transition-opacity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="p-1 hover:opacity-50 transition-opacity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button className="flex-1 bg-black text-white text-sm uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors duration-300 relative overflow-hidden group">
          <span className="relative z-10">Add to Cart - $295</span>
          {/* Subtle hover shine effect */}
          <div className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-full" />
        </button>
      </div>

      {/* Accordions */}
      <div className="border-t border-neutral-200 mt-4">
        <AccordionItem 
          id="details"
          title="Product Details"
          isOpen={activeAccordion === "details"}
          onClick={() => toggleAccordion("details")}
        >
          <p className="text-sm leading-relaxed text-neutral-600 mb-4">
            Crafted from 100% long-staple Egyptian cotton, woven in Italy. This shirt features our signature tailored fit, mother-of-pearl buttons, and a meticulously constructed collar designed to maintain its shape perfectly throughout the day.
          </p>
          <ul className="text-sm text-neutral-600 space-y-2 list-disc pl-4 marker:text-neutral-300">
            <li>120s two-ply cotton poplin</li>
            <li>Genuine mother-of-pearl buttons</li>
            <li>Single-needle stitching throughout</li>
            <li>Made in Portugal</li>
          </ul>
        </AccordionItem>
        
        <AccordionItem 
          id="shipping"
          title="Shipping & Returns"
          isOpen={activeAccordion === "shipping"}
          onClick={() => toggleAccordion("shipping")}
        >
          <p className="text-sm leading-relaxed text-neutral-600">
            Complimentary express shipping on all orders. Returns are accepted within 30 days of delivery. The garment must be unworn and in its original packaging.
          </p>
        </AccordionItem>
      </div>
    </div>
  );
}

function AccordionItem({ id, title, isOpen, onClick, children }: any) {
  return (
    <div className="border-b border-neutral-200">
      <button 
        onClick={onClick}
        className="flex items-center justify-between w-full py-5 text-left hover:text-neutral-600 transition-colors"
      >
        <span className="text-xs uppercase tracking-[0.15em] font-medium">{title}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 stroke-[1.5]" /> : <ChevronDown className="w-4 h-4 stroke-[1.5]" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
