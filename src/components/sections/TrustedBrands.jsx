import { trustedBrands } from '@/data/siteData';

export default function TrustedBrands() {
  const doubled = [...trustedBrands, ...trustedBrands];

  return (
    <section className="relative py-20 overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-center text-xs tracking-widest uppercase text-muted">
          Trusted by industry leaders worldwide
        </p>
      </div>
      {/* Marquee */}
      <div className="relative">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-primary-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary-900 to-transparent z-10" />

        <div className="flex animate-marquee">
          {doubled.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex-shrink-0 mx-10 flex items-center justify-center"
            >
              <span className="text-2xl font-bold font-heading text-white/15 hover:text-white/40 transition-colors duration-500 whitespace-nowrap select-none">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
