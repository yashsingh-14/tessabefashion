import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col items-start mb-8">
            <h2 className="font-serif text-6xl lowercase tracking-tight leading-none" style={{ letterSpacing: "-0.02em" }}>tessa</h2>
            <span className="font-sans text-sm lowercase tracking-wide opacity-90 mt-1 ml-20 md:ml-24">be fashion</span>
          </div>
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
            <li><a href="/collection" className="hover:opacity-70 transition-opacity">The Collection</a></li>
            <li><a href="/archives" className="hover:opacity-70 transition-opacity">The Archives</a></li>
            <li><a href="/story" className="hover:opacity-70 transition-opacity">Our Story</a></li>
            <li><a href="/contact" className="hover:opacity-70 transition-opacity">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-6 opacity-50">Assistance</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><a href="/contact" className="hover:opacity-70 transition-opacity">Get In Touch</a></li>
            <li><a href="/shipping" className="hover:opacity-70 transition-opacity">Shipping & Returns</a></li>
            <li><a href="/size-guide" className="hover:opacity-70 transition-opacity">Size Guide</a></li>
            <li><a href="/care" className="hover:opacity-70 transition-opacity">Fabric Care</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light opacity-50">
        <p>&copy; {new Date().getFullYear()} Tessa Be Fashion — A unit of Arama Tessile LLP (LLPIN AAB-8912). All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#">Instagram</a>
          <a href="#">Pinterest</a>
        </div>
      </div>
    </footer>
  );
}
