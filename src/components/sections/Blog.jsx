import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Loader2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { fadeUp, staggerContainer } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { blogPosts as fallbackPosts } from '@/data/siteData';

function BlogCard({ post, i, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  const isFeatured = i === 0;

  return (
    <motion.article
      variants={fadeUp}
      custom={i}
      onClick={() => onClick(post)}
      className={`glass rounded-3xl overflow-hidden group border border-white/5 hover:border-accent-cyan/20 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,245,255,0.08)] cursor-pointer h-full flex flex-col ${
        isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      data-cursor-hover
    >
      {/* Image */}
      <div className={`relative overflow-hidden bg-primary-800 ${isFeatured ? 'aspect-[21/9]' : 'aspect-video'}`}>
        <img
          src={post.image_url || '/images/blog-1.png'}
          alt={post.title}
          onError={(e) => {
             e.target.src = '/images/blog-1.png';
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-transparent to-transparent" />

        {/* Category */}
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 rounded-full glass border border-white/15 text-[10px] uppercase tracking-[0.2em] font-black text-accent-cyan backdrop-blur-md">
            {post.category || 'Strategy'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[10px] font-black text-primary-500 mb-4 uppercase tracking-[0.2em]">
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {post.read_time || '5 min'}</span>
        </div>
        <h3 className={`${isFeatured ? 'text-3xl' : 'text-xl'} font-heading font-bold group-hover:text-accent-cyan transition-colors duration-300 line-clamp-2 mb-4 leading-tight`}>
          {post.title}
        </h3>
        <p className="text-primary-400 line-clamp-2 mb-8 leading-relaxed">{post.excerpt}</p>

        {/* Author row */}
        <div className="flex items-center gap-3 mt-auto pt-6 border-t border-white/5">
          <div className="w-8 h-8 rounded-full border border-accent-cyan/30 p-0.5">
            <img 
              src={post.author_avatar || `https://ui-avatars.com/api/?name=${post.author_name || 'Team'}&background=00F5FF&color=050510`} 
              alt={post.author_name} 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          <div>
            <span className="block text-xs font-bold text-white uppercase tracking-wider">{post.author_name || 'Agency Team'}</span>
            <span className="block text-[10px] text-primary-500 uppercase">Expert Contributor</span>
          </div>
          <span className="ml-auto text-xs text-accent-cyan font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 translate-x-2 group-hover:translate-x-0">
            Read <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Blog({ onPostClick }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Normalize fallback data to match Supabase schema
  const normalizedFallback = fallbackPosts.map(p => ({
    ...p,
    image_url: p.image,
    author_name: p.author?.name,
    author_avatar: p.author?.avatar,
    read_time: p.readTime,
    created_at: p.date || new Date().toISOString()
  }));

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // If no data in Supabase, use fallback
        setPosts(data && data.length > 0 ? data : normalizedFallback);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setPosts(normalizedFallback);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="section-padding relative overflow-hidden bg-primary-950">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[200px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          badge="Latest Insights"
          title={<>Our <span className="gradient-text">Thought</span> Leadership</>}
          subtitle="Explore the latest trends in digital innovation and strategic growth."
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Loader2 className="animate-spin text-accent-cyan" size={48} />
            <p className="text-primary-500 uppercase tracking-[0.3em] font-bold text-xs animate-pulse">Loading Intelligence...</p>
          </div>
        ) : posts.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className={`grid gap-8 ${
              posts.length === 1 
                ? 'flex justify-center max-w-4xl mx-auto' 
                : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {posts.map((post, i) => (
              <div key={post.id} className={posts.length === 1 ? 'w-full' : ''}>
                <BlogCard post={post} i={i} onClick={onPostClick} />
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-32 glass rounded-[3rem] border border-white/5 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">The Feed is Empty</h3>
            <p className="text-primary-500 uppercase tracking-widest text-xs font-bold">New insights are currently in production.</p>
          </div>
        )}
      </div>
    </section>
  );
}
