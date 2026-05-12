import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Layers, Smartphone, Globe, Palette, ArrowRight, X } from 'lucide-react';
import { portfolioProjects } from '@/data/portfolioData';

const tabs = [
  { label: 'All', value: 'all', icon: Layers },
  { label: 'Web', value: 'web', icon: Globe },
  { label: 'Mobile', value: 'mobile', icon: Smartphone },
  { label: 'Design', value: 'design', icon: Palette },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

const detailVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, x: 60, transition: { duration: 0.35 } },
};

function ProjectCard({ project, onClick, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      key={project.id}
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick(project)}
      className="group relative glass rounded-2xl overflow-hidden cursor-pointer hover:bg-white/[0.06] transition-all duration-500 border border-white/5 hover:border-white/15"
      data-cursor-hover
    >
      {/* Visual area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-primary-800">
        {/* Real project image */}
        <motion.img
          src={project.image}
          alt={project.title}
          animate={hovered ? { scale: 1.07 } : { scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full h-full object-cover"
        />

        {/* Persistent bottom gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/10 to-transparent" />

        {/* Stats overlay on hover */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-primary-900/95 to-transparent flex justify-between items-end"
        >
          {project.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-lg font-bold font-heading" style={{ color: project.accentColor }}>{s.value}</div>
              <div className="text-[10px] text-muted leading-tight">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* View detail button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.25 }}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20"
        >
          <ArrowRight size={16} className="text-white" />
        </motion.div>

        {/* Tag pill */}
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm"
          style={{ background: `${project.accentColor}25`, color: project.accentColor, border: `1px solid ${project.accentColor}40` }}
        >
          {project.tagLabel}
        </div>
      </div>

      {/* Card footer */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted mb-1">{project.client} · {project.year}</p>
            <h3 className="text-base font-heading font-semibold leading-snug">{project.title}</h3>
            <p className="text-xs text-muted mt-2 line-clamp-2 leading-relaxed">{project.description}</p>
          </div>
          <div
            className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300"
            style={{ background: `${project.accentColor}15`, color: project.accentColor }}
          >
            <ExternalLink size={13} />
          </div>
        </div>

        {/* Tech chips */}
        <div className="flex gap-2 flex-wrap mt-3">
          {project.tech.slice(0, 3).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-medium text-muted bg-white/5 border border-white/8">
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-muted bg-white/5 border border-white/8">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectDetail({ project, onClose }) {
  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={project.id}
          variants={detailVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary-900/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl border border-white/10 scrollbar-thin"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-all duration-200"
              data-cursor-hover
            >
              <X size={18} />
            </button>

            {/* Hero image */}
            <div className="relative h-52 md:h-72 overflow-hidden rounded-t-3xl bg-primary-800">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-primary-900/10" />
              {/* Accent color shimmer */}
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: `radial-gradient(ellipse at center, ${project.accentColor}40 0%, transparent 70%)` }}
              />
              {/* Tag */}
              <div
                className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm"
                style={{ background: `${project.accentColor}25`, color: project.accentColor, border: `1px solid ${project.accentColor}40` }}
              >
                {project.tagLabel}
              </div>
              {/* Title over image */}
              <div className="absolute bottom-5 left-6 right-16">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white drop-shadow-lg leading-snug">{project.title}</h2>
                <p className="text-sm text-white/60 mt-1">{project.client} · {project.year}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {project.stats.map((s) => (
                  <div key={s.label} className="glass rounded-2xl p-4 text-center border border-white/5">
                    <div className="text-2xl font-heading font-bold" style={{ color: project.accentColor }}>{s.value}</div>
                    <div className="text-xs text-muted mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 rounded-full" style={{ background: project.accentColor }} />
                    <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted">Overview</h3>
                  </div>
                  <p className="text-soft-gray leading-relaxed text-sm md:text-base">{project.longDesc}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 rounded-full" style={{ background: project.accentColor }} />
                    <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted">Tech Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium border"
                        style={{ background: `${project.accentColor}10`, color: project.accentColor, borderColor: `${project.accentColor}25` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted mb-1">Client</div>
                      <div className="font-semibold text-sm">{project.client}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted mb-1">Year</div>
                      <div className="font-semibold text-sm">{project.year}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted mb-1">Category</div>
                      <div className="font-semibold text-sm">{project.category}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 flex gap-4">
                <a
                  href={project.link}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-primary-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                  style={{ background: project.accentColor }}
                  data-cursor-hover
                >
                  View Live Project <ExternalLink size={14} />
                </a>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm glass text-muted hover:text-white transition-all duration-300 border border-white/10"
                  data-cursor-hover
                >
                  Back to Portfolio
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PortfolioPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);

  const filtered = activeTab === 'all'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.tag === activeTab);

  return (
    <div className="min-h-screen bg-primary-900" ref={containerRef}>
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[200px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[200px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted hover:text-accent-cyan transition-colors duration-300 mb-8 group"
            data-cursor-hover
          >
            <motion.span whileHover={{ x: -4 }} className="flex items-center gap-2">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back to Home</span>
            </motion.span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-semibold text-accent-cyan tracking-wider uppercase mb-4"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-glow" />
                Our Work
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-4xl md:text-6xl font-heading font-bold leading-tight"
              >
                Creative{' '}
                <span className="gradient-text">Portfolio</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-muted mt-3 max-w-lg leading-relaxed"
              >
                Explore our full body of work — from enterprise platforms to award-winning mobile experiences.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-right"
            >
              <div className="text-4xl font-heading font-bold gradient-text">{portfolioProjects.length}</div>
              <div className="text-sm text-muted">Projects Delivered</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex gap-2 mb-10 flex-wrap"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const count = tab.value === 'all' ? portfolioProjects.length : portfolioProjects.filter((p) => p.tag === tab.value).length;
            return (
              <motion.button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeTab === tab.value
                    ? 'bg-accent-cyan text-primary-900 border-accent-cyan shadow-[0_0_20px_rgba(0,245,255,0.25)]'
                    : 'glass text-muted hover:text-white border-white/10 hover:border-white/20'
                }`}
                data-cursor-hover
              >
                <Icon size={15} />
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.value ? 'bg-primary-900/30 text-primary-900' : 'bg-white/10 text-muted'
                }`}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <p className="text-muted text-lg">No projects in this category yet.</p>
          </motion.div>
        )}

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 glass rounded-3xl border border-white/8 p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-accent-cyan/8 blur-[100px]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Have a project in mind?
            </h2>
            <p className="text-muted max-w-lg mx-auto mb-8 leading-relaxed">
              Let's collaborate and build something extraordinary together. Our team is ready to turn your vision into reality.
            </p>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent-cyan text-primary-900 font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all duration-300"
              data-cursor-hover
            >
              Start a Conversation <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
