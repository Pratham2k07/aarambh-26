'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Lock, Unlock, Sparkles, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import AboutSection from '@/components/about';

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [hasRegistered, setHasRegistered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const bgVideoRef = React.useRef<HTMLVideoElement>(null);

  const handleVolumeToggle = () => {
    if (bgVideoRef.current) {
      const newMuted = !bgVideoRef.current.muted;
      bgVideoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('bg-video-mute-change', { detail: { isMuted: newMuted } });
        window.dispatchEvent(event);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const regStatus = localStorage.getItem('aarambh_registered');
      if (regStatus === 'true') setHasRegistered(true);
    }

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
    return () => clearInterval(interval);
  }, []);

  // Listen for audio toggle commands from the Navbar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleToggleCommand = () => {
        handleVolumeToggle();
      };
      window.addEventListener('toggle-bg-video-mute', handleToggleCommand);

      // Initial synchronization on mount
      setTimeout(() => {
        const syncEvent = new CustomEvent('bg-video-mute-change', { detail: { isMuted: bgVideoRef.current?.muted ?? true } });
        window.dispatchEvent(syncEvent);
      }, 500);

      return () => {
        window.removeEventListener('toggle-bg-video-mute', handleToggleCommand);
      };
    }
  }, []);

  return (
    <main className="flex flex-col items-center overflow-x-hidden">
      {/* Hero */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-28 px-4 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-[-1] overflow-hidden pointer-events-none bg-brand-ink">
          <video
            ref={bgVideoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onPlay={() => setIsVideoLoaded(true)}
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-cover scale-100 will-change-transform transition-opacity duration-1000 ease-out"
            style={{ 
              filter: 'brightness(0.78)', 
              transform: 'translate3d(0, 0, 0)',
              opacity: isVideoLoaded ? 1 : 0,
              imageRendering: '-webkit-optimize-contrast'
            }}
          >
            <source src="/teaser.mp4" type="video/mp4" />
          </video>
          {/* Cinematic Dark Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ background: 'rgba(0, 0, 0, 0.35)' }} 
          />
          {/* Subtle gradient overlay at bottom for depth */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-ink to-transparent pointer-events-none" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10 text-center max-w-4xl flex flex-col items-center"
        >
          <span className="page-eyebrow !flex items-center justify-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            University of Excellence Presents
            <Sparkles size={14} className="text-brand-orange shrink-0 ml-1" />
          </span>

          <Image
            src="/logo.svg"
            alt="AARAMBH'26"
            width={520}
            height={120}
            className="w-full max-w-md md:max-w-xl h-auto mb-8 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
            priority
            loading="eager"
          />

          <p className="page-subtitle mx-auto mb-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium text-brand-cloud">
            The ultimate convergence of technology, culture, and innovation. Three days of energy,
            boldness, and limitless possibilities.
          </p>

          <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-12 w-full max-w-lg">
            {(['Days', 'Hours', 'Mins', 'Secs'] as const).map((label) => (
              <Card
                key={label}
                className="p-4 sm:p-5 flex flex-col items-center border-brand-pink/20 bg-brand-pink/5"
              >
                <div className="relative h-8 sm:h-10 overflow-hidden flex items-center justify-center w-full">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={timeLeft[label.toLowerCase() as keyof TimeLeft]}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl sm:text-4xl font-display font-extrabold text-brand-cloud tabular-nums absolute"
                    >
                      {String(timeLeft[label.toLowerCase() as keyof TimeLeft]).padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[10px] sm:text-xs text-brand-cloud/50 uppercase tracking-widest mt-1">
                  {label}
                </span>
              </Card>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {!hasRegistered ? (
              <Link href="/register">
                <Button variant="accent" className="flex items-center gap-2 text-base px-8">
                  Register Now <ArrowRight size={20} />
                </Button>
              </Link>
            ) : (
              <div className="bg-brand-blue/20 text-brand-cloud border border-brand-blue/40 px-6 py-3 rounded-md font-bold flex items-center gap-2">
                <ShieldCheck size={20} className="text-brand-orange" /> You are Registered!
              </div>
            )}

            <Button
              variant="glass"
              className="flex items-center gap-2 text-base px-8 border border-brand-pink/30 hover:border-brand-pink transition-all bg-brand-ink/40 backdrop-blur-sm shadow-md"
              onClick={handleVolumeToggle}
            >
              {isMuted ? <VolumeX size={20} className="text-brand-pink animate-pulse" /> : <Volume2 size={20} className="text-brand-orange animate-bounce" />}
              <span>{isMuted ? "Unmute Video" : "Mute Sound"}</span>
            </Button>
          </div>
        </motion.div>


        {/* Credit */}
        <div className="absolute bottom-6 right-8 z-20 px-3.5 py-1.5 rounded-full bg-brand-ink/75 border border-brand-pink/35 text-[10px] sm:text-xs text-brand-cloud font-semibold tracking-widest uppercase select-none pointer-events-none shadow-lg backdrop-blur-sm">
          Credit: Vaibhav Khandelwal
        </div>
      </section>

      {/* Brand strip */}
      <section className="w-full py-6 border-y border-brand-cloud/10 bg-brand-cloud/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          {[
            { label: 'Energy', color: 'text-brand-orange' },
            { label: 'Boldness', color: 'text-brand-pink' },
            { label: 'Possibility', color: 'text-brand-blue' },
          ].map((item) => (
            <span key={item.label} className={`font-display font-bold text-lg uppercase tracking-widest ${item.color}`}>
              {item.label}
            </span>
          ))}
        </div>
      </section>

      <AboutSection />

      {/* Exclusive content */}
      <section className="py-24 px-4 w-full max-w-7xl">
        <div className="text-center mb-14">
          <h2 className="section-heading flex items-center justify-center gap-3">
            {hasRegistered ? (
              <Unlock className="text-brand-orange" size={32} />
            ) : (
              <Lock className="text-brand-cloud/40" size={32} />
            )}
            Exclusive Student Content
          </h2>
        </div>

        {!hasRegistered ? (
          <Card className="p-12 text-center flex flex-col items-center border-dashed border-brand-pink/30 bg-brand-pink/5">
            <Lock size={56} className="text-brand-pink/50 mb-6" />
            <h3 className="text-2xl font-display font-bold text-brand-cloud mb-4">Content Locked</h3>
            <p className="text-brand-cloud/50 max-w-md">
              Register for AARAMBH&apos;26 to unlock exclusive schedules, speaker details, and community access.
            </p>
            <Link href="/register" className="mt-8">
              <Button variant="accent">Register to Unlock</Button>
            </Link>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <Card className="p-8 border-brand-blue/30 bg-brand-blue/10">
              <h3 className="text-2xl font-display font-bold text-brand-cloud mb-4">Student Community</h3>
              <p className="text-brand-cloud/60 mb-6">
                Join your cohort&apos;s WhatsApp and Discord groups to start networking!
              </p>
              <Button variant="secondary" className="w-full">
                Join Discord Server
              </Button>
            </Card>
            <Card className="p-8 border-brand-orange/30 bg-brand-orange/10">
              <h3 className="text-2xl font-display font-bold text-brand-cloud mb-4">Event Schedule</h3>
              <p className="text-brand-cloud/60 mb-6">
                View your personalized itinerary based on your cohort assignment.
              </p>
              <Link href="/schedule">
                <Button variant="accent" className="w-full">
                  View Full Schedule
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 w-full max-w-5xl pb-32">
        <Card className="p-10 md:p-14 text-center relative overflow-hidden border-brand-blue/20">
          <div className="hero-glow w-64 h-64 bg-brand-pink/20 -mr-32 -mt-32 top-0 right-0" />
          <span className="page-eyebrow relative z-10">Stay Updated</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 relative z-10 text-brand-cloud">
            Don&apos;t Miss Any Update
          </h2>
          <p className="text-brand-cloud/60 mb-10 relative z-10 max-w-lg mx-auto">
            Subscribe for real-time alerts about registrations, speaker announcements, and event highlights.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-grow py-3"
              required
              suppressHydrationWarning
            />
            <Button variant="primary" className="py-3 px-8 shrink-0">
              Subscribe
            </Button>
          </form>
        </Card>
      </section>
    </main>
  );
}


