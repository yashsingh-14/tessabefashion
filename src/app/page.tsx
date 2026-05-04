import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KineticMarquee from "@/components/KineticMarquee";
import MaskedVideoReveal from "@/components/MaskedVideoReveal";
import ParallaxShowcase from "@/components/ParallaxShowcase";
import FabricStats from "@/components/FabricStats";
import FabricAccordion from "@/components/FabricAccordion";
import StickyGallery from "@/components/StickyGallery";
import ZoomShowcase from "@/components/ZoomShowcase";
import FabricSpotlight from "@/components/FabricSpotlight";
import Testimonials from "@/components/Testimonials";
import FeaturedCollection from "@/components/FeaturedCollection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* 1. HOOK — Cinematic first impression */}
      <Hero />

      {/* 2. ENERGY — Brand rhythm & marquee */}
      <KineticMarquee />

      {/* 3. TRUST — Show the craftsmanship process */}
      <MaskedVideoReveal />

      {/* 4. STORY — Heritage narrative with parallax */}
      <ParallaxShowcase />

      {/* 5. PROOF — Hard numbers that build credibility */}
      <FabricStats />

      {/* 5.5. EXPERTISE — Interactive image accordion */}
      <FabricAccordion />

      {/* 6. DESIRE — Visual feast, immersive gallery */}
      <StickyGallery />

      {/* 6.5. 3D EXPEREINCE — Zoom Parallax Archives */}
      <ZoomShowcase />

      {/* 7. SPOTLIGHT — Horizontal scroll fabric details */}
      <FabricSpotlight />

      {/* 8. SOCIAL PROOF — Client testimonials before CTA */}
      <Testimonials />

      {/* 9. ACTION — Products ready to purchase */}
      <FeaturedCollection />

      {/* 10. CLOSE — Footer with full business info */}
      <Footer />
    </main>
  );
}
