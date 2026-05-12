import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9990] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #00F5FF, #7C3AED, #FF4D9D)',
      }}
    />
  );
}
