import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Plus, X, Loader2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { supabase } from '@/lib/supabase';
import { fadeUp } from '@/lib/utils';

const COLORS = ['#00F5FF', '#7C3AED', '#FF4D9D', '#FF8A00'];

const DEFAULT_REVIEWS = [
  {
    id: 'r1',
    name: 'Jonathan Sterling',
    role: 'CEO, TechFlow',
    content: 'NovaSpark transformed our digital presence completely. Their attention to detail and creative vision is unmatched in the industry.',
    rating: 5
  },
  {
    id: 'r2',
    name: 'Melissa Huang',
    role: 'Product Manager, Luminate',
    content: 'The team is incredibly professional and responsive. They delivered our project ahead of schedule with exceptional quality.',
    rating: 5
  },
  {
    id: 'r3',
    name: 'Robert K. Chen',
    role: 'Founder, Pulse Design',
    content: 'Working with NovaSpark was the best decision for our rebranding. They truly understood our vision and brought it to life.',
    rating: 5
  }
];

function TestimonialCard({ t, i }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="glass rounded-2xl p-8 relative hover:bg-white/[0.06] transition-all duration-500 border border-white/5 hover:border-white/12 select-none h-full flex flex-col"
    >
      <Quote size={30} className="mb-6" style={{ color: `${COLORS[i % 4]}35` }} />
      <p className="text-soft-gray leading-relaxed mb-8 text-[16px] flex-grow">"{t.content}"</p>
      <div className="flex items-center gap-4 mt-auto">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold font-heading flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${COLORS[i % 4]}30, ${COLORS[i % 4]}10)`,
            color: COLORS[i % 4],
          }}
        >
          {t.name[0]}
        </div>
        <div className="min-w-0">
          <div className="font-semibold font-heading text-base truncate">{t.name}</div>
          <div className="text-xs text-muted truncate">{t.role}</div>
        </div>
        <div className="ml-auto flex gap-1 flex-shrink-0">
          {Array.from({ length: t.rating }).map((_, j) => (
            <Star key={j} size={14} fill="#FF8A00" color="#FF8A00" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', role: '', content: '', rating: 5 });

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data && data.length > 0) {
        // Merge Supabase reviews with defaults if desired, or just use Supabase.
        // Let's just use Supabase + defaults so it's always populated.
        setReviews([...data, ...DEFAULT_REVIEWS]);
      } else {
        setReviews(DEFAULT_REVIEWS);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.content) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('testimonials').insert([{
        name: formData.name,
        role: formData.role || 'Client',
        content: formData.content,
        rating: formData.rating
      }]);
      
      if (!error) {
        setFormData({ name: '', role: '', content: '', rating: 5 });
        setIsModalOpen(false);
        fetchReviews(); // Refresh list
      } else {
        console.error("Supabase Error:", error);
        alert(`Failed to submit review: ${error.message}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section-padding relative overflow-hidden bg-primary-950/20" id="testimonials">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionHeading
          badge="Testimonials"
          title={<>What Our Clients <span className="gradient-text">Say</span></>}
          subtitle="Real stories from real partners who've scaled their business with us."
          center
        />

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
          >
            <Plus size={16} />
            Leave a Review
          </button>
        </div>

        {/* Masonry Layout for Flowing Reviews */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mt-12 text-left">
          {reviews.map((t, i) => (
            <div key={t.id || i} className="break-inside-avoid">
              <TestimonialCard t={t} i={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Leave Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg glass bg-primary-900/90 border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <h3 className="text-2xl font-bold font-heading mb-2">Share Your Experience</h3>
              <p className="text-sm text-soft-gray mb-6">Your feedback helps us grow and improve.</p>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">Name *</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-primary-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-cyan/50 text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">Role / Company</label>
                    <input 
                      type="text" 
                      value={formData.role}
                      onChange={e => setFormData({...formData, role: e.target.value})}
                      className="w-full bg-primary-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-cyan/50 text-white"
                      placeholder="CEO, TechCorp"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">Rating</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star 
                          size={24} 
                          fill={star <= formData.rating ? "#FF8A00" : "transparent"} 
                          color={star <= formData.rating ? "#FF8A00" : "rgba(255,255,255,0.2)"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">Review *</label>
                  <textarea 
                    required
                    value={formData.content}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                    className="w-full bg-primary-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-cyan/50 text-white resize-none h-28"
                    placeholder="Tell us what you loved..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-gradient-to-r from-accent-cyan to-accent-purple text-primary-900 font-bold rounded-xl py-3.5 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
