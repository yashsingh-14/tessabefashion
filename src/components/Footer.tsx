import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col items-start mb-8">
            <h2 className="font-serif text-6xl lowercase tracking-tight leading-none" style={{ letterSpacing: "-0.02em" }}>tessa</h2>
            <span className="font-sans text-sm lowercase tracking-wide opacity-90 mt-1 ml-20 md:ml-24">be fashion</span>
          </div>
          <p className="text-sm font-light leading-relaxed max-w-sm opacity-70">
            Crafting bespoke shirts from the world's finest mills. Elegance, tailored to perfection, with an uncompromising dedication to fabric quality.
          </p>
        </div>
        
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-6 opacity-50">Explore</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><a href="#" className="hover:opacity-70 transition-opacity">The Collection</a></li>
            <li><a href="#" className="hover:opacity-70 transition-opacity">Our Fabrics</a></li>
            <li><a href="#" className="hover:opacity-70 transition-opacity">Bespoke Process</a></li>
            <li><a href="#" className="hover:opacity-70 transition-opacity">Journal</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] mb-6 opacity-50">Assistance</h4>
          <ul className="space-y-4 text-sm font-light">
            <li><a href="#" className="hover:opacity-70 transition-opacity">Contact Us</a></li>
            <li><a href="#" className="hover:opacity-70 transition-opacity">Shipping & Returns</a></li>
            <li><a href="#" className="hover:opacity-70 transition-opacity">Fit Guide</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light opacity-50">
        <p>&copy; {new Date().getFullYear()} Tessa Be Fashion. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#">Instagram</a>
          <a href="#">Pinterest</a>
        </div>
      </div>
    </footer>
  );
}
