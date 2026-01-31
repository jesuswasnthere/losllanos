import { HeroSection } from "@/components/hero-section"
import { FeaturedProductsSection } from "@/components/featured-products-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen" role="main">
      <div data-aos="fade-up">
        <HeroSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="80" data-aos-offset="120">
        <FeaturedProductsSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <ServicesSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="150" data-aos-offset="120">
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}