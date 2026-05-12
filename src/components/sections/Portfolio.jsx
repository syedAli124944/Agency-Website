import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { fadeUp, staggerContainer } from '@/lib/utils';
import { portfolioProjects } from '@/data/portfolioData';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Design', value: 'design' },
];

export default function Portfolio({ onViewAll }) {
  const [active, setActive] = useState('all');
  const scrollRef = useRef(null);

  const allFiltered = active === 'all' ? portfolioProjects : portfolioProjects.filter((p) => p.tag === active);
  const filtered = allFiltered.slice(0, 6);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  return (
    <section id="portfolio" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-orange/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Portfolio"
          title={<>Our Recent <span className="gradient-text">Work</span></>}
          subtitle="Explore a selection of projects that showcase our expertise and creative excellence."
        />

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-10 flex-wrap"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                active === f.value
                  ? 'bg-accent-cyan text-primary-900 shadow-[0_0_20px_rgba(0,245,255,0.25)]'
                  : 'glass text-muted hover:text-white border border-white/10 hover:border-white/20'
              }`}
              data-cursor-hover
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── MOBILE: horizontal scroll carousel ── */}
      <div className="md:hidden relative">
        {/* Scroll arrows */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full glass border border-white/15 flex items-center justify-center text-white hover:text-accent-cyan transition-colors shadow-lg"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full glass border border-white/15 flex items-center justify-center text-white hover:text-accent-cyan transition-colors shadow-lg"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} />
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <AnimatePresence>
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.93 }}
                transition={{ delay: i * 0.06 }}
                onClick={onViewAll}
                className="flex-none w-[78vw] max-w-xs snap-center group cursor-pointer glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300"
                data-cursor-hover
              >
                {/* Card image */}
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay always present for readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent`} />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary-900/55 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-accent-cyan border border-accent-cyan/30">
                      <ExternalLink size={16} />
                    </div>
                  </div>
                  {/* Tag */}
                  <div
                    className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm"
                    style={{ background: `${project.accentColor}25`, color: project.accentColor, border: `1px solid ${project.accentColor}40` }}
                  >
                    {project.tagLabel}
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: project.accentColor }}>
                    {project.category}
                  </span>
                  <h3 className="text-base font-heading font-semibold mt-1.5">{project.title}</h3>
                  <p className="text-xs text-muted mt-1.5 line-clamp-2 leading-relaxed">{project.description}</p>
                  {/* Tech chips */}
                  <div className="flex gap-1.5 flex-wrap mt-3">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium text-muted bg-white/5 border border-white/8">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-2">
          {filtered.map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white/20" />
          ))}
        </div>
      </div>

      {/* ── DESKTOP: standard grid ── */}
      <div className="hidden md:block max-w-7xl mx-auto px-6">
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                layout
                key={project.id}
                variants={fadeUp}
                custom={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border border-white/5 hover:border-white/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                onClick={onViewAll}
                data-cursor-hover
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Bottom-up gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/75 via-primary-900/15 to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary-900/55 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <motion.div whileHover={{ scale: 1.15 }} className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent-cyan border border-accent-cyan/30">
                      <ExternalLink size={20} />
                    </motion.div>
                  </div>
                  <div
                    className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm"
                    style={{ background: `${project.accentColor}25`, color: project.accentColor, border: `1px solid ${project.accentColor}40` }}
                  >
                    {project.tagLabel}
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: project.accentColor }}>
                    {project.category}
                  </span>
                  <h3 className="text-lg font-heading font-semibold mt-2">{project.title}</h3>
                  <p className="text-sm text-muted mt-2 line-clamp-2">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* View all CTA */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass border border-white/15 text-sm font-semibold text-white transition-all duration-300 hover:border-accent-cyan hover:shadow-[0_0_25px_rgba(0,245,255,0.3)]"
            style={{ transition: 'background 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#00F5FF'; e.currentTarget.style.color = '#0a0f1a'; }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; }}
            data-cursor-hover
          >
            View All Projects <ExternalLink size={15} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
