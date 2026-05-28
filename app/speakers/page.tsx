'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Plus, X, ArrowRight, ArrowLeft } from 'lucide-react';

const LinkedInIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const THEMES = [
  { primary: '#FF188C', highlight: '#FF9A00', dark: '#030404' },
  { primary: '#0D21DD', highlight: '#FF188C', dark: '#030404' },
  { primary: '#FF9A00', highlight: '#0D21DD', dark: '#030404' },
  { primary: '#FF188C', highlight: '#0D21DD', dark: '#030404' },
  { primary: '#0D21DD', highlight: '#FF9A00', dark: '#030404' },
  { primary: '#FF9A00', highlight: '#FF188C', dark: '#030404' },
  { primary: '#FF188C', highlight: '#FF9A00', dark: '#030404' },
  { primary: '#0D21DD', highlight: '#FF188C', dark: '#030404' },
  { primary: '#FF9A00', highlight: '#0D21DD', dark: '#030404' },
];

const SPEAKERS_DATA = [
  {
    name: 'Manish Freeman',
    role: 'Movement Facilitator',
    time: "Aarambh '26 · JKLU",
    image: 'https://aarambh.jklu.edu.in/assests/Images/Speakers/Manish%20Freeman%20.webp',
    bio: "A joyful mover who turns play and dance into deep human connection. Manish brings energy, rhythm, and presence to every space he enters. His session at Aarambh '26 will get you on your feet and help you connect with fellow freshers in the most alive way possible.",
    expertise: ['Movement', 'Dance', 'Connection'],
    linkedin: 'https://www.linkedin.com/in/manish-freeman-a7ab34169/',
  },
  {
    name: 'Chetan Kanoongo',
    role: 'Experiential Facilitator',
    time: "Aarambh '26 · JKLU",
    image: 'https://aarambh.jklu.edu.in/assests/Images/Speakers/Chetan%20.webp',
    bio: "A curious facilitator who creates space for connection, reflection, and play. Chetan designs experiences that help people slow down, tune in, and discover something new about themselves and each other. Expect thoughtful, memorable sessions that stay with you long after Aarambh ends.",
    expertise: ['Facilitation', 'Reflection', 'Play'],
    linkedin: null,
  },
  {
    name: 'Anjali Suneja',
    role: 'POSH Trainer & HR Leader',
    time: "Aarambh '26 · JKLU",
    image: 'https://aarambh.jklu.edu.in/assests/Images/Speakers/Anjali_Suneja.webp',
    bio: "A POSH trainer and HR leader passionate about building safe, inclusive spaces. Anjali's session at Aarambh '26 is designed to help you understand your rights, your responsibilities, and the culture of respect that makes great communities thrive. An essential conversation for every incoming student.",
    expertise: ['POSH Training', 'HR Leadership', 'Inclusion'],
    linkedin: 'https://www.linkedin.com/in/anjali-suneja-05021427/',
  },
  {
    name: 'Kunal Agarwal',
    role: 'Designer & Craftsman',
    time: "Aarambh '26 · JKLU",
    image: 'https://aarambh.jklu.edu.in/assests/Images/Speakers/Kunal%20Agarwal%20.webp',
    bio: "A designer who turns clay and tradition into everyday stories. Kunal bridges the gap between heritage craft and contemporary design thinking. His hands-on workshop at Aarambh '26 invites you to slow down, get your hands dirty, and shape something meaningful — both in clay and in your new college life.",
    expertise: ['Design', 'Craft', 'Tradition'],
    linkedin: 'https://www.linkedin.com/in/kunalagarwal112/',
  },
  {
    name: 'Vidhi Modi',
    role: 'Tech & Wellness Advocate',
    time: "Aarambh '26 · JKLU",
    image: 'https://aarambh.jklu.edu.in/assests/Images/Speakers/Vidhi%20Modi%20.webp',
    bio: "A techie with a heart for well-being and youth empowerment. Vidhi blends her passion for technology with a deep commitment to mental wellness and self-awareness. At Aarambh '26, she'll help you start this chapter with the clarity, confidence, and tools you need to thrive — both online and off.",
    expertise: ['Tech', 'Well-being', 'Youth Empowerment'],
    linkedin: 'https://www.linkedin.com/in/vidhimodi99/',
  },
  {
    name: 'Amit Sheth',
    role: 'Author & Changemaker',
    time: "Aarambh '26 · JKLU",
    image: 'https://aarambh.jklu.edu.in/assests/Images/Speakers/Amit%20Seth%20.webp',
    bio: "A runner, author, and changemaker who believes in purpose with every step. Amit's story is one of transformation — from corporate life to a life driven by meaning and movement. His talk at Aarambh '26 will challenge you to ask what you truly stand for and how to walk into your future with courage and heart.",
    expertise: ['Authorship', 'Purpose', 'Changemaking'],
    linkedin: null,
  },
  {
    name: 'Manzil Mystics',
    role: 'Soul Music Collective',
    time: "Aarambh '26 · JKLU",
    image: 'https://aarambh.jklu.edu.in/assests/Images/Speakers/Manzil%20Mystics%20.webp',
    bio: "Blending soul, sound, and Kabir's timeless spirit to spark unity through music. Manzil Mystics creates experiences where song becomes a bridge across differences. Their performance at Aarambh '26 will have you singing, feeling, and celebrating the beautiful diversity of your new community.",
    expertise: ['Music', 'Kabir Poetry', 'Unity'],
    linkedin: 'https://www.linkedin.com/in/anuraghoon/',
  },
  {
    name: 'Manan Pahwa',
    role: 'Design & Behavior Researcher',
    time: "Aarambh '26 · JKLU",
    image: 'https://aarambh.jklu.edu.in/assests/Images/Speakers/Manan%20Pahwa%20.webp',
    bio: "A curious mind who blends design, behavior, and deep research to decode human decisions. Manan's work sits at the intersection of how people think and how systems are built. At Aarambh '26, he'll take you on a journey to uncover the 'why' behind what we do — a session that will permanently change how you see choices.",
    expertise: ['Behavioral Research', 'Design Thinking', 'Decision Making'],
    linkedin: 'https://www.linkedin.com/in/mananpahwaa/',
  },
  {
    name: 'Mukesh Choudhary',
    role: 'Cyber Crime Consultant',
    time: "Aarambh '26 · JKLU",
    image: 'https://aarambh.jklu.edu.in/assests/Images/Speakers/Mukesh%20Choudhary.webp',
    bio: "Cyber Crime Consultant and InfoSec professional who has trained India's top law enforcement and intelligence agencies — from the CBI to the armed forces — for over a decade. At Aarambh '26, Mukesh will decode the real world of cyber security and help you navigate the digital landscape with awareness and confidence.",
    expertise: ['Cyber Security', 'InfoSec', 'Law Enforcement'],
    linkedin: 'https://www.linkedin.com/in/mukesh1choudhary/',
  },
];

const SCROLL_SPEED_FACTOR = 0.25;

const textVariants = {
  initial: (dir: number) => ({ opacity: 0, y: dir * 30 }),
  animate: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir * -30 })
};

const cardVariants = {
  initial: (dir: number) => ({ opacity: 0, x: dir * 60, scale: 0.97 }),
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60, scale: 0.97 })
};

export default function SpeakersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndexRef = useRef(0);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = forward, -1 = backward
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const cardChangeInterval = viewportHeight * SCROLL_SPEED_FACTOR;
      
      if (rect.top <= 0) {
        const scrollDepth = Math.abs(rect.top);
        let newIndex = Math.floor(scrollDepth / cardChangeInterval);
        newIndex = Math.max(0, Math.min(newIndex, SPEAKERS_DATA.length - 1));
        if (newIndex !== prevIndexRef.current) {
          setDirection(newIndex > prevIndexRef.current ? 1 : -1);
          prevIndexRef.current = newIndex;
          setCurrentIndex(newIndex);
        }
      } else {
        if (prevIndexRef.current !== 0) {
          setDirection(-1);
          prevIndexRef.current = 0;
          setCurrentIndex(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextClick = () => {
    window.scrollBy({ top: window.innerHeight * SCROLL_SPEED_FACTOR, behavior: 'smooth' });
  };

  const speaker = SPEAKERS_DATA[currentIndex];
  const nextSpeaker = SPEAKERS_DATA[(currentIndex + 1) % SPEAKERS_DATA.length];
  const theme = THEMES[currentIndex % THEMES.length];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ height: `${((SPEAKERS_DATA.length - 1) * SCROLL_SPEED_FACTOR * 100) + 100}vh` }} 
    >
      <div
        className="sticky top-0 w-full h-[100dvh] bg-[#F5F1E5] overflow-hidden font-sans selection:bg-[#030404] selection:text-[#F5F1E5]"
        style={{ backgroundImage: 'radial-gradient(#030404 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      >
        <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 md:gap-2">
          {SPEAKERS_DATA.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-300 border-[2px] border-[#030404]"
              style={{
                width: i === currentIndex ? 24 : 8,
                height: 8,
                backgroundColor: i === currentIndex ? THEMES[i % THEMES.length].primary : '#030404',
                opacity: i === currentIndex ? 1 : 0.3,
              }}
            />
          ))}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="relative w-full h-full px-4 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-8 pt-16 pb-6 md:pt-20 md:pb-10">

          {/* LEFT 80% AREA */}
          <div className="w-full lg:w-[80%] h-full flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-2 lg:gap-12 z-20">
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left pointer-events-none shrink-0 mt-2 lg:mt-0">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={speaker.name}
                  custom={direction}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col items-center lg:items-start"
                >
                  <div
                    className="inline-block px-4 py-1.5 md:px-6 md:py-2 border-[3px] md:border-[4px] border-[#030404] text-[10px] md:text-sm uppercase tracking-widest font-black mb-3 md:mb-6 shadow-[4px_4px_0px_rgba(3,4,4,1)] md:shadow-[6px_6px_0px_rgba(3,4,4,1)]"
                    style={{ backgroundColor: theme.primary, color: '#F5F1E5' }}
                  >
                    {speaker.role}
                  </div>
                  <h2
                    className="text-[3.5rem] leading-[0.85] sm:text-6xl md:text-[7rem] lg:text-[8rem] font-black uppercase tracking-tighter text-[#030404] mb-2 md:mb-8"
                    style={{ textShadow: `4px 4px 0px ${theme.highlight}` }}
                  >
                    {speaker.name.split(' ').map((word, i) => (
                      <span key={i} className="block">{word}</span>
                    ))}
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="w-full lg:w-1/2 flex-1 lg:h-full flex justify-center lg:justify-end items-center relative min-h-[35vh]">
              <AnimatePresence mode="wait" custom={direction}>
                <DossierCard key={speaker.name} speaker={speaker} theme={theme} direction={direction} />
              </AnimatePresence>
            </div>
          </div>

          {/* FLOATING PREVIEW AND SCROLL WRAPPER */}
          {/* Changed right position configuration and layout alignment classes to bring it fully into view */}
          <div
            onClick={handleNextClick}
            className="absolute bottom-6 right-3 sm:right-6 lg:relative lg:bottom-auto lg:right-auto w-auto lg:w-[20%] flex flex-col justify-center items-end cursor-pointer group z-40 select-none"
          >
            {/* Desktop Text */}
            <p className="hidden lg:flex text-[#030404]/40 font-black uppercase tracking-widest text-[11px] mb-4 items-center gap-2 group-hover:text-[#030404] transition-colors">
              {currentIndex === SPEAKERS_DATA.length - 1 ? 'Scroll to Exit' : 'Scroll to View'} <ArrowRight size={14} className="animate-pulse" />
            </p>

            {/* Mobile Scroll Text - Added clear structural rules to stop overlap */}
            <div className="flex lg:hidden items-center justify-end gap-1 mb-1 w-full max-w-[75px] sm:max-w-[90px] text-right">
              <span className="text-[#030404] font-black uppercase tracking-widest text-[10px] block whitespace-nowrap">
                Scroll
              </span>
              <ArrowRight size={12} className="animate-pulse text-[#030404] shrink-0" />
            </div>

            {/* Dynamic Image Preview Container */}
            <div className="relative w-[75px] sm:w-[90px] lg:w-full lg:max-w-[180px] aspect-[3/4] opacity-100 lg:opacity-60 shadow-[4px_4px_0px_rgba(3,4,4,1)] lg:shadow-[10px_10px_0px_rgba(3,4,4,1)] border-[2px] lg:border-[4px] border-[#030404] bg-[#030404] overflow-hidden group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
              <img
                src={nextSpeaker.image}
                className="w-full h-full object-cover grayscale contrast-125"
                alt="Next Up Lineup Preview"
              />
              <div className="absolute inset-0 bg-[#030404]/30 mix-blend-multiply" />
              <div className="absolute bottom-0 left-0 right-0 p-1.5 lg:p-3 bg-gradient-to-t from-[#030404] to-transparent">
                <p className="text-[#F5F1E5] font-black text-[8px] lg:text-xs uppercase truncate">{nextSpeaker.name}</p>
              </div>
            </div>

            <p className="mt-1.5 lg:mt-4 text-[#030404]/60 lg:text-[#030404]/40 font-black text-[10px] lg:text-xs tracking-widest bg-[#F5F1E5]/80 lg:bg-transparent px-1 lg:px-0 rounded-sm">
              {currentIndex + 1} / {SPEAKERS_DATA.length}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DOSSIER CARD COMPONENT
// ---------------------------------------------------------------------------
function DossierCard({ speaker, theme, direction }: { speaker: any; theme: any; direction: 1 | -1 }) {
  const [showBio, setShowBio] = useState(false);

  return (
    <motion.div
      custom={direction}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[420px] aspect-[3/4] group z-20"
    >
      {/* FRONT PHOTO BASE */}
      <div className="absolute inset-0 w-full h-full shadow-[15px_15px_0px_rgba(3,4,4,1)] md:shadow-[25px_25px_0px_rgba(3,4,4,1)] border-[6px] md:border-[12px] border-[#030404] bg-[#030404] overflow-hidden">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100 pointer-events-none"
        />

        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        <button
          onClick={() => setShowBio(true)}
          className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-20 h-20 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center shadow-[4px_4px_0px_rgba(3,4,4,1)] md:shadow-[6px_6px_0px_rgba(3,4,4,1)] border-[3px] md:border-[4px] border-[#030404] hover:scale-110 transition-transform duration-300 z-30 cursor-pointer"
          style={{ backgroundColor: theme.highlight }}
        >
          <Plus size={24} className="text-[#030404] mb-0.5 md:mb-1 w-5 md:w-7 h-5 md:h-7" />
          <span className="text-[#030404] font-black uppercase text-[8px] md:text-[10px] tracking-widest leading-none">
            View<br />Bio
          </span>
        </button>
      </div>

      {/* BIO REVEAL */}
      <motion.div
        initial={{ clipPath: 'circle(0% at 10% 90%)' }}
        animate={{ clipPath: showBio ? 'circle(150% at 10% 90%)' : 'circle(0% at 10% 90%)' }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 w-full h-full shadow-[15px_15px_0px_rgba(3,4,4,1)] md:shadow-[25px_25px_0px_rgba(3,4,4,1)] border-[6px] md:border-[12px] border-[#030404] bg-[#030404] overflow-hidden p-4 md:p-8 flex flex-col justify-between z-40 cursor-default"
      >
        <div className="absolute inset-0 opacity-15 mix-blend-luminosity pointer-events-none">
          <img src={speaker.image} className="w-full h-full object-cover grayscale blur-[2px]" alt="watermark" />
          <div className="absolute inset-0 bg-[#030404]/80" />
        </div>

        <div className="relative z-10 flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex justify-between items-start mb-4 md:mb-6 border-b-[3px] border-[#F5F1E5]/20 pb-4 md:pb-6 shrink-0">
            <div className="flex flex-col items-start gap-2 md:gap-3">
              <button
                onClick={() => setShowBio(false)}
                className="flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-1 bg-[#F5F1E5] text-[#030404] text-[9px] md:text-[10px] font-black uppercase tracking-widest border-[2px] border-[#030404] shadow-[2px_2px_0px_rgba(245,241,229,0.3)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-none transition-all cursor-pointer"
              >
                <ArrowLeft size={10} className="w-3 h-3 md:w-auto md:h-auto" /> Back
              </button>
              
              <div>
                <h3 className="font-black text-xl md:text-3xl uppercase tracking-tighter text-[#F5F1E5] leading-none mb-1.5 md:mb-2">
                  Dossier:<br />{speaker.name.split(' ')[0]}
                </h3>
                <p className="text-[#F5F1E5]/70 font-bold text-[9px] md:text-xs uppercase tracking-widest mb-2 md:mb-3">{speaker.time}</p>
                {speaker.linkedin && (
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 border-[2px] border-[#F5F1E5]/40 bg-[#F5F1E5]/10 hover:bg-[#F5F1E5]/20 transition-all duration-200 cursor-pointer group/li"
                    style={{ textDecoration: 'none' }}
                  >
                    <LinkedInIcon />
                    <span className="text-[#F5F1E5] font-black text-[9px] md:text-[10px] uppercase tracking-widest">LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
            <div className="w-8 h-8 md:w-12 md:h-12 bg-[#F5F1E5] flex items-center justify-center border-[2px] md:border-[3px] border-[#030404] shadow-[3px_3px_0px_rgba(245,241,229,0.3)] shrink-0">
              <Share2 size={16} className="text-[#030404] w-3.5 h-3.5 md:w-4 md:h-4" />
            </div>
          </div>

          <p className="text-[#F5F1E5] font-medium text-[11px] md:text-sm leading-relaxed mb-4 md:mb-6" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            {speaker.bio}
          </p>

          <div className="mt-auto">
            <p className="text-[#F5F1E5]/50 text-[9px] md:text-xs font-black uppercase tracking-widest mb-2 md:mb-3">Core Focus</p>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {speaker.expertise.map((skill: string, i: number) => (
                <span key={i} className="px-1.5 md:px-2 py-0.5 md:py-1 bg-[#F5F1E5]/10 border border-[#F5F1E5]/30 text-[#F5F1E5] text-[8px] md:text-[10px] font-bold uppercase tracking-wider">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
