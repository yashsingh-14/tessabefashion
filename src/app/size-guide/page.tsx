"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sizeData = [
  { size: "36", collar: "14\"", chest: "36\"", waist: "30\"", sleeve: "32\"" },
  { size: "38", collar: "15\"", chest: "38\"", waist: "32\"", sleeve: "33\"" },
  { size: "39", collar: "15.5\"", chest: "39\"", waist: "33\"", sleeve: "33.5\"" },
  { size: "40", collar: "16\"", chest: "40\"", waist: "34\"", sleeve: "34\"" },
  { size: "41", collar: "16.5\"", chest: "41\"", waist: "35\"", sleeve: "34.5\"" },
  { size: "42", collar: "17\"", chest: "42\"", waist: "36\"", sleeve: "35\"" },
  { size: "43", collar: "17.5\"", chest: "44\"", waist: "38\"", sleeve: "35.5\"" },
];

export default function SizeGuidePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" });
    }
    if (tableRef.current) {
      gsap.fromTo(tableRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" });
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#E9E6E1] text-black">
      <Navbar />
      <section className="pt-40 pb-24 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/40 mb-6">Fit & Sizing</p>
          <h1 className="hero-anim font-serif text-5xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Size guide</h1>
          <p className="hero-anim text-sm md:text-base text-black/50 max-w-lg leading-relaxed">Our shirts follow European sizing. For the perfect fit, measure yourself and compare against the chart below. When in doubt, size up — our tailored fit runs slim.</p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      <section className="px-6 md:px-12 pb-16">
        <div ref={tableRef} className="max-w-5xl mx-auto">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-black/20">
                  <th className="pb-6 text-xs uppercase tracking-[0.2em] text-black/40 font-medium">EU Size</th>
                  <th className="pb-6 text-xs uppercase tracking-[0.2em] text-black/40 font-medium">Collar</th>
                  <th className="pb-6 text-xs uppercase tracking-[0.2em] text-black/40 font-medium">Chest</th>
                  <th className="pb-6 text-xs uppercase tracking-[0.2em] text-black/40 font-medium">Waist</th>
                  <th className="pb-6 text-xs uppercase tracking-[0.2em] text-black/40 font-medium">Sleeve</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row) => (
                  <tr key={row.size} className="border-b border-black/5 hover:bg-black/[0.02] transition-colors">
                    <td className="py-6 font-serif text-xl">{row.size}</td>
                    <td className="py-6 text-sm text-black/60">{row.collar}</td>
                    <td className="py-6 text-sm text-black/60">{row.chest}</td>
                    <td className="py-6 text-sm text-black/60">{row.waist}</td>
                    <td className="py-6 text-sm text-black/60">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {sizeData.map((row) => (
              <div key={row.size} className="border border-black/10 p-6">
                <p className="font-serif text-2xl mb-4">Size {row.size}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-black/30 text-xs uppercase tracking-wider">Collar</span><p className="text-black/70 mt-1">{row.collar}</p></div>
                  <div><span className="text-black/30 text-xs uppercase tracking-wider">Chest</span><p className="text-black/70 mt-1">{row.chest}</p></div>
                  <div><span className="text-black/30 text-xs uppercase tracking-wider">Waist</span><p className="text-black/70 mt-1">{row.waist}</p></div>
                  <div><span className="text-black/30 text-xs uppercase tracking-wider">Sleeve</span><p className="text-black/70 mt-1">{row.sleeve}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "How to Measure", desc: "Use a soft measuring tape. Measure collar at Adam's apple, chest at fullest point, waist at navel, and sleeve from shoulder seam to wrist." },
            { title: "Between Sizes?", desc: "We recommend sizing up. Our Tailored Slim fit runs slightly narrow. Classic Regular provides a more relaxed silhouette." },
            { title: "Need Help?", desc: "Our fit specialists are available Mon–Fri, 10am–7pm IST. Email fit@tessabefashion.com with your measurements for a personalized recommendation." },
          ].map((tip) => (
            <div key={tip.title} className="border-t border-black/10 pt-8">
              <h3 className="font-serif text-xl lowercase tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>{tip.title}</h3>
              <p className="text-sm leading-relaxed text-black/50">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
