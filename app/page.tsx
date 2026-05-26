'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AboutSection from '@/components/about';

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  distance: number;
  isSquare: boolean;
}

function TornPaperDivider({ color = "fill-brand-ink", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] select-none pointer-events-none ${flip ? 'rotate-180' : ''}`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`relative block w-full h-[40px] ${color}`}>
        <path d="M0,0 L30,40 L60,10 L95,50 L130,20 L165,60 L200,30 L240,70 L280,30 L320,80 L360,40 L400,90 L440,50 L480,95 L520,60 L560,100 L600,45 L640,110 L680,50 L720,95 L760,40 L800,90 L840,30 L880,80 L920,40 L960,105 L1000,55 L1040,90 L1080,35 L1120,70 L1160,20 L1200,80 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
}

const marqueeVariants: Variants = {
  animate: {
    x: [0, -1035],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      },
    },
  },
};

// Web Audio API Retro sound effects synthesizer
const playSynthSound = (type: 'boom' | 'pow' | 'bang' | 'stamp' | 'click') => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'boom') {
      // Deep explosion rumble sliding down
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(25, now + 0.65);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.65);
      osc.start(now);
      osc.stop(now + 0.65);
    } else if (type === 'pow') {
      // Punchy laser slide down
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'bang') {
      // Retro coin jump slide
      osc.type = 'square';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.setValueAtTime(580, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.4);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'stamp') {
      // Thumping press sound
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(15, now + 0.25);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else {
      // Subtle click bleep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    // Audio context may be blocked by browser policy until user click, which is normal
  }
};
// ── Photos from public/photos/web ──
interface Photo {
  id: number
  src: string
  label: string
}

const PHOTOS: Photo[] = [
  {
    "id": 1,
    "src": "/photos/web/MCS00113.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 2,
    "src": "/photos/web/MCS00486.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 3,
    "src": "/photos/web/MCS00734.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 4,
    "src": "/photos/web/MCS01361.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 5,
    "src": "/photos/web/MCS01446.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 6,
    "src": "/photos/web/MCS01565.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 7,
    "src": "/photos/web/MCS01588.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 8,
    "src": "/photos/web/MCS01598.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 9,
    "src": "/photos/web/MCS01616.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 10,
    "src": "/photos/web/MCS01619.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 11,
    "src": "/photos/web/MCS01630.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 12,
    "src": "/photos/web/MCS02240.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 13,
    "src": "/photos/web/MCS02341.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 14,
    "src": "/photos/web/MCS02351.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 15,
    "src": "/photos/web/MCS02401.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 16,
    "src": "/photos/web/MCS02551.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 17,
    "src": "/photos/web/MCS02708.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 18,
    "src": "/photos/web/MCS02747.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 19,
    "src": "/photos/web/MCS03220.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 20,
    "src": "/photos/web/MCS03237.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 21,
    "src": "/photos/web/MCS03264.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 22,
    "src": "/photos/web/MCS03277.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 23,
    "src": "/photos/web/MCS03308.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 24,
    "src": "/photos/web/MCS03352.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 25,
    "src": "/photos/web/MCS03543.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 26,
    "src": "/photos/web/MCS03615.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 27,
    "src": "/photos/web/MCS03804.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 28,
    "src": "/photos/web/MCS03882.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 29,
    "src": "/photos/web/MCS04202.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 30,
    "src": "/photos/web/MCS04213.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 31,
    "src": "/photos/web/MCS04257.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 32,
    "src": "/photos/web/MCS04925.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 33,
    "src": "/photos/web/MCS05021.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 34,
    "src": "/photos/web/MCS05036.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 35,
    "src": "/photos/web/MCS05143.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 36,
    "src": "/photos/web/MCS05159.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 37,
    "src": "/photos/web/MCS05177.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 38,
    "src": "/photos/web/MCS05226.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 39,
    "src": "/photos/web/MCS05230.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 40,
    "src": "/photos/web/MCS05344.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 41,
    "src": "/photos/web/MCS05389.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 42,
    "src": "/photos/web/MCS05430.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 43,
    "src": "/photos/web/MCS05432.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 44,
    "src": "/photos/web/MCS05434.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 45,
    "src": "/photos/web/MCS05448.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 46,
    "src": "/photos/web/MCS05466.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 47,
    "src": "/photos/web/MCS05527.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 48,
    "src": "/photos/web/MCS05585.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 49,
    "src": "/photos/web/MCS05620.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 50,
    "src": "/photos/web/MCS05702.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 51,
    "src": "/photos/web/MCS05747.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 52,
    "src": "/photos/web/MCS05754.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 53,
    "src": "/photos/web/MCS05788.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 54,
    "src": "/photos/web/MCS05795.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 55,
    "src": "/photos/web/MCS05807.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 56,
    "src": "/photos/web/1.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 57,
    "src": "/photos/web/2.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 58,
    "src": "/photos/web/3.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 59,
    "src": "/photos/web/4.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 60,
    "src": "/photos/web/5.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 61,
    "src": "/photos/web/6.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 62,
    "src": "/photos/web/7.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 63,
    "src": "/photos/web/8.webp",
    "label": "Aarambh 26 Moment"
  },
  {
    "id": 64,
    "src": "/photos/web/9.webp",
    "label": "Aarambh 26 Moment"
  }
];

const col1Images = PHOTOS.slice(0, 16).map(p => p.src);
const col2Images = PHOTOS.slice(16, 32).map(p => p.src);
const col3Images = PHOTOS.slice(32, 48).map(p => p.src);
const col4Images = PHOTOS.slice(48, 64).map(p => p.src);

export default function Home() {
  const router = useRouter();

  const [galleryMounted, setGalleryMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  // Function to create comic dot explosion particles
  const spawnParticles = (x: number, y: number) => {
    const colors = ['#FF9A00', '#FF188C', '#0D21DD', '#030404', '#F5F1E5'];
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Math.random() + Date.now() + i,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 6,
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * 70 + 30,
      isSquare: Math.random() > 0.5
    }));
    setParticles((prev) => [...prev, ...newParticles].slice(-40)); // Keep max 40 in DOM
  };

  useEffect(() => {
    setGalleryMounted(true);

    const targetDate = new Date('2026-07-14T09:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    // Global listener for screen clicks to synthesis clicks and pop comic dots
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('a')) return;
      spawnParticles(e.clientX, e.clientY);
      playSynthSound('click');
    };

    window.addEventListener('click', handleGlobalClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const stickers = [
    { text: "BOOM!", type: "boom", color: "bg-brand-pink text-brand-cloud", top: "12%", left: "6%", starburst: true, rotate: "-8deg" },
    { text: "POW!", type: "pow", color: "bg-brand-orange text-brand-ink font-extrabold", top: "15%", right: "8%", starburst: true, rotate: "6deg" },
    { text: "BANG!", type: "bang", color: "bg-brand-blue text-brand-cloud", bottom: "25%", left: "8%", starburst: true, rotate: "-12deg" },
    { text: "APPROVED", type: "stamp", subtext: "BY THE SQUAD", color: "bg-brand-cloud text-brand-pink border-4 border-dashed border-brand-pink", bottom: "22%", right: "8%", stamp: true, rotate: "15deg" },
  ];

  const countdownBlocks = [
    { label: 'Days', valueKey: 'days', bg: 'bg-brand-orange text-brand-ink', rotate: '-rotate-2' },
    { label: 'Hours', valueKey: 'hours', bg: 'bg-brand-pink text-brand-cloud', rotate: 'rotate-3' },
    { label: 'Mins', valueKey: 'mins', bg: 'bg-brand-blue text-brand-cloud', rotate: '-rotate-1' },
    { label: 'Secs', valueKey: 'secs', bg: 'bg-brand-cloud text-brand-ink', rotate: 'rotate-2' },
  ];


  return (
    <main className="flex flex-col items-center overflow-x-hidden relative bg-brand-ink text-brand-cloud font-sans">
      {/* Noise/Grain Overlay */}
      <div className="noise-overlay" />

      {/* Particle Overlay for click explosions */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: p.x - p.size/2, y: p.y - p.size/2, scale: 1, opacity: 1, rotate: 0 }}
              animate={{ 
                x: p.x - p.size/2 + Math.cos(p.angle) * p.distance,
                y: p.y - p.size/2 + Math.sin(p.angle) * p.distance,
                scale: 0.1,
                opacity: 0,
                rotate: 180
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.isSquare ? '0%' : '50%',
                border: '2px solid #030404',
                boxShadow: '1.5px 1.5px 0px #030404',
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Comic Magazine Cover Hero */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-28 px-4 overflow-hidden bg-brand-cloud text-brand-ink">
        
        {/* Comic Pattern Backdrop */}
        <div className="absolute inset-0 bg-halftone-black opacity-30 pointer-events-none" />
        
        {/* Abstract comic background shapes */}
        <div className="absolute top-12 left-12 w-64 h-64 bg-brand-pink/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-20 right-20 w-[450px] h-[450px] bg-brand-orange/15 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Huge Tilted AARAMBH 26 Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 w-[120vw] text-center opacity-[0.04]">
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 900, color: '#030404', lineHeight: 0.8, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              AARAMBH&apos;26
            </h1>
          </div>
        </div>
        
        {/* Draggable Pop-Art Stickers with synthesized audio triggers */}
        <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
          {stickers.map((sticker, idx) => (
            <motion.div
              key={idx}
              drag
              dragConstraints={{ left: -400, right: 400, top: -200, bottom: 200 }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 25 }}
              whileHover={{ scale: 1.15, zIndex: 50, rotate: "0deg" }}
              whileDrag={{ scale: 1.2, zIndex: 100, cursor: "grabbing" }}
              onDragStart={(e) => {
                // Synthesizes retro sounds when dragging begins
                playSynthSound(sticker.type as any);
              }}
              onClick={(e) => {
                // Spawn click explosion right at stamp/sticker location
                spawnParticles(e.clientX, e.clientY);
                playSynthSound(sticker.type as any);
              }}
              style={{
                top: sticker.top,
                left: sticker.left,
                right: sticker.right,
                bottom: sticker.bottom,
                rotate: sticker.rotate,
              }}
              className="absolute pointer-events-auto cursor-grab select-none"
            >
              {sticker.starburst ? (
                <div className={`comic-starburst w-36 h-36 border-4 border-brand-ink flex flex-col items-center justify-center text-center p-4 shadow-comic ${sticker.color}`}>
                  <span className="font-display font-black text-xl leading-none uppercase tracking-tighter drop-shadow-md">
                    {sticker.text}
                  </span>
                </div>
              ) : sticker.stamp ? (
                <div className={`w-28 h-28 rounded-full flex flex-col items-center justify-center text-center p-3 rotate-12 shadow-comic-sm bg-brand-cloud ${sticker.color}`}>
                  <span className="font-display font-black text-xs leading-none uppercase tracking-tighter">
                    {sticker.text}
                  </span>
                  <span className="text-[7px] font-black uppercase mt-1 tracking-widest leading-none">
                    {sticker.subtext}
                  </span>
                </div>
              ) : (
                <div className={`px-5 py-3 font-display font-black text-sm uppercase rounded-md border-2 border-brand-ink ${sticker.color}`}>
                  {sticker.text}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Hero Content Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="z-10 text-center max-w-4xl flex flex-col items-center px-4"
        >
          {/* Comic Magazine Header Band */}
          <div className="border-comic bg-brand-ink text-brand-cloud px-6 py-2.5 font-display text-xs font-black tracking-[0.25em] uppercase shadow-comic -rotate-1 mb-10 bg-halftone-cloud">
            JK LAKSHMIPAT UNIVERSITY PRESENTS • THE MEGA INDUCTION FEST
          </div>

          {/* Comic Styled Heading Stack */}
          <div className="relative mb-8 select-none p-3 max-w-full">
            {/* Outline back text */}
            <h1 className="font-display text-6xl sm:text-7xl md:text-[6.5rem] lg:text-[8rem] font-black uppercase leading-none tracking-tighter text-outline-pink select-none">
              BOLD & BEYOND
            </h1>
            {/* Centered Primary Logo */}
            <div className="absolute inset-0 flex items-center justify-center p-2 mt-2">
              <Image
                src="/logo.svg"
                alt="AARAMBH'26"
                width={550}
                height={120}
                className="w-full max-w-xs sm:max-w-md md:max-w-xl h-auto drop-shadow-[8px_8px_0px_#030404] hover:scale-[1.03] transition-transform duration-300 border-comic p-4 bg-brand-cloud rounded-xl"
                priority
                loading="eager"
              />
            </div>
          </div>

          {/* Narrative Dialogue Box */}
          <div className="border-comic bg-brand-ink text-brand-cloud p-6 rounded-xl max-w-2xl shadow-comic rotate-1 bg-halftone-cloud mb-10">
            <p className="font-display font-black text-sm sm:text-base leading-relaxed tracking-wide uppercase">
              “SQUAD REPORT: A FRESH BEGINNING IS INITIATED! CLICK ANYWHERE TO UNLEASH HALFTONE PARTICLES AND SYNTH SOUNDS!”
            </p>
          </div>

          {/* Countdown Clock Panel */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-12 w-full max-w-md text-brand-cloud">
            {countdownBlocks.map((block) => (
              <div
                key={block.label}
                className={`p-3 sm:p-4 border-comic rounded-lg shadow-comic ${block.bg} ${block.rotate} transition-transform hover:scale-105`}
              >
                <div className="relative h-8 sm:h-10 overflow-hidden flex items-center justify-center w-full">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={timeLeft[block.valueKey as keyof TimeLeft]}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl sm:text-3xl font-display font-black tabular-nums absolute"
                    >
                      {String(timeLeft[block.valueKey as keyof TimeLeft]).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-80">
                  {block.label}
                </span>
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* Torn paper visual separation */}
      <TornPaperDivider color="fill-brand-ink" />

      {/* Comic styled strip/marquee */}
      <section className="w-full py-4 border-y-4 border-brand-ink bg-brand-cloud text-brand-ink overflow-hidden z-10">
        <div className="w-full flex whitespace-nowrap overflow-hidden">
          <motion.div
            variants={marqueeVariants}
            animate="animate"
            className="flex gap-16 font-display font-black text-base sm:text-lg uppercase tracking-wider select-none"
          >
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-brand-pink">💥 BOLD & BEYOND!</span>
                <span className="text-brand-blue">🌟 LIMITLESS!</span>
                <span className="text-brand-orange">⚡ ENERGY!</span>
                <span className="text-brand-ink">🎨 CRASH!</span>
                <span className="text-brand-pink">🔥 FEARLESS!</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Torn paper visual separation */}
      <TornPaperDivider color="fill-brand-ink" flip={true} />


      {/* Memories of 2025 Gallery Showcase Section */}
      <section className="w-full relative z-10 bg-brand-cloud border-t-4 border-brand-ink text-brand-ink">
        <style dangerouslySetInnerHTML={{ __html: `


          .gl-root {
            width: 100%;
            height: 980px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            background: #F5F1E5;
            perspective: 1200px;
          }

          /* ── ENTER MAGIC CARD ── */
          .gl-card {
            position: relative;
            z-index: 10;
            width: clamp(280px, 82vw, 390px);
            background: #F5F1E5;
            border: 3.5px solid #030404;
            border-radius: 20px;
            padding: 32px 28px;
            text-align: center;
            box-shadow: 12px 12px 0px 0px #030404;
            overflow: visible;
            transform-style: flat;
            will-change: transform;
          }

          /* sliding photo columns */
          .gl-slider-column {
            position: absolute;
            top: -10%;
            width: 145px;
            height: 120%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            gap: 22px;
            z-index: 2;
            pointer-events: none;
            opacity: 0.85;
          }

          .gl-slider-img-container {
            width: 100%;
            height: 195px;
            position: relative;
            border: 3px solid #030404;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 5px 5px 0px 0px #030404;
            background: #030404;
          }

          .gl-slider-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          @keyframes slideUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }

          @keyframes slideDown {
            0% { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }

          .gl-slider-track-up {
            display: flex;
            flex-direction: column;
            gap: 22px;
            animation: slideUp 24s linear infinite;
          }

          .gl-slider-track-down {
            display: flex;
            flex-direction: column;
            gap: 22px;
            animation: slideDown 24s linear infinite;
          }

          @media (max-width: 1200px) {
            .gl-slider-column.inner {
              display: none !important;
            }
          }

          @media (max-width: 768px) {
            .gl-slider-column {
              display: none !important;
            }
          }

          /* Starburst badge */
          .gl-starburst {
            position: absolute;
            width: 72px;
            height: 72px;
            background: #FF9A00;
            border: 2px solid #030404;
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: starSpin 10s linear infinite;
          }
          @keyframes starSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .gl-starburst-text {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-display);
            font-weight: 900;
            font-size: 10px;
            color: #030404;
            letter-spacing: 0.05em;
            text-align: center;
            line-height: 1.1;
            animation: starSpin 10s linear infinite reverse;
          }

          .gl-devanagari {
            font-family: 'Tiro Devanagari Hindi', serif;
            font-size: 1.1rem;
            color: #030404;
            margin-bottom: 6px;
            letter-spacing: 0.05em;
            font-weight: 700;
          }

          .gl-eyebrow {
            font-family: var(--font-display);
            font-size: 0.75rem;
            font-weight: 800;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: #FF188C;
            margin-bottom: 18px;
          }

          .gl-heading {
            font-family: var(--font-display);
            font-size: clamp(2rem, 7vw, 3rem);
            font-weight: 900;
            color: #030404;
            line-height: 1.0;
            letter-spacing: -0.03em;
            margin-bottom: 8px;
            text-transform: uppercase;
          }
          
          .gl-heading-highlight {
            color: #F5F1E5;
            text-shadow: 
              2px 2px 0 #FF188C,
              -2px -2px 0 #FF188C,
              2px -2px 0 #FF188C,
              -2px 2px 0 #FF188C,
              4px 4px 0 #030404;
          }

          .gl-divider {
            width: 50px;
            height: 4px;
            background: #030404;
            border-radius: 99px;
            margin: 18px auto 18px;
          }

          .gl-sub {
            font-family: var(--font-display);
            font-size: 0.8rem;
            font-weight: 600;
            color: #030404;
            letter-spacing: 0.02em;
            line-height: 1.5;
            margin-bottom: 24px;
          }

          /* Begin Experience button */
          .gl-cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-display);
            font-size: 0.85rem;
            font-weight: 900;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #F5F1E5;
            background: #FF188C;
            border: 3.5px solid #030404;
            border-radius: 12px;
            padding: 14px 28px;
            text-decoration: none;
            cursor: pointer;
            box-shadow: 5px 5px 0px 0px #030404;
            transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease;
          }
          .gl-cta:hover {
            transform: translate(-3px, -3px);
            box-shadow: 8px 8px 0px 0px #030404;
            background: #FF9A00;
            color: #030404;
          }
          .gl-cta:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px 0px #030404;
          }

          .gl-corner-tag {
            position: absolute;
            font-family: var(--font-display);
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #030404;
            pointer-events: none;
            z-index: 5;
          }

          .gl-card-topbar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 10px;
            background: #FF9A00;
            border-bottom: 3.5px solid #030404;
          }
        `}} />

        <div className="gl-root">
          {/* Column 1: Left Outer (Slides Up) */}
          <div className="gl-slider-column left" style={{ left: '1.5%' }}>
            <div className="gl-slider-track-up">
              {[...col1Images, ...col1Images].map((src, i) => (
                <div key={`col1-${i}`} className="gl-slider-img-container">
                  <img src={src} className="gl-slider-image" alt="Aarambh" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Left Inner (Slides Down) */}
          <div className="gl-slider-column left inner" style={{ left: '12.5%' }}>
            <div className="gl-slider-track-down">
              {[...col2Images, ...col2Images].map((src, i) => (
                <div key={`col2-${i}`} className="gl-slider-img-container">
                  <img src={src} className="gl-slider-image" alt="Aarambh" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Right Inner (Slides Up) */}
          <div className="gl-slider-column right inner" style={{ right: '12.5%' }}>
            <div className="gl-slider-track-up">
              {[...col3Images, ...col3Images].map((src, i) => (
                <div key={`col3-${i}`} className="gl-slider-img-container">
                  <img src={src} className="gl-slider-image" alt="Aarambh" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Right Outer (Slides Down) */}
          <div className="gl-slider-column right" style={{ right: '1.5%' }}>
            <div className="gl-slider-track-down">
              {[...col4Images, ...col4Images].map((src, i) => (
                <div key={`col4-${i}`} className="gl-slider-img-container">
                  <img src={src} className="gl-slider-image" alt="Aarambh" />
                </div>
              ))}
            </div>
          </div>

          {/* Starburst top-right */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.34,1.56,0.64,1] }}
            style={{ position: 'absolute', top: '20%', right: '23%', zIndex: 15 }}
          >
            <div style={{ position: 'relative', width: 80, height: 80 }}>
              <div className="gl-starburst" />
              <div className="gl-starburst-text">NEW<br/>PICS!</div>
            </div>
          </motion.div>

          {/* Main Content Container */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, padding: '0 20px', textAlign: 'center' }}>
            
            {/* Title Section */}
            {galleryMounted && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  maxWidth: '650px',
                  marginBottom: '32px'
                }}
              >
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 'clamp(2.0rem, 5vw, 3rem)',
                  fontWeight: 800,
                  color: '#FF9A00',
                  marginBottom: '16px',
                  textShadow: '2px 2px 0px #030404',
                  letterSpacing: '-0.02em'
                }}>
                  Memories of 2025
                </h2>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: 600,
                  color: '#030404',
                  lineHeight: 1.6
                }}>
                  Experience the best moments of Aarambh 2025 with our curated memories. From engaging workshops to inspiring guest lectures, relive the magic that made this event unforgettable!
                </p>
              </motion.div>
            )}

            {/* Main Neo-Brutalism Card */}
            {galleryMounted && (
              <motion.div
                className="gl-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
              <div className="gl-card-topbar" />

                {/* Content Container */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                  {/* Devanagari */}
                  <div className="gl-devanagari">आरम्भ '२६</div>

                  {/* Main heading */}
                  <h1 className="gl-heading" style={{ marginBottom: '32px' }}>
                    ENTER THE <br />
                    <span className="gl-heading-highlight">GALLERY</span>
                  </h1>

                  {/* CTA - Navigates to /gallery */}
                  <div style={{ display: 'inline-block', position: 'relative', zIndex: 100, marginTop: '8px' }}>
                    <Link href="/gallery" className="gl-cta">
                      Begin Experience →
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* About Section wrapper */}
      <section className="w-full z-10 bg-brand-ink">
        <AboutSection />
      </section>

      {/* Comic Book Ad Banner Style Newsletter */}
      <section className="py-24 px-6 w-full max-w-5xl pb-32 relative z-10">
        <div className="border-comic bg-brand-orange text-brand-ink shadow-comic-lg bg-halftone-black p-8 sm:p-12 md:p-16 rounded-xl text-center relative overflow-hidden">
          {/* Action starburst backing design */}
          <div className="absolute top-2 left-2 w-16 h-16 border-comic-thin bg-brand-pink text-brand-cloud font-display font-black text-[10px] uppercase tracking-tighter flex items-center justify-center rotate-[-12deg] shadow-comic-sm">
            NEWS!
          </div>

          <span className="relative z-10 px-3 py-1 bg-brand-ink text-brand-cloud font-display text-[10px] font-black uppercase tracking-widest">
            AARAMBH DISPATCH
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase mb-4 tracking-tight mt-6">
            SUBSCRIBE & STAY TUNED!
          </h2>
          <p className="text-brand-ink/80 text-xs sm:text-sm mb-10 max-w-md mx-auto leading-relaxed font-bold uppercase">
            GET THE OFFICIAL BROADCASTS DELIVERED TO YOUR INBOX. ANNOUNCEMENTS, KEYNOTE SCHEDULES, AND VENUE ASSIGNMENTS!
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10">
            <input
              type="email"
              placeholder="ENTER.YOUR.EMAIL@HERE.COM"
              className="bg-brand-cloud border-comic text-brand-ink placeholder:text-brand-ink/40 font-mono text-sm font-bold focus:outline-none focus:bg-white transition-colors flex-grow shadow-inner uppercase tracking-wider p-3 rounded-lg"
              required
              suppressHydrationWarning={true}
            />
            <button
              type="submit"
              className="py-3.5 px-8 bg-brand-ink text-brand-cloud font-display font-black text-xs uppercase tracking-widest rounded-lg comic-interactive border-2 border-brand-cloud shadow-comic-sm"
            >
              SUBSCRIBE NOW
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
