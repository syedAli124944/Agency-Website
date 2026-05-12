import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/common/SectionHeading';
import { stats } from '@/data/siteData';
import { fadeUp, staggerContainer } from '@/lib/utils';
import { portfolioProjects } from '@/data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; },
      });
    });
    return () => ctx.revert();
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="About Us"
          title={<>We Build <span className="gradient-text">Digital Excellence</span></>}
          subtitle="With over 8 years of experience, we've helped startups and enterprises transform their digital presence into powerful growth engines."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative glass rounded-2xl overflow-hidden aspect-[4/3]">
              {/* ── Portfolio image mosaic background ── */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5">
                {portfolioProjects.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, scale: 1.08 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.7, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <motion.img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover"
                      style={{ opacity: 0.18 }}
                      whileHover={{ opacity: 0.38, scale: 1.06 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Dark vignette over the grid */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/60 via-primary-900/30 to-primary-900/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-primary-900/50" />

              {/* Ambient glow orbs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent-cyan/15 rounded-full blur-[60px] animate-pulse-glow" />
              <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-accent-purple/15 rounded-full blur-[50px] animate-blob" />

              {/* Centred badge */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  className="text-center"
                >
                  <div className="text-6xl md:text-7xl font-heading font-bold gradient-text drop-shadow-[0_0_30px_rgba(0,245,255,0.35)]">8+</div>
                  <div className="text-sm text-white/70 mt-2 tracking-widest uppercase font-medium">Years of Innovation</div>
                </motion.div>

                {/* Mini image count badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.75, duration: 0.5 }}
                  className="mt-3 px-4 py-1.5 rounded-full glass border border-white/10 text-xs text-white/50 backdrop-blur-sm"
                >
                  {portfolioProjects.length}+ Innovative Projects
                </motion.div>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              className="absolute -bottom-6 -right-6 glass rounded-xl p-5 glow-cyan"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="text-3xl font-bold font-heading text-accent-cyan">150+</div>
              <div className="text-xs text-muted mt-1">Projects Delivered</div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p variants={fadeUp} className="text-muted leading-relaxed mb-6">
              At Novaspark, we don't just build websites — we engineer digital experiences that captivate audiences and drive measurable results. Our team of passionate designers and developers push the boundaries of what's possible.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted leading-relaxed mb-10">
              From startups to Fortune 500 companies, we've partnered with visionary leaders to create products that stand out in the digital landscape. Every pixel, every interaction, every line of code is crafted with purpose.
            </motion.p>

            {/* Stats grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-5 hover:glow-cyan transition-shadow duration-500 group">
                  <div className="text-3xl md:text-4xl font-bold font-heading text-white group-hover:text-accent-cyan transition-colors">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted mt-2">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
