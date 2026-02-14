import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import OrnamentalDivider from './OrnamentalDivider';

const badges = [
  { value: '15+', label: 'Ani Experienta' },
  { value: '500+', label: 'Cazuri' },
  { value: '98%', label: 'Succes' },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="despre" className="relative py-20 md:py-28 overflow-hidden">
      {/* Morphing blob background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.07] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(216, 60%, 20%), hsl(216, 60%, 9%))',
          animation: 'morphBlob 10s ease-in-out infinite',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }}
      />

      <OrnamentalDivider />

      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Portrait with gold L-frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative">
              {/* Gold L-frame top-left */}
              <div
                className="absolute -top-4 -left-4 w-24 h-24 pointer-events-none z-20"
                style={{
                  borderTop: '3px solid #C9A84C',
                  borderLeft: '3px solid #C9A84C',
                }}
              />
              {/* Gold L-frame bottom-right */}
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 pointer-events-none z-20"
                style={{
                  borderBottom: '3px solid #C9A84C',
                  borderRight: '3px solid #C9A84C',
                }}
              />

              {/* Portrait placeholder */}
              <div className="aspect-[3/4] bg-secondary rounded-lg border border-border/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="w-16 h-0.5 bg-primary mb-4" />
                  <p className="font-serif text-lg text-foreground">Av. Alexandru Popescu</p>
                  <p className="font-sans text-sm text-muted-foreground">Baroul Bucuresti</p>
                </div>
              </div>
            </div>

            {/* Achievement badges */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {badges.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-background/80"
                >
                  <span className="font-serif text-sm font-bold text-primary">{b.value}</span>
                  <span className="font-sans text-xs text-muted-foreground">{b.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground text-balance">
              Un Avocat In Care Poti Avea{' '}
              <span className="text-primary">Incredere</span>
            </h2>

            <div className="font-sans text-muted-foreground space-y-4 leading-relaxed text-[15px]">
              <p>
                Cu o cariera de peste 15 ani in domeniul juridic, am reprezentat cu succes sute de
                clienti in cele mai diverse cauze. De la litigii civile complexe la aparare penala
                de inalta miza, fiecare caz a fost tratat cu aceeasi dedicare si rigurozitate.
              </p>
              <p>
                Am absolvit Facultatea de Drept a Universitatii din Bucuresti si am urmat programe
                de specializare la nivel european. Sunt membru activ al Baroului Bucuresti si
                particip constant la conferinte si seminarii de drept.
              </p>
              <p>
                Filosofia mea este simpla: fiecare client merita o aparare fara compromisuri. Nu
                accept mai multe cazuri decat pot gestiona la cel mai inalt standard, pentru ca
                reputatia mea se construieste pe rezultatele tale.
              </p>
            </div>

            {/* Paper-style quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: -0.5 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 px-6 py-5 relative"
              style={{
                backgroundColor: '#F5EDD8',
                color: '#2A1A05',
                borderLeft: '3px solid #C9A84C',
                boxShadow: '2px 3px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
                borderRadius: '2px',
              }}
            >
              <p className="font-serif italic text-base leading-relaxed">
                &bdquo;Fiecare client merita cel mai bun aparator. Iau in serios aceasta
                responsabilitate.&rdquo;
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
