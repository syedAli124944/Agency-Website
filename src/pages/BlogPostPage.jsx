import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from '@/data/siteData';

// ── Content block renderer ────────────────────────────────────────────────────
function ContentBlock({ block, index }) {
  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  if (block.type === 'lead') return (
    <motion.p variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="text-xl text-white/80 leading-relaxed font-medium border-l-4 border-accent-cyan pl-5 py-1">
      {block.text}
    </motion.p>
  );

  if (block.type === 'h2') return (
    <motion.h2 variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="text-2xl font-bold font-heading text-white mt-10 mb-4 flex items-center gap-3">
      <span className="w-1 h-7 rounded-full bg-gradient-to-b from-accent-cyan to-accent-purple flex-shrink-0" />
      {block.text}
    </motion.h2>
  );

  if (block.type === 'quote') return (
    <motion.blockquote variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="my-8 relative">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-cyan/5 to-accent-purple/5 border border-white/8" />
      <div className="relative px-6 py-5">
        <span className="text-5xl text-accent-cyan/30 font-serif leading-none absolute top-2 left-4">"</span>
        <p className="text-lg italic text-white/70 leading-relaxed pl-6">{block.text}</p>
      </div>
    </motion.blockquote>
  );

  return (
    <motion.p variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="text-base text-white/60 leading-relaxed">
      {block.text}
    </motion.p>
  );
}

// ── Related card ──────────────────────────────────────────────────────────────
function RelatedCard({ post, onClick }) {
  return (
    <motion.article whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.25 }}
      onClick={() => onClick(post)}
      className="glass rounded-xl overflow-hidden border border-white/8 hover:border-accent-cyan/25 transition-all duration-400 cursor-pointer group">
      <div className="aspect-video overflow-hidden bg-primary-800 relative">
        <img src={post.image} alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass border border-white/15 text-[10px] font-semibold text-accent-cyan">
          {post.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white/80 group-hover:text-accent-cyan transition-colors line-clamp-2">{post.title}</h3>
        <div className="flex items-center gap-2 mt-2 text-[11px] text-muted">
          <Clock size={11} /> {post.readTime}
        </div>
      </div>
    </motion.article>
  );
}

// ── Main BlogPostPage ─────────────────────────────────────────────────────────
export default function BlogPostPage({ post, onBack, onNavigate }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY     = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [post.id]);

  // Read progress bar
  const { scrollYProgress: readProgress } = useScroll();
  const progressWidth = useTransform(readProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen" style={{ background: '#050510' }}>

      {/* Read progress bar */}
      <motion.div className="fixed top-0 left-0 h-[3px] z-[999] rounded-full origin-left"
        style={{ width: progressWidth, background: 'linear-gradient(90deg, #00F5FF, #7C3AED, #FF4D9D)' }} />

      {/* ── Parallax Hero ── */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={post.cover || post.image} alt={post.title}
            className="w-full h-full object-cover" />
        </motion.div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/30 to-transparent" />

        {/* Back button */}
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          onClick={onBack}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors glass px-4 py-2 rounded-full border border-white/10 hover:border-white/25 group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
        </motion.button>

        {/* Hero content */}
        <motion.div style={{ opacity: heroOpacity }}
          className="absolute bottom-0 left-0 right-0 px-6 pb-12 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
            <span className="inline-block px-3 py-1 rounded-full glass border border-white/15 text-xs font-semibold text-accent-cyan mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Article body ── */}
      <div className="max-w-4xl mx-auto px-6 -mt-2 pb-24">
        {/* Author card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass rounded-2xl border border-white/8 p-5 flex items-center justify-between flex-wrap gap-4 mb-10">
          <div className="flex items-center gap-4">
            <motion.img whileHover={{ scale: 1.1 }} src={post.author.avatar} alt={post.author.name}
              className="w-12 h-12 rounded-full border-2 border-accent-cyan/30 object-cover" />
            <div>
              <div className="text-sm font-semibold text-white">{post.author.name}</div>
              <div className="text-xs text-muted">{post.author.role} · NovaSpark</div>
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="flex items-center gap-1 px-2.5 py-1 rounded-full glass border border-white/8 text-[11px] text-white/50 hover:text-accent-cyan hover:border-accent-cyan/30 transition-colors cursor-default">
                <Tag size={9} /> {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <article className="space-y-5">
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} index={i} />
          ))}
        </article>

        {/* Share bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 pt-8 border-t border-white/8 flex items-center justify-between flex-wrap gap-4">
          <span className="text-sm text-muted">Found this helpful? Share it →</span>
          <div className="flex gap-3">
            {[
              { icon: Twitter,  label: 'Share on X',        href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, color: '#1DA1F2' },
              { icon: Linkedin, label: 'Share on LinkedIn',  href: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, color: '#0A66C2' },
            ].map(({ icon: Icon, label, href, color }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/8 hover:border-white/20 text-xs font-semibold text-white/60 hover:text-white transition-all duration-200"
                style={{ '--hover-color': color }}>
                <Icon size={14} style={{ color }} /> {label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-xl font-bold font-heading text-white mb-6 flex items-center gap-2">
              <span className="gradient-text">More</span> to Read
              <ArrowRight size={16} className="text-muted" />
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {related.map((p) => (
                <RelatedCard key={p.id} post={p} onClick={onNavigate} />
              ))}
            </div>
          </div>
        )}

        {/* Back CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.2 }} className="mt-12 text-center">
          <motion.button onClick={onBack} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-primary-900 shadow-[0_0_20px_rgba(0,245,255,0.35)]"
            style={{ background: 'linear-gradient(135deg, #00F5FF, #7C3AED)' }}>
            <ArrowLeft size={15} /> Back to All Posts
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
