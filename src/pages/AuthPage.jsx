import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  Mail, Lock, User, Eye, EyeOff, ArrowRight,
  Sparkles, Shield, Zap, Chrome,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ── Floating orb background ───────────────────────────────────────────────────
function Orbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large ambient orbs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,77,157,0.08) 0%, transparent 70%)' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1.5,
            height: Math.random() * 3 + 1.5,
            left: `${Math.random() * 100}%`,
            top:  `${Math.random() * 100}%`,
            background: ['#00F5FF', '#7C3AED', '#FF4D9D'][i % 3],
            opacity: 0.5,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ── Social provider button ────────────────────────────────────────────────────
function SocialButton({ icon: Icon, label, color, onClick, loading }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="relative w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/20 transition-all duration-300 font-semibold text-sm text-white/80 hover:text-white overflow-hidden group"
    >
      {/* Glow on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileHover={{ opacity: 1, scale: 1.5 }}
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${color}15, transparent 70%)` }}
      />
      <Icon size={18} style={{ color }} className="flex-shrink-0" />
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

// ── Floating label input ──────────────────────────────────────────────────────
function AuthInput({ name, type: initType = 'text', label, icon: Icon, value, onChange, error }) {
  const [focused, setFocused] = useState(false);
  const [showPw,  setShowPw]  = useState(false);
  const type   = initType === 'password' ? (showPw ? 'text' : 'password') : initType;
  const active = focused || value;

  return (
    <div className="relative">
      {/* Floating label */}
      <motion.label
        htmlFor={name}
        animate={{
          top:      active ? '8px'  : '50%',
          y:        active ? '0%'   : '-50%',
          fontSize: active ? '10px' : '14px',
          color:    active ? (error ? '#FF4D9D' : '#00F5FF') : 'rgba(161,161,170,1)',
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-11 pointer-events-none z-10 origin-left font-medium"
        style={{ lineHeight: 1 }}
      >
        {label}
      </motion.label>

      {/* Left icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <motion.div animate={{ color: active ? (error ? '#FF4D9D' : '#00F5FF') : '#71717a' }} transition={{ duration: 0.2 }}>
          <Icon size={16} />
        </motion.div>
      </div>

      {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={name === 'email' ? 'email' : name === 'password' ? 'current-password' : 'name'}
        className={`w-full pl-11 pr-${initType === 'password' ? '11' : '4'} pt-5 pb-2 rounded-xl text-white text-sm bg-white/[0.04] border transition-all duration-300 focus:outline-none ${
          error
            ? 'border-accent-pink/50 focus:border-accent-pink'
            : focused
            ? 'border-accent-cyan/50 bg-white/[0.07]'
            : 'border-white/8 hover:border-white/15'
        }`}
      />

      {/* Password toggle */}
      {initType === 'password' && (
        <button
          type="button"
          onClick={() => setShowPw((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors z-10"
          tabIndex={-1}
        >
          {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      )}

      {/* Focus ring glow */}
      <motion.div
        animate={{ opacity: focused ? 1 : 0 }}
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: error
            ? '0 0 0 1px rgba(255,77,157,0.3), 0 0 16px rgba(255,77,157,0.1)'
            : '0 0 0 1px rgba(0,245,255,0.25), 0 0 16px rgba(0,245,255,0.08)',
        }}
      />

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0,  height: 'auto' }}
            exit  ={{ opacity: 0, y: -4,  height: 0 }}
            className="text-[11px] text-accent-pink mt-1 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Strength bar for password ─────────────────────────────────────────────────
function PasswordStrength({ password }) {
  const len    = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasNum   = /\d/.test(password);
  const hasSym   = /[^a-zA-Z0-9]/.test(password);
  const score  = (len >= 8 ? 1 : 0) + (hasUpper ? 1 : 0) + (hasNum ? 1 : 0) + (hasSym ? 1 : 0);
  const label  = ['', 'Weak', 'Fair', 'Good', 'Strong'][score];
  const colors = ['', '#FF4D9D', '#f59e0b', '#00F5FF', '#22c55e'];

  if (!password) return null;

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((n) => (
          <motion.div
            key={n}
            className="h-1 flex-1 rounded-full"
            animate={{ backgroundColor: n <= score ? colors[score] : 'rgba(255,255,255,0.08)' }}
            transition={{ duration: 0.3, delay: n * 0.05 }}
          />
        ))}
      </div>
      <p className="text-[10px] font-medium" style={{ color: colors[score] }}>{label} password</p>
    </motion.div>
  );
}

// ── Feature pill ──────────────────────────────────────────────────────────────
function FeaturePill({ icon: Icon, text, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-2"
    >
      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}>
        <Icon size={13} style={{ color }} />
      </div>
      <span className="text-xs text-white/50">{text}</span>
    </motion.div>
  );
}

// ── Main Auth Page ────────────────────────────────────────────────────────────
export default function AuthPage({ onClose }) {
  const [mode,    setMode]    = useState('login');   // 'login' | 'signup'
  const [loading, setLoading] = useState(null);      // null | 'google' | 'github' | 'email'
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');
  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [errs,    setErrs]    = useState({});

  const upd = (k) => (e) => { setForm((p) => ({ ...p, [k]: e.target.value })); setErrs((p) => ({ ...p, [k]: '' })); setError(''); };

  // Validate
  const validate = () => {
    const e = {};
    if (mode === 'signup' && !form.name.trim())  e.name     = 'Name is required';
    if (!form.email.includes('@'))               e.email    = 'Valid email required';
    if (form.password.length < 6)               e.password = 'Min 6 characters';
    setErrs(e);
    return !Object.keys(e).length;
  };

  // Email / password
  const handleEmail = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading('email');
    setError('');
    setSuccess('');
    
    try {
      if (mode === 'login') {
        const { error: e } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
        if (e) {
          // Handle specific "Email not confirmed" error from Supabase
          if (e.message.toLowerCase().includes('email not confirmed')) {
            throw new Error('Please confirm your email address before logging in. Check your inbox for a link.');
          }
          throw e;
        }
        setSuccess('Logged in! Redirecting…');
      } else {
        const { data, error: e } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { full_name: form.name } },
        });
        
        if (e) throw e;

        // Check if confirmation is required (Supabase returns a session if not required)
        if (data?.session) {
          setSuccess('Account created! Welcome to NovaSpark.');
        } else {
          setSuccess('Account created! Please check your email to verify your account.');
          // UX: Switch to login mode automatically after a short delay
          setTimeout(() => setMode('login'), 2000);
        }
      }
    } catch (e) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(null);
    }
  };

  // OAuth
  const handleOAuth = async (provider) => {
    setLoading(provider);
    setError('');
    try {
      const { error: e } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin },
      });
      if (e) throw e;
    } catch (e) {
      setError(e.message || 'OAuth failed');
      setLoading(null);
    }
  };

  const isLoading = loading !== null;

  return (
    <motion.div
      key="auth-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(5,5,16,0.96)', backdropFilter: 'blur(20px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <Orbs />

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-7"
        >
          <a href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.4)]">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-2xl font-bold font-heading gradient-text">NovaSpark</span>
          </a>
          <p className="text-sm text-muted mt-2">
            {mode === 'login' ? 'Welcome back 👋 Sign in to continue' : 'Start your journey with us ✨'}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass rounded-2xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Tab bar */}
          <div className="relative flex border-b border-white/8">
            {['login', 'signup'].map((t) => (
              <button
                key={t}
                onClick={() => { 
                  setMode(t); 
                  setError(''); 
                  setSuccess(''); 
                  setErrs({});
                  setForm({ name: '', email: '', password: '' }); // Clear inputs on tab switch
                }}
                className={`flex-1 py-4 text-sm font-semibold capitalize transition-colors duration-300 relative ${
                  mode === t ? 'text-white' : 'text-muted hover:text-white/70'
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Create Account'}
                {mode === t && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #00F5FF, #7C3AED, #FF4D9D)',
                      boxShadow: '0 0 12px rgba(0,245,255,0.6)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-7">
            {/* Success banner */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="rounded-xl bg-accent-cyan/10 border border-accent-cyan/25 px-4 py-3 text-sm text-accent-cyan font-medium text-center"
                >
                  ✓ {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="rounded-xl bg-accent-pink/10 border border-accent-pink/25 px-4 py-3 text-sm text-accent-pink font-medium text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social buttons */}
            <div className="space-y-3 mb-6">
              <SocialButton
                icon={() => (
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                label="Continue with Google"
                color="#EA4335"
                loading={loading === 'google'}
                onClick={() => handleOAuth('google')}
              />
              {/* GitHub */}
              <SocialButton
                icon={() => (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: '#fff' }}>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                )}
                label="Continue with GitHub"
                color="#ffffff"
                loading={loading === 'github'}
                onClick={() => handleOAuth('github')}
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-[11px] text-muted font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Form */}
            <form onSubmit={handleEmail} className="space-y-4">
              <AnimatePresence>
                {mode === 'signup' && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AuthInput
                      name="name" label="Full Name" icon={User}
                      value={form.name} onChange={upd('name')} error={errs.name}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AuthInput
                name="email" type="email" label="Email Address" icon={Mail}
                value={form.email} onChange={upd('email')} error={errs.email}
              />

              <div>
                <AuthInput
                  name="password" type="password" label="Password" icon={Lock}
                  value={form.password} onChange={upd('password')} error={errs.password}
                />
                {mode === 'signup' && <div className="mt-2"><PasswordStrength password={form.password} /></div>}
              </div>

              {/* Forgot password */}
              {mode === 'login' && (
                <div className="text-right">
                  <button type="button" className="text-xs text-muted hover:text-accent-cyan transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full py-3.5 rounded-xl font-bold text-sm text-primary-900 overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #00F5FF 0%, #7C3AED 50%, #FF4D9D 100%)',
                  boxShadow: '0 4px 24px rgba(0,245,255,0.35)',
                }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {loading === 'email' ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      className="w-4 h-4 rounded-full border-2 border-primary-900/30 border-t-primary-900"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    {mode === 'login' ? 'Signing in…' : 'Creating account…'}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 relative z-10">
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={16} />
                  </span>
                )}
              </motion.button>
            </form>

            {/* Footer switch */}
            <p className="text-center text-xs text-muted mt-5">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setSuccess(''); setErrs({}); }}
                className="text-accent-cyan font-semibold hover:underline underline-offset-2 transition-all"
              >
                {mode === 'login' ? 'Sign up free' : 'Sign in'}
              </button>
            </p>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-6 mt-5"
        >
          <FeaturePill icon={Shield} text="SOC 2 Secure"    color="#00F5FF" delay={0.55} />
          <FeaturePill icon={Zap}    text="Instant access"  color="#7C3AED" delay={0.65} />
          <FeaturePill icon={Sparkles} text="No credit card" color="#FF4D9D" delay={0.75} />
        </motion.div>

        {/* Close */}
        {onClose && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={onClose}
            className="absolute -top-12 right-0 text-muted hover:text-white text-xs underline transition-colors"
          >
            ← Back to site
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
