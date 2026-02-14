import { useState, useEffect, useCallback } from 'react';
import { Menu, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';

const navLinks = [
  { label: 'Acasa', href: '#acasa' },
  { label: 'Servicii', href: '#servicii' },
  { label: 'Despre Mine', href: '#despre' },
  { label: 'Rezultate', href: '#cazuri' },
  { label: 'Testimoniale', href: '#testimoniale' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#acasa');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Track active section based on scroll position
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setSheetOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'shadow-lg'
          : 'bg-transparent'
      }`}
      style={
        scrolled
          ? {
              backgroundColor: 'rgba(10, 22, 40, 0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(201, 168, 76, 0.2)',
            }
          : undefined
      }
    >
      <nav className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#acasa"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#acasa');
          }}
          className="font-serif text-lg md:text-xl tracking-wide text-foreground"
        >
          Av. Popescu |{' '}
          <span className="text-primary">Cabinet de Avocatura</span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`relative text-sm font-sans transition-colors duration-300 ${
                activeLink === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {link.label}
              {activeLink === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="navbar-cta-btn gold-shimmer bg-primary text-primary-foreground px-5 py-2.5 rounded text-sm font-sans font-semibold animate-pulse-gold hover:scale-105 transition-transform"
          >
            {'Consultatie Gratuita →'}
          </a>
        </div>

        {/* Mobile hamburger with Sheet */}
        <div className="lg:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button className="text-foreground p-2" aria-label="Deschide meniul">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-80 bg-background/95 backdrop-blur-xl border-l border-border/30"
            >
              <SheetTitle className="sr-only">Meniu navigare</SheetTitle>
              <div className="flex flex-col gap-2 pt-8">
                {/* Mobile logo */}
                <div className="px-2 pb-6 border-b border-border/20 mb-4">
                  <span className="font-serif text-lg text-foreground">
                    Av. Popescu
                  </span>
                  <p className="text-xs text-muted-foreground mt-1 font-sans">
                    Cabinet de Avocatura
                  </p>
                </div>

                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`px-4 py-3 rounded-lg text-base font-sans transition-colors ${
                      activeLink === link.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* Mobile CTA */}
                <div className="mt-6 px-2">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#contact');
                    }}
                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-sans font-semibold text-base w-full"
                  >
                    {'Consultatie Gratuita →'}
                  </a>
                </div>

                {/* Mobile phone link */}
                <div className="mt-4 px-2">
                  <a
                    href="tel:+40700000000"
                    className="flex items-center justify-center gap-2 border border-primary/30 text-primary px-6 py-3 rounded font-sans text-sm w-full hover:bg-primary/10 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +40 700 000 000
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
