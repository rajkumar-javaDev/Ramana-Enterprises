import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingCTA from './components/common/FloatingCTA';
import QuickQuoteModal from './components/common/QuickQuoteModal';

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Loading...</p>
      </div>
    </div>
  );
}

// Top-level Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const LocationsPage = lazy(() => import('./pages/LocationsPage'));
const LocationDetailPage = lazy(() => import('./pages/LocationDetailPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Master Knowledge Base Pages
const StandardsSafetyPage = lazy(() => import('./pages/StandardsSafetyPage'));
const MaterialComparisonsPage = lazy(() => import('./pages/MaterialComparisonsPage'));
const PricingGuidePage = lazy(() => import('./pages/PricingGuidePage'));
const CustomerGuidePage = lazy(() => import('./pages/CustomerGuidePage'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));

// 21 Dedicated Service Landing Pages
const NylonSafetyNetsPage = lazy(() => import('./pages/servicePages/NylonSafetyNetsPage'));
const BalconySafetyNetsPage = lazy(() => import('./pages/servicePages/BalconySafetyNetsPage'));
const ChildSafetyNetsPage = lazy(() => import('./pages/servicePages/ChildSafetyNetsPage'));
const AntiBirdNetsPage = lazy(() => import('./pages/servicePages/AntiBirdNetsPage'));
const BirdProtectionNetsPage = lazy(() => import('./pages/servicePages/BirdProtectionNetsPage'));
const PigeonSafetyNetsPage = lazy(() => import('./pages/servicePages/PigeonSafetyNetsPage'));
const BirdSpikesPage = lazy(() => import('./pages/servicePages/BirdSpikesPage'));
const MonkeySafetyNetsPage = lazy(() => import('./pages/servicePages/MonkeySafetyNetsPage'));
const DuctAreaSafetyNetsPage = lazy(() => import('./pages/servicePages/DuctAreaSafetyNetsPage'));
const InnerHouseSafetyNetsPage = lazy(() => import('./pages/servicePages/InnerHouseSafetyNetsPage'));
const StepsSafetyNetsPage = lazy(() => import('./pages/servicePages/StepsSafetyNetsPage'));
const CoconutSafetyNetsPage = lazy(() => import('./pages/servicePages/CoconutSafetyNetsPage'));
const GlassProtectionNetsPage = lazy(() => import('./pages/servicePages/GlassProtectionNetsPage'));
const BuildingCoveringNetsPage = lazy(() => import('./pages/servicePages/BuildingCoveringNetsPage'));
const ConstructionSafetyNetsPage = lazy(() => import('./pages/servicePages/ConstructionSafetyNetsPage'));
const CricketPracticeNetsPage = lazy(() => import('./pages/servicePages/CricketPracticeNetsPage'));
const SportsSafetyNetsPage = lazy(() => import('./pages/servicePages/SportsSafetyNetsPage'));
const AllSportsNetsPage = lazy(() => import('./pages/servicePages/AllSportsNetsPage'));
const MosquitoNetsPage = lazy(() => import('./pages/servicePages/MosquitoNetsPage'));
const SwimmingPoolSafetyNetsPage = lazy(() => import('./pages/servicePages/SwimmingPoolSafetyNetsPage'));
const InvisibleGrillsPage = lazy(() => import('./pages/servicePages/InvisibleGrillsPage'));

// Scroll to Top on page change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function Layout() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-950 font-sans">
      <ScrollToTop />
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      <main className="flex-grow pt-[88px] sm:pt-[104px] lg:pt-[112px]">
        <Suspense fallback={<PageLoader />}>
          <Outlet context={{ onOpenQuoteModal: () => setIsQuoteModalOpen(true) }} />
        </Suspense>
      </main>
      <Footer />
      <FloatingCTA onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      <QuickQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Homepage */}
          <Route index element={<HomePage />} />

          {/* Master Knowledge Base Routes */}
          <Route path="standards" element={<StandardsSafetyPage />} />
          <Route path="safety-standards" element={<StandardsSafetyPage />} />
          <Route path="materials-guide" element={<MaterialComparisonsPage />} />
          <Route path="comparisons" element={<MaterialComparisonsPage />} />
          <Route path="pricing-guide" element={<PricingGuidePage />} />
          <Route path="buying-guide" element={<CustomerGuidePage />} />
          <Route path="customer-guide" element={<CustomerGuidePage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />

          {/* Core Services Hub & 21 Dedicated Service Pages */}
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/nylon-safety-nets" element={<NylonSafetyNetsPage />} />
          <Route path="services/balcony-safety-nets" element={<BalconySafetyNetsPage />} />
          <Route path="services/children-safety-nets" element={<ChildSafetyNetsPage />} />
          <Route path="services/child-safety-nets" element={<ChildSafetyNetsPage />} />
          <Route path="services/anti-bird-nets" element={<AntiBirdNetsPage />} />
          <Route path="services/bird-protection-nets" element={<BirdProtectionNetsPage />} />
          <Route path="services/pigeon-safety-nets" element={<PigeonSafetyNetsPage />} />
          <Route path="services/bird-spikes" element={<BirdSpikesPage />} />
          <Route path="services/monkey-safety-nets" element={<MonkeySafetyNetsPage />} />
          <Route path="services/duct-area-safety-nets" element={<DuctAreaSafetyNetsPage />} />
          <Route path="services/inner-house-safety-nets" element={<InnerHouseSafetyNetsPage />} />
          <Route path="services/steps-safety-nets" element={<StepsSafetyNetsPage />} />
          <Route path="services/staircase-safety-nets" element={<StepsSafetyNetsPage />} />
          <Route path="services/coconut-safety-nets" element={<CoconutSafetyNetsPage />} />
          <Route path="services/coconut-tree-safety-nets" element={<CoconutSafetyNetsPage />} />
          <Route path="services/glass-protection-nets" element={<GlassProtectionNetsPage />} />
          <Route path="services/building-covering-nets" element={<BuildingCoveringNetsPage />} />
          <Route path="services/construction-safety-nets" element={<ConstructionSafetyNetsPage />} />
          <Route path="services/cricket-practice-nets" element={<CricketPracticeNetsPage />} />
          <Route path="services/sports-cricket-nets" element={<CricketPracticeNetsPage />} />
          <Route path="services/sports-safety-nets" element={<SportsSafetyNetsPage />} />
          <Route path="services/all-sports-nets" element={<AllSportsNetsPage />} />
          <Route path="services/mosquito-nets" element={<MosquitoNetsPage />} />
          <Route path="services/swimming-pool-safety-nets" element={<SwimmingPoolSafetyNetsPage />} />
          <Route path="services/invisible-grills" element={<InvisibleGrillsPage />} />
          <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />

          {/* Locations Hub & Dynamic Area Pages */}
          <Route path="locations" element={<LocationsPage />} />
          <Route path="location/:locationSlug" element={<LocationDetailPage />} />
          <Route path="locations/:locationSlug" element={<LocationDetailPage />} />

          {/* Gallery, FAQ, About, Contact */}
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
