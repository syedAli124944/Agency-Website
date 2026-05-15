import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, Twitter, Linkedin, Share2, Facebook, Bookmark, MessageSquare, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const FALLBACK_2026_CONTENT = [
    {
        "type": "paragraph",
        "text": "The digital landscape of 2026 is no longer about simple visibility; it is about cognitive architecture. As we transition from the era of responsive design to the epoch of autonomous interfaces, the definition of a successful agency is being rewritten in real-time. We are witnessing a fundamental shift from human-centric design to co-intelligent ecosystems where the interface is a living participant in the user journey."
    },
    {
        "type": "heading",
        "text": "The Era of AI-Native Architecture"
    },
    {
        "type": "image",
        "url": "/images/blog-neural.png",
        "caption": "Neural Brand Evolution: Designing for Algorithmic Resonance"
    },
    {
        "type": "paragraph",
        "text": "In 2026, design is no longer a static process. At NovaSpark, we are pioneering Generative UI—interfaces that adapt their layout, color theory, and cognitive load based on the individual user's biometric engagement in real-time. This isn't just about dark mode or light mode; it's about a fluid digital skin that breathes with the user's intent, reducing friction to near-zero levels."
    },
    {
        "type": "paragraph",
        "text": "Traditional grid systems are being replaced by Elastic Frameworks that can accommodate everything from a smartwatch screen to a full-room spatial projection without losing brand integrity. This requires a new breed of developer—one who understands both neural networks and high-fidelity motion design."
    },
    {
        "type": "heading",
        "text": "The Convergence of Realities"
    },
    {
        "type": "image",
        "url": "/images/blog-spatial.png",
        "caption": "Spatial Commerce: Persistent Digital Layers in Physical Environments"
    },
    {
        "type": "paragraph",
        "text": "With the widespread adoption of advanced head-mounted displays and retinal projection, the screen has become the entire world. Digital agencies must now think in three dimensions, considering depth, lighting, and spatial acoustics as core design components."
    },
    {
        "type": "paragraph",
        "text": "Imagine walking into a physical store and seeing a personalized digital layer that highlights products matching your current biometric needs. This is the ultimate convergence of data and physical reality."
    },
    {
        "type": "subheading",
        "text": "The Autonomous Agency Model"
    },
    {
        "type": "paragraph",
        "text": "The traditional agency structure—siloed departments, slow feedback loops, and manual reporting—is being dismantled. In its place, the Autonomous Agency uses a network of Specialized AI Agents to handle data synthesis, competitive benchmarking, and real-time optimization. This allows our human strategists to focus exclusively on high-level creative vision and ethical oversight."
    },
    {
        "type": "subheading",
        "text": "Key Pillars of 2026 Strategy"
    },
    {
        "type": "list",
        "items": [
            "Hyper-Personalization: Algorithms that predict user intent before the first click by analyzing micro-patterns in cursor movement and dwell time.",
            "Neural Branding: Visual identities that are no longer static logos, but generative entities that evolve with seasonal sentiment analysis and real-time market trends.",
            "Sustainable Compute: Designing for low-energy, high-impact digital footprints, utilizing edge computing to process data closer to the user.",
            "Spatial Commerce: Seamlessly bridging the gap between physical and virtual storefronts through high-fidelity AR overlays that persist in physical locations.",
            "Autonomous Content: Systems that generate contextually relevant updates and insights without human intervention, maintaining a persistent brand voice."
        ]
    },
    {
        "type": "quote",
        "text": "In the new economy, your brand is not what you tell people it is. It is the quality of the algorithmic relationship you maintain with your audience. The interface is the new handshake."
    },
    {
        "type": "heading",
        "text": "The Death of the Traditional Funnel"
    },
    {
        "type": "paragraph",
        "text": "The linear journey from awareness to purchase has collapsed into a single point of interaction. Today's consumers exist in a state of Constant Convergence. They are simultaneously researching, experiencing, and transacting within the same digital moment."
    },
    {
        "type": "paragraph",
        "text": "This collapse requires agencies to build persistent ecosystems rather than ephemeral campaigns. A campaign has a beginning and an end; an ecosystem is a permanent fixture in the user's digital life. We are moving away from Interruption Marketing toward Integration Architecture, where the brand provides utility that justifies its presence in the user's limited cognitive space."
    },
    {
        "type": "heading",
        "text": "Spatial Computing and the New Reality"
    },
    {
        "type": "paragraph",
        "text": "With the widespread adoption of advanced head-mounted displays and retinal projection, the screen has become the entire world. Digital agencies must now think in three dimensions, considering depth, lighting, and spatial acoustics as core design components."
    },
    {
        "type": "paragraph",
        "text": "NovaSpark is currently developing Persistent Spatial Layers for major retail partners. Imagine walking into a physical store and seeing a personalized digital layer that highlights products matching your current biometric needs or dietary restrictions. This is the ultimate convergence of data and physical reality."
    },
    {
        "type": "paragraph",
        "text": "As we look toward the second half of the decade, the winners will be those who prioritize technical depth and strategic foresight over aesthetic trends. The digital renaissance is here, and it is built on a foundation of intelligence, empathy, and architectural precision. Welcome to the future of digital architecture."
    }
];

// ── Content block renderer ────────────────────────────────────────────────────
function ContentBlock({ block, index }) {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } },
  };

  if (block.type === 'paragraph') return (
    <motion.p variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="text-lg md:text-xl text-primary-300 leading-relaxed mb-8">
      {block.text}
    </motion.p>
  );

  if (block.type === 'heading') return (
    <motion.h2 variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold font-heading text-white mt-20 mb-10 flex items-center gap-4">
      <span className="w-1.5 h-12 bg-accent-cyan rounded-full" />
      {block.text}
    </motion.h2>
  );

  if (block.type === 'subheading') return (
    <motion.h3 variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="text-2xl md:text-3xl font-bold font-heading text-white/90 mt-12 mb-6">
      {block.text}
    </motion.h3>
  );

  if (block.type === 'list') return (
    <motion.ul variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="space-y-4 mb-10 pl-6">
      {block.items.map((item, i) => (
        <li key={i} className="flex items-start gap-4 text-primary-300 text-lg">
          <CheckCircle2 size={20} className="text-accent-cyan mt-1 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </motion.ul>
  );

  if (block.type === 'quote') return (
    <motion.blockquote variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="my-16 relative px-12 py-12 rounded-[3rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-2xl">
      <p className="text-2xl md:text-3xl italic text-white leading-relaxed font-medium">"{block.text}"</p>
      <div className="absolute top-0 right-10 -translate-y-1/2 w-20 h-20 bg-accent-cyan/20 blur-3xl rounded-full" />
    </motion.blockquote>
  );

  if (block.type === 'image') return (
    <motion.div variants={variants} initial="hidden" whileInView="visible" viewport={{ once: true }}
      className="my-16 group relative overflow-hidden rounded-[2.5rem] border border-white/10"
    >
      <img src={block.url} alt={block.caption} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-accent-cyan text-xs font-black uppercase tracking-widest">{block.caption}</p>
      </div>
    </motion.div>
  );

  return null;
}

// ── Sidebar Widget ────────────────────────────────────────────────────────────
function SidebarWidget({ title, children, icon: Icon }) {
  return (
    <div className="glass rounded-[2rem] border border-white/5 p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
          {Icon && <Icon size={20} />}
        </div>
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/70">{title}</h4>
      </div>
      {children}
    </div>
  );
}

export default function BlogPostPage({ post: initialPost, onBack, onNavigate, onBookingOpen }) {
  const [post, setPost] = useState(initialPost);
  const [related, setRelated] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const heroRef = useRef(null);
  
  // Hero Parallax
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // Reading Progress
  const { scrollYProgress: readProgress } = useScroll();
  const progressWidth = useTransform(readProgress, [0, 1], ['0%', '100%']);

  useLayoutEffect(() => {
    // 1. Immediate Force Scroll to Top
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    // 2. Delayed Burst to catch browser scroll-restoration
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    }, 50);

    return () => clearTimeout(timer);
  }, [post.id]);

  useEffect(() => {
    // 3. Deep Refresh: Fetch latest content for this specific post
    async function fetchLatestContent() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', post.id)
        .single();
      
      if (data && !error) {
        setPost(data);
      }
    }

    async function fetchRelated() {
      const { data } = await supabase.from('blog_posts').select('*').neq('id', post.id).limit(2);
      if (data) setRelated(data);
    }
    
    fetchLatestContent();
    fetchRelated();
  }, [post.id]);

  // Social Share Logic
  const share = (platform) => {
    const url = window.location.href;
    const title = post.title;
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    if (links[platform]) window.open(links[platform], '_blank');
    else if (platform === 'native' && navigator.share) {
        navigator.share({ title, url });
    }
  };

  // Subscribe Handler
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          // User is already subscribed, still show success to be friendly
        } else {
          throw error;
        }
      }

      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
      // Fallback: still show success to the user for better UX
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  // Talk Strategy Handler -> Redirect to Booking
  const handleTalkStrategy = () => {
    if (onBookingOpen) {
      onBookingOpen();
    } else {
      onBack();
      setTimeout(() => {
        const el = document.getElementById('booking');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-[#050508]">
      
      {/* Sticky Return to Insights Button */}
      <div className="fixed top-10 left-10 z-[100] pointer-events-none">
        <button 
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#050508]/40 border border-white/10 text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 hover:border-white/40 transition-all shadow-2xl backdrop-blur-xl group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-accent-cyan" /> 
          <span>Return to Insights</span>
        </button>
      </div>
      
      {/* Reading Progress */}
      <motion.div className="fixed top-0 left-0 h-1.5 z-[100] bg-accent-cyan origin-left shadow-[0_0_10px_#00F5FF]" style={{ width: progressWidth }} />

      {/* ── Cinematic Hero ── */}
      <div ref={heroRef} className="relative h-[85vh] overflow-hidden">
        {/* Step 1: Generated Background Image (Low Opacity) */}
        <div 
          className="absolute inset-0 opacity-30 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/blog-hero.png')" }}
        />
        
        {/* Main Post Image Layer */}
        <motion.div 
          style={{ y: heroY, backgroundImage: `url(${post.image_url})` }} 
          className="absolute inset-0 z-10 opacity-60 bg-cover bg-center"
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent z-20" />
        <div className="absolute inset-0 bg-[#050508]/20 z-10" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 pb-24 z-30">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-5 py-2 rounded-full bg-accent-cyan text-black text-[11px] font-black uppercase tracking-[0.2em] mb-8 inline-block shadow-[0_0_20px_rgba(0,245,255,0.4)]">
              {post.category || 'Expert Insight'}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white leading-[1.1] mb-10 max-w-5xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-8 text-primary-400 font-bold uppercase tracking-widest text-[10px]">
              <div className="flex items-center gap-2"><Calendar size={14} className="text-accent-cyan" /> {new Date(post.created_at).toLocaleDateString()}</div>
              <div className="flex items-center gap-2"><Clock size={14} className="text-accent-cyan" /> {post.read_time || '7 min'}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Article Body ── */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 py-24">
        
        {/* Main Content (Left) */}
        <div className="lg:col-span-8">
          <article className="prose prose-invert max-w-none">
            {(() => {
              let blocks = post.content;
              if (typeof blocks === 'string') {
                try {
                  blocks = JSON.parse(blocks);
                } catch (e) {
                  console.error('JSON Parse Error:', e);
                }
              }

              // FAIL-SAFE OVERWRITE: If this is the 2026 post and content is placeholder-short, use fallback
              if (post?.id === '6bbae34d-7933-411b-a2cb-ce6fbe405a52' || post?.title?.includes('2026')) {
                const isPlaceholder = !blocks || 
                                     (Array.isArray(blocks) && blocks.length < 5) || 
                                     (typeof blocks === 'string' && blocks.length < 500);
                if (isPlaceholder) {
                  blocks = FALLBACK_2026_CONTENT;
                }
              }
              
              if (Array.isArray(blocks)) {
                return blocks.map((block, i) => (
                  <ContentBlock key={i} block={block} index={i} />
                ));
              }
              
              return <p className="text-primary-400">Reconstructing intelligence feed...</p>;
            })()}
          </article>

          {/* Social Share & Save */}
          <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-500">Spread Knowledge</span>
              <div className="flex gap-3">
                {[
                  { icon: Twitter,  p: 'twitter' },
                  { icon: Linkedin, p: 'linkedin' },
                  { icon: Facebook, p: 'facebook' },
                  { icon: Share2,   p: 'native' }
                ].map(({ icon: Icon, p }) => (
                  <button 
                    key={p} 
                    onClick={() => share(p)} 
                    className="w-12 h-12 rounded-2xl glass border border-white/5 flex items-center justify-center text-white hover:text-accent-cyan hover:border-accent-cyan/40 hover:bg-accent-cyan/10 transition-all"
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all px-6 py-3 rounded-xl border ${isSaved ? 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5' : 'text-primary-400 border-white/5 hover:text-white hover:border-white/20'}`}
            >
              <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Saved to Library' : 'Save for Later'}
            </button>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <aside className="lg:col-span-4 space-y-10">
          <div className="sticky top-32 space-y-10">
            <SidebarWidget title="The Author" icon={MessageSquare}>
            <div className="flex items-center gap-5 mb-8">
              <img src={post.author_avatar || `https://ui-avatars.com/api/?name=${post.author_name}&background=00F5FF&color=050510`} className="w-14 h-14 rounded-full border-2 border-accent-cyan shadow-lg" />
              <div>
                <p className="text-sm font-bold text-white uppercase tracking-widest">{post.author_name || 'NovaSpark Expert'}</p>
                <p className="text-[10px] text-primary-500 font-bold uppercase tracking-widest mt-1">Lead Strategist</p>
              </div>
            </div>
            {/* Step 3: Author Button Text (Fixed to Black for visibility) */}
            <button className="w-full py-5 rounded-2xl bg-accent-cyan text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all shadow-[0_10px_20px_rgba(0,245,255,0.2)]">
              Follow Insights
            </button>
          </SidebarWidget>

          {/* Stay Ahead / Newsletter */}
          <SidebarWidget title="Stay Ahead" icon={CheckCircle2}>
            <p className="text-sm text-primary-400 mb-8 leading-relaxed">Join 5,000+ pioneers receiving our weekly intelligence reports.</p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc....@gmail.com" 
                className="w-full px-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:border-accent-cyan outline-none transition-all placeholder:text-white/30" 
              />
              <button className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-accent-cyan transition-all flex items-center justify-center gap-2">
                {subscribed ? <><CheckCircle2 size={16} /> Welcome Aboard</> : 'Join Intelligence'}
              </button>
            </form>
          </SidebarWidget>
          </div>
        </aside>
      </div>

      {/* Step 4: Lets Talk Strategy (Footer CTA - Fixed Visibility & Link) */}
      <div className="relative py-40 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-cover bg-center grayscale" style={{ backgroundImage: `url('/images/blog-hero.png')` }} />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 leading-[1.05]">Ready to redefine your digital architecture?</h2>
          <button 
            onClick={handleTalkStrategy}
            className="px-14 py-7 rounded-full bg-accent-cyan text-black font-black text-xs uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(0,245,255,0.3)] hover:bg-white hover:scale-105 active:scale-95 transition-all"
          >
            Let's Talk Strategy
          </button>
        </div>
      </div>

    </motion.div>
  );
}
