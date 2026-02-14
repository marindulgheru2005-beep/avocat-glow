import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useCountUp } from '@/hooks/useScrollAnimation';

const tickerItems = [
  { label: 'Achitare completa', type: 'Penal', date: 'Oct 2024' },
  { label: 'Castig 180.000 RON', type: 'Civil', date: 'Sep 2024' },
  { label: 'Custodie acordata', type: 'Familie', date: 'Nov 2024' },
  { label: 'Despagubiri integrale', type: 'Imobiliar', date: 'Aug 2024' },
  { label: 'Contract anulat', type: 'Comercial', date: 'Jul 2024' },
];

const cases = [
  {
    situation: 'Client acuzat nedrept de frauda in cadrul unei companii internationale',
    action: 'Strategie de aparare completa cu probe documentare si martori experti',
    result: 'Achitare completa in 4 luni — toate acuzatiile respinse',
  },
  {
    situation: 'Disputa imobiliara complexa cu un dezvoltator — pierdere financiara de 200.000 EUR',
    action: 'Actiune civila cu expertiza tehnica si juridica specializata',
    result: 'Despagubiri integrale obtinute + daune morale acordate',
  },
  {
    situation: 'Concediere abuziva a unui director executiv de la o companie multinationala',
    action: 'Contestatie in instanta + negociere directa cu echipa juridica adversa',
    result: 'Reintegrare in functie + compensatii salariale pe 18 luni',
  },
];

const Cases = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const successRate = useCountUp(98, 2000, isInView);

  const tickerContent = tickerItems
    .map((t) => `\u2713 ${t.label} \u00B7 ${t.type} \u00B7 ${t.date}`)
    .join('  \u00B7  ');

  return (
    <section id="cazuri" className="relative overflow-hidden">
      {/* Scrolling ticker */}
      <div className="w-full bg-[#0A1628] border-y border-[#C9A84C]/20 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
          <span className="inline-block px-8 text-sm font-sans tracking-wide" style={{ color: '#C9A84C' }}>
            {tickerContent}  &middot;  {tickerContent}  &middot;  {tickerContent}
          </span>
        </div>
      </div>

      {/* Main section */}
      <div className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,hsla(43,52%,54%,0.04)_0%,transparent_60%)]" />

        <div className="relative container mx-auto px-4" ref={sectionRef}>
          <motion.h2
            className="font-serif text-3xl md:text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            Rezultate <span style={{ color: '#C9A84C' }}>Reale</span> Pentru Clienti Reali
          </motion.h2>
          <motion.p
            className="font-sans text-muted-foreground text-center max-w-lg mx-auto mb-14"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Cateva dintre cazurile care definesc abordarea mea profesionala.
          </motion.p>

          {/* Case cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {cases.map((c, i) => (
              <motion.div
                key={i}
                className="bg-[#0D1F3C] border border-[#C9A84C]/20 rounded-lg p-7 hover:border-[#C9A84C]/60 transition-colors duration-300"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
              >
                <div className="font-sans text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#C9A84C' }}>
                  Cazul {i + 1}
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="font-sans text-xs text-muted-foreground block mb-1">Situatie</span>
                    <p className="font-sans text-sm text-foreground">{c.situation}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-px" style={{ backgroundColor: 'hsla(43,52%,54%,0.3)' }} />
                    <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: '#C9A84C' }} />
                    <div className="w-6 h-px" style={{ backgroundColor: 'hsla(43,52%,54%,0.3)' }} />
                  </div>
                  <div>
                    <span className="font-sans text-xs text-muted-foreground block mb-1">Actiune</span>
                    <p className="font-sans text-sm text-foreground">{c.action}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-px" style={{ backgroundColor: 'hsla(43,52%,54%,0.3)' }} />
                    <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: '#C9A84C' }} />
                    <div className="w-6 h-px" style={{ backgroundColor: 'hsla(43,52%,54%,0.3)' }} />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-semibold block mb-1" style={{ color: '#C9A84C' }}>
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      Rezultat
                    </span>
                    <p className="font-sans text-sm text-foreground font-medium">{c.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Big stat with shimmer */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative inline-block">
              <div className="font-serif text-6xl md:text-8xl font-bold" style={{ color: '#C9A84C' }}>
                {successRate}%
              </div>
              {/* One-time shimmer overlay */}
              {isInView && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsla(43,52%,54%,0.3), transparent)',
                  }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.2, delay: 1.5, ease: 'easeOut' }}
                />
              )}
            </div>
            <p className="font-sans text-muted-foreground mt-2 text-lg">Rata de succes din cazurile reprezentate</p>
          </motion.div>

          {/* CTA button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="#contact"
              className="gold-shimmer inline-flex items-center gap-2 px-8 py-4 rounded font-sans font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_hsla(43,52%,54%,0.3)]"
              style={{ backgroundColor: '#C9A84C', color: '#0A1628' }}
            >
              {'Alatura-te celor 500+ clienti castigatori'}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Cases;
