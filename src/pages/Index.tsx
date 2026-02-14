import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import PatternInterrupt from '@/components/PatternInterrupt';
import Services from '@/components/Services';
import About from '@/components/About';
import Process from '@/components/Process';
import Cases from '@/components/Cases';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import ExitIntentModal from '@/components/ExitIntentModal';

const Index = () => (
  <main>
    <Navbar />
    <Hero />
    <TrustBar />
    <PatternInterrupt />
    <Services />
    <About />
    <Process />
    <Cases />
    <Testimonials />
    <FAQ />
    <Contact />
    <Footer />
    <FloatingCTA />
    <ExitIntentModal />
  </main>
);

export default Index;
