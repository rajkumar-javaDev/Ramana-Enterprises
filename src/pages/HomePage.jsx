import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SEO from '../components/common/SEO';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesGrid from '../components/sections/ServicesGrid';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import GallerySection from '../components/sections/GallerySection';
import ProcessTimeline from '../components/sections/ProcessTimeline';
import Testimonials from '../components/sections/Testimonials';
import FAQSection from '../components/sections/FAQSection';
import ContactSection from '../components/sections/ContactSection';
import MaterialSpecs from '../components/sections/MaterialSpecs';

export default function HomePage() {
  const { onOpenQuoteModal } = useOutletContext();

  return (
    <>
      <SEO
        title="Premium Safety Net Installation in Bangalore"
        description="Ramana Safety Nets - #1 safety net installation company in Bangalore. Balcony safety nets, pigeon nets, bird spikes, invisible grills, child safety nets. Garware certified. Free doorstep survey. 10 year warranty. Call +91 88844 42929."
        canonicalUrl="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Ramana Safety Nets",
          "url": "https://www.ramanasafetynets.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.ramanasafetynets.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      
      {/* Hero Carousel */}
      <HeroSection onOpenQuoteModal={onOpenQuoteModal} />

      {/* About Section */}
      <AboutSection />

      {/* Services Grid - Limited to 6 for homepage */}
      <ServicesGrid limit={6} onOpenQuoteModal={onOpenQuoteModal} />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Material Specifications */}
      <MaterialSpecs />

      {/* Our Process */}
      <ProcessTimeline />

      {/* Gallery - Limited to 6 for homepage */}
      <GallerySection limit={6} />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ - Limited items for homepage */}
      <FAQSection limit={4} />

      {/* Contact Section */}
      <ContactSection onOpenQuoteModal={onOpenQuoteModal} />
    </>
  );
}
