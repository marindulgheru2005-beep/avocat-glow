import { Phone, X } from 'lucide-react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------- Social proof data ---------- */
const socialProofMessages = [
  { name: 'Andrei', city: 'Cluj', minutes: 8 },
  { name: 'Maria', city: 'Bucuresti', minutes: 12 },
  { name: 'Ion', city: 'Timisoara', minutes: 3 },
  { name: 'Elena', city: 'Iasi', minutes: 15 },
  { name: 'Mihai', city: 'Brasov', minutes: 5 },
];

const FloatingCTA = () => {
  /* ---------- Touch device detection ---------- */
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsTouchDevice(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* ---------- Phone button (bottom-right) ---------- */
  const [phoneHovered, setPhoneHovered] = useState(false);

  /* ---------- Social proof toast (bottom-left) ---------- */
  const [toastVisible, setToastVisible] = useState(false);
  const [toastIndex, setToastIndex] = useState(0);
  const toastTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Show first toast after 5 seconds, then every 30 seconds
    const initialDelay = setTimeout(() => {
      setToastVisible(true);
      // Auto-dismiss after 6 seconds
      dismissTimerRef.current = setTimeout(() => setToastVisible(false), 6000);
    }, 5000);

    toastTimerRef.current = setInterval(() => {
      setToastIndex((prev) => (prev + 1) % socialProofMessages.length);
      setToastVisible(true);
      // Clear any existing dismiss timer
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = setTimeout(() => setToastVisible(false), 6000);
    }, 30000);

    return () => {
      clearTimeout(initialDelay);
      if (toastTimerRef.current) clearInterval(toastTimerRef.current);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, []);

  const dismissToast = useCallback(() => {
    setToastVisible(false);
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
  }, []);

  /* ---------- Sticky bottom bar (after 300px scroll) ---------- */
  const [pastThreshold, setPastThreshold] = useState(false);
  const [barDismissed, setBarDismissed] = useState(false);
  const reappearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setPastThreshold(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dismissBar = useCallback(() => {
    setBarDismissed(true);
    // Clear previous reappear timer if any
    if (reappearTimerRef.current) clearTimeout(reappearTimerRef.current);
    reappearTimerRef.current = setTimeout(() => setBarDismissed(false), 60000);
  }, []);

  useEffect(() => {
    return () => {
      if (reappearTimerRef.current) clearTimeout(reappearTimerRef.current);
    };
  }, []);

  const showBottomBar = pastThreshold && !barDismissed;
  const currentProof = socialProofMessages[toastIndex];

  return (
    <>
      {/* ===== Bottom-right: Floating phone button ===== */}
      <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50">
        <motion.a
          href="tel:+40700000000"
          className="flex items-center gap-0 bg-primary text-primary-foreground rounded-full shadow-lg font-sans font-semibold text-sm overflow-hidden cursor-pointer"
          style={{ height: 56 }}
          onMouseEnter={() => !isTouchDevice && setPhoneHovered(true)}
          onMouseLeave={() => !isTouchDevice && setPhoneHovered(false)}
          animate={{
            width: phoneHovered ? 220 : 56,
            paddingLeft: phoneHovered ? 20 : 16,
            paddingRight: phoneHovered ? 20 : 16,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          aria-label="Suna Acum"
        >
          <Phone className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {phoneHovered && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap overflow-hidden ml-2"
              >
                Suna Acum
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>
      </div>

      {/* ===== Bottom-left: Social proof toast ===== */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-50 max-w-xs"
          >
            <div className="bg-card/95 backdrop-blur-md border border-border/30 rounded-lg p-4 shadow-xl flex items-start gap-3">
              {/* Avatar placeholder */}
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm" role="img" aria-label="persoana">
                  {'👤'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-sans text-foreground leading-snug">
                  <span className="font-semibold text-primary">
                    {currentProof.name}
                  </span>{' '}
                  din{' '}
                  <span className="font-semibold">{currentProof.city}</span> a
                  solicitat o consultatie acum{' '}
                  <span className="text-primary">
                    {currentProof.minutes} minute
                  </span>
                  .
                </p>
              </div>
              <button
                onClick={dismissToast}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors p-0.5"
                aria-label="Inchide notificarea"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Sticky bottom bar ===== */}
      <AnimatePresence>
        {showBottomBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-40"
          >
            <div
              className="flex items-center justify-between px-4 md:px-8 py-3"
              style={{
                backgroundColor: 'rgba(10, 22, 40, 0.95)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderTop: '1px solid rgba(201, 168, 76, 0.15)',
              }}
            >
              <p className="text-sm md:text-base font-sans text-foreground">
                {'Ai o problema juridica urgenta?'}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="tel:+40700000000"
                  className="gold-shimmer bg-primary text-primary-foreground px-4 md:px-6 py-2 rounded text-sm font-sans font-semibold hover:scale-105 transition-transform whitespace-nowrap"
                >
                  {'Suna Acum →'}
                </a>
                <button
                  onClick={dismissBar}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label="Inchide bara"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCTA;
