import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const SESSION_KEY = 'exit_intent_shown';

const ExitIntentModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Don't attach on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setOpen(true);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="border-[#C9A84C]/40 bg-[#0D1F3C] max-w-md"
        style={{ boxShadow: '0 0 40px hsla(43,52%,54%,0.15)' }}
      >
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="font-serif text-2xl md:text-3xl text-foreground">
            {'Inainte sa pleci...'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base mt-3 leading-relaxed">
            {'Consultatia ta gratuita de 30 de minute te asteapta. Fara obligatii, fara surprize.'}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="gold-shimmer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded font-sans font-bold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_hsla(43,52%,54%,0.3)]"
            style={{ backgroundColor: '#C9A84C', color: '#0A1628' }}
          >
            {'Rezerva Acum'}
          </a>
          <button
            onClick={() => setOpen(false)}
            className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
          >
            {'Nu, multumesc'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;
