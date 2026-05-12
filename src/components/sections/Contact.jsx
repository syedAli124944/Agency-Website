import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Mail, MapPin, Phone, ExternalLink,
  ChevronDown, CheckCircle, User, AtSign, MessageSquare,
} from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import MagneticButton from '@/components/common/MagneticButton';
import { fadeUp, staggerContainer } from '@/lib/utils';

// ── Google Maps embed (dark-filtered, inline, fully interactive) ─────────────
const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d201879.97!2d-122.6276171!3d37.7578150!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1715470000000!5m2!1sen!2sus';

function InlineMap({ open }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="map"
          initial={{ opacity: 0, scaleY: 0.85, y: -6 }}
          animate={{ opacity: 1, scaleY: 1,   y: 0  }}
          exit  ={{ opacity: 0, scaleY: 0.85, y: -6 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'top center', overflow: 'hidden' }}
          className="mt-2 rounded-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          {/* Header */}
          <div className="glass border-b border-white/8 px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-pink animate-pulse" />
            <MapPin size={12} className="text-accent-pink" />
            <span className="text-xs font-semibold text-white/70">
              NovaSpark HQ · San Francisco, CA
            </span>
            <span className="ml-auto text-[10px] text-muted hidden sm:block">
              Drag · Scroll to zoom
            </span>
          </div>

          {/* Embedded map */}
          <div className="relative h-52 bg-primary-900">
            <iframe
              src={MAP_SRC}
              width="100%"
              height="100%"
              style={{
                border: 0,
                display: 'block',
                filter: 'invert(90%) hue-rotate(180deg) saturate(1.3) brightness(0.72)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NovaSpark HQ Map"
            />
            {/* glow */}
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/15 rounded-full blur-[40px] pointer-events-none" />
          </div>

          {/* Footer */}
          <div className="glass border-t border-white/8 px-4 py-2 flex items-center justify-between flex-wrap gap-2">
            <span className="text-[10px] text-muted">37.7749°N · 122.4194°W</span>
            <div className="flex gap-2">
              {['Oakland', 'Berkeley', 'San Jose'].map((c) => (
                <span key={c} className="text-[10px] px-2 py-0.5 rounded-full glass border border-white/8 text-white/40">{c}</span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Contact info cards ───────────────────────────────────────────────────────
function ContactCards() {
  const [mapOpen, setMapOpen] = useState(false);

  const items = [
    { icon: Mail,   label: 'Email',    value: 'hello@novaspark.io', color: '#00F5FF',
      href: `https://mail.google.com/mail/?view=cm&to=hello@novaspark.io`, external: true },
    { icon: Phone,  label: 'Phone',    value: '+1 (555) 123-4567',  color: '#7C3AED',
      href: 'tel:+15551234567', external: false },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA',  color: '#FF4D9D',
      isLocation: true },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="lg:col-span-2 space-y-4"
    >
      {items.map((item, i) => {
        const Icon = item.icon;

        const card = (
          <motion.div
            variants={fadeUp}
            custom={i}
            className="glass rounded-xl p-5 flex items-center gap-4 group hover:bg-white/[0.06] transition-all duration-400 border border-white/5 hover:border-white/15 cursor-pointer"
            data-cursor-hover
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0"
              style={{ background: `${item.color}15`, color: item.color }}
            >
              <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted">{item.label}</div>
              <div className="text-sm font-semibold mt-0.5 group-hover:text-white transition-colors truncate">
                {item.value}
              </div>
            </div>
            {item.isLocation ? (
              <motion.div animate={{ rotate: mapOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                <ChevronDown size={15} style={{ color: item.color }} className="opacity-50 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ) : (
              <ExternalLink size={13} style={{ color: item.color }} className="opacity-0 group-hover:opacity-70 transition-opacity flex-shrink-0" />
            )}
          </motion.div>
        );

        return (
          <div key={item.label}>
            {item.isLocation
              ? <div onClick={() => setMapOpen((v) => !v)}>{card}</div>
              : <a href={item.href} target={item.external ? '_blank' : undefined} rel="noopener noreferrer" className="block">{card}</a>
            }
            {item.isLocation && <InlineMap open={mapOpen} />}
          </div>
        );
      })}
    </motion.div>
  );
}

// ── FloatInput — module scope so React never remounts it ─────────────────────
function FloatInput({ name, type = 'text', label, rows, value, focused, onFocus, onBlur, onChange }) {
  const active = focused === name || value;
  const Tag    = rows ? 'textarea' : 'input';
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${
          active ? 'top-2 text-[10px] text-accent-cyan' : 'top-4 text-sm text-muted'
        }`}
      >
        {label}
      </label>
      <Tag
        id={name} name={name} type={type} rows={rows}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onFocus={() => onFocus(name)}
        onBlur={onBlur}
        required
        className="w-full px-4 pt-6 pb-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-accent-cyan/50 transition-colors resize-none"
        data-cursor-hover
        autoComplete="off"
      />
    </div>
  );
}

// ── Success card shown after submission ──────────────────────────────────────
function SuccessCard({ data, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit  ={{ opacity: 0, scale: 0.95, y: 16  }}
      transition={{ duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
      className="glass rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
    >
      {/* Icon */}
      <div className="flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
          className="w-16 h-16 rounded-full bg-accent-cyan/10 border border-accent-cyan/25 flex items-center justify-center"
        >
          <CheckCircle size={32} className="text-accent-cyan" />
        </motion.div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-heading font-semibold text-white">Message Received!</h3>
        <p className="text-sm text-muted mt-1">Here's a summary of what you sent:</p>
      </div>

      {/* Message summary */}
      <div className="space-y-3">
        {[
          { Icon: User,          label: 'Name',    val: data.name    },
          { Icon: AtSign,        label: 'Email',   val: data.email   },
          { Icon: MessageSquare, label: 'Message', val: data.message },
        ].map(({ Icon, label, val }) => (
          <div key={label} className="flex gap-3 rounded-xl bg-white/[0.03] border border-white/8 px-4 py-3">
            <Icon size={15} className="text-accent-cyan flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="text-[10px] text-muted">{label}</div>
              <div className="text-sm text-white/80 break-words mt-0.5">{val}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Sent-to note */}
      <div className="rounded-xl bg-accent-cyan/5 border border-accent-cyan/15 px-4 py-3 text-center">
        <p className="text-xs text-muted">Message sent to</p>
        <p className="text-sm font-semibold text-accent-cyan mt-0.5">syedali.as888@gmail.com</p>
      </div>

      <button
        onClick={onBack}
        className="text-xs text-muted hover:text-white transition-colors text-center underline underline-offset-4"
      >
        Send another message
      </button>
    </motion.div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState('');
  const [sent, setSent]       = useState(false);
  const [sentData, setSentData] = useState(null);

  const upd = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save a snapshot of what was submitted
    setSentData({ ...form });
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setFocused('');
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Contact"
          title={<>Let's Build Something <span className="gradient-text">Amazing</span></>}
          subtitle="Ready to transform your digital presence? Let's talk."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left — contact cards with inline map */}
          <ContactCards />

          {/* Right — form OR success card */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {sent ? (
                <SuccessCard
                  key="success"
                  data={sentData}
                  onBack={() => { setSent(false); setSentData(null); }}
                />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0  }}
                  exit  ={{ opacity: 0, x:-40  }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-2xl p-6 sm:p-8"
                >
                  <div className="space-y-5">
                    <FloatInput
                      name="name" label="Your Name"
                      value={form.name} focused={focused}
                      onFocus={setFocused} onBlur={() => setFocused('')} onChange={upd}
                    />
                    <FloatInput
                      name="email" type="email" label="Your Email"
                      value={form.email} focused={focused}
                      onFocus={setFocused} onBlur={() => setFocused('')} onChange={upd}
                    />
                    <FloatInput
                      name="message" label="Your Message" rows={5}
                      value={form.message} focused={focused}
                      onFocus={setFocused} onBlur={() => setFocused('')} onChange={upd}
                    />
                  </div>
                  <div className="mt-6">
                    <MagneticButton variant="primary" className="w-full justify-center">
                      Send Message <Send size={16} />
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
