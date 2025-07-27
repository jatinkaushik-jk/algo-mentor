import { Navbar } from "@/components/navbar";
import FAQSection, { FaqStructuredData } from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {

  return (
    <>
    <FaqStructuredData/>
      <Navbar/>
      <div
        id="top"
        className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-14 font-[family-name:var(--font-geist-sans)]"
      >
        <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
          {/* Hero Section */}
          <HeroSection/>

          {/* About Section */}
          <AboutSection />

          {/* Features Section */}
          <FeaturesSection />

          {/* Testimonials Section */}
          <TestimonialsSection/>

          {/* FAQ Section */}
            <FAQSection/>

          {/* Call-to-Action Section */}
          <CallToActionSection />
        </main>
        <ScrollToTopButton />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
