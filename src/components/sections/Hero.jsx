import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowRight, Play, X, Volume2, VolumeX } from 'lucide-react';
import MagneticButton from '@/components/common/MagneticButton';

const roles = ['Websites', 'Mobile Apps', 'Brands', 'Experiences', 'Products'];

// ── Showreel Modal ──────────────────────────────────────────────────────────
function ShowreelModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
            className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow ring */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent-cyan/30 via-accent-purple/20 to-accent-pink/20 pointer-events-none" />

            {/* Video wrapper – using YouTube embed of a premium agency reel */}
            <div className="relative aspect-video bg-primary-900">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/GGf1JjSAKP4?autoplay=1&rel=0&modestbranding=1"
                title="NovaSpark Agency Showreel"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full glass border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close showreel"
            >
              <X size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Showreel Button with floating preview card ───────────────────────────────
function ShowreelButton({ onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <MagneticButton variant="outline" onClick={onClick}>
        <Play size={14} fill="currentColor" /> Watch Showreel
      </MagneticButton>

      {/* Floating preview card — appears on hover like Layers */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 12, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: -8, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.88, y: 12, x: '-50%' }}
            transition={{ duration: 0.28, ease: [0.34, 1.2, 0.64, 1] }}
            className="absolute bottom-full left-1/2 mb-3 z-50 w-64 pointer-events-none"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Card */}
            <div className="rounded-xl overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)] glass">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src="/showreel/thumbnail.png"
                  alt="Showreel Preview"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent" />
                {/* Play icon centre */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-10 h-10 rounded-full bg-accent-cyan/90 flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.5)]"
                  >
                    <Play size={14} fill="white" className="text-white ml-0.5" />
                  </motion.div>
                </div>
              </div>
              {/* Label */}
              <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/80">Agency Showreel 2026</span>
                <span className="text-[10px] text-muted">2:45</span>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-white/15" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero({ onBooking }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showreel, setShowreel] = useState(false);

  // GSAP text reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.4 });
      tl.from('.hero-line', { y: 120, opacity: 0, rotationX: -80, stagger: 0.12, duration: 1, ease: 'power4.out' });
      tl.from('.hero-desc', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
      tl.from('.hero-buttons', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');
      tl.from('.hero-visual', { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6');
      tl.from('.hero-stat-card', { y: 50, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' }, '-=0.5');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Rotating text
  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((p) => (p + 1) % roles.length), 2500);
    return () => clearInterval(interval);
  }, []);

  // Mouse parallax
  const handleMouse = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: ((e.clientX - rect.left) / rect.width - 0.5) * 30, y: ((e.clientY - rect.top) / rect.height - 0.5) * 30 });
  };

  return (
    <>
      <ShowreelModal open={showreel} onClose={() => setShowreel(false)} />

      <section
        ref={sectionRef}
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        onMouseMove={handleMouse}
      >
        {/* Background elements */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-20 -left-40 w-[600px] h-[600px] bg-accent-cyan/8 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-accent-purple/8 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center py-10 lg:py-0">
          {/* Left: Content */}
          <div>
            <div ref={headingRef} className="overflow-hidden">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
                <span className="hero-line block">We Craft</span>
                <span className="hero-line block">
                  Digital{' '}
                  <span className="relative inline-block">
                    <motion.span
                      key={roleIndex}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -60, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="gradient-text inline-block"
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </span>
                </span>
                <span className="hero-line block text-soft-gray/60">That Inspire</span>
              </h1>
            </div>

            <p className="hero-desc mt-7 text-base md:text-lg text-muted max-w-lg leading-relaxed">
              We're a premium digital agency transforming ideas into extraordinary digital experiences.
              Strategy, design, and technology — unified to accelerate your growth.
            </p>

            <div className="hero-buttons flex flex-wrap gap-4 mt-9">
              <MagneticButton variant="primary" onClick={onBooking}>
                Book a Session <ArrowRight size={16} />
              </MagneticButton>
              <ShowreelButton onClick={() => setShowreel(true)} />
            </div>

            {/* Mini stats */}
            <div className="hero-buttons flex gap-8 mt-12 pt-8 border-t border-white/5">
              {[{ val: '150+', label: 'Projects' }, { val: '98%', label: 'Satisfaction' }, { val: '50+', label: 'Clients' }].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold font-heading text-white">{s.val}</div>
                  <div className="text-xs text-muted mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Visual */}
          <motion.div
            className="hero-visual relative hidden lg:block"
            style={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            {/* Main dashboard card */}
            <div className="relative glass rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-muted">analytics.novaspark.io</span>
              </div>

              <div className="flex items-end gap-3 h-40 mb-6">
                {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-md"
                    style={{
                      background: i % 3 === 0
                        ? 'linear-gradient(to top, #00F5FF, #00F5FF80)'
                        : i % 3 === 1
                        ? 'linear-gradient(to top, #7C3AED, #7C3AED80)'
                        : 'linear-gradient(to top, #FF4D9D, #FF4D9D80)',
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 2.8 + i * 0.08, ease: 'power3.out' }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Revenue', val: '$84.2K', change: '+24%', color: 'text-accent-cyan' },
                  { label: 'Users', val: '12.8K', change: '+18%', color: 'text-accent-purple' },
                  { label: 'Growth', val: '340%', change: '+42%', color: 'text-accent-pink' },
                ].map((m) => (
                  <div key={m.label} className="glass rounded-lg p-3">
                    <div className="text-[10px] text-muted">{m.label}</div>
                    <div className="text-lg font-bold font-heading mt-1">{m.val}</div>
                    <div className={`text-xs font-semibold mt-1 ${m.color}`}>{m.change}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating cards */}
            <motion.div className="hero-stat-card absolute -top-6 -right-6 glass rounded-xl p-4 glow-cyan" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="text-xs text-muted">Live Visitors</div>
              <div className="text-xl font-bold font-heading text-accent-cyan mt-1">2,847</div>
            </motion.div>
            <motion.div className="hero-stat-card absolute -bottom-4 -left-6 glass rounded-xl p-4 glow-purple" animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
              <div className="text-xs text-muted">Conversion</div>
              <div className="text-xl font-bold font-heading text-accent-purple mt-1">+67%</div>
            </motion.div>
            <motion.div className="hero-stat-card absolute top-1/2 -left-10 glass rounded-xl p-3 glow-pink" animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
              <div className="text-xs text-accent-pink font-semibold">⚡ Performance A+</div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
