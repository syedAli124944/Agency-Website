import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { blogPosts } from '@/data/siteData';
import { fadeUp, staggerContainer } from '@/lib/utils';

function BlogCard({ post, i, onClick }) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      custom={i}
      onClick={() => onClick(post)}
      className="glass rounded-2xl overflow-hidden group border border-white/5 hover:border-accent-cyan/20 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,245,255,0.08)] cursor-pointer"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      data-cursor-hover
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-primary-800">
        {post.image && !imgErr ? (
          <motion.img
            src={post.image}
            alt={post.title}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`}>
            <div className="absolute inset-0 grid-bg opacity-30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent" />

        {/* Category */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full glass border border-white/15 text-xs font-semibold text-accent-cyan backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        {/* Hover overlay with arrow */}
        <div className="absolute inset-0 bg-primary-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-full glass border border-white/25 flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.3)]"
          >
            <ArrowUpRight size={20} className="text-accent-cyan" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-muted mb-3">
          <span>{post.date}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
        </div>
        <h3 className="text-lg font-heading font-semibold group-hover:text-accent-cyan transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted mt-3 line-clamp-2">{post.excerpt}</p>

        {/* Author row */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
          <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full border border-white/15 object-cover" />
          <span className="text-xs text-muted">{post.author.name}</span>
          <span className="ml-auto text-xs text-accent-cyan font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Read more <ArrowUpRight size={11} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog({ onPostClick }) {
  return (
    <section id="blog" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-pink/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Blog"
          title={<>Latest <span className="gradient-text">Insights</span></>}
          subtitle="Stay updated with the latest trends, tips, and insights from our team of experts."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} i={i} onClick={onPostClick} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
