"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, Shield } from "lucide-react";

const sections = [
  { title: "Information We Collect", content: "We collect personal information you provide directly: name, email, shipping address, and payment details when placing an order. We also collect browsing data through cookies to improve your experience on our platform." },
  { title: "How We Use Your Data", content: "Your information is used solely for order processing, delivery coordination, customer service communication, and personalized recommendations. We never sell your data to third parties." },
  { title: "Data Protection", content: "All transactions are encrypted via SSL/TLS. Payment information is processed through PCI-DSS compliant gateways and is never stored on our servers. We implement industry-standard security measures to protect your personal data." },
  { title: "Cookies & Analytics", content: "We use essential cookies for site functionality and analytics cookies (Google Analytics) to understand how visitors interact with our site. You can disable non-essential cookies in your browser settings at any time." },
  { title: "Your Rights", content: "Under applicable data protection laws, you have the right to access, correct, delete, or export your personal data. To exercise any of these rights, contact privacy@tessabefashion.com." },
  { title: "Data Retention", content: "We retain order data for 7 years for tax and compliance purposes. Marketing preferences and account data are retained until you request deletion. Browsing data is anonymized after 26 months." },
  { title: "Third-Party Services", content: "We use select third-party services for shipping (DHL, BlueDart), payments (Razorpay, Stripe), and analytics (Google). Each operates under their own privacy policies and we encourage you to review them." },
  { title: "Contact Us", content: "For any privacy-related questions or concerns, contact our Data Protection Officer at privacy@tessabefashion.com or write to: Arama Tessile LLP, 102 Abhay House, 428 Kalbadevi Road, Mumbai 400002." },
];

const highlights = [
  { icon: "🔒", title: "SSL Encrypted", desc: "All data in transit" },
  { icon: "🚫", title: "Never Sold", desc: "Your data stays yours" },
  { icon: "📧", title: "Full Control", desc: "Delete anytime" },
];

export default function PrivacyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [openSection, setOpenSection] = useState<number | null>(0);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" });
    }
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-black">
      <Navbar />

      <section className="pt-40 pb-24 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-6">Legal</p>
          <h1 className="hero-anim font-serif font-bold text-5xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Privacy policy</h1>
          <p className="hero-anim text-sm md:text-base text-black/80 font-medium max-w-lg leading-relaxed">Your privacy is as important to us as the quality of our fabrics. This policy explains how we handle your personal information.</p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      {/* Quick Summary Cards */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          {highlights.map((h) => (
            <div key={h.title} className="bg-white/60 backdrop-blur-sm border border-black/5 p-6 text-center hover:border-black/20 transition-all duration-500 hover:-translate-y-1">
              <p className="text-2xl mb-3">{h.icon}</p>
              <p className="text-xs uppercase tracking-[0.2em] font-medium mb-1">{h.title}</p>
              <p className="text-[11px] text-black/70 font-bold">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accordion Content */}
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-black/90 font-medium font-medium mb-8">Last updated: January 2025</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sticky TOC */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                <p className="text-[10px] uppercase tracking-[0.3em] text-black/90 font-medium font-medium mb-4">Contents</p>
                <nav className="flex flex-col gap-2">
                  {sections.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setOpenSection(idx)}
                      className={`text-left text-xs leading-relaxed transition-all duration-300 py-1 ${
                        openSection === idx ? "text-black font-medium translate-x-2" : "text-black/90 font-medium font-medium hover:text-black/90 font-medium"
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Accordion */}
            <div className="lg:col-span-9 border-t border-black/10">
              {sections.map((section, idx) => (
                <div key={section.title} className="border-b border-black/5">
                  <button
                    onClick={() => setOpenSection(openSection === idx ? null : idx)}
                    className="w-full flex items-center justify-between py-7 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-black/20 font-mono">0{idx + 1}</span>
                      <h3 className="font-serif font-bold text-lg md:text-xl lowercase tracking-tight group-hover:text-black/70 transition-colors duration-300">{section.title}</h3>
                    </div>
                    <ChevronDown className={`w-4 h-4 stroke-[1.5] text-black/90 font-medium font-medium flex-shrink-0 transition-transform duration-500 ${openSection === idx ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openSection === idx ? "max-h-40 pb-7" : "max-h-0"}`}>
                    <p className="text-sm leading-relaxed text-black/80 font-medium pl-10">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
