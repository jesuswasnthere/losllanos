import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen" role="main">
      <div data-aos="fade-up">
        <AboutSection />
      </div>
      <Footer />
    </main>
  )
}
