import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Zap, Loader2, ArrowRight, Landmark, Copy, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import MagneticButton from '@/components/common/MagneticButton';
import { pricingPlans } from '@/data/siteData';
import { fadeUp, staggerContainer } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

// --- SECURE BANK DETAILS (Placeholder) ---
const BANK_DETAILS = {
  accountTitle: "Agency Name / Syed Ali",
  accountNumber: "0000 0000 0000 00",
  iban: "PK00 HBL 0000 0000 0000 0000",
  bankName: "HBL (Habib Bank Limited)",
  branch: "Main Branch, Karachi"
};


export default function Pricing({ onCheckout }) {
  const [yearly, setYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);

  const openBankTransfer = (plan) => {
    const interval = yearly ? 'yearly' : 'monthly';
    onCheckout(plan, interval);
  };

  const handleSubscribe = async (plan) => {
    setLoadingPlan(plan.name);
    try {
      const amount = yearly ? plan.price.yearly : plan.price.monthly;
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          planName: plan.name,
          interval: yearly ? 'yearly' : 'monthly',
          amount: amount,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/#pricing`,
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Subscription Error:', err);
      let message = err.message;
      if (err.context) {
        try {
          const body = await err.context.json();
          if (body.error) message = body.error;
        } catch (e) {}
      }
      alert(`Payment Error: ${message}`);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">

      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Pricing"
          title={<>Plans That <span className="gradient-text">Fit Your Needs</span></>}
          subtitle="Transparent pricing with no hidden fees. Choose the plan that works best for you."
        />

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <span className={`text-sm ${!yearly ? 'text-white' : 'text-muted'}`}>Monthly</span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative w-14 h-7 rounded-full glass transition-colors"
            data-cursor-hover
          >
            <motion.div
              className="absolute top-1 left-1 w-5 h-5 rounded-full bg-accent-cyan"
              animate={{ x: yearly ? 26 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm ${yearly ? 'text-white' : 'text-muted'}`}>
            Yearly <span className="text-accent-green text-xs ml-1">Save 20%</span>
          </span>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-6 items-start"
        >
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              custom={i}
              className={`relative rounded-2xl p-7 transition-all duration-500 ${
                plan.popular ? 'glass-strong glow-purple scale-[1.02]' : 'glass'
              }`}
              data-cursor-hover
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-purple text-xs font-semibold flex items-center gap-1">
                  <Zap size={12} /> Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-heading font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <motion.span
                    key={yearly ? 'y' : 'm'}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-5xl font-heading font-bold"
                    style={{ color: plan.color }}
                  >
                    ${yearly ? plan.price.yearly : plan.price.monthly}
                  </motion.span>
                  <span className="text-muted text-sm mb-2">/mo</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-soft-gray">
                    <Check size={16} style={{ color: plan.color }} className="flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <MagneticButton
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full justify-center"
                  disabled={loadingPlan !== null}
                  onClick={() => handleSubscribe(plan)}
                >
                  {loadingPlan === plan.name ? (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  ) : 'Get Started'}
                </MagneticButton>

                <button 
                  onClick={() => openBankTransfer(plan)}
                  className="w-full py-3.5 px-6 rounded-2xl border border-white/10 bg-white/5 text-white/70 text-xs font-bold hover:bg-white/10 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2 group"
                >
                  <Landmark size={14} className="text-accent-cyan group-hover:scale-110 transition-transform" /> 
                  <span>Pay via Bank Transfer</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
