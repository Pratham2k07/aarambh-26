'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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

const SparkleStar = ({ className, size = 32 }: { className?: string; size?: number }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill="currentColor">
    <path d="M50 0 C50 35, 65 50, 100 50 C65 50, 50 65, 50 100 C50 65, 35 50, 0 50 C35 50, 50 35, 50 0 Z" />
  </svg>
);

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

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinates tracking for smooth parallax depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 22 });

  // Parallax drifts for background outlined text / images
  const bgTextX1 = useTransform(springX, [-0.5, 0.5], [60, -60]);
  const bgTextY1 = useTransform(springY, [-0.5, 0.5], [30, -30]);
  
  const bgTextX2 = useTransform(springX, [-0.5, 0.5], [-60, 60]);
  const bgTextY2 = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  // Skateboarder frame 3D drift coordinates
  const logoRotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const logoRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const logoX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const logoY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  // Y2K Sparkle Stars parallax drifts
  const starX1 = useTransform(springX, [-0.5, 0.5], [35, -35]);
  const starY1 = useTransform(springY, [-0.5, 0.5], [25, -25]);
  const starX2 = useTransform(springX, [-0.5, 0.5], [-45, 45]);
  const starY2 = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };


  const [galleryMounted, setGalleryMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [introStarted, setIntroStarted] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(true);

  // Show loading screen animation only on first time visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('aarambh_visited');
    if (!hasVisited) {
      setIntroStarted(true);
      setLoadingComplete(false);
      localStorage.setItem('aarambh_visited', 'true');
    }
  }, []);

  // Generate Mario Animation Arrays for loading screen
  const NUM_SLICES = 5;
  const TOTAL_DURATION = 5.0; // 1.0s per slice
  
  const marioLeft: string[] = ['-10%'];
  const marioLeftTimes: number[] = [0];
  const marioY: number[] = [0];
  const marioYTimes: number[] = [0];
  
  for (let i = 0; i < NUM_SLICES; i++) {
    const hitTimeSec = (i + 1) * 1.0; 
    const hitNorm = hitTimeSec / TOTAL_DURATION; 
    
    marioLeft.push(`${(i * 20) + 10}%`);
    marioLeftTimes.push(hitNorm);
    
    const jumpStart = Math.max(0, hitNorm - 0.05);
    const jumpEnd = Math.min(1, hitNorm + 0.05);
    marioY.push(0, -80, 0);
    marioYTimes.push(jumpStart, hitNorm, jumpEnd);
  }

  // Mario Intro Animation Sequence
  useEffect(() => {
    if (!introStarted || loadingComplete) return;
    
    const timeouts = Array.from({ length: 5 }).map((_, i) => {
      const hitTimeMs = (i + 1) * 1000;
      return setTimeout(() => playSynthSound('bang'), hitTimeMs - 100); 
    });
    
    const completeTimeout = setTimeout(() => {
      setLoadingComplete(true);
    }, TOTAL_DURATION * 1000 + 500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
    };
  }, [introStarted, loadingComplete]);

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
    {
      src: "/images/july_14_21.png",
      alt: "14-21 July Sticker",
      type: "stamp",
      top: "16%",
      right: "6%",
      width: 220,
      height: 220,
      rotate: "6deg",
      floatDelay: 0.7,
    },
    {
      src: "/images/edition_2026.png?v=5",
      alt: "2026 Edition Sticker",
      type: "pow",
      top: "14%",
      left: "5%",
      width: 230,
      height: 230,
      rotate: "-8deg",
      floatDelay: 0,
    },
    {
      src: "/images/first_step.png",
      alt: "First Step Sticker",
      type: "bang",
      bottom: "23%",
      left: "6%",
      width: 240,
      height: 120,
      rotate: "-5deg",
      floatDelay: 1.4,
    },
    {
      src: "/images/next_dimension.png?v=4",
      alt: "Next Dimension Sticker",
      type: "boom",
      bottom: "20%",
      right: "6%",
      width: 260,
      height: 130,
      rotate: "7deg",
      floatDelay: 2.1,
    },
  ];


  const countdownBlocks = [
    { label: 'Days', valueKey: 'days', bg: 'bg-brand-orange text-brand-ink', rotate: '-rotate-2' },
    { label: 'Hours', valueKey: 'hours', bg: 'bg-brand-pink text-brand-cloud', rotate: 'rotate-3' },
    { label: 'Mins', valueKey: 'mins', bg: 'bg-brand-blue text-brand-cloud', rotate: '-rotate-1' },
    { label: 'Secs', valueKey: 'secs', bg: 'bg-brand-cloud text-brand-ink', rotate: 'rotate-2' },
  ];


  return (
    <main className="flex flex-col items-center overflow-x-hidden relative bg-brand-cloud text-brand-ink font-sans">
      {/* Noise/Grain Overlay */}
      <div className="noise-overlay" />

      {/* Full Screen Intro Overlay (Resolves Autoplay Policy) - Removed as per user request */}

      {/* Mario Loading Screen Overlay */}
      <AnimatePresence>
        {introStarted && !loadingComplete && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[90] bg-brand-ink flex flex-col items-center justify-center overflow-hidden"
          >
            <button 
              onClick={() => setLoadingComplete(true)}
              className="absolute top-6 right-6 text-xs font-mono font-bold tracking-widest uppercase bg-brand-ink text-brand-cloud/60 border border-brand-cloud/20 px-4 py-2 rounded hover:text-brand-cloud hover:border-brand-cloud/50 transition-colors z-[100]"
            >
              SKIP INTRO &gt;&gt;
            </button>

            <div className="relative w-full max-w-xl h-56 mt-20 border-b-4 border-brand-orange">
              {/* The Logo SVG Slices (Invisible to Color) */}
              <div className="absolute top-0 w-full flex items-center justify-center pointer-events-none mt-2">
                <div className="relative w-full aspect-[550/120] z-20">
                  {Array.from({ length: 5 }).map((_, sliceIndex) => {
                    const leftPercent = sliceIndex * 20;
                    const rightPercent = 100 - ((sliceIndex + 1) * 20);
                    const hitTime = (sliceIndex + 1) * 1.0;
                    
                    return (
                      <motion.div
                        key={`mario-slice-${sliceIndex}`}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ 
                          opacity: [0, 1, 1], // Appear on hit
                          filter: [
                            "brightness(1.5) contrast(1.2)", // Flash bright color on impact
                            "brightness(1) contrast(1)", // Settle to original colors
                            "brightness(1) contrast(1)"
                          ],
                          y: [0, -15, 0] // Bump up slightly when hit
                        }}
                        transition={{ 
                          delay: hitTime, 
                          duration: 0.4, 
                          times: [0, 0.3, 1] 
                        }}
                        className="absolute inset-0 w-full h-full"
                        style={{ 
                          clipPath: `inset(0% ${rightPercent}% 0% ${leftPercent}%)`,
                          WebkitClipPath: `inset(0% ${rightPercent}% 0% ${leftPercent}%)`
                        }}
                      >
                        <Image
                          src="/aarambh_logo_extruded.png"
                          alt="AARAMBH"
                          fill
                          className="object-contain"
                          priority
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Mario Sprite */}
              <motion.div 
                animate={{ left: marioLeft }}
                transition={{ left: { duration: TOTAL_DURATION, times: marioLeftTimes, ease: "linear" } }}
                className="absolute bottom-0 w-8 h-10"
              >
                <motion.div
                   animate={{ y: marioY }}
                   transition={{ y: { duration: TOTAL_DURATION, times: marioYTimes, ease: "easeOut" } }}
                   className="relative w-full h-full"
                >
                  {/* Hat */}
                  <div className="absolute top-0 left-[4px] w-[20px] h-[6px] bg-brand-orange" />
                  {/* Face */}
                  <div className="absolute top-[6px] left-[8px] w-[16px] h-[10px] bg-[#fcdbb6]" />
                  {/* Mustache/Eye */}
                  <div className="absolute top-[8px] left-[18px] w-[8px] h-[4px] bg-brand-ink" />
                  {/* Body */}
                  <div className="absolute top-[16px] left-[6px] w-[16px] h-[10px] bg-brand-orange" />
                  {/* Overalls */}
                  <div className="absolute top-[20px] left-[8px] w-[12px] h-[8px] bg-brand-blue" />
                  {/* Legs */}
                  <div className="absolute top-[28px] left-[8px] w-[6px] h-[8px] bg-brand-blue" />
                  <div className="absolute top-[28px] left-[14px] w-[6px] h-[8px] bg-brand-blue" />
                  {/* Shoes */}
                  <div className="absolute top-[36px] left-[8px] w-[8px] h-[4px] bg-brand-ink" />
                  <div className="absolute top-[36px] left-[16px] w-[8px] h-[4px] bg-brand-ink" />
                </motion.div>
              </motion.div>
            </div>
            <h3 className="font-display font-black text-brand-pink text-xl mt-12 animate-pulse uppercase">LOADING...</h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particle Overlay for click explosions */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: p.x - p.size / 2, y: p.y - p.size / 2, scale: 1, opacity: 1, rotate: 0 }}
              animate={{
                x: p.x - p.size / 2 + Math.cos(p.angle) * p.distance,
                y: p.y - p.size / 2 + Math.sin(p.angle) * p.distance,
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
      <section 
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-brand-cloud text-brand-ink selection:bg-brand-pink selection:text-brand-cloud p-4 md:p-8"
      >
        {/* Noise overlay and grid ticks */}
        <div className="absolute inset-0 bg-halftone-black opacity-[0.03] pointer-events-none z-0" />


        {/* Full-bleed Translucent Fluid Alcohol Ink Background with mouse warp distortion */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <div
            className="absolute inset-0 w-full h-full"
          >
            <motion.div
              animate={{
                y: [0, -35, 25, -25, 15, -15, 0],
                x: [0, 20, -20, 15, -15, 8, 0],
                skewX: [0, 4, -4, 2.5, -2.5, 1.2, 0],
                skewY: [0, 2, -2, 1.2, -1.2, 0.6, 0],
                scale: [1.02, 1.08, 1.01, 1.06, 1.02],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src="/images/translucent_fluid_ink.png"
                alt="Translucent Fluid Alcohol Ink background"
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-100 sm:opacity-65 scale-[1.08] filter saturate-[1.8] brightness-[0.97] contrast-[1.05] sm:saturate-100 sm:brightness-[1.01] sm:contrast-[0.99]"
              />
            </motion.div>
          </div>
          {/* Subtle radial gradient overlay to ensure central text readability & keep margins textured */}
          <div className="absolute inset-0 hidden sm:block bg-[radial-gradient(circle_at_center,rgba(245,241,229,0.75)_0%,rgba(245,241,229,0.1)_100%)] pointer-events-none" />
        </div>

        {/* Floating abstract Y2K Sparkle Stars (Drifts dynamically with cursor) */}
        <div className="absolute inset-0 pointer-events-none z-20 hidden md:block select-none">
          {/* Star 1: Bold Pink */}
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.12, 1] }}
            transition={{ rotate: { repeat: Infinity, duration: 25, ease: "linear" }, scale: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
            className="absolute top-[20%] left-[28%] text-brand-pink/70"
          >
            <SparkleStar size={36} />
          </motion.div>

          {/* Star 2: Electric Blue */}
          <motion.div
            animate={{ rotate: [360, 0], scale: [1, 1.15, 1] }}
            transition={{ rotate: { repeat: Infinity, duration: 20, ease: "linear" }, scale: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
            className="absolute bottom-[28%] right-[32%] text-brand-blue"
          >
            <SparkleStar size={48} />
          </motion.div>
        </div>

        {/* Draggable Pop-Art Stickers with synthesized audio triggers */}
        <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
          {stickers.map((sticker, idx) => (
            <motion.div
              key={idx}
              drag
              dragConstraints={{ left: -300, right: 300, top: -150, bottom: 150 }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 25 }}
              initial={{
                filter: "drop-shadow(3px 12px 18px rgba(3, 4, 4, 0.15)) drop-shadow(1px 4px 6px rgba(3, 4, 4, 0.08))"
              }}
              animate={{
                y: [0, -6, 0],
                rotate: [sticker.rotate, (parseFloat(sticker.rotate) + 1.5) + "deg", sticker.rotate],
              }}
              transition={{
                y: {
                  duration: 4.5 + idx * 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: sticker.floatDelay,
                },
                rotate: {
                  duration: 5.5 + idx * 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: sticker.floatDelay,
                }
              }}
              whileHover={{
                scale: 1.05,
                y: -12,
                zIndex: 50,
                filter: "drop-shadow(8px 24px 32px rgba(3, 4, 4, 0.22)) drop-shadow(2px 8px 12px rgba(3, 4, 4, 0.12))",
                transition: { type: "spring", stiffness: 300, damping: 15 }
              }}
              whileDrag={{
                scale: 1.1,
                zIndex: 100,
                filter: "drop-shadow(12px 36px 48px rgba(3, 4, 4, 0.26)) drop-shadow(4px 12px 18px rgba(3, 4, 4, 0.15))"
              }}
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
              }}
              className="absolute pointer-events-auto cursor-grab select-none"
            >
              <div 
                className="relative overflow-hidden rounded-xl" 
                style={{ width: sticker.width, height: sticker.height }}
              >
                <Image
                  src={sticker.src}
                  alt={sticker.alt}
                  fill
                  className="object-contain"
                  priority
                />
                {/* Premium Paper Grain overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Container */}
        <div className="w-full flex-grow flex flex-col items-center justify-center z-20 py-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl flex flex-col items-center px-4 w-full"
          >

          <div className="mb-6 sm:mb-8 select-none p-2 sm:p-3 max-w-full text-center flex justify-center w-full">
            {/* Centered Primary Logo */}
            <div className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl group z-20 perspective-[1500px]">
              {/* Base logo container (no card background, border, or drop shadow) */}
              <div className="relative z-10 w-full flex items-center justify-center perspective-[1500px] transform-style-3d min-h-[100px] sm:min-h-[200px] md:min-h-[260px]">
                {loadingComplete && (
                  <>
                    {/* Logo Container Fill Animation */}
                    <div className="relative w-full aspect-[550/120] z-20 pointer-events-none flex items-center justify-center">
                      
                      {/* Empty Container Logo (Outline version) */}
                      <Image 
                         src="/aarambh_logo_outline.png" 
                         alt="" 
                         fill 
                         className="object-contain" 
                         priority
                      />
                      
                      <motion.div
                        initial={{ clipPath: 'circle(0% at 50% 50%)', WebkitClipPath: 'circle(0% at 50% 50%)' } as any}
                        animate={{ clipPath: 'circle(150% at 50% 50%)', WebkitClipPath: 'circle(150% at 50% 50%)' } as any}
                        transition={{ duration: 4.0, ease: "easeInOut", delay: 0.5 }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image 
                           src="/aarambh_logo_extruded.png" 
                           alt="AARAMBH'26" 
                           fill 
                           className="object-contain" 
                           priority 
                           loading="eager" 
                        />
                      </motion.div>
                      
                      {/* Final Pop & Glow */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1] }}
                        transition={{ delay: 4.5, duration: 0.6 }}
                        className="absolute inset-0 bg-brand-pink blur-[30px] mix-blend-screen pointer-events-none"
                      />
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1.5] }}
                        transition={{ delay: 4.5, duration: 0.8 }}
                        className="absolute top-0 -right-2 text-brand-orange z-30"
                      >
                        <Sparkles size={40} />
                      </motion.div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Narrative Dialogue Box */}
          <div className="border-comic bg-brand-ink text-brand-cloud p-4 sm:p-6 rounded-xl max-w-4xl w-[95%] sm:w-full shadow-comic rotate-1 bg-halftone-cloud mb-10 mx-auto">
            <p className="font-display font-black text-sm sm:text-base leading-relaxed tracking-wide uppercase text-center">
              <span className="text-brand-pink text-lg">AARAMBH &mdash; THE BEGINNING OF SOMETHING GREATER. </span>
              Where strangers become friends and dreams find direction.
              <span className="text-brand-orange"> This is not just an induction&mdash;this is your first step toward the future.</span>
            </p>
          </div>

          {/* Countdown Clock Panel */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-12 w-full max-w-md text-brand-cloud px-2 sm:px-0">
            {countdownBlocks.map((block) => (
              <div
                key={block.label}
                className={`p-2 sm:p-4 border-comic rounded-lg shadow-comic-sm sm:shadow-comic ${block.bg} ${block.rotate} transition-transform hover:scale-105`}
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
      </div>


    </section>

      {/* Torn paper visual separation */}
      <TornPaperDivider color="fill-brand-ink" />



      {/* Torn paper visual separation */}
      <TornPaperDivider color="fill-brand-ink" flip={true} />


      {/* About Section wrapper */}
      <section className="w-full z-10 bg-brand-ink">
        <AboutSection />
      </section>
      {/* Memories of 2025 Gallery Showcase Section */}
      <section className="w-full relative z-10 bg-brand-cloud border-t-4 border-brand-ink text-brand-ink">
        <style dangerouslySetInnerHTML={{
          __html: `


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
              display: flex !important;
              flex-direction: row !important;
              width: 250% !important;
              height: 105px !important;
              left: -75% !important;
              right: auto !important;
              top: auto !important;
              gap: 12px !important;
              opacity: 0.7 !important;
            }
            
            /* Position columns as horizontal rows */
            .gl-slider-column.left:not(.inner) {
              top: 4% !important;
            }
            .gl-slider-column.left.inner {
              display: flex !important;
              top: 17% !important;
            }
            .gl-slider-column.right.inner {
              display: flex !important;
              bottom: 17% !important;
            }
            .gl-slider-column.right:not(.inner) {
              bottom: 4% !important;
            }

            .gl-slider-img-container {
              width: 140px !important;
              height: 95px !important;
              box-shrink: 0 !important;
              flex-shrink: 0 !important;
              box-shadow: 3px 3px 0px 0px #030404 !important;
            }

            .gl-slider-track-up {
              display: flex !important;
              flex-direction: row !important;
              gap: 12px !important;
              animation: slideLeft 22s linear infinite !important;
            }

            .gl-slider-track-down {
              display: flex !important;
              flex-direction: row !important;
              gap: 12px !important;
              animation: slideRight 22s linear infinite !important;
            }
          }

          @keyframes slideLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes slideRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
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
                  Experience the best moments of Aarambh 2025 with our curated memories.
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

      {/* Static Registration Section */}
      <section className="py-24 px-6 w-full max-w-5xl pb-32 relative z-10 mx-auto">
        <div className="border-comic bg-brand-orange text-brand-ink shadow-comic-lg bg-halftone-black p-8 sm:p-12 md:p-16 rounded-xl text-center relative overflow-hidden">
          {/* Action starburst backing design */}
          <div className="absolute top-2 left-2 w-16 h-16 border-comic-thin bg-brand-pink text-brand-cloud font-display font-black text-[10px] uppercase tracking-tighter flex items-center justify-center rotate-[-12deg] shadow-comic-sm">
            REG
          </div>

          <span className="relative z-10 px-3 py-1 bg-brand-ink text-brand-cloud font-display text-[10px] font-black uppercase tracking-widest rounded-md">
            OFFICIAL REGISTRATION GATEWAY
          </span>

          <h2 className="text-3xl md:text-5xl font-display font-black uppercase mb-4 tracking-tight mt-6">
            COMPLETE YOUR REGISTRATION!
          </h2>
          <p className="text-brand-ink/80 text-xs sm:text-sm mb-10 max-w-md mx-auto leading-relaxed font-bold uppercase">
            COMPLETE YOUR ONLINE REGISTRATION AND SECURE YOUR SEAT FOR AARAMBH &apos;26. FULL ENROLLMENT GRANTS ACCESS TO ALL KEYNOTES, HANDS-ON WORKSHOPS & FESTIVAL ACTIVITIES!
          </p>
          <div className="flex justify-center relative z-10">
            <Link href="/register">
              <motion.button 
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="comic-interactive border-comic py-4 px-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all font-display font-black text-lg uppercase tracking-wider text-brand-ink bg-brand-pink text-brand-cloud rounded-lg cursor-pointer"
              >
                REGISTER ONLINE NOW →
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
