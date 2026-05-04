"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sizeData = [
  { size: "36", collar: '14"', chest: '36"', waist: '30"', sleeve: '32"' },
  { size: "38", collar: '15"', chest: '38"', waist: '32"', sleeve: '33"' },
  { size: "39", collar: '15.5"', chest: '39"', waist: '33"', sleeve: '33.5"' },
  { size: "40", collar: '16"', chest: '40"', waist: '34"', sleeve: '34"' },
  { size: "41", collar: '16.5"', chest: '41"', waist: '35"', sleeve: '34.5"' },
  { size: "42", collar: '17"', chest: '42"', waist: '36"', sleeve: '35"' },
  { size: "43", collar: '17.5"', chest: '44"', waist: '38"', sleeve: '35.5"' },
];

export default function SizeGuidePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeFit, setActiveFit] = useState<"slim" | "classic">("slim");

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 60, opacity: 0, skewY: 3 }, { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: "power3.out" });
    }
    if (tableRef.current) {
      gsap.fromTo(tableRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" });
    }
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-black">
      <Navbar />

      <section className="pt-40 pb-24 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-6">Fit & Sizing</p>
          <h1 className="hero-anim font-serif font-bold text-5xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Size guide</h1>
          <p className="hero-anim text-sm md:text-base text-black/80 font-medium max-w-lg leading-relaxed">Our shirts follow European sizing. For the perfect fit, measure yourself and compare against the chart below.</p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      {/* Fit Toggle */}
      <section className="px-6 md:px-12 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex border border-black/10 overflow-hidden">
            {(["slim", "classic"] as const).map((fit) => (
              <button
                key={fit}
                onClick={() => setActiveFit(fit)}
                className={`px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 ${
                  activeFit === fit ? "bg-black text-white" : "bg-transparent text-black/80 font-medium hover:text-black hover:bg-black/5"
                }`}
              >
                {fit === "slim" ? "Tailored Slim" : "Classic Regular"}
              </button>
            ))}
          </div>
          <p className="text-xs text-black/90 font-medium font-medium mt-3">
            {activeFit === "slim" ? "Our slim fit runs slightly narrow through the body." : "Relaxed through the chest and waist for all-day comfort."}
          </p>
        </div>
      </section>

      {/* Interactive Table */}
      <section className="px-6 md:px-12 pb-16">
        <div ref={tableRef} className="max-w-5xl mx-auto">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-black/20">
                  <th className="pb-6 text-xs uppercase tracking-[0.2em] text-black/70 font-bold font-medium">EU Size</th>
                  <th className="pb-6 text-xs uppercase tracking-[0.2em] text-black/70 font-bold font-medium">Collar</th>
                  <th className="pb-6 text-xs uppercase tracking-[0.2em] text-black/70 font-bold font-medium">Chest</th>
                  <th className="pb-6 text-xs uppercase tracking-[0.2em] text-black/70 font-bold font-medium">Waist</th>
                  <th className="pb-6 text-xs uppercase tracking-[0.2em] text-black/70 font-bold font-medium">Sleeve</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row) => (
                  <tr
                    key={row.size}
                    onClick={() => setSelectedSize(selectedSize === row.size ? null : row.size)}
                    className={`border-b border-black/5 cursor-pointer transition-all duration-300 ${
                      selectedSize === row.size
                        ? "bg-black text-white"
                        : "hover:bg-black/[0.03]"
                    }`}
                  >
                    <td className="py-6 font-serif font-bold text-xl">{row.size}</td>
                    <td className={`py-6 text-sm ${selectedSize === row.size ? "text-white/70" : "text-black/90 font-medium"}`}>{row.collar}</td>
                    <td className={`py-6 text-sm ${selectedSize === row.size ? "text-white/70" : "text-black/90 font-medium"}`}>{row.chest}</td>
                    <td className={`py-6 text-sm ${selectedSize === row.size ? "text-white/70" : "text-black/90 font-medium"}`}>{row.waist}</td>
                    <td className={`py-6 text-sm ${selectedSize === row.size ? "text-white/70" : "text-black/90 font-medium"}`}>{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {sizeData.map((row) => (
              <div
                key={row.size}
                onClick={() => setSelectedSize(selectedSize === row.size ? null : row.size)}
                className={`border p-6 cursor-pointer transition-all duration-300 ${
                  selectedSize === row.size
                    ? "bg-black text-white border-black"
                    : "border-black/10 hover:border-black/30"
                }`}
              >
                <p className="font-serif font-bold text-2xl mb-4">Size {row.size}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className={`text-xs uppercase tracking-wider ${selectedSize === row.size ? "text-white/40" : "text-black/90 font-medium font-medium"}`}>Collar</span><p className={`mt-1 ${selectedSize === row.size ? "text-white/70" : "text-black/70"}`}>{row.collar}</p></div>
                  <div><span className={`text-xs uppercase tracking-wider ${selectedSize === row.size ? "text-white/40" : "text-black/90 font-medium font-medium"}`}>Chest</span><p className={`mt-1 ${selectedSize === row.size ? "text-white/70" : "text-black/70"}`}>{row.chest}</p></div>
                  <div><span className={`text-xs uppercase tracking-wider ${selectedSize === row.size ? "text-white/40" : "text-black/90 font-medium font-medium"}`}>Waist</span><p className={`mt-1 ${selectedSize === row.size ? "text-white/70" : "text-black/70"}`}>{row.waist}</p></div>
                  <div><span className={`text-xs uppercase tracking-wider ${selectedSize === row.size ? "text-white/40" : "text-black/90 font-medium font-medium"}`}>Sleeve</span><p className={`mt-1 ${selectedSize === row.size ? "text-white/70" : "text-black/70"}`}>{row.sleeve}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "How to Measure", desc: "Use a soft measuring tape. Measure collar at Adam's apple, chest at fullest point, waist at navel, and sleeve from shoulder seam to wrist." },
            { title: "Between Sizes?", desc: "We recommend sizing up. Our Tailored Slim fit runs slightly narrow. Classic Regular provides a more relaxed silhouette." },
            { title: "Need Help?", desc: "Our fit specialists are available Mon–Fri, 10am–7pm IST. Email fit@tessabefashion.com with your measurements for a personalized recommendation." },
          ].map((tip) => (
            <div key={tip.title} className="border-t border-black/10 pt-8 group hover:border-black/30 transition-colors duration-500">
              <h3 className="font-serif font-bold text-xl lowercase tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-300" style={{ letterSpacing: "-0.02em" }}>{tip.title}</h3>
              <p className="text-sm leading-relaxed text-black/80 font-medium">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
