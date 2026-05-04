"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Simple utility for class names
const cn = (...classes: (string | undefined | false | null)[]) => classes.filter(Boolean).join(" ");

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 350 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      {/* 3D Extrusion Layers */}
      {[...Array(5)].map((_, i) => (
        <text
          key={i}
          x="50%"
          y="50%"
          dx={(i + 1) * -0.6}
          dy={(i + 1) * 0.6}
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth="0.4"
          fontSize="90"
          textLength="340"
          lengthAdjust="spacing"
          className="fill-[#050505] stroke-neutral-800"
          style={{ opacity: hovered ? 0.8 : 0.4 }}
        >
          {text}
        </text>
      ))}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        fontSize="90"
        textLength="340"
        lengthAdjust="spacing"
        className="fill-transparent stroke-neutral-200 font-[helvetica] font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        fontSize="90"
        textLength="340"
        lengthAdjust="spacing"
        className="fill-transparent stroke-[#3ca2fa] font-[helvetica] font-bold dark:stroke-[#3ca2fa99]"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        fontSize="90"
        textLength="340"
        lengthAdjust="spacing"
        className="fill-transparent font-[helvetica] font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
      }}
    />
  );
};

export default function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden flex flex-col pt-24">
      <FooterBackgroundGradient />
      
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 flex flex-col">
        {/* Top Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-sans text-3xl font-bold tracking-tight mb-6">BeFashion</h3>
            <p className="text-sm font-light leading-relaxed max-w-sm opacity-70 mb-4">
              A Mumbai-based textile manufacturing house, est. 2013. Specializing in premium printed & woven cotton fabrics, fabric processing, and finishing — serving garment makers across 15+ countries.
            </p>
            <p className="text-xs font-light opacity-40">
              Regd. Office: 102 Abhay House, 428 Kalbadevi Road, Mumbai 400002<br />
              Factory: Kewal Industrial Estate, Lower Parel, Mumbai 400013
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-6 opacity-50">Explore</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/collection" className="hover:opacity-70 transition-opacity">The Collection</Link></li>
              <li><Link href="/archives" className="hover:opacity-70 transition-opacity">The Archives</Link></li>
              <li><Link href="/story" className="hover:opacity-70 transition-opacity">Our Story</Link></li>
              <li><Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-6 opacity-50">Assistance</h4>
            <ul className="space-y-4 text-sm font-light">
              <li><Link href="/contact" className="hover:opacity-70 transition-opacity">Get In Touch</Link></li>
              <li><Link href="/shipping" className="hover:opacity-70 transition-opacity">Shipping & Returns</Link></li>
              <li><Link href="/size-guide" className="hover:opacity-70 transition-opacity">Size Guide</Link></li>
              <li><Link href="/care" className="hover:opacity-70 transition-opacity">Fabric Care</Link></li>
            </ul>
          </div>
        </div>

        {/* Dynamic Hover Text */}
        <div className="w-full mt-10 md:mt-16 mb-0 md:-mb-4">
          <TextHoverEffect text="TESSA" duration={0.3} className="w-full h-auto" />
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light opacity-50">
          <p>&copy; {new Date().getFullYear()} Tessa Be Fashion — A unit of Arama Tessile LLP. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
