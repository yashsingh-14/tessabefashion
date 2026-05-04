import CircularTestimonials from "./CircularTestimonials";

const testimonialsData = [
  {
    quote: "The moment I felt the fabric, I knew this wasn't just a shirt — it was an experience. Nothing else compares.",
    name: "Alessandro M.",
    designation: "Creative Director, Milan",
    src: "/images/pexels-chris-f-38966-7755387.jpg",
  },
  {
    quote: "Tessa has redefined what I expect from tailoring. The attention to every single detail is simply extraordinary.",
    name: "James H.",
    designation: "CEO, London",
    src: "/images/pexels-bem-partington-1065018897-20531142.jpg",
  },
  {
    quote: "I've purchased bespoke from Savile Row to Naples. Tessa rivals them all at a fraction of the wait.",
    name: "Raj K.",
    designation: "Entrepreneur, Mumbai",
    src: "/images/fabric-1.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="relative pt-32 pb-12 bg-[#E9E6E1] text-black overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-black/70 font-bold mb-4">Testimonials</p>
          <h2 className="font-serif font-bold text-4xl md:text-5xl lowercase tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            Words from our patrons
          </h2>
        </div>

        <CircularTestimonials 
          testimonials={testimonialsData} 
          colors={{
            name: "#000",
            designation: "#666",
            testimony: "#333",
            arrowBackground: "#d1d5db", // Light gray
            arrowForeground: "#000",
            arrowHoverBackground: "#000", // Dark on hover
          }}
        />
      </div>
    </section>
  );
}
