"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function PrivacyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" });
    }
    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll(".privacy-item");
      gsap.fromTo(items, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.5, ease: "power3.out" });
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#E9E6E1] text-black">
      <Navbar />
      <section className="pt-40 pb-24 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/40 mb-6">Legal</p>
          <h1 className="hero-anim font-serif text-5xl md:text-8xl lg:text-9xl lowercase tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>Privacy policy</h1>
          <p className="hero-anim text-sm md:text-base text-black/50 max-w-lg leading-relaxed">Your privacy is as important to us as the quality of our fabrics. This policy explains how we handle your personal information.</p>
          <div className="hero-anim w-24 h-[1px] bg-black/20 mt-10" />
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-black/30 mb-12">Last updated: January 2025</p>
          {sections.map((section, idx) => (
            <div key={section.title} className="privacy-item border-t border-black/10 py-10">
              <div className="flex items-start gap-6">
                <span className="text-xs text-black/20 font-mono mt-1 flex-shrink-0">0{idx + 1}</span>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl lowercase tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>{section.title}</h3>
                  <p className="text-sm leading-relaxed text-black/50">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
