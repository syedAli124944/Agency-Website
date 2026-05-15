import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import MagneticButton from '@/components/common/MagneticButton';

const DEFAULT_PROJECTS = [
  { id: 'p1', title: 'Artisan Craft', category: 'E-Commerce', image_url: '/portfolio/artisan.png', description: 'A bespoke marketplace for hand-crafted digital assets with a focus on immersive 3D product previews.', tech: ['React 18', 'WebGL', 'Stripe'], metric: '+120% Conversion' },
  { id: 'p2', title: 'CloudVault', category: 'Security', image_url: '/portfolio/cloudvault.png', description: 'Next-generation encrypted storage for enterprise data featuring zero-knowledge architecture.', tech: ['Next.js', 'Rust', 'AWS'], metric: '0 Breaches' },
  { id: 'p3', title: 'DeliverX', category: 'Logistics', image_url: '/portfolio/deliverx.png', description: 'Real-time supply chain management and delivery tracking with predictive routing AI.', tech: ['Vue.js', 'Python', 'Maps API'], metric: '-30% Fuel Cost' },
  { id: 'p4', title: 'EcoTrack', category: 'Environment', image_url: '/portfolio/ecotrack.png', description: 'Monitoring global carbon footprint through data intelligence and IoT sensors.', tech: ['Svelte', 'Node.js', 'IoT'], metric: '5M+ Tons Saved' },
  { id: 'p5', title: 'FinFlow', category: 'Fintech', image_url: '/portfolio/finflow.png', description: 'Seamless financial management and payroll automation for modern tech startups.', tech: ['React Native', 'Go', 'Plaid'], metric: '$2B Processed' },
  { id: 'p6', title: 'HealthPulse', category: 'Healthcare', image_url: '/portfolio/healthpulse.png', description: 'Vital health monitoring with AI-driven insights and telehealth integration.', tech: ['iOS', 'HealthKit', 'OpenAI'], metric: '4.9 App Store' },
  { id: 'p7', title: 'Luminary', category: 'Design', image_url: '/portfolio/luminary.png', description: 'Visual storytelling through high-fidelity brand design and interactive web experiences.', tech: ['Figma', 'Framer', 'GSAP'], metric: 'Award Winner' },
  { id: 'p8', title: 'Nexus', category: 'Network', image_url: '/portfolio/nexus.png', description: 'Hyper-connected ecosystem for global communication with end-to-end encryption.', tech: ['WebRTC', 'Socket.io', 'Redis'], metric: '<10ms Latency' },
  { id: 'p9', title: 'Orbit', category: 'Strategy', image_url: '/portfolio/orbit.png', description: 'Global brand positioning and market expansion strategy leveraging big data analytics.', tech: ['BigQuery', 'Tableau', 'Python'], metric: '3x Growth' }
];

function ProjectCard({ project, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-[420px] rounded-[2rem] overflow-hidden glass border border-white/5 hover:border-white/20 transition-all duration-700 shadow-2xl w-full"
    >
      <div className="absolute inset-0 overflow-hidden bg-primary-900">
        <motion.img
          src={project.image_url}
          alt={project.title}
          animate={{ 
            scale: isHovered ? 1.08 : 1,
            y: isHovered ? -15 : 0,
            filter: isHovered ? 'blur(3px) brightness(0.3)' : 'blur(0px) brightness(0.6)'
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full object-cover origin-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/60 to-transparent opacity-90" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 pointer-events-none">
        <motion.div 
          animate={{ y: isHovered ? 0 : 80 }} 
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} 
          className="flex flex-col w-full"
        >
          {/* Top meta tags */}
          <div className="flex items-center justify-between mb-3 pointer-events-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-cyan/10 backdrop-blur-md text-accent-cyan text-[10px] font-bold uppercase tracking-widest border border-accent-cyan/20">
              {project.category}
            </span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }} 
              transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
              className="text-accent-purple font-bold text-[10px] uppercase tracking-widest bg-accent-purple/10 px-2 py-1 rounded-full border border-accent-purple/20"
            >
              {project.metric}
            </motion.span>
          </div>

          <h3 className="text-3xl font-bold font-heading text-white mb-2 leading-tight group-hover:text-accent-cyan transition-colors duration-300 pointer-events-auto">
            {project.title}
          </h3>

          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden pointer-events-auto"
          >
            <p className="text-soft-gray text-[14px] leading-relaxed mt-2 mb-4">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t, idx) => (
                <span key={idx} className="text-[10px] font-semibold tracking-wider text-white/70 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button onClick={onClick} className="flex items-center gap-2 text-white font-bold text-[11px] uppercase tracking-widest hover:text-accent-cyan transition-colors group/btn">
                View Case Study <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
              <div className="flex gap-4">
                <Github size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
                <ExternalLink size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Portfolio({ onViewAll }) {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        // Map database fields to the UI format
        const formattedProjects = data.map(p => ({
          ...p,
          // Ensure tech is an array and metric has a fallback
          tech: p.tech || ['React', 'Tailwind', 'Framer'],
          metric: p.metric || 'Featured'
        }));
        setProjects(formattedProjects);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section className="section-padding relative z-10 overflow-hidden" id="portfolio">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <SectionHeading
          badge="Portfolio"
          title={<>Selected <span className="gradient-text">Works</span></>}
          subtitle="A showcase of our premium digital solutions and their real-world impact."
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full flex overflow-hidden group"
      >
        <div 
          className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]"
          style={{ animationDuration: '60s' }} // Very slow and elegant speed
        >
          {/* First Set */}
          <div className="flex gap-6 lg:gap-8 pr-6 lg:pr-8">
            {projects.map((p, i) => (
              <div key={i} className="w-[320px] md:w-[420px] shrink-0">
                <ProjectCard project={p} onClick={onViewAll} />
              </div>
            ))}
          </div>
          
          {/* Second Set (Duplicate for perfect looping) */}
          <div className="flex gap-6 lg:gap-8 pr-6 lg:pr-8">
            {projects.map((p, i) => (
              <div key={`dup-${i}`} className="w-[320px] md:w-[420px] shrink-0">
                <ProjectCard project={p} onClick={onViewAll} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* View All Projects Button */}
      <div className="max-w-7xl mx-auto px-6 mt-16 flex justify-center relative z-20">
        <MagneticButton variant="primary" onClick={onViewAll}>
          View All Projects <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </MagneticButton>
      </div>
    </section>
  );
}
