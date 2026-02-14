import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const PatternInterrupt = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: '#0A1628',
        borderTop: '1px solid rgba(201, 168, 76, 0.4)',
        borderBottom: '1px solid rgba(201, 168, 76, 0.4)',
      }}
    >
      {/* Subtle diagonal line pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(201,168,76,0.5) 10px, rgba(201,168,76,0.5) 11px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-10 md:py-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-serif text-lg md:text-xl lg:text-2xl font-semibold mb-5 max-w-2xl"
          style={{ color: '#ffffff' }}
        >
          {'Consultație inițială 100% gratuită. Fără obligații. Fără surprize.'}
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="group relative overflow-hidden inline-flex items-center px-7 py-3 rounded font-sans font-bold text-sm tracking-wide transition-transform hover:scale-105"
          style={{
            backgroundColor: '#C9A84C',
            color: '#0A1628',
          }}
        >
          <span
            className="absolute inset-0 origin-bottom transition-transform duration-300 ease-out scale-y-0 group-hover:scale-y-100"
            style={{ backgroundColor: 'rgba(10, 22, 40, 0.15)' }}
          />
          <span className="relative z-10">{'Programează-te Acum'}</span>
        </motion.a>
      </div>
    </section>
  );
};

export default PatternInterrupt;
