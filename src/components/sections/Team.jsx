import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Twitter, Github, Share2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { team } from '@/data/siteData';
import { fadeUp, staggerContainer } from '@/lib/utils';

const socialConfig = [
  { key: 'twitter',  Icon: Twitter,  label: 'Twitter',  hoverColor: '#1DA1F2' },
  { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn', hoverColor: '#0A66C2' },
  { key: 'github',   Icon: Github,   label: 'GitHub',   hoverColor: '#e2e8f0' },
];

function TeamCard({ member, i }) {
  const [imgError, setImgError]   = useState(false);
  // Track touch-tap toggle for mobile (hover isn't available on touch)
  const [socialOpen, setSocialOpen] = useState(false);

  const toggleSocial = (e) => {
    // Only fire on touch devices; mouse users get the CSS group-hover
    if (e.pointerType === 'touch' || e.pointerType === 'pen') {
      e.preventDefault();
      setSocialOpen((v) => !v);
    }
  };

  // Whether to treat the overlay as visible (hover OR tap)
  // We combine CSS group-hover (desktop) + state (mobile)
  const overlayClass = socialOpen
    ? 'translate-y-0'
    : 'translate-y-full group-hover:translate-y-0';

  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      className="glass rounded-2xl overflow-hidden group text-center border border-white/5 hover:border-white/15 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)] relative"
      data-cursor-hover
      onPointerUp={toggleSocial}
    >
      {/* Photo area */}
      <div className="relative h-52 overflow-hidden bg-primary-800 select-none">

        {/* Real member photo */}
        {!imgError ? (
          <img
            src={member.image}
            alt={member.name}
            onError={() => setImgError(true)}
            draggable={false}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            style={{ transform: socialOpen ? 'scale(1.05)' : '' }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${member.color}20, transparent)` }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold font-heading"
              style={{ background: `${member.color}25`, color: member.color }}
            >
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/85 via-primary-900/10 to-transparent pointer-events-none" />

        {/* Accent glow on hover / tap-open */}
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${member.color}22, transparent 70%)`,
            opacity: socialOpen ? 1 : 0,
          }}
        />
        {/* CSS-only desktop hover glow (hidden on mobile) */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${member.color}18, transparent 70%)` }}
        />

        {/* ── Social icons overlay ─────────────────────────── */}
        {/* Desktop: slide-up on group-hover | Mobile: slide-up on tap toggle */}
        <div
          className={`absolute bottom-0 left-0 right-0 flex justify-center gap-2.5 py-3 transition-transform duration-300 ease-out ${overlayClass}`}
        >
          {/* Dark backdrop strip so icons are always readable */}
          <div className="absolute inset-0 bg-primary-900/60 backdrop-blur-sm" />

          {socialConfig.map(({ key, Icon, label, hoverColor }) => (
            <motion.a
              key={key}
              href={member.social[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on ${label}`}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              // Stop tap from bubbling back to parent card toggle
              onPointerUp={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-9 h-9 rounded-full glass border border-white/20 flex items-center justify-center text-white/70 transition-all duration-200"
              onMouseEnter={e => {
                e.currentTarget.style.color = hoverColor;
                e.currentTarget.style.borderColor = hoverColor + '55';
                e.currentTarget.style.boxShadow = `0 0 14px ${hoverColor}50`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.boxShadow = '';
              }}
              data-cursor-hover
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Info row — tap hint shown on mobile only */}
      <div className="p-5">
        <h3 className="font-heading font-semibold text-base">{member.name}</h3>
        <p className="text-sm mt-1" style={{ color: member.color }}>{member.role}</p>

        {/* Mobile-only tap hint: tiny icon row always visible below name */}
        <div className="flex justify-center gap-3 mt-3 md:hidden">
          {socialConfig.map(({ key, Icon, label, hoverColor }) => (
            <a
              key={key}
              href={member.social[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on ${label}`}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200"
              style={{ borderColor: `${member.color}30`, color: `${member.color}90` }}
              onTouchStart={e => {
                e.currentTarget.style.color = hoverColor;
                e.currentTarget.style.borderColor = hoverColor + '80';
                e.currentTarget.style.background = hoverColor + '15';
              }}
              onTouchEnd={e => {
                setTimeout(() => {
                  e.currentTarget.style.color = '';
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.background = '';
                }, 400);
              }}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  return (
    <section className="section-padding relative overflow-hidden">
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
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
