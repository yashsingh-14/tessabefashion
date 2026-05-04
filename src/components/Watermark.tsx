"use client";

export default function Watermark() {
  return (
    <>
      {/* Side Vertical Watermark - Fixed for Global Visibility */}
      <div className="fixed top-1/2 -translate-y-1/2 right-4 pointer-events-none select-none z-[100] opacity-[0.15] hidden md:block">
        <p 
          className="text-[10px] uppercase tracking-[0.8em] whitespace-nowrap text-black dark:text-white"
          style={{ 
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)'
          }}
        >
          DEVELOPED BY <span className="font-bold">YASH SINGH</span> • DEVELOPED BY <span className="font-bold">YASH SINGH</span>
        </p>
      </div>

      {/* Fixed Bottom-Right Signature - Transparent & Official */}
      <div className="fixed bottom-8 right-8 z-[200] pointer-events-none select-none opacity-90 mix-blend-difference">
        <div className="flex items-center gap-4">
          <div className="w-19 h-[1.5px] bg-white"></div>
          <p className="text-[11px] md:text-[14px] uppercase tracking-[0.4em] text-white">
            Created by <span className="font-black">Yash Singh</span>
          </p>
        </div>
      </div>

      {/* Large Subtle Base Signature (Across background) */}
      <div className="fixed inset-0 pointer-events-none select-none z-[-1] opacity-[0.02] overflow-hidden flex items-center justify-center">
        <p className="font-serif text-[25vw] rotate-[-25deg] whitespace-nowrap">
          <span className="font-bold">YASH SINGH</span>
        </p>
      </div>
    </>
  );
}
