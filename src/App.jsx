import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
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
import SuccessPage from '@/pages/SuccessPage';
import AdminDashboard from '@/pages/AdminDashboard';
import CheckoutPage from '@/pages/CheckoutPage';

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
  const [user, setUser]                   = useState(null);
  const [showSuccess, setShowSuccess]     = useState(false);
  const [showAdmin, setShowAdmin]         = useState(false);
  const [checkoutData, setCheckoutData]   = useState(null);

  useEffect(() => {
    // Check for success URL from Stripe
    if (window.location.pathname === '/success') {
      setShowSuccess(true);
      // Clean up the URL
      window.history.replaceState({}, '', '/');
    }
    // 1. Check initial session and URL
    const checkInitialState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const u = session?.user ?? null;
      setUser(u);
    };
    
    checkInitialState();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      setUser(u);

      if (event === 'SIGNED_IN') {
        setShowAuth(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
        {showAdmin && <AdminDashboard key="admin" onBack={() => setShowAdmin(false)} />}
      </AnimatePresence>

      {loaded && (
        <AnimatePresence mode="wait">
          {showBooking ? (
            <motion.div key="booking-page" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
              <BookingPage 
                user={user} 
                onBack={() => setShowBooking(false)} 
                onAuthOpen={() => {
                  setShowBooking(false);
                  setShowAuth(true);
                }} 
              />
            </motion.div>
          ) : currentPost ? (
            <motion.div key={`post-${currentPost.id}`} variants={pageVariants} initial="hidden" animate="visible" exit="exit">
              <BlogPostPage
                post={currentPost}
                onBack={() => setCurrentPost(null)}
                onNavigate={(p) => setCurrentPost(p)}
                onBookingOpen={() => {
                  setCurrentPost(null);
                  setShowBooking(true);
                }}
              />
            </motion.div>
          ) : showPortfolio ? (
            <motion.div key="portfolio-page" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
              <PortfolioPage onBack={handleBack} />
            </motion.div>
          ) : (
            <motion.div key="home" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
              {showSuccess && (
                <div className="fixed inset-0 z-[1000]">
                  <SuccessPage onBack={() => setShowSuccess(false)} />
                </div>
              )}
              <SmoothScroll>
                <ScrollProgress />
                <ParticleField />
                <Navbar 
                  user={user} 
                  onAuthOpen={() => setShowAuth(true)} 
                  onAdminOpen={() => setShowAdmin(true)}
                  onLogout={async () => {
                    await supabase.auth.signOut();
                    setShowAuth(true);
                  }}
                />
                <main>
                  <Hero onBooking={() => setShowBooking(true)} />
                  <TrustedBrands />
                  <About />
                  <Services />
                  <Process />
                  <Portfolio onViewAll={handleViewAll} />
                  <Testimonials />
                  <Team />
                  <Pricing 
                  onCheckout={(plan, interval) => setCheckoutData({ plan, interval })}
                />
                  <Blog onPostClick={(p) => {
                    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
                    window.scrollTo(0, 0);
                    setCurrentPost(p);
                  }} />
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

      {/* Fixed Global Elements */}
      <AnimatePresence>
        {currentPost && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed top-10 left-10 z-[200] pointer-events-none"
          >
            <button 
              onClick={() => setCurrentPost(null)}
              className="pointer-events-auto flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#050508]/60 border border-white/10 text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 hover:border-white/40 transition-all shadow-2xl backdrop-blur-xl group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-accent-cyan" /> 
              <span>Return to Insights</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutData && (
          <CheckoutPage 
            plan={checkoutData.plan} 
            interval={checkoutData.interval} 
            onBack={() => setCheckoutData(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
