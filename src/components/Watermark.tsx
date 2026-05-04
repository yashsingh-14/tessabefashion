"use client";

export default function Watermark() {
  return (
    <>
      {/* Side Vertical Watermark - Fixed for Global Visibility */}
      <div className="fixed top-1/2 -translate-y-1/2 right-4 pointer-events-none select-none z-[100] hidden md:block mix-blend-difference opacity-90">
        <p 
          className="text-[11px] font-bold uppercase tracking-[0.6em] whitespace-nowrap text-white"
          style={{ 
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}
        >
          DEVELOPED BY <span className="font-black">YASH SINGH</span> • DEVELOPED BY <span className="font-black">YASH SINGH</span>
        </p>
      </div>

      {/* Fixed Bottom-Right Signature - Boldly Transparent */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[200] pointer-events-none select-none">
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/20 shadow-2xl">
          <div className="w-12 md:w-16 h-[2px] bg-white/80"></div>
          <p className="text-[12px] md:text-[14px] uppercase tracking-[0.5em] text-white/90">
            Created by <span className="font-black text-white">Yash Singh</span>
          </p>
        </div>
      </div>

      {/* Large Subtle Base Signature (Across background) */}
      <div className="fixed inset-0 pointer-events-none select-none z-[-1] opacity-[0.02] overflow-hidden flex items-center justify-center">
        <p className="font-serif font-bold text-[25vw] rotate-[-25deg] whitespace-nowrap">
          <span className="font-bold">YASH SINGH</span>
        </p>
      </div>
    </>
  );
}
