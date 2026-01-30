import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main id="main-content" className="min-h-screen" role="main">
      <div data-aos="fade-up">
        <HeroSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <AboutSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="150">
        <ServicesSection />
      </div>
      <div data-aos="fade-up" data-aos-offset="120">
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}