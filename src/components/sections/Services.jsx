import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionHeading from '@/components/common/SectionHeading';
import { fadeUp, staggerContainer } from '@/lib/utils';
import { services } from '@/data/siteData';

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const reset = () => { x.set(0); y.set(0); };

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="glass rounded-2xl p-7 group hover:bg-white/[0.06] transition-all duration-500 relative overflow-hidden"
      data-cursor-hover
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
        style={{ boxShadow: `inset 0 0 60px ${service.color}10, 0 0 40px ${service.color}08` }}
      />

      <div className="relative z-10">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ background: `${service.color}15`, color: service.color }}
        >
          <Icon size={26} />
        </div>
        <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{service.description}</p>

        {/* Bottom accent line */}
        <div
          className="mt-6 h-[2px] w-0 group-hover:w-full transition-all duration-700 rounded-full"
          style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-pink/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Our Services"
          title={<>Solutions That <span className="gradient-text">Drive Growth</span></>}
          subtitle="We offer a comprehensive suite of digital services designed to elevate your brand and accelerate your business."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
