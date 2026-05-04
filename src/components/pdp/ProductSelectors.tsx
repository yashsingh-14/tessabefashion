"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type SelectorOption = {
  id: string;
  label: string;
};

interface ProductSelectorsProps {
  label: string;
  options: SelectorOption[];
  defaultSelected?: string;
  onChange?: (id: string) => void;
}

export default function ProductSelectors({ label, options, defaultSelected, onChange }: ProductSelectorsProps) {
  const [selected, setSelected] = useState(defaultSelected || options[0]?.id);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (onChange) onChange(id);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-500 mb-4">{label}</h3>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = selected === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={cn(
                "relative px-6 py-3 text-sm font-medium transition-colors duration-300",
                isSelected ? "text-white" : "text-black hover:bg-neutral-100"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId={`bg-${label}`}
                  className="absolute inset-0 bg-black border border-black z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {!isSelected && (
                <div className="absolute inset-0 border border-neutral-300 z-0 transition-colors duration-300" />
              )}
              <span className="relative z-10">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
