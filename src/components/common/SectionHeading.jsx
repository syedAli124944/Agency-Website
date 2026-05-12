import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/utils';

export default function SectionHeading({ badge, title, subtitle, center = true }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`mb-16 md:mb-20 ${center ? 'text-center' : ''}`}
    >
      {badge && (
        <motion.span
          variants={fadeUp}
          custom={0}
          className="inline-block px-4 py-1.5 mb-5 text-xs font-semibold tracking-widest uppercase rounded-full glass text-accent-cyan border border-accent-cyan/20"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-5 text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
