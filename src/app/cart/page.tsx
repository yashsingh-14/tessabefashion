"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Minus, Plus, X, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cartItems = [
  { id: 1, name: "The Classic Oxford", size: "40", collar: "Spread", fit: "Tailored Slim", price: 295, qty: 1, image: "/images/fabric-1.jpg" },
  { id: 2, name: "Italian Poplin", size: "41", collar: "Cutaway", fit: "Classic Regular", price: 325, qty: 1, image: "/images/fabric-2.jpg" },
];

export default function CartPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.3 });
      const els = heroRef.current.querySelectorAll(".hero-anim");
      tl.fromTo(els, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" });
    }
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll(".cart-item");
      gsap.fromTo(items, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "power3.out" });
    }
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <main className="min-h-screen bg-[#E9E6E1] text-black">
      <Navbar />
      <section className="pt-40 pb-12 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/40 mb-6">Your Selection</p>
          <h1 className="hero-anim font-serif text-5xl md:text-8xl lowercase tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>Shopping bag</h1>
          <p className="hero-anim text-sm text-black/40">{cartItems.length} items</p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Cart Items */}
          <div ref={itemsRef} className="lg:col-span-8">
            <div className="border-t border-black/10">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item flex flex-col sm:flex-row gap-6 py-8 border-b border-black/5">
                  <div className="relative w-full sm:w-32 aspect-[3/4] sm:aspect-auto sm:h-40 overflow-hidden bg-neutral-200 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-xl lowercase tracking-tight mb-2" style={{ letterSpacing: "-0.02em" }}>{item.name}</h3>
                        <p className="text-xs text-black/40 uppercase tracking-wider">Size {item.size} · {item.collar} · {item.fit}</p>
                      </div>
                      <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <X className="w-4 h-4 stroke-[1.5] opacity-40" />
                      </button>
                    </div>
                    <div className="flex justify-between items-end mt-6">
                      <div className="flex items-center border border-black/10">
                        <button className="px-3 py-2 hover:bg-black/5 transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="px-4 py-2 text-sm font-medium border-x border-black/10">{item.qty}</span>
                        <button className="px-3 py-2 hover:bg-black/5 transition-colors"><Plus className="w-3 h-3" /></button>
                      </div>
                      <p className="font-serif text-lg">${item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/collection" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] mt-8 hover:opacity-70 transition-opacity">
              <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-black text-white p-10 md:p-12 sticky top-32">
              <h3 className="font-serif text-2xl lowercase tracking-tight mb-10" style={{ letterSpacing: "-0.02em" }}>Order summary</h3>
              
              <div className="flex flex-col gap-4 text-sm mb-8">
                <div className="flex justify-between"><span className="text-white/50">Subtotal</span><span>${subtotal}</span></div>
                <div className="flex justify-between"><span className="text-white/50">Shipping</span><span className="text-xs uppercase tracking-wider text-white/30">Calculated at checkout</span></div>
                <div className="flex justify-between"><span className="text-white/50">Tax (GST 18%)</span><span>${Math.round(subtotal * 0.18)}</span></div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-10">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">Estimated Total</span>
                  <span className="font-serif text-2xl">${subtotal + Math.round(subtotal * 0.18)}</span>
                </div>
              </div>

              <button className="w-full bg-white text-black py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-100 transition-colors duration-300 relative overflow-hidden group">
                <span className="relative z-10">Proceed to Checkout</span>
              </button>

              <p className="text-[10px] text-white/30 text-center mt-6 leading-relaxed">
                Free shipping on orders above ₹5,000.<br />
                Secure checkout powered by Razorpay.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
