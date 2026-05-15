import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Calendar, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MagneticButton from '@/components/common/MagneticButton';

export default function SuccessPage({ onBack }) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onBack) onBack();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-primary-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full glass-strong rounded-[2.5rem] p-10 md:p-16 text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="text-accent-green" size={48} />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Welcome <span className="gradient-text">Aboard!</span>
        </h1>
        <p className="text-soft-gray text-lg mb-10 leading-relaxed">
          Your payment was successful. We're excited to help you scale your digital presence. 
          Check your email for the next steps and project kickoff details.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="glass p-5 rounded-2xl flex flex-col items-center gap-3">
            <Calendar className="text-accent-cyan" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Schedule Call</span>
          </div>
          <div className="glass p-5 rounded-2xl flex flex-col items-center gap-3">
            <Mail className="text-accent-purple" size={24} />
            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Check Inbox</span>
          </div>
        </div>

        <MagneticButton 
          className="w-full justify-center group"
          onClick={handleClose}
        >
          Go to Dashboard <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
        </MagneticButton>
      </motion.div>
    </div>
  );
}
