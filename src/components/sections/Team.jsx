import { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { fadeUp, staggerContainer } from '@/lib/utils';
import { team as teamData } from '@/data/siteData';

const socialConfig = [
  { key: 'twitter',  Icon: Twitter,  label: 'Twitter',  hoverColor: '#1DA1F2' },
  { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn', hoverColor: '#0A66C2' },
  { key: 'github',   Icon: Github,   label: 'GitHub',   hoverColor: '#e2e8f0' },
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
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/85 via-primary-900/10 to-transparent pointer-events-none" />
        
        <div className={`absolute bottom-0 left-0 right-0 flex justify-center gap-2.5 py-3 transition-transform duration-300 ease-out ${overlayClass}`}>
          <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-sm" />
          {socialConfig.map(({ key, Icon, label, hoverColor }) => {
            const url = member.social?.[key];
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
          {teamData.map((member, i) => (
            <TeamCard key={i} member={member} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
