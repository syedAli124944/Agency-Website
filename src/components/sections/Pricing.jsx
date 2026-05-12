import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import MagneticButton from '@/components/common/MagneticButton';
import { pricingPlans } from '@/data/siteData';
import { fadeUp, staggerContainer } from '@/lib/utils';

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

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

              <MagneticButton
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full justify-center"
              >
                Get Started
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
