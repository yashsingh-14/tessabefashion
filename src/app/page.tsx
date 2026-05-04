import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KineticMarquee from "@/components/KineticMarquee";
import FabricSpotlight from "@/components/FabricSpotlight";
import MaskedVideoReveal from "@/components/MaskedVideoReveal";
import FeaturedCollection from "@/components/FeaturedCollection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <KineticMarquee />
      <FabricSpotlight />
      <MaskedVideoReveal />
      <FeaturedCollection />
      <Footer />
    </main>
  );
}
