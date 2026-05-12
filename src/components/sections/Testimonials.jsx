import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { testimonials } from '@/data/siteData';
import { fadeUp, staggerContainer } from '@/lib/utils';

const COLORS = ['#00F5FF', '#7C3AED', '#FF4D9D', '#FF8A00'];

function TestimonialCard({ t, i }) {
  return (
    <div
      className="glass rounded-2xl p-6 relative hover:bg-white/[0.06] transition-all duration-500 h-full border border-white/5 hover:border-white/12 select-none"
    >
      <Quote size={30} className="mb-4" style={{ color: `${COLORS[i % 4]}35` }} />
      <p className="text-soft-gray leading-relaxed mb-6 text-[15px]">"{t.text}"</p>
      <div className="flex items-center gap-4">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold font-heading flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${COLORS[i % 4]}30, ${COLORS[i % 4]}10)`,
            color: COLORS[i % 4],
          }}
        >
          {t.name[0]}
        </div>
        <div className="min-w-0">
          <div className="font-semibold font-heading text-sm truncate">{t.name}</div>
          <div className="text-xs text-muted truncate">{t.role}</div>
        </div>
        <div className="ml-auto flex gap-1 flex-shrink-0">
          {Array.from({ length: t.rating }).map((_, j) => (
            <Star key={j} size={13} fill="#FF8A00" color="#FF8A00" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const scrollRef = useRef(null);

  /* Arrow button scroll */
  const scrollBy = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-purple/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Testimonials"
          title={<>What Our Clients <span className="gradient-text">Say</span></>}
          subtitle="Don't just take our word for it — hear from the leaders who've experienced the NovaSpark difference."
        />
      </div>

      {/* ── MOBILE: draggable + snap scroll ── */}
      <div className="md:hidden relative">
        {/* Arrow buttons */}
        <button
          onClick={() => scrollBy(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full glass border border-white/15 flex items-center justify-center text-white hover:text-accent-cyan transition-colors shadow-lg"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollBy(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full glass border border-white/15 flex items-center justify-center text-white hover:text-accent-cyan transition-colors shadow-lg"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>

        {/* Native scroll container (handles momentum & snap) */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 cursor-grab active:cursor-grabbing scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          onMouseDown={(e) => {
            const el = scrollRef.current;
            if (!el) return;
            let startX = e.pageX - el.offsetLeft;
            let scrollLeft = el.scrollLeft;
            let isDown = true;
            let velX = 0;
            let lastX = e.pageX;
            let animId;

            const onMove = (me) => {
              if (!isDown) return;
              const x = me.pageX - el.offsetLeft;
              const walk = (x - startX) * 1.4;
              velX = me.pageX - lastX;
              lastX = me.pageX;
              el.scrollLeft = scrollLeft - walk;
            };

            const onUp = () => {
              isDown = false;
              // Momentum coast
              const coast = () => {
                velX *= 0.92;
                if (Math.abs(velX) < 0.5) return;
                el.scrollLeft -= velX;
                animId = requestAnimationFrame(coast);
              };
              animId = requestAnimationFrame(coast);
              window.removeEventListener('mousemove', onMove);
              window.removeEventListener('mouseup', onUp);
            };

            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
            e.preventDefault();
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              ref={trackRef}
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex-none w-[82vw] max-w-sm snap-center"
            >
              <TestimonialCard t={t} i={i} />
            </motion.div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-3">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardW = el.scrollWidth / testimonials.length;
                el.scrollTo({ left: cardW * i, behavior: 'smooth' });
              }}
              className="w-1.5 h-1.5 rounded-full bg-white/25 hover:bg-accent-cyan/70 transition-colors"
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP: 2-col grid ── */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 mt-2">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div key={t.name} variants={fadeUp} custom={i}>
              <TestimonialCard t={t} i={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
