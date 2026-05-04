import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KineticMarquee from "@/components/KineticMarquee";
import FabricSpotlight from "@/components/FabricSpotlight";
import ParallaxShowcase from "@/components/ParallaxShowcase";
import FabricStats from "@/components/FabricStats";
import MaskedVideoReveal from "@/components/MaskedVideoReveal";
import Testimonials from "@/components/Testimonials";
import FeaturedCollection from "@/components/FeaturedCollection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <KineticMarquee />
      <FabricSpotlight />
      <ParallaxShowcase />
      <FabricStats />
      <MaskedVideoReveal />
      <Testimonials />
      <FeaturedCollection />
      <Footer />
    </main>
  );
}
