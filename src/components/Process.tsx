import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageSquare, FileText, Trophy } from 'lucide-react';
import OrnamentalDivider from './OrnamentalDivider';

const steps = [
  {
    icon: MessageSquare,
    num: '01',
    title: 'Consultatie Gratuita',
    desc: 'Ne intâlnim, analizam situatia ta si discutam strategia optima. Fara obligatii, fara costuri ascunse.',
  },
  {
    icon: FileText,
    num: '02',
    title: 'Strategie Personalizata',
    desc: 'Construim impreuna cel mai puternic dosar pentru cazul tau, cu atentie la fiecare detaliu.',
  },
  {
    icon: Trophy,
    num: '03',
    title: 'Rezultate Concrete',
    desc: 'Te reprezint cu toata forta legii pentru a obtine ce ti se cuvine. Rezultate masurabile, nu promisiuni.',
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <OrnamentalDivider />
      <div className="container mx-auto px-4" ref={sectionRef}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-5xl font-bold text-center mb-4 text-foreground text-balance"
        >
          Cum Te <span className="text-primary">Ajut</span> — 3 Pasi Simpli
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-sans text-muted-foreground text-center max-w-lg mx-auto mb-16"
        >
          Un proces clar si transparent, de la prima discutie pana la rezultatul final.
        </motion.p>

        <div className="relative max-w-4xl mx-auto">
          {/* SVG connecting line (desktop) */}
          <svg
            className="hidden md:block absolute top-[60px] left-0 w-full h-4 pointer-events-none"
            viewBox="0 0 1000 4"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Track line */}
            <line
              x1="170"
              y1="2"
              x2="830"
              y2="2"
              stroke="hsl(43, 30%, 30%)"
              strokeWidth="1"
              opacity="0.3"
            />
            {/* Animated gold line */}
            <motion.line
              x1="170"
              y1="2"
              x2="830"
              y2="2"
              stroke="#C9A84C"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
            />
          </svg>

          {/* Steps */}
          <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-12 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.3 }}
                className="flex-1 text-center relative"
              >
                {/* Number circle */}
                <div className="relative mx-auto mb-6 w-[120px] h-[120px]">
                  <div className="w-full h-full rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center relative z-10">
                    <step.icon className="w-10 h-10 text-primary stroke-[1.5]" />
                  </div>
                  {/* Large number behind */}
                  <span
                    className="absolute -top-3 -right-2 font-serif text-5xl font-bold text-primary/15 select-none pointer-events-none z-0"
                  >
                    {step.num}
                  </span>
                </div>

                <div className="font-sans text-xs text-primary font-bold tracking-widest uppercase mb-2">
                  Pasul {i + 1}
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
