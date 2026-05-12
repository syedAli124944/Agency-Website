import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Preloader from '@/components/layout/Preloader';
import CustomCursor from '@/components/effects/CustomCursor';
import ParticleField from '@/components/effects/ParticleField';
import ScrollProgress from '@/components/layout/ScrollProgress';
import BackToTop from '@/components/layout/BackToTop';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import TrustedBrands from '@/components/sections/TrustedBrands';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Portfolio from '@/components/sections/Portfolio';
import Testimonials from '@/components/sections/Testimonials';
import Team from '@/components/sections/Team';
import Pricing from '@/components/sections/Pricing';
import Blog from '@/components/sections/Blog';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import PortfolioPage from '@/pages/PortfolioPage';
import AuthPage from '@/pages/AuthPage';
import BookingPage from '@/pages/BookingPage';
import BlogPostPage from '@/pages/BlogPostPage';

const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.35 } },
};

export default function App() {
  const [loaded, setLoaded]           = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showAuth, setShowAuth]           = useState(false);
  const [showBooking, setShowBooking]     = useState(false);
  const [currentPost, setCurrentPost]     = useState(null);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  const handleViewAll = useCallback(() => {
    setShowPortfolio(true);
    // Use Lenis for smooth scroll to top
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    setShowPortfolio(false);
    setTimeout(() => {
      const el = document.querySelector('#portfolio');
      if (window.__lenis && el) window.__lenis.scrollTo(el, { offset: -72, duration: 1.4 });
      else el?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }, []);

  return (
    <div className="noise-overlay">
      <Preloader onComplete={handleLoaded} />
      <CustomCursor />

      {/* Auth overlay — above everything */}
      <AnimatePresence>
        {showAuth && <AuthPage key="auth" onClose={() => setShowAuth(false)} />}
      </AnimatePresence>

      {loaded && (
        <AnimatePresence mode="wait">
          {showBooking ? (
            <motion.div key="booking-page" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
              <BookingPage onBack={() => setShowBooking(false)} />
            </motion.div>
          ) : currentPost ? (
            <motion.div key={`post-${currentPost.id}`} variants={pageVariants} initial="hidden" animate="visible" exit="exit">
              <BlogPostPage
                post={currentPost}
                onBack={() => setCurrentPost(null)}
                onNavigate={(p) => setCurrentPost(p)}
              />
            </motion.div>
          ) : showPortfolio ? (
            <motion.div key="portfolio-page" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
              <PortfolioPage onBack={handleBack} />
            </motion.div>
          ) : (
            <motion.div key="home" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
              <SmoothScroll>
                <ScrollProgress />
                <ParticleField />
                <Navbar onAuthOpen={() => setShowAuth(true)} />
                <main>
                  <Hero onBooking={() => setShowBooking(true)} />
                  <TrustedBrands />
                  <About />
                  <Services />
                  <Process />
                  <Portfolio onViewAll={handleViewAll} />
                  <Testimonials />
                  <Team />
                  <Pricing />
                  <Blog onPostClick={(p) => setCurrentPost(p)} />
                  <FAQ />
                  <Contact />
                </main>
                <Footer />
                <BackToTop />
              </SmoothScroll>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
