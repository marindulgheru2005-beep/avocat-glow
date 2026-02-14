import { useEffect, useState, useRef, useCallback } from 'react';
import { ChevronDown, X, Star } from 'lucide-react';
import GoldParticles from './GoldParticles';
import { useCountUp, useParallax } from '@/hooks/useScrollAnimation';

const words = ['Apărarea', 'Drepturilor', 'Tale', 'Este', 'Misiunea', 'Noastră.'];

const stats = [
  { value: 98, suffix: '%', label: 'Cazuri Câștigate' },
  { value: 500, suffix: '+', label: 'Clienți' },
  { value: 15, suffix: '+', label: 'Ani Experiență' },
];

const typewriterLines = [
  'Drept Civil \u00b7 Drept Penal \u00b7 Drept Comercial',
  'Apărare. Strategie. Rezultate.',
  'Primul apel este gratuit.',
];

const Hero = () => {
  const [loadedWords, setLoadedWords] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [typeText, setTypeText] = useState('');
  const [typeLineIdx, setTypeLineIdx] = useState(0);
  const [typeCharIdx, setTypeCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { ref: parallaxRef, offset } = useParallax(0.2);
  const statsRef = useRef<HTMLDivElement>(null);

  // Word stagger
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadedWords((prev) => {
        if (prev >= words.length) {
          clearInterval(timer);
          setTimeout(() => setStatsVisible(true), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 120);
    return () => clearInterval(timer);
  }, []);

  // Typewriter
  useEffect(() => {
    const currentLine = typewriterLines[typeLineIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (typeCharIdx < currentLine.length) {
        timeout = setTimeout(() => {
          setTypeText(currentLine.slice(0, typeCharIdx + 1));
          setTypeCharIdx(typeCharIdx + 1);
        }, 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (typeCharIdx > 0) {
        timeout = setTimeout(() => {
          setTypeText(currentLine.slice(0, typeCharIdx - 1));
          setTypeCharIdx(typeCharIdx - 1);
        }, 30);
      } else {
        setIsDeleting(false);
        setTypeLineIdx((typeLineIdx + 1) % typewriterLines.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typeCharIdx, isDeleting, typeLineIdx]);

  // Stats InView
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
      {/* Background layers */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsla(43,52%,54%,0.05)_0%,transparent_60%)]" />

      {/* SVG Noise / Grain overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04, zIndex: 2 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="heroGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroGrain)" />
        </svg>
      </div>

      {/* Decorative "LEGE" background text */}
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
            color: 'hsl(var(--foreground))',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          LEGE
        </span>
      </div>

      <GoldParticles />

      {/* Urgency banner */}
      {showBanner && (
        <div
          className="relative z-20 flex items-center justify-center bg-primary/90 text-primary-foreground font-sans text-sm font-semibold"
          style={{ height: 36 }}
        >
          <span className="px-4 text-center truncate">
            {'⚡ Primii 5 clienți noi beneficiază de consultație gratuită de 60 min.'}
          </span>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
            aria-label="Închide banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main content area */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center pt-16 pb-24">
          {/* Availability badge */}
          <div
            className={`inline-flex items-center gap-2 bg-secondary/80 border border-border/40 rounded-full px-4 py-2 mb-8 transition-all duration-700 ${
              loadedWords > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="font-sans text-sm text-muted-foreground">
              {'Disponibil acum \u2014 R\u0103spundem ast\u0103zi'}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {words.map((word, i) => (
              <span
                key={i}
                className={`inline-block mr-3 md:mr-4 transition-all duration-500 ${
                  i < loadedWords
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                } ${i === words.length - 1 ? 'text-primary' : 'text-foreground'}`}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p
            className={`font-sans text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-6 transition-all duration-700 delay-700 ${
              loadedWords >= words.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {'Cu peste 15 ani de experiență, te reprezint cu determinare, strategie și rezultate dovedite.'}
          </p>

          {/* Typewriter */}
          <div
            className={`h-8 mb-10 flex items-center justify-center transition-all duration-700 delay-700 ${
              loadedWords >= words.length ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="font-sans text-base md:text-lg text-primary/80">
              {typeText}
            </span>
            <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-pulse" />
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 transition-all duration-700 delay-1000 ${
              loadedWords >= words.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <a
              href="#contact"
              className="hero-cta-primary gold-shimmer bg-primary text-primary-foreground px-8 py-4 rounded font-sans font-bold text-base transition-transform hover:scale-105"
            >
              {'Solicită Consultație Gratuită'}
            </a>
            <a
              href="#servicii"
              className="border border-primary/40 text-primary px-8 py-4 rounded font-sans font-semibold text-base hover:bg-primary/10 transition-colors"
            >
              {'Vezi Serviciile'}
            </a>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className={`flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 mb-10 transition-all duration-700 delay-500 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center">
                {i > 0 && <div className="hidden sm:block w-px h-10 bg-primary/30 mx-8" />}
                <div className="text-center">
                  <div className="font-serif text-3xl md:text-4xl font-bold text-primary">
                    {countValues[i]}{stat.suffix}
                  </div>
                  <div className="font-sans text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Google badge */}
          <div
            className={`inline-flex items-center gap-3 bg-card/80 border border-border/30 rounded-lg px-5 py-3 transition-all duration-700 delay-700 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Google "G" */}
            <svg width="20" height="20" viewBox="0 0 24 24" className="flex-shrink-0">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
              ))}
            </div>
            <span className="font-sans text-sm text-muted-foreground">
              {'4.9/5 \u2014 47 recenzii'}
            </span>
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-primary hover:underline ml-1"
            >
              {'Citește pe Google \u2192'}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#trust"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-subtle"
        aria-label="Derulează în jos"
      >
        <ChevronDown className="w-6 h-6 text-primary/60" />
      </a>
    </section>
  );
};

export default Hero;
