import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { fadeUp, staggerContainer } from '@/lib/utils';

const socialConfig = [
  { key: 'twitter',  Icon: Twitter,  label: 'Twitter',  hoverColor: '#1DA1F2' },
  { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn', hoverColor: '#0A66C2' },
  { key: 'github',   Icon: Github,   label: 'GitHub',   hoverColor: '#e2e8f0' },
];

const DEFAULT_TEAM = [
  {
    id: 'd1',
    name: 'Syed Ali',
    role: 'Full Stack Developer',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    color: '#00F5FF',
    twitter_url: '#',
    linkedin_url: '#',
    github_url: '#'
  },
  {
    id: 'd2',
    name: 'Sarah Jenkins',
    role: 'UI/UX Lead',
    image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    color: '#7C3AED',
    twitter_url: '#',
    linkedin_url: '#',
    github_url: '#'
  },
  {
    id: 'd3',
    name: 'Marcus Thorne',
    role: 'Creative Director',
    image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    color: '#FF4D9D',
    twitter_url: '#',
    linkedin_url: '#',
    github_url: '#'
  },
  {
    id: 'd4',
    name: 'Elena Vance',
    role: 'Brand Strategist',
    image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    color: '#FF8A00',
    twitter_url: '#',
    linkedin_url: '#',
    github_url: '#'
  }
];

function TeamCard({ member, i }) {
  const [socialOpen, setSocialOpen] = useState(false);
  const color = member.color || (i % 2 === 0 ? '#00F5FF' : '#7C3AED');

  const overlayClass = socialOpen
    ? 'translate-y-0'
    : 'translate-y-full group-hover:translate-y-0';

  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      className="glass rounded-2xl overflow-hidden group text-center border border-white/5 hover:border-white/15 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)] relative"
      data-cursor-hover
      onPointerUp={() => setSocialOpen(!socialOpen)}
    >
      <div className="relative h-52 overflow-hidden bg-primary-800 select-none">
        <img
          src={member.image_url}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/85 via-primary-900/10 to-transparent pointer-events-none" />
        
        <div className={`absolute bottom-0 left-0 right-0 flex justify-center gap-2.5 py-3 transition-transform duration-300 ease-out ${overlayClass}`}>
          <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-sm" />
          {socialConfig.map(({ key, Icon, label, hoverColor }) => {
            const url = member[`${key}_url`];
            return (
              <motion.a
                key={key}
                href={url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="relative z-10 w-9 h-9 rounded-full glass border border-white/20 flex items-center justify-center text-white/70 transition-all duration-200"
                style={{ '--hover-color': hoverColor }}
                onMouseEnter={e => e.currentTarget.style.color = hoverColor}
                onMouseLeave={e => e.currentTarget.style.color = ''}
              >
                <Icon size={15} />
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-heading font-semibold text-base">{member.name}</h3>
        <p className="text-sm mt-1 uppercase tracking-widest font-bold text-[10px]" style={{ color }}>{member.role}</p>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const [data, setData] = useState(DEFAULT_TEAM);

  useEffect(() => {
    async function fetchTeam() {
      const { data: dbData, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (!error && dbData && dbData.length > 0) {
        setData(dbData);
      }
    }
    fetchTeam();
  }, []);
  return (
    <section id="team" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent-green/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Our Team"
          title={<>The Minds <span className="gradient-text">Behind the Magic</span></>}
          subtitle="A passionate team of designers, developers, and strategists dedicated to your success."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.map((member, i) => (
            <TeamCard key={member.id || i} member={member} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
