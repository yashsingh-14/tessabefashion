"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const initialCartItems = [
  { id: 1, name: "The Classic Oxford", size: "40", collar: "Spread", fit: "Tailored Slim", price: 295, qty: 1, image: "/images/fabric-1.jpg" },
  { id: 2, name: "Italian Poplin", size: "41", collar: "Cutaway", fit: "Classic Regular", price: 325, qty: 1, image: "/images/fabric-2.jpg" },
];

const crossSellProducts = [
  { id: "egyptian-cotton", name: "Egyptian Cotton Slim", price: "$345", image: "/images/pexels-bem-partington-1065018897-20531142.jpg" },
  { id: "irish-linen", name: "Pure Irish Linen", price: "$310", image: "/images/pexels-chris-f-38966-7755387.jpg" },
  { id: "brushed-flannel", name: "Brushed Flannel", price: "$275", image: "/images/fabric-1.jpg" },
  { id: "twill-weave", name: "Royal Twill Weave", price: "$365", image: "/images/fabric-2.jpg" },
];

export default function CartPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [removingId, setRemovingId] = useState<number | null>(null);

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

  const updateQty = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setRemovingId(id);
    setTimeout(() => {
      setCartItems(prev => prev.filter(item => item.id !== id));
      setRemovingId(null);
    }, 500);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;

  return (
    <main className="min-h-screen bg-transparent text-black">
      <Navbar />

      <section className="pt-40 pb-12 px-6 md:px-12">
        <div ref={heroRef} className="max-w-7xl mx-auto">
          <p className="hero-anim text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-6">Your Selection</p>
          <h1 className="hero-anim font-serif font-bold text-5xl md:text-8xl lowercase tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>Shopping bag</h1>
          <p className="hero-anim text-sm text-black/70 font-bold">{cartItems.length} {cartItems.length === 1 ? "item" : "items"}</p>
        </div>
      </section>

      {cartItems.length > 0 ? (
        <section className="px-6 md:px-12 pb-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Cart Items */}
            <div ref={itemsRef} className="lg:col-span-8">
              <div className="border-t border-black/10">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className={`cart-item flex flex-col sm:flex-row gap-6 py-8 border-b border-black/5 transition-all duration-500 ${
                      removingId === item.id ? "opacity-0 -translate-x-12 max-h-0 py-0 overflow-hidden" : "opacity-100 translate-x-0 max-h-96"
                    }`}
                  >
                    <div className="relative w-full sm:w-32 aspect-[3/4] sm:aspect-auto sm:h-40 overflow-hidden bg-neutral-200 flex-shrink-0 group">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-serif font-bold text-xl lowercase tracking-tight mb-2" style={{ letterSpacing: "-0.02em" }}>{item.name}</h3>
                          <p className="text-xs text-black/70 font-bold uppercase tracking-wider">Size {item.size} · {item.collar} · {item.fit}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 hover:bg-black/5 rounded-full transition-all duration-300 hover:rotate-90"
                        >
                          <X className="w-4 h-4 stroke-[1.5] opacity-40" />
                        </button>
                      </div>
                      <div className="flex justify-between items-end mt-6">
                        <div className="flex items-center border border-black/10">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="px-3 py-2 hover:bg-black/5 transition-colors active:scale-95"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 py-2 text-sm font-medium border-x border-black/10 min-w-[40px] text-center transition-all duration-300">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="px-3 py-2 hover:bg-black/5 transition-colors active:scale-95"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-serif font-bold text-lg">${item.price * item.qty}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/collection" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] mt-8 hover:opacity-70 transition-opacity group">
                <ArrowRight className="w-4 h-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" /> Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-black text-white p-10 md:p-12 sticky top-32">
                <h3 className="font-serif font-bold text-2xl lowercase tracking-tight mb-10" style={{ letterSpacing: "-0.02em" }}>Order summary</h3>

                <div className="flex flex-col gap-4 text-sm mb-8">
                  <div className="flex justify-between"><span className="text-white/50">Subtotal</span><span>${subtotal}</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Shipping</span><span className="text-xs uppercase tracking-wider text-white/30">Calculated at checkout</span></div>
                  <div className="flex justify-between"><span className="text-white/50">Tax (GST 18%)</span><span>${tax}</span></div>
                </div>

                {/* Promo Code */}
                <div className="mb-8">
                  <div className="flex border border-white/10 overflow-hidden">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 bg-transparent px-4 py-3 text-xs uppercase tracking-wider placeholder:text-white/20 focus:outline-none"
                    />
                    <button className="px-4 py-3 bg-white/10 text-xs uppercase tracking-wider hover:bg-white/20 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mb-10">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50">Estimated Total</span>
                    <span className="font-serif font-bold text-2xl">${total}</span>
                  </div>
                </div>

                <button className="w-full bg-white text-black py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-100 transition-all duration-300 relative overflow-hidden group active:scale-[0.98]">
                  <span className="relative z-10">Proceed to Checkout</span>
                  <div className="absolute inset-0 -translate-x-full bg-neutral-200 transition-transform duration-700 ease-out group-hover:translate-x-0" />
                </button>

                <p className="text-[10px] text-white/30 text-center mt-6 leading-relaxed">
                  Free shipping on orders above ₹5,000.<br />
                  Secure checkout powered by Razorpay.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Empty Cart State */
        <section className="px-6 md:px-12 pb-32">
          <div className="max-w-2xl mx-auto text-center py-24">
            <ShoppingBag className="w-16 h-16 stroke-[0.8] mx-auto mb-8 text-black/15" />
            <h2 className="font-serif font-bold text-3xl md:text-4xl lowercase tracking-tight mb-4">Your bag is empty</h2>
            <p className="text-sm text-black/70 font-bold mb-10 max-w-sm mx-auto leading-relaxed">
              Discover our curated collection of premium shirts, crafted with the world&apos;s finest fabrics.
            </p>
            <Link href="/collection" className="inline-block bg-black text-white px-12 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-800 transition-colors duration-300">
              Explore Collection
            </Link>
          </div>
        </section>
      )}

      {/* Cross-Sell Section */}
      <section className="px-6 md:px-12 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-4">Complete Your Look</p>
            <h2 className="font-serif font-bold text-4xl md:text-5xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              You may also like
            </h2>
          </div>
          <div ref={crossRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {crossSellProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-4">
                  <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <h3 className="font-serif font-bold text-base lowercase tracking-tight mb-1">{product.name}</h3>
                <p className="text-sm text-black/80 font-medium">{product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
