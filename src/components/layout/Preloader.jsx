import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    // Animate counter with GSAP
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.round(obj.val)),
      onComplete: () => {
        setTimeout(() => setDone(true), 300);
        setTimeout(() => onComplete?.(), 1200);
      },
    });
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-primary-900"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold font-heading gradient-text tracking-tight">
              NovaSpark
            </h1>
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 w-64 md:w-80">
            <div className="flex justify-between mb-3 text-sm text-muted font-body">
              <span>Loading</span>
              <span ref={counterRef} className="font-heading text-white font-semibold">
                {progress}%
              </span>
            </div>
            <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00F5FF, #7C3AED, #FF4D9D)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
