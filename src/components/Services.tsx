import { useRef, useState, useCallback, useEffect } from 'react';
import { Scale, Shield, Briefcase, Heart, Home, Users } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    icon: Scale,
    title: 'Drept Civil',
    desc: 'Reprezentare în litigii civile, contracte, despăgubiri și drept succesoral. Soluții eficiente pentru protejarea intereselor tale.',
  },
  {
    icon: Shield,
    title: 'Drept Penal',
    desc: 'Apărare penală puternică în toate fazele procesuale. Experiență dovedită în achitări și reduceri de pedepse.',
  },
  {
    icon: Briefcase,
    title: 'Drept Comercial',
    desc: 'Consultanță pentru societăți comerciale, fuziuni, litigii comerciale și recuperare creanțe.',
  },
  {
    icon: Heart,
    title: 'Dreptul Familiei',
    desc: 'Divorțuri, custodie, partaj și pensie alimentară. Abordare sensibilă și orientată spre rezultat.',
  },
  {
    icon: Home,
    title: 'Drept Imobiliar',
    desc: 'Tranzacții imobiliare, cadastru, intabulare și litigii funciare. Securizarea investiției tale.',
  },
  {
    icon: Users,
    title: 'Dreptul Muncii',
    desc: 'Conflicte de muncă, concedieri abuzive, negocieri contracte și drepturile angajaților.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/* ─── 3D Tilt Card ─── */
interface ServiceCardProps {
  icon: typeof Scale;
  title: string;
  desc: string;
  isTouchDevice: boolean;
}

const ServiceCard = ({ icon: Icon, title, desc, isTouchDevice }: ServiceCardProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        x: (y - 0.5) * -10, // max 5deg each direction
        y: (x - 0.5) * 10,
      });
    },
    [isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-lg p-8 flex flex-col transition-shadow duration-300"
      style={{
        backgroundColor: '#0D1F3C',
        border: '1px solid rgba(201, 168, 76, 0.15)',
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
        willChange: 'transform',
      }}
      whileHover={{
        boxShadow: '0 0 20px rgba(201, 168, 76, 0.3)',
        borderColor: 'rgba(201, 168, 76, 0.5)',
      }}
    >
      <Icon
        className="w-9 h-9 mb-5 stroke-[1.5] transition-colors duration-300"
        style={{ color: '#C9A84C' }}
      />
      <h3 className="font-serif text-xl font-semibold mb-3" style={{ color: '#ffffff' }}>
        {title}
      </h3>
      <p className="font-sans text-sm leading-relaxed mb-5" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
        {desc}
      </p>
      <a
        href="#contact"
        className="mt-auto font-sans text-sm font-medium transition-all duration-300 group-hover:tracking-wide"
        style={{ color: '#C9A84C' }}
      >
        {'Ai o situație de acest tip? Contactează-mă \u2192'}
      </a>
    </motion.div>
  );
};

/* ─── Services Section ─── */
const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const isTitleInView = useInView(titleRef, { once: true, margin: '-80px' });
  const isGridInView = useInView(gridRef, { once: true, margin: '-60px' });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(hover: none)').matches);
  }, []);

  return (
    <section
      id="servicii"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'hsl(216, 60%, 9%)' }}
    >
      {/* Background decorative "DREPT" text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-serif font-bold"
          style={{
            fontSize: 'clamp(200px, 30vw, 400px)',
            opacity: 0.03,
            transform: 'rotate(-10deg)',
            color: '#ffffff',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          DREPT
        </span>
      </div>

      {/* Subtle diagonal line pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.02,
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(201,168,76,0.4) 20px, rgba(201,168,76,0.4) 21px)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title block */}
        <div ref={titleRef} className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-serif text-3xl md:text-5xl font-bold mb-4"
            style={{ color: '#ffffff' }}
          >
            {'Domenii de '}
            <span style={{ color: '#C9A84C' }}>{'Practică'}</span>
          </motion.h2>

          {/* Animated gold line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isTitleInView ? { width: 60 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="mx-auto mb-5"
            style={{
              height: 2,
              backgroundColor: '#C9A84C',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="font-sans text-base md:text-lg max-w-xl mx-auto"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            {'Experiență dovedită în cele mai complexe cazuri juridice.'}
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={isGridInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s, i) => (
            <ServiceCard
              key={i}
              icon={s.icon}
              title={s.title}
              desc={s.desc}
              isTouchDevice={isTouchDevice}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
