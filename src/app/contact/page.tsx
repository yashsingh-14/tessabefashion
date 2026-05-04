"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" });
    }
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll(".form-anim");
      gsap.fromTo(inputs, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "power3.out" });
    }
    if (infoRef.current) {
      const cards = infoRef.current.querySelectorAll(".info-card");
      gsap.fromTo(cards, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.6, ease: "power3.out" });
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#E9E6E1] text-black relative">
      <Navbar />
      <section className="pt-40 pb-24 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/40 mb-6">Get In Touch</p>
          <h1 className="hero-anim font-serif text-6xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Let&apos;s begin<br />a conversation</h1>
          <p className="hero-anim text-sm md:text-base text-black/50 max-w-lg leading-relaxed">Whether you&apos;re a garment manufacturer seeking premium fabrics, a designer exploring bespoke textiles, or an individual looking for the finest shirting — we&apos;d love to hear from you.</p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div ref={formRef} className="lg:col-span-7">
            <div className="bg-white p-10 md:p-16">
              <h2 className="font-serif text-3xl lowercase tracking-tight mb-10">Send us a message</h2>
              <form className="flex flex-col gap-8">
                <div className="form-anim grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div><label className="text-xs uppercase tracking-[0.2em] text-black/40 mb-3 block">First Name</label><input type="text" className="w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-black transition-colors" /></div>
                  <div><label className="text-xs uppercase tracking-[0.2em] text-black/40 mb-3 block">Last Name</label><input type="text" className="w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-black transition-colors" /></div>
                </div>
                <div className="form-anim"><label className="text-xs uppercase tracking-[0.2em] text-black/40 mb-3 block">Email</label><input type="email" className="w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-black transition-colors" /></div>
                <div className="form-anim"><label className="text-xs uppercase tracking-[0.2em] text-black/40 mb-3 block">Inquiry Type</label><select className="w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"><option>Bulk Fabric Order</option><option>Bespoke Shirting</option><option>Wholesale Partnership</option><option>Export Inquiry</option><option>General Question</option></select></div>
                <div className="form-anim"><label className="text-xs uppercase tracking-[0.2em] text-black/40 mb-3 block">Message</label><textarea rows={5} className="w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-black transition-colors resize-none" /></div>
                <button className="form-anim self-start bg-black text-white px-12 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors duration-300 relative overflow-hidden group mt-4"><span className="relative z-10">Send Message</span><div className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-full" /></button>
              </form>
            </div>
          </div>
          <div ref={infoRef} className="lg:col-span-5 flex flex-col gap-8">
            <div className="info-card bg-black text-white p-10"><MapPin className="w-5 h-5 stroke-[1.5] mb-6 opacity-50" /><h3 className="font-serif text-xl lowercase tracking-tight mb-3">Manufacturing Atelier</h3><p className="text-sm text-white/50 leading-relaxed">4th Floor, 437/B Kewal Industrial Estate,<br />Senapati Bapat Marg, Lower Parel,<br />Mumbai, Maharashtra 400013</p></div>
            <div className="info-card border border-black/10 p-10"><MapPin className="w-5 h-5 stroke-[1.5] mb-6 opacity-40" /><h3 className="font-serif text-xl lowercase tracking-tight mb-3">Registered Office</h3><p className="text-sm text-black/50 leading-relaxed">102 Abhay House, 428 Kalbadevi Road,<br />Mumbai, Maharashtra 400002</p></div>
            <div className="info-card border border-black/10 p-10"><Mail className="w-5 h-5 stroke-[1.5] mb-6 opacity-40" /><h3 className="font-serif text-xl lowercase tracking-tight mb-3">Write To Us</h3><p className="text-sm text-black/50">hello@tessabefashion.com<br />wholesale@tessabefashion.com</p></div>
            <div className="info-card border border-black/10 p-10"><Clock className="w-5 h-5 stroke-[1.5] mb-6 opacity-40" /><h3 className="font-serif text-xl lowercase tracking-tight mb-3">Atelier Hours</h3><p className="text-sm text-black/50">Mon — Fri: 10am — 7pm IST<br />Sat: 11am — 5pm IST<br />Sun: By appointment only</p></div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
