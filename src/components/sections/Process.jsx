import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/common/SectionHeading';
import { processSteps } from '@/data/siteData';
import { fadeUp } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const colors = ['#00F5FF', '#7C3AED', '#FF4D9D', '#FF8A00'];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Our Process"
          title={<>How We <span className="gradient-text">Work</span></>}
          subtitle="A proven four-step methodology refined over hundreds of successful projects."
        />

        <div className="relative max-w-3xl mx-auto px-4">
          {/* Progress line */}
          <div className="absolute left-[27px] md:left-[31px] top-0 bottom-0 w-[2px] bg-white/5">
            <div ref={lineRef} className="w-full h-full origin-top bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-pink" />
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={fadeUp}
                  custom={i * 0.5}
                  className="relative pl-20 md:pl-28 group"
                >
                  {/* Circle marker */}
                  <div
                    className="absolute left-0 top-0 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center glass border-2 group-hover:scale-110 transition-transform duration-500"
                    style={{ borderColor: colors[i], color: colors[i] }}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Content */}
                  <div>
                    <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors[i] }}>
                      Step {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mt-2 mb-3">{step.title}</h3>
                    <p className="text-muted leading-relaxed max-w-md">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
