import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, CheckCircle, ArrowLeft, User, Mail, MessageSquare, Sparkles } from 'lucide-react';

const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const SLOTS = {
  '30min': ['09:00 AM','09:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','01:00 PM','01:30 PM','02:00 PM','02:30 PM','03:00 PM','03:30 PM','04:00 PM','04:30 PM'],
  '60min': ['09:00 AM','10:00 AM','11:00 AM','01:00 PM','02:00 PM','03:00 PM','04:00 PM'],
};

const DISABLED_DAYS = [0, 6]; // sun, sat

function Orbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div animate={{ x:[0,40,0], y:[0,-30,0] }} transition={{ duration:14, repeat:Infinity, ease:'easeInOut' }}
        className="absolute -top-60 -left-40 w-[700px] h-[700px] rounded-full"
        style={{ background:'radial-gradient(circle, rgba(0,245,255,0.1) 0%, transparent 70%)' }} />
      <motion.div animate={{ x:[0,-40,0], y:[0,40,0] }} transition={{ duration:18, repeat:Infinity, ease:'easeInOut', delay:4 }}
        className="absolute -bottom-60 -right-40 w-[700px] h-[700px] rounded-full"
        style={{ background:'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage:'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize:'48px 48px' }} />
    </div>
  );
}

function CalendarPicker({ selected, onSelect }) {
  const today = new Date();
  const [view, setView] = useState({ month: today.getMonth(), year: today.getFullYear() });

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);

  const prev = () => setView(v => v.month === 0 ? { month:11, year:v.year-1 } : { month:v.month-1, year:v.year });
  const next = () => setView(v => v.month === 11 ? { month:0, year:v.year+1 } : { month:v.month+1, year:v.year });

  const isDisabled = (d) => {
    if (!d) return true;
    const dt = new Date(view.year, view.month, d);
    return DISABLED_DAYS.includes(dt.getDay()) || dt < new Date(today.setHours(0,0,0,0));
  };
  const isToday = (d) => d && new Date(view.year, view.month, d).toDateString() === new Date().toDateString();
  const isSelected = (d) => d && selected && new Date(view.year, view.month, d).toDateString() === selected.toDateString();

  return (
    <div className="glass rounded-2xl border border-white/10 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={prev} className="w-8 h-8 rounded-lg glass border border-white/8 flex items-center justify-center hover:border-accent-cyan/40 transition-colors">
          <ChevronLeft size={15} />
        </button>
        <motion.span key={`${view.month}-${view.year}`} initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
          className="text-sm font-semibold text-white">
          {MONTHS[view.month]} {view.year}
        </motion.span>
        <button onClick={next} className="w-8 h-8 rounded-lg glass border border-white/8 flex items-center justify-center hover:border-accent-cyan/40 transition-colors">
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => <div key={d} className="text-center text-[10px] text-muted font-semibold py-1">{d}</div>)}
      </div>

      {/* Cells */}
      <motion.div key={`${view.month}-${view.year}`} initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }}
        transition={{ duration:0.25 }} className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          const disabled = isDisabled(d);
          const selected_ = isSelected(d);
          const today_ = isToday(d);
          return (
            <motion.button key={i} whileHover={!disabled ? { scale:1.1 } : {}} whileTap={!disabled ? { scale:0.95 } : {}}
              onClick={() => !disabled && onSelect(new Date(view.year, view.month, d))}
              disabled={disabled}
              className={`aspect-square rounded-lg text-xs font-medium flex items-center justify-center transition-all duration-200 ${
                !d ? 'invisible' :
                selected_ ? 'text-primary-900 font-bold shadow-[0_0_14px_rgba(0,245,255,0.5)]' :
                today_ ? 'border border-accent-cyan/40 text-accent-cyan' :
                disabled ? 'text-white/15 cursor-not-allowed' :
                'text-white/70 hover:bg-white/8 hover:text-white'
              }`}
              style={selected_ ? { background:'linear-gradient(135deg,#00F5FF,#7C3AED)' } : {}}>
              {d}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

function TimeSlots({ duration, selected, onSelect }) {
  const slots = SLOTS[duration];
  return (
    <div className="glass rounded-2xl border border-white/10 p-5">
      <h3 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
        <Clock size={14} className="text-accent-cyan" /> Available Times
      </h3>
      <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1 custom-scroll">
        {slots.map((slot) => {
          const active = selected === slot;
          return (
            <motion.button key={slot} whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              onClick={() => onSelect(slot)}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                active
                  ? 'text-primary-900 border-transparent shadow-[0_0_12px_rgba(0,245,255,0.4)]'
                  : 'glass border-white/8 text-white/70 hover:border-accent-cyan/30 hover:text-white'
              }`}
              style={active ? { background:'linear-gradient(135deg,#00F5FF,#7C3AED)' } : {}}>
              {slot}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function FloatInput({ label, icon:Icon, name, type='text', value, onChange, rows }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  const Tag = rows ? 'textarea' : 'input';
  return (
    <div className="relative">
      <motion.label animate={{ top: active?'8px':'50%', y: active?'0%':'-50%', fontSize: active?'10px':'14px', color: active?'#00F5FF':'rgba(161,161,170,1)' }}
        transition={{ duration:0.2 }} className="absolute left-11 pointer-events-none z-10 font-medium" style={{ lineHeight:1 }}>
        {label}
      </motion.label>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <motion.div animate={{ color: active?'#00F5FF':'#71717a' }} transition={{ duration:0.2 }}><Icon size={15} /></motion.div>
      </div>
      <Tag id={name} name={name} type={type} value={value} rows={rows}
        onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="w-full pl-11 pr-4 pt-5 pb-2 rounded-xl text-white text-sm bg-white/[0.04] border border-white/8 focus:outline-none focus:border-accent-cyan/50 transition-all resize-none"
      />
    </div>
  );
}

const steps = ['Pick Date & Time', 'Your Details', 'Confirmed!'];

export default function BookingPage({ onBack }) {
  const [step, setStep] = useState(0);
  const [duration, setDuration] = useState('30min');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [form, setForm] = useState({ name:'', email:'', note:'' });

  const upd = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const canNext = step === 0 ? (date && time) : (form.name && form.email);

  const handleConfirm = (e) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <motion.div key="booking" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="min-h-screen relative flex flex-col items-center justify-start py-10 px-4"
      style={{ background:'#050510' }}>
      <Orbs />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Back */}
        <motion.button initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1 }}
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to site
        </motion.button>

        {/* Brand */}
        <motion.div initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center shadow-[0_0_16px_rgba(0,245,255,0.4)]">
              <Sparkles size={15} className="text-white" />
            </div>
            <span className="text-xl font-bold font-heading gradient-text">NovaSpark</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-2">
            Book a <span className="gradient-text">Free Session</span>
          </h1>
          <p className="text-muted text-sm mt-2">30 or 60-minute strategy call with our team — no strings attached.</p>
        </motion.div>

        {/* Step indicator */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} className="flex items-center justify-center gap-3 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 transition-all duration-300 ${i <= step ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300 ${
                  i < step ? 'bg-accent-cyan border-accent-cyan text-primary-900' :
                  i === step ? 'border-accent-cyan text-accent-cyan shadow-[0_0_12px_rgba(0,245,255,0.4)]' :
                  'border-white/20 text-muted'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${i === step ? 'text-white' : 'text-muted'}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-px transition-all duration-500 ${i < step ? 'bg-accent-cyan' : 'bg-white/10'}`} />}
            </div>
          ))}
        </motion.div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {/* ── Step 0: Calendar + Slots ── */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }} transition={{ duration:0.35 }}>
              {/* Duration toggle */}
              <div className="flex justify-center gap-3 mb-6">
                {[['30min','30 Minutes'],['60min','60 Minutes']].map(([val, label]) => (
                  <motion.button key={val} whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                    onClick={() => { setDuration(val); setTime(''); }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                      duration === val
                        ? 'text-primary-900 border-transparent shadow-[0_0_14px_rgba(0,245,255,0.35)]'
                        : 'glass border-white/10 text-white/60 hover:border-white/25'
                    }`}
                    style={duration === val ? { background:'linear-gradient(135deg,#00F5FF,#7C3AED)' } : {}}>
                    <Clock size={14} /> {label}
                  </motion.button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <CalendarPicker selected={date} onSelect={(d) => { setDate(d); setTime(''); }} />
                <div>
                  <AnimatePresence mode="wait">
                    {date ? (
                      <motion.div key="slots" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
                        <div className="text-center mb-3">
                          <span className="text-xs text-accent-cyan font-semibold">
                            {date.toLocaleDateString('en-US',{ weekday:'long', month:'long', day:'numeric' })}
                          </span>
                        </div>
                        <TimeSlots duration={duration} selected={time} onSelect={setTime} />
                      </motion.div>
                    ) : (
                      <motion.div key="placeholder" initial={{ opacity:0 }} animate={{ opacity:1 }}
                        className="glass rounded-2xl border border-white/8 h-full flex flex-col items-center justify-center p-10 gap-3 text-center">
                        <Calendar size={32} className="text-white/20" />
                        <p className="text-sm text-muted">Select a date to see available time slots</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Selected summary */}
              <AnimatePresence>
                {date && time && (
                  <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                    className="mt-5 glass rounded-xl border border-accent-cyan/20 px-5 py-3 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-white/70"><Calendar size={14} className="text-accent-cyan" />
                        {date.toLocaleDateString('en-US',{ month:'short', day:'numeric', year:'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5 text-white/70"><Clock size={14} className="text-accent-purple" />{time}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full glass border border-white/10 text-muted">{duration === '30min' ? '30 min' : '60 min'}</span>
                    </div>
                    <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                      onClick={() => setStep(1)}
                      className="px-5 py-2 rounded-xl text-sm font-bold text-primary-900 shadow-[0_0_14px_rgba(0,245,255,0.4)]"
                      style={{ background:'linear-gradient(135deg,#00F5FF,#7C3AED)' }}>
                      Continue →
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Step 1: Details form ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }} transition={{ duration:0.35 }}>
              <div className="max-w-lg mx-auto">
                <div className="glass rounded-2xl border border-white/10 p-7">
                  <h2 className="text-lg font-bold text-white mb-1">Your Information</h2>
                  <p className="text-xs text-muted mb-5">We'll send a calendar invite to your email.</p>

                  <form onSubmit={handleConfirm} className="space-y-4">
                    <FloatInput label="Full Name" icon={User} name="name" value={form.name} onChange={upd('name')} />
                    <FloatInput label="Email Address" icon={Mail} name="email" type="email" value={form.email} onChange={upd('email')} />
                    <FloatInput label="What would you like to discuss? (optional)" icon={MessageSquare} name="note" value={form.note} onChange={upd('note')} rows={3} />

                    {/* Booking summary */}
                    <div className="rounded-xl bg-white/[0.03] border border-white/8 p-4 space-y-2">
                      {[
                        { icon: Calendar, val: date?.toLocaleDateString('en-US',{ weekday:'long', month:'long', day:'numeric' }) },
                        { icon: Clock,    val: `${time} · ${duration === '30min' ? '30 minutes' : '1 hour'}` },
                      ].map(({ icon:Icon, val }) => (
                        <div key={val} className="flex items-center gap-3 text-sm text-white/70">
                          <Icon size={14} className="text-accent-cyan flex-shrink-0" /> {val}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-1">
                      <button type="button" onClick={() => setStep(0)}
                        className="flex-1 py-3 rounded-xl text-sm font-semibold glass border border-white/10 text-white/60 hover:text-white transition-colors">
                        ← Back
                      </button>
                      <motion.button type="submit" disabled={!canNext} whileHover={canNext?{scale:1.02}:{}} whileTap={canNext?{scale:0.97}:{}}
                        className="flex-2 flex-grow py-3 rounded-xl text-sm font-bold text-primary-900 disabled:opacity-40 shadow-[0_0_14px_rgba(0,245,255,0.35)]"
                        style={{ background:'linear-gradient(135deg,#00F5FF,#7C3AED)' }}>
                        Confirm Booking
                      </motion.button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Confirmed ── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4, ease:[0.34,1.2,0.64,1] }}>
              <div className="max-w-md mx-auto text-center">
                <div className="glass rounded-2xl border border-accent-cyan/20 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                  <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.15, type:'spring', stiffness:260, damping:20 }}
                    className="w-16 h-16 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={30} className="text-accent-cyan" />
                  </motion.div>

                  <h2 className="text-2xl font-bold font-heading text-white">You're Booked! 🎉</h2>
                  <p className="text-sm text-muted mt-2 mb-6">We'll send a confirmation + calendar invite to <span className="text-accent-cyan">{form.email}</span></p>

                  <div className="space-y-3 text-left mb-6">
                    {[
                      { icon:User,     label:'Name',     val: form.name },
                      { icon:Calendar, label:'Date',     val: date?.toLocaleDateString('en-US',{ weekday:'long', month:'long', day:'numeric' }) },
                      { icon:Clock,    label:'Time',     val: `${time} · ${duration === '30min' ? '30 min' : '60 min'}` },
                    ].map(({ icon:Icon, label, val }) => (
                      <div key={label} className="flex gap-3 glass rounded-xl border border-white/8 px-4 py-3">
                        <Icon size={14} className="text-accent-cyan flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] text-muted">{label}</div>
                          <div className="text-sm text-white/80 mt-0.5">{val}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} onClick={onBack}
                    className="w-full py-3 rounded-xl text-sm font-bold text-primary-900 shadow-[0_0_14px_rgba(0,245,255,0.4)]"
                    style={{ background:'linear-gradient(135deg,#00F5FF,#7C3AED)' }}>
                    Back to NovaSpark →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
