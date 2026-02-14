import { useState, useEffect, useRef, useCallback } from 'react';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const testimonials = [
  { text: 'Domnul Popescu mi-a salvat afacerea. Profesionalism desavarsit si o dedicare pe care nu am intalnit-o la alti avocati.', name: 'Andrei M.', type: 'Drept Comercial' },
  { text: 'Am fost achitat complet datorita strategiei sale impecabile. Nu am cuvinte sa-i multumesc suficient.', name: 'Mihai D.', type: 'Drept Penal' },
  { text: 'Procesul de divort a fost gestionat cu o sensibilitate si eficienta remarcabila. Custodia copiilor a fost rezolvata in favoarea mea.', name: 'Elena R.', type: 'Drept Familiei' },
  { text: 'Recuperarea prejudiciului de 150.000 EUR parea imposibila. Avocatul Popescu a reusit in doar 6 luni.', name: 'Cristian P.', type: 'Drept Civil' },
  { text: 'Recomand cu cea mai mare incredere. Comunicare excelenta, mereu disponibil si rezultate peste asteptari.', name: 'Ioana S.', type: 'Drept Imobiliar' },
];

const featured = testimonials[0];

const StarRating = ({ size = 'w-4 h-4' }: { size?: string }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`${size} fill-[#C9A84C] text-[#C9A84C]`} />
    ))}
  </div>
);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <section id="testimoniale" className="py-20 md:py-28 bg-secondary relative overflow-hidden">
      {/* Subtle gold radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsla(43,52%,54%,0.05)_0%,transparent_50%)]" />

      <div className="relative container mx-auto px-4" ref={sectionRef}>
        <motion.h2
          className="font-serif text-3xl md:text-5xl font-bold text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Ce Spun <span style={{ color: '#C9A84C' }}>Clientii</span>
        </motion.h2>

        {/* Featured large testimonial */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Quote className="w-12 h-12 mx-auto mb-6" style={{ color: 'hsla(43,52%,54%,0.3)' }} />
          <p className="font-serif text-xl md:text-2xl lg:text-3xl italic text-foreground leading-relaxed mb-6">
            {'\u201E'}{featured.text}{'\u201D'}
          </p>
          <StarRating size="w-5 h-5" />
          <p className="font-sans text-sm text-muted-foreground mt-3">
            {featured.name} — {featured.type}
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="bg-[#0D1F3C] border border-[#C9A84C]/20 rounded-lg p-8 md:p-10"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <Quote className="w-8 h-8 mb-4" style={{ color: 'hsla(43,52%,54%,0.3)' }} />
                <p className="font-sans text-foreground leading-relaxed text-lg mb-6">
                  {'\u201E'}{testimonials[active].text}{'\u201D'}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <StarRating />
                    <p className="font-sans text-sm text-muted-foreground mt-2">
                      {testimonials[active].name} — {testimonials[active].type}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                className="relative h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? '24px' : '8px',
                  backgroundColor: i === active ? '#C9A84C' : 'hsla(43,52%,54%,0.2)',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA section */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p className="font-serif text-xl md:text-2xl text-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            {'Alatura-te celor peste 500 de clienti care si-au castigat cazul.'}
          </p>
          <a
            href="#contact"
            className="gold-shimmer inline-flex items-center gap-2 px-8 py-4 rounded font-sans font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_hsla(43,52%,54%,0.3)]"
            style={{ backgroundColor: '#C9A84C', color: '#0A1628' }}
          >
            {'Incepe Azi \u2014 Consultatie Gratuita'}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
