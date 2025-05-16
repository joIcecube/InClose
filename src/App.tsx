import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import HowItWorks from './components/sections/HowItWorks';
import Comparison from './components/sections/Comparison';
import Security from './components/sections/Security';
import Testimonials from './components/sections/Testimonials';
import Pricing from './components/sections/Pricing';
import Affiliate from './components/sections/Affiliate';
import FAQ from './components/sections/FAQ';
import CallToAction from './components/sections/CallToAction';
import BackgroundEffects from './components/BackgroundEffects';

function App() {
  useEffect(() => {
    // Update document title
    document.title = "Inclose - Multipliez vos vues Instagram par 5";
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white relative">
      <BackgroundEffects />
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Comparison />
        <Security />
        <Testimonials />
        <Pricing />
        <Affiliate />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;