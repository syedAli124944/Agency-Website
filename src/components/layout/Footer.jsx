import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUpRight } from 'lucide-react';
import { footerLinks, socialLinks } from '@/data/siteData';
import { fadeUp, staggerContainer } from '@/lib/utils';

const SOCIAL_COLORS = {
  Twitter: '#00F5FF',
  LinkedIn: '#7C3AED',
  GitHub: '#FF4D9D',
  Dribbble: '#FF8A00',
};

function FooterLink({ link }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li>
      <motion.a
        href="#"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative inline-flex items-center gap-1 text-sm text-muted group"
        data-cursor-hover
      >
        {/* Text color shift */}
        <motion.span
          animate={{ color: hovered ? '#fff' : '#A1A1AA' }}
          transition={{ duration: 0.2 }}
        >
          {link}
        </motion.span>

        {/* Arrow icon */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
          transition={{ duration: 0.2 }}
          className="text-accent-cyan"
        >
          <ArrowUpRight size={12} />
        </motion.span>

        {/* Animated gradient underline */}
        <motion.span
          className="absolute -bottom-0.5 left-0 h-[1.5px] rounded-full"
          style={{
            background: 'linear-gradient(90deg, #00F5FF, #7C3AED, #FF4D9D)',
            backgroundSize: '200% 100%',
          }}
          initial={{ width: '0%', backgroundPosition: '0% 50%' }}
          animate={{
            width: hovered ? '100%' : '0%',
            backgroundPosition: hovered ? '100% 50%' : '0% 50%',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </motion.a>
    </li>
  );
}

export default function Footer() {
  const [brandHovered, setBrandHovered] = useState(false);

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[80px] bg-accent-cyan/10 blur-[60px]" />

      {/* Shimmer divider that pulses */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-accent-purple/60 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <motion.div
              onHoverStart={() => setBrandHovered(true)}
              onHoverEnd={() => setBrandHovered(false)}
              className="inline-block relative"
            >
              <span className="text-2xl font-bold font-heading gradient-text">NovaSpark</span>
              {/* Brand hover underline */}
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] rounded-full"
                style={{ background: 'linear-gradient(90deg, #00F5FF, #7C3AED, #FF4D9D)' }}
                animate={{ width: brandHovered ? '100%' : '0%' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
              {/* Brand glow */}
              <motion.span
                animate={{ opacity: brandHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute -inset-2 bg-accent-cyan/5 rounded-lg blur-sm pointer-events-none"
              />
            </motion.div>
            <p className="text-sm text-muted mt-5 max-w-xs leading-relaxed">
              Crafting premium digital experiences that inspire, engage, and drive growth for visionary brands.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => {
                const color = SOCIAL_COLORS[s.name] || '#00F5FF';
                return (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative w-9 h-9 rounded-full glass flex items-center justify-center text-muted text-xs font-bold overflow-hidden group"
                    style={{ '--social-color': color }}
                    data-cursor-hover
                    aria-label={s.name}
                  >
                    {/* Social fill on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `${color}18`, boxShadow: `0 0 14px ${color}30` }}
                    />
                    <motion.span
                      className="relative z-10 transition-colors duration-300 group-hover:text-white"
                    >
                      {s.name[0]}
                    </motion.span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], i) => (
            <motion.div key={title} variants={fadeUp} custom={i + 1}>
              <h4 className="font-heading font-semibold mb-5 text-sm relative inline-block">
                {title}
                {/* Section title accent */}
                <span className="absolute -bottom-1 left-0 w-5 h-[2px] rounded-full bg-accent-cyan/50" />
              </h4>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <FooterLink key={link} link={link} />
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/* Animated bottom bar top-line shimmer */}
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent"
          />
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} NovaSpark. All rights reserved.
          </p>
          <p className="text-xs text-muted flex items-center gap-1">
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <Heart size={12} className="text-accent-pink" fill="#FF4D9D" />
            </motion.span>{' '}
            by NovaSpark
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
