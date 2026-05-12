import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, ArrowRight, Zap } from 'lucide-react';
import { navLinks } from '@/data/siteData';

// ── Smooth scroll via Lenis ───────────────────────────────────────────────────
function scrollToSection(href) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    const ratio = Math.min(Math.abs(el.getBoundingClientRect().top) / window.innerHeight, 1);
    lenis.scrollTo(el, {
      offset: -80,
      duration: 1.2 + ratio * 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  }
}

// ── Active section tracker (scroll-position based — reliable for all heights) ──
const SECTION_IDS = navLinks.map((l) => l.href.replace('#', ''));

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const OFFSET = 120; // px from top — accounts for navbar height + buffer

    const pick = () => {
      // Walk every section: the active one is the LAST whose top ≤ OFFSET
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= OFFSET) {
          current = id;
        }
      }
      setActive(current);
    };

    pick(); // run once immediately on mount
    window.addEventListener('scroll', pick, { passive: true });
    return () => window.removeEventListener('scroll', pick);
  }, [ids.join(',')]);

  return active;
}

// ── Glowing pill indicator ────────────────────────────────────────────────────
// Uses getBoundingClientRect relative to the <ul> to avoid offsetLeft=0 bug
// that occurs when <li> has position:relative (making it the offsetParent of <a>)
function ActiveIndicator({ liRefs, ulRef, activeIndex }) {
  const [style, setStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const li  = liRefs[activeIndex];
    const ul  = ulRef?.current;
    if (!li || !ul) return;

    // Use bounding rects relative to the <ul> — accurate regardless of nesting
    const liRect = li.getBoundingClientRect();
    const ulRect = ul.getBoundingClientRect();
    setStyle({ left: liRect.left - ulRect.left, width: liRect.width });
  }, [activeIndex]);

  return (
    <motion.div
      animate={{ left: style.left, width: style.width }}
      transition={{ type: 'spring', stiffness: 400, damping: 34, mass: 0.5 }}
      className="absolute bottom-0 h-[2px] rounded-full pointer-events-none"
      style={{
        background: 'linear-gradient(90deg,#00F5FF,#7C3AED,#FF4D9D)',
        boxShadow: '0 0 12px rgba(0,245,255,0.8), 0 0 28px rgba(124,58,237,0.5)',
      }}
    />
  );
}

// ── Spotlight: follows mouse across navbar ────────────────────────────────────
function NavSpotlight({ navRef }) {
  const x = useMotionValue(-200);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const move = (e) => {
      const rect = nav.getBoundingClientRect();
      x.set(e.clientX - rect.left);
    };
    nav.addEventListener('mousemove', move);
    return () => nav.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-none"
      style={{ zIndex: 0 }}
    >
      <motion.div
        style={{ x, translateX: '-50%' }}
        className="absolute top-0 w-64 h-full"
        animate={{}}
      >
        <div
          className="w-full h-full opacity-[0.06]"
          style={{
            background: 'radial-gradient(ellipse 120px 60px at 50% 0%, #00F5FF 0%, transparent 80%)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Navbar({ onAuthOpen }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [scrollPct,  setScrollPct]  = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink,setHoveredLink]= useState(null);
  const navRef  = useRef(null);
  const barRef  = useRef(null);

  const activeSection = useActiveSection(SECTION_IDS);
  const activeIndex   = navLinks.findIndex((l) => l.href === `#${activeSection}`);
  const liRefs        = useRef([]);   // refs on <li> elements
  const ulRef         = useRef(null); // ref on the <ul> container

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const max = document.body.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? (y / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <>
      <motion.header
        ref={barRef}
        initial={{ y: -110 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        {/* ── Scroll progress line ── */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] z-20 origin-left"
          style={{
            width: `${scrollPct}%`,
            background: 'linear-gradient(90deg,#00F5FF,#7C3AED,#FF4D9D)',
            boxShadow: '0 0 8px rgba(0,245,255,0.6)',
          }}
        />

        {/* ── Glass mirror body ── */}
        <motion.div
          ref={navRef}
          animate={{
            background: scrolled
              ? 'rgba(11,16,32,0.55)'
              : 'rgba(11,16,32,0.0)',
            borderBottomColor: scrolled
              ? 'rgba(255,255,255,0.07)'
              : 'rgba(255,255,255,0.0)',
            boxShadow: scrolled
              ? '0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 40px rgba(0,0,0,0.45), 0 0 60px rgba(0,245,255,0.03)'
              : '0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="relative border-b"
          style={{ backdropFilter: scrolled ? 'blur(28px) saturate(180%) brightness(1.05)' : 'none',
                   WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(180%) brightness(1.05)' : 'none' }}
        >
          {/* Mouse-tracking spotlight */}
          {scrolled && <NavSpotlight navRef={navRef} />}

          {/* Gradient shimmer line at top of bar (visible when scrolled) */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 right-0 h-[1px] origin-left pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent 0%, #00F5FF 30%, #7C3AED 60%, transparent 100%)', opacity: 0.4 }}
              />
            )}
          </AnimatePresence>

          <nav className="relative z-10 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
            {/* ── Logo ── */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="relative flex items-center gap-2.5 group"
              data-cursor-hover
            >
              {/* Icon mark */}
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #00F5FF22, #7C3AED33)', border: '1px solid rgba(0,245,255,0.25)', boxShadow: '0 0 14px rgba(0,245,255,0.15)' }}
              >
                <Zap size={14} className="text-accent-cyan" fill="currentColor" />
              </motion.div>
              <span className="text-xl font-bold font-heading gradient-text tracking-tight">NovaSpark</span>
              {/* Subtle underline sweep on hover */}
              <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[1px] rounded-full transition-all duration-400 bg-gradient-to-r from-accent-cyan to-accent-purple" />
            </motion.a>

            {/* ── Desktop nav links ── */}
            <ul ref={ulRef} className="hidden lg:flex items-center gap-7 relative">
              {activeIndex >= 0 && (
                <ActiveIndicator liRefs={liRefs.current} ulRef={ulRef} activeIndex={activeIndex} />
              )}

              {navLinks.map((link, i) => {
                const isActive  = `#${activeSection}` === link.href;
                const isHovered = hoveredLink === link.label;
                return (
                  <motion.li
                    key={link.label}
                    ref={(el) => { liRefs.current[i] = el; }}
                    initial={{ opacity: 0, y: -18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.65 + i * 0.07 }}
                    className="relative"
                    onHoverStart={() => setHoveredLink(link.label)}
                    onHoverEnd={() => setHoveredLink(null)}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      data-cursor-hover
                      className={`text-sm pb-2 transition-all duration-300 relative block font-medium tracking-wide ${
                        isActive ? 'text-white' : 'text-white/55 hover:text-white'
                      }`}
                    >
                      {link.label}
                      {/* Hover glow dot */}
                      <AnimatePresence>
                        {isHovered && !isActive && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-cyan/60"
                          />
                        )}
                      </AnimatePresence>
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            {/* ── Right side: CTA + hamburger ── */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA — premium pill */}
              <motion.button
                type="button"
                onClick={onAuthOpen}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.1, type: 'spring', stiffness: 300, damping: 22 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="hidden lg:flex items-center gap-2 relative overflow-hidden px-5 py-2.5 text-sm font-bold rounded-full text-primary-900"
                style={{
                  background: 'linear-gradient(135deg, #00F5FF, #7C3AED)',
                  boxShadow: '0 0 20px rgba(0,245,255,0.25), 0 4px 16px rgba(0,0,0,0.3)',
                }}
                data-cursor-hover
              >
                {/* Shimmer sweep */}
                <motion.span
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                />
                <span className="relative z-10 flex items-center gap-1.5">
                  Get Started <ArrowRight size={13} />
                </span>
              </motion.button>

              {/* Mobile hamburger */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden relative z-[110] w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-200"
                style={mobileOpen
                  ? { background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.25)' }
                  : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }
                }
                aria-label="Toggle menu"
                whileTap={{ scale: 0.93 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                      <Menu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </motion.div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="fixed inset-0 z-[101] bg-black/65 backdrop-blur-md lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              key="drawer"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[102] w-[62vw] max-w-[310px] flex flex-col lg:hidden overflow-hidden"
              style={{
                background: 'rgba(11,16,32,0.82)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                borderRight: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '2px 0 60px rgba(0,0,0,0.6), inset 1px 0 0 rgba(255,255,255,0.04)',
              }}
            >
              {/* Ambient glows */}
              <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full pointer-events-none opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)' }} />
              <div className="absolute -bottom-24 -left-8 w-60 h-60 rounded-full pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />

              {/* Drawer header */}
              <div className="flex items-center gap-2.5 px-5 py-5"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#00F5FF22,#7C3AED33)', border: '1px solid rgba(0,245,255,0.25)' }}>
                  <Zap size={12} className="text-accent-cyan" fill="currentColor" />
                </div>
                <span className="text-lg font-bold font-heading gradient-text">NovaSpark</span>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-3 py-4 gap-1 flex-1">
                {navLinks.map((link, i) => {
                  const isActive  = `#${activeSection}` === link.href;
                  const isHovered = hoveredLink === link.label;
                  const highlight = isActive || isHovered;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      onHoverStart={() => setHoveredLink(link.label)}
                      onHoverEnd={() => setHoveredLink(null)}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex items-center justify-between px-4 py-3.5 rounded-xl overflow-hidden"
                      data-cursor-hover
                    >
                      {/* Hover/active bg */}
                      <motion.div
                        animate={{ opacity: highlight ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 rounded-xl"
                        style={{ background: isActive ? 'rgba(0,245,255,0.06)' : 'rgba(255,255,255,0.04)' }}
                      />
                      {/* Left accent bar */}
                      <motion.div
                        animate={{ scaleY: highlight ? 1 : 0, opacity: highlight ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ originY: 0.5 }}
                        className={`absolute left-0 top-2 bottom-2 w-[3px] rounded-full ${
                          isActive
                            ? 'bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-pink shadow-[0_0_8px_rgba(0,245,255,0.8)]'
                            : 'bg-gradient-to-b from-accent-cyan/50 to-accent-purple/50'
                        }`}
                      />
                      <motion.span
                        animate={{ color: isActive ? '#fff' : isHovered ? '#e4e4e7' : '#71717a', x: highlight ? 4 : 0 }}
                        transition={{ duration: 0.18 }}
                        className="relative z-10 text-sm font-semibold font-heading"
                      >
                        {link.label}
                      </motion.span>
                      {isActive ? (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="relative z-10 w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_rgba(0,245,255,0.9)]" />
                      ) : (
                        <motion.span animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -4 }}
                          transition={{ duration: 0.18 }} className="relative z-10 text-accent-cyan">
                          <ArrowRight size={12} />
                        </motion.span>
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="px-4 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <motion.button
                  type="button"
                  onClick={() => { setMobileOpen(false); onAuthOpen?.(); }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-primary-900"
                  style={{ background: 'linear-gradient(135deg,#00F5FF,#7C3AED)', boxShadow: '0 0 20px rgba(0,245,255,0.2)' }}
                >
                  <motion.span
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
                  />
                  <span className="relative z-10 flex items-center gap-1.5">Get Started <ArrowRight size={13} /></span>
                </motion.button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
