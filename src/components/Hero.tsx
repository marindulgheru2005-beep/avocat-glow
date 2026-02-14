import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown, X, Star } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import GoldParticles from './GoldParticles';
import { useCountUp, useParallax } from '@/hooks/useScrollAnimation';

const words = ['Apărarea', 'Drepturilor', 'Tale', 'Este', 'Misiunea', 'Noastră.'];

const stats = [
  { value: 98, suffix: '%', label: 'Cazuri Câștigate' },
  { value: 500, suffix: '+', label: 'Clienți' },
  { value: 15, suffix: '+', label: 'Ani Experiență' },
];

const typewriterLines = [
  'Drept Civil \u00B7 Drept Penal \u00B7 Drept Comercial',
  'Apărare. Strategie. Rezultate.',
  'Primul apel este gratuit.',
];

const Hero = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [typewriterLineIndex, setTypewriterLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { ref: parallaxRef, offset } = useParallax(0.2);

  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isStatsInView) {
      setStatsVisible(true);
    }
  }, [isStatsInView]);

  // Typewriter effect
  useEffect(() => {
    const currentLine = typewriterLines[typewriterLineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (typewriterText.length < currentLine.length) {
        timeout = setTimeout(() => {
          setTypewriterText(currentLine.slice(0, typewriterText.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (typewriterText.length > 0) {
        timeout = setTimeout(() => {
          setTypewriterText(typewriterText.slice(0, -1));
        }, 30);
      } else {
        setIsDeleting(false);
        setTypewriterLineIndex((prev) => (prev + 1) % typewriterLines.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, typewriterLineIndex]);

  const stat1 = useCountUp(stats[0].value, 2000, statsVisible);
  const stat2 = useCountUp(stats[1].value, 2000, statsVisible);
  const stat3 = useCountUp(stats[2].value, 2000, statsVisible);
  const countValues = [stat1, stat2, stat3];

  return (
    <section
      id="acasa"
      className="relative min-h-screen flex flex-col overflow-hidden"
      ref={parallaxRef}
    >
      {/* Dark navy background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#0A1628',
          transform: `translateY(${offset * 0.5}px)`,
        }}
      />

      {/* Noise/grain SVG overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2, opacity: 0.04 }} aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Background decorative "LEGE" text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        <span
          className="font-serif font-bold"
          style={{
            fontSize: '30vw',
            opacity: 0.03,
            transform: 'rotate(-15deg)',
            color: '#ffffff',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          LEGE
        </span>
      </div>

      <GoldParticles />

      {/* Urgency strip */}
      {showBanner && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-20 w-full flex items-center justify-center px-4"
          style={{
            height: '36px',
            backgroundColor: '#C9A84C',
          }}
        >
          <p className="text-sm font-sans font-semibold" style={{ color: '#0A1628' }}>
            {'Primii 5 clienți noi beneficiază de consultație gratuită de 60 min.'}
          </p>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-sm transition-opacity hover:opacity-70"
            style={{ color: '#0A1628' }}
            aria-label="Închide"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center pt-16 pb-24">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border"
            style={{
              borderColor: 'rgba(201, 168, 76, 0.25)',
              backgroundColor: 'rgba(201, 168, 76, 0.08)',
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="font-sans text-sm" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              {'Disponibil acum \u2014 Răspundem astăzi'}
            </span>
          </motion.div>

          {/* Headline with word-by-word stagger */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease: 'easeOut' }}
                className={`inline-block mr-3 md:mr-4 ${i === words.length - 1 ? '' : ''}`}
                style={{
                  color: i === words.length - 1 ? '#C9A84C' : '#ffffff',
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="font-sans text-lg md:text-xl max-w-2xl mx-auto mb-6"
            style={{ color: 'rgba(255, 255, 255, 0.65)' }}
          >
            Cu peste 15 ani de experiență, te reprezint cu determinare, strategie și rezultate dovedite.
          </motion.p>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="mb-10 h-8 flex items-center justify-center"
          >
            <span className="font-sans text-base md:text-lg" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {typewriterText}
            </span>
            <span
              className="inline-block w-0.5 h-5 ml-0.5"
              style={{
                backgroundColor: '#C9A84C',
                animation: 'blink-cursor 0.75s step-end infinite',
              }}
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="#contact"
              className="group relative overflow-hidden px-8 py-4 rounded font-sans font-bold text-base transition-transform hover:scale-105"
              style={{
                backgroundColor: '#C9A84C',
                color: '#0A1628',
              }}
            >
              <span
                className="absolute inset-0 origin-bottom transition-transform duration-300 ease-out scale-y-0 group-hover:scale-y-100"
                style={{ backgroundColor: 'rgba(10, 22, 40, 0.15)' }}
              />
              <span className="relative z-10">Solicită Consultație Gratuită</span>
            </a>
            <a
              href="#servicii"
              className="px-8 py-4 rounded font-sans font-semibold text-base transition-colors"
              style={{
                border: '1px solid rgba(201, 168, 76, 0.4)',
                color: '#C9A84C',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(201, 168, 76, 0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              Vezi Serviciile
            </a>
          </motion.div>

          {/* Stats row */}
          <div ref={statsRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 mb-12"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && (
                    <div
                      className="hidden sm:block w-px h-10 mx-8"
                      style={{ backgroundColor: 'rgba(201, 168, 76, 0.35)' }}
                    />
                  )}
                  <div className="text-center">
                    <div
                      className="font-serif text-3xl md:text-4xl font-bold"
                      style={{ color: '#C9A84C' }}
                    >
                      {countValues[i]}{stat.suffix}
                    </div>
                    <div
                      className="font-sans text-sm mt-1"
                      style={{ color: 'rgba(255, 255, 255, 0.55)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Google badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={statsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Google "G" logo */}
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>

            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#FBBC05' }} />
              ))}
            </div>

            <span className="font-sans text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {'4.9/5 \u2014 47 recenzii'}
            </span>

            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ color: '#C9A84C' }}
            >
              {'Citește pe Google \u2192'}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#trust"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-subtle"
        aria-label="Derulează în jos"
      >
        <ChevronDown className="w-6 h-6" style={{ color: 'rgba(201, 168, 76, 0.6)' }} />
      </a>
    </section>
  );
};

export default Hero;
