import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
  image?: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string; // used for custom badge color
  gradient?: string;
  url?: string;
  socials?: {
    linkedin?: string;
    email?: string;
    github?: string;
    instagram?: string;
  };
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

// Sharp, neobrutalist inline SVG icons
const GitHubIcon = ({ size = 16 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const EmailIcon = ({ size = 16 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const getTagline = (location?: string, title?: string) => {
  const loc = location?.toLowerCase() || '';
  const t = title?.toLowerCase() || '';
  if (t.includes('vice chancellor') || t.includes('chellaboina')) {
    return "Leading the vision of academic and student excellence.";
  }
  if (loc.includes('student affairs') || t.includes('sogani')) {
    return "Fostering student life, leadership, and campus welfare.";
  }
  if (loc.includes('core organizing') || loc.includes('organizing head')) {
    return "Commanding the master plan of Aarambh'26.";
  }
  if (loc.includes('tech') || loc.includes('web') || loc.includes('app')) {
    return "Coding the digital canvas of Aarambh'26.";
  }
  if (loc.includes('design') || loc.includes('media') || loc.includes('photography') || loc.includes('social media')) {
    return "Bringing the spirit of Aarambh'26 to life visually.";
  }
  if (loc.includes('sponsorship') || loc.includes('finance')) {
    return "Fueling the engine of Aarambh'26.";
  }
  if (loc.includes('food') || loc.includes('accommodation') || loc.includes('hospitality')) {
    return "Ensuring comfort and hospitality for all guests.";
  }
  if (loc.includes('discipline') || loc.includes('logistics') || loc.includes('internal arrangements')) {
    return "Orchestrating ground operations with perfection.";
  }
  return "Part of the driving force behind Aarambh'26.";
};

const getVerticalFontSize = (text: string) => {
  if (text.length > 25) return 'text-[11px]';
  if (text.length > 18) return 'text-[14px]';
  if (text.length > 12) return 'text-[18px]';
  return 'text-[22px]';
};

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const toggleFlip = (title: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const demo: ChromaItem[] = [
    {
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#FF9A00',
      location: 'Technical'
    },
    {
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#10B981',
      location: 'Sponsorship'
    },
    {
      title: 'Morgan Blake',
      subtitle: 'UI/UX Designer',
      handle: '@morganblake',
      borderColor: '#FF188C',
      location: 'Design'
    }
  ];

  const data = items !== undefined ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-stretch gap-8 py-6 ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--x': '50%',
          '--y': '50%'
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => {
        // Extract initials for the profile fallback
        const initials = c.title
          .split(' ')
          .filter(n => !n.startsWith('(') && !n.endsWith(')'))
          .map(n => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase();

        // Determine alternate rotation for hand-made comic zine feel
        const rotationClass = i % 3 === 0 
          ? 'hover:rotate-1' 
          : i % 3 === 1 
            ? 'hover:-rotate-1' 
            : 'hover:rotate-[0.5deg]';

        const isFlipped = !!flippedCards[c.title];
        
        // Define connect url for the QR code
        const connectUrl = c.socials?.linkedin || c.socials?.instagram || (c.socials?.email ? `mailto:${c.socials.email}` : 'https://aarambh-jklu.in');

        return (
          <div
            key={i}
            onClick={() => toggleFlip(c.title)}
            className={`relative w-[280px] h-[400px] [perspective:1000px] cursor-pointer select-none transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 ${rotationClass} group`}
          >
            <div
              className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
                isFlipped ? '[transform:rotateY(180deg)]' : ''
              }`}
            >
              {/* FRONT SIDE */}
              <div
                className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[16px] border-[3px] border-brand-ink flex flex-col shadow-[6px_6px_0px_0px_#030404] transition-shadow duration-200 group-hover:shadow-[10px_10px_0px_0px_#030404] overflow-hidden bg-white"
              >
                {/* Terminal Window Header */}
                <div className="w-full h-8 bg-brand-ink border-b-[3px] border-brand-ink flex items-center justify-between px-3 select-none shrink-0">
                  {/* Three Color Scheme Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF9A00] border border-brand-ink/20" /> {/* Energy Orange */}
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF188C] border border-brand-ink/20" /> {/* Bold Pink */}
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0D21DD] border border-brand-ink/20" /> {/* Electric Blue */}
                  </div>
                  {/* Terminal Tab Label */}
                  <span className="font-mono text-[9px] text-brand-cloud/60 uppercase tracking-widest font-black">
                    {c.title.split(' ')[0].toLowerCase()}_profile.sh
                  </span>
                </div>

                {/* Card Terminal Body */}
                <div 
                  className="flex-1 w-full relative p-4 overflow-hidden"
                  style={{ backgroundColor: c.borderColor || '#F5F1E5' }}
                >
                  {/* Grid background paper style */}
                  <div 
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(3, 4, 4, 0.05) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(3, 4, 4, 0.05) 1.5px, transparent 1.5px)',
                      backgroundSize: '15px 15px'
                    }}
                  />
                  {/* Halftone texture overlay */}
                  <div className="absolute inset-0 bg-halftone-black opacity-[0.05] pointer-events-none z-0" />

                  {/* Terminal CLI Header Greeting */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col text-left font-mono text-brand-ink select-none leading-none">
                    <span className="text-[7px] font-black uppercase tracking-widest text-brand-ink/50">$ ./whoami</span>
                    <span className="text-xl font-black tracking-tight mt-1 font-display uppercase">{c.title.split(' ')[0]}</span>
                  </div>

                  {/* Monospace Code Specs on Left */}
                  <div className="absolute left-4 top-16 bottom-6 flex flex-col justify-between font-mono text-[9px] text-brand-ink/80 select-none pointer-events-none z-10 text-left">
                    <div className="space-y-4">
                      <div>
                        <span className="block font-black text-brand-ink/40 uppercase text-[7px] tracking-widest">/ DESIGNATION</span>
                        <span className="block font-bold uppercase truncate max-w-[100px] leading-tight text-[8px] mt-0.5">{c.subtitle}</span>
                      </div>
                      <div>
                        <span className="block font-black text-brand-ink/40 uppercase text-[7px] tracking-widest">/ DEPARTMENT</span>
                        <span className="block font-bold uppercase truncate max-w-[100px] leading-tight text-[8px] mt-0.5">{c.location || 'CORE TEAM'}</span>
                      </div>
                      <div>
                        <span className="block font-black text-brand-ink/40 uppercase text-[7px] tracking-widest">/ NODE_STATUS</span>
                        <span className="inline-flex items-center gap-1 font-bold uppercase text-[8px] mt-0.5 text-brand-ink">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse border border-brand-ink/10" />
                          ONLINE
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="h-[2px] bg-brand-ink/15 w-12" />
                      <span className="block text-[6px] opacity-40 font-mono">SYS_VER: 2.6.0</span>
                      <span className="block text-[6px] opacity-40 font-mono">MD_ID: 026_TL</span>
                    </div>
                  </div>

                  {/* Image CRT Screen Frame */}
                  <div className="absolute right-4 bottom-4 top-16 w-[52%] rounded-[16px] overflow-hidden border-[3px] border-brand-ink bg-white shadow-[4px_4px_0px_0px_#030404] z-10 flex flex-col justify-between">
                    {/* Retro Viewport Screen Container */}
                    <div className="relative w-full h-full overflow-hidden bg-brand-cloud/40">
                      {c.image ? (
                        <img 
                          src={c.image} 
                          alt={c.title} 
                          loading="lazy" 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                        />
                      ) : (
                        <div 
                          className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
                          style={{ backgroundColor: c.borderColor || '#F5F1E5' }}
                        >
                          <span className="font-display font-black text-4xl text-outline-ink select-none" style={{ color: '#F5F1E5' }}>
                            {initials}
                          </span>
                        </div>
                      )}

                      {/* Scanlines Effect Overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-[0.14] mix-blend-overlay z-20"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(3, 4, 4, 0) 50%, rgba(3, 4, 4, 1) 50%)',
                          backgroundSize: '100% 4px'
                        }}
                      />

                      {/* Viewfinder focus brackets */}
                      <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t-2 border-l-2 border-brand-ink/40 pointer-events-none z-20" />
                      <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t-2 border-r-2 border-brand-ink/40 pointer-events-none z-20" />
                      <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b-2 border-l-2 border-brand-ink/40 pointer-events-none z-20" />
                      <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b-2 border-r-2 border-brand-ink/40 pointer-events-none z-20" />
                    </div>
                  </div>

                  {/* Tap to view tip */}
                  <span className="absolute bottom-1.5 left-4 text-[7px] font-bold text-brand-ink/40 uppercase tracking-widest pointer-events-none z-10 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 rounded-full bg-brand-ink/30 animate-ping" />
                    Tap to flip_
                  </span>
                </div>
              </div>


              {/* BACK SIDE */}
              <div
                className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[16px] border-[3px] border-brand-ink bg-[#030404] text-white p-4 flex flex-col justify-between shadow-[6px_6px_0px_0px_#030404] overflow-hidden"
              >
                {/* Halftone texture overlay */}
                <div className="absolute inset-0 bg-halftone-cloud opacity-[0.05] pointer-events-none z-0 rounded-[12px]" />

                {/* Top Corner Social Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                  {c.socials?.linkedin && (
                    <a
                      href={c.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 rounded-full bg-white border-2 border-brand-ink text-brand-ink hover:bg-brand-blue hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.25)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center"
                    >
                      <LinkedInIcon size={12} />
                    </a>
                  )}
                  {c.socials?.github && (
                    <a
                      href={c.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 rounded-full bg-white border-2 border-brand-ink text-brand-ink hover:bg-brand-pink hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.25)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center"
                    >
                      <GitHubIcon size={12} />
                    </a>
                  )}
                  {c.socials?.instagram && (
                    <a
                      href={c.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-7 h-7 rounded-full bg-white border-2 border-brand-ink text-brand-ink hover:bg-brand-pink hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.25)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center"
                    >
                      <InstagramIcon size={12} />
                    </a>
                  )}
                </div>

                {/* Back Content Info */}
                <div className="relative z-10 text-left flex flex-col h-full justify-between">
                  <div>
                    <h3 className="m-0 text-[18px] font-display font-black uppercase tracking-tight text-white pr-8 leading-tight">
                      {c.title}
                    </h3>
                    <p 
                      className="m-0 mt-2 text-[10px] font-black tracking-widest uppercase inline-block border-b border-white/10 pb-0.5"
                      style={{ color: c.borderColor || '#64748b' }}
                    >
                      {c.subtitle}
                    </p>

                    {/* Department */}
                    <div className="flex items-center gap-2 text-white/70 text-[10px] text-left mt-5 pr-8">
                      <svg className="w-3.5 h-3.5 shrink-0 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                      <span className="truncate">{c.location || 'Core Team'}</span>
                    </div>

                    {/* Email */}
                    {c.socials?.email && (
                      <div className="flex items-center gap-2 text-white/70 text-[10px] text-left mt-2.5 pr-8">
                        <svg className="w-3.5 h-3.5 shrink-0 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        <a 
                          href={c.socials.email.startsWith('mailto:') ? c.socials.email : `mailto:${c.socials.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="truncate hover:underline select-all text-white/80"
                        >
                          {c.socials.email}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* QR Code Connect Box */}
                  <div className="flex flex-col items-center mt-3">
                    <span className="text-[8px] font-black text-white/50 uppercase tracking-widest mb-1.5">Scan to Connect</span>
                    <div className="bg-white p-2 rounded-[10px] border-[2px] border-brand-ink flex items-center justify-center">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(connectUrl)}`} 
                        alt="Connect QR Code"
                        className="w-[85px] h-[85px] object-contain select-none"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[8px] font-mono text-white/45 uppercase tracking-wider mt-1.5 truncate max-w-[200px]">
                      {c.handle || `@${c.title.toLowerCase().replace(/\s+/g, '')}`}
                    </span>
                  </div>

                  {/* Tagline & Accent Bar */}
                  <div className="mt-2.5">
                    <p className="text-[9px] text-white/50 italic px-1 text-center line-clamp-2 leading-snug">
                      &ldquo;{getTagline(c.location, c.title)}&rdquo;
                    </p>
                    <div 
                      className="h-[3.5px] w-10 rounded-full mx-auto mt-2.5" 
                      style={{ backgroundColor: c.borderColor || '#FF188C' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Grayscale halftone backdrop overlay controlled by mouse position */}
      <div
        className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
        style={{
          backdropFilter: 'grayscale(0.7) brightness(0.95)',
          WebkitBackdropFilter: 'grayscale(0.7) brightness(0.95)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.08) 30%,rgba(0,0,0,0.18)45%,rgba(0,0,0,0.30)60%,rgba(0,0,0,0.45)75%,rgba(0,0,0,0.65)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.08) 30%,rgba(0,0,0,0.18)45%,rgba(0,0,0,0.30)60%,rgba(0,0,0,0.45)75%,rgba(0,0,0,0.65)88%,white 100%)'
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[300ms] z-40"
        style={{
          backdropFilter: 'grayscale(0.7) brightness(0.95)',
          WebkitBackdropFilter: 'grayscale(0.7) brightness(0.95)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.85)30%,rgba(255,255,255,0.72)45%,rgba(255,255,255,0.58)60%,rgba(255,255,255,0.42)75%,rgba(255,255,255,0.25)88%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.85)30%,rgba(255,255,255,0.72)45%,rgba(255,255,255,0.58)60%,rgba(255,255,255,0.42)75%,rgba(255,255,255,0.25)88%,transparent 100%)',
          opacity: 1
        }}
      />
    </div>
  );
};

export default ChromaGrid;
