import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function MagneticButton({ children, className, variant = 'primary', ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const reset = () => { x.set(0); y.set(0); };

  const base = 'relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 group';

  const variants = {
    primary: 'bg-accent-cyan text-primary-900 hover:shadow-[0_0_30px_rgba(0,245,255,0.4)]',
    outline: 'border border-white/20 text-white hover:border-accent-cyan/50 hover:text-accent-cyan hover:shadow-[0_0_30px_rgba(0,245,255,0.1)]',
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileTap={{ scale: 0.95 }}
      className={cn(base, variants[variant], className)}
      data-cursor-hover
      {...props}
    >
      {/* Hover ripple effect */}
      <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-center" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
