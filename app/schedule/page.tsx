'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Download } from 'lucide-react';
import { SCHEDULE_DATA, DaySchedule, ScheduleItem } from '@/constants/events';

const dayColors = [
  'border-brand-orange hover:shadow-solid-orange',
  'border-brand-pink hover:shadow-solid-pink',
  'border-brand-blue hover:shadow-solid-blue',
];

const accentBgs = ['bg-brand-orange', 'bg-brand-pink', 'bg-brand-blue'];

export default function SchedulePage() {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const activeDay = SCHEDULE_DATA[activeDayIdx];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === 'undefined') return;
    const { clientX, clientY } = e;
    // Calculate distance from center of screen in a normalized range
    const x = (clientX - window.innerWidth / 2) / 25;
    const y = (clientY - window.innerHeight / 2) / 25;
    setMousePos({ x, y });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="bg-brand-cloud text-brand-ink min-h-screen relative overflow-hidden transition-colors duration-300"
    >
      {/* Halftone dot pattern background */}
      <div className="absolute inset-0 bg-halftone-black opacity-[0.08] pointer-events-none z-0" />
      
      {/* Retro sketchbook grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(3,4,4,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(3,4,4,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Dynamic Ambient Gradient Spotlights (Rich Color Depths) */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full bg-brand-pink/15 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[550px] h-[550px] rounded-full bg-brand-orange/15 blur-[145px] pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[-100px] w-[400px] h-[400px] rounded-full bg-brand-blue/10 blur-[110px] pointer-events-none z-0" />

      {/* Floating Dynamic Comic Props */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        {/* Floating Star 1 - Top Left */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -5, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          style={{
            x: mousePos.x * -1.2,
            y: mousePos.y * -1.2,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[10%] left-[5%] text-brand-pink/25 text-6xl hidden md:block"
        >
          ★
        </motion.div>

        {/* Floating Star 2 - Bottom Right */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -15, 10, 0],
            scale: [1, 0.95, 1.08, 1],
          }}
          style={{
            x: mousePos.x * 1.5,
            y: mousePos.y * 1.5,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[15%] right-[8%] text-brand-orange/25 text-8xl hidden md:block"
        >
          ★
        </motion.div>

        {/* Floating Starburst Shape - Top Right */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 360],
          }}
          style={{
            x: mousePos.x * -0.8,
            y: mousePos.y * -0.8,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[15%] right-[10%] w-16 h-16 border-4 border-brand-blue/20 bg-brand-blue/8 comic-starburst hidden md:block"
        />

        {/* Floating Circle Badge - Bottom Left */}
        <motion.div
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
            scale: [1, 1.03, 0.97, 1],
          }}
          style={{
            x: mousePos.x * 2.0,
            y: mousePos.y * 2.0,
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-[20%] left-[8%] w-12 h-12 rounded-full border-4 border-brand-pink/20 bg-brand-pink/8 flex items-center justify-center font-display font-black text-brand-pink/25 text-lg hidden md:block"
        >
          !
        </motion.div>

        {/* Floating Lightning Bolt ⚡ - Middle Right */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          style={{
            x: mousePos.x * -1.5,
            y: mousePos.y * -1.5,
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute top-[45%] right-[6%] text-brand-orange/20 text-7xl font-black hidden md:block"
        >
          ⚡
        </motion.div>

        {/* Floating Cross ✕ - Middle Left */}
        <motion.div
          animate={{
            y: [0, 22, 0],
            rotate: [0, -25, 25, 0],
          }}
          style={{
            x: mousePos.x * 1.8,
            y: mousePos.y * 1.8,
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.2,
          }}
          className="absolute top-[55%] left-[6%] text-brand-blue/20 text-6xl font-black hidden md:block"
        >
          ✕
        </motion.div>

        {/* Dynamic Graphic Lines crossing the edges */}
        <div className="absolute top-0 left-1/4 w-[1px] h-32 bg-brand-ink/5 hidden lg:block" />
        <div className="absolute bottom-0 right-1/4 w-[1px] h-48 bg-brand-ink/5 hidden lg:block" />
      </div>

      <div className="py-28 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen overflow-hidden relative z-10">

      {/* Retro comic header panel */}
      <header className="text-center mb-12 relative z-10 flex flex-col items-center gap-6">
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase leading-none tracking-tighter text-brand-ink text-center drop-shadow-[4px_4px_0px_#FF188C]">
          AARAMBH SCHEDULE
        </h1>
        <a
          href="/schedule.pdf"
          download
          className="inline-flex items-center gap-2.5 border-comic bg-brand-ink text-brand-cloud px-5 py-2.5 font-display text-sm font-black uppercase tracking-wider shadow-comic hover:bg-brand-orange hover:text-brand-ink transition-colors active:scale-[0.98]"
        >
          <Download size={16} />
          DOWNLOAD SCHEDULE
        </a>
      </header>

      {/* Horizontal Scrollable Neo-Brutalist Tabs */}
      <div className="relative z-20 mb-12 w-full">
        <div className="grid grid-cols-4 gap-2.5 px-1 py-4 md:flex md:overflow-x-auto md:gap-4 md:py-5 md:px-4 md:justify-center scrollbar-thin scrollbar-thumb-brand-pink scrollbar-track-brand-cloud">
          {SCHEDULE_DATA.map((day, idx) => {
            const isActive = activeDayIdx === idx;
            const rotation = idx % 2 === 0 ? 'rotate-1' : '-rotate-1';
            
            return (
              <button
                key={day.day}
                onClick={() => setActiveDayIdx(idx)}
                className={`comic-interactive border-comic-thin px-1 py-2 md:px-5 md:py-3 rounded-lg font-display shrink-0 transition-all select-none ${
                  isActive
                    ? 'bg-brand-pink text-brand-cloud shadow-solid-ink scale-105 -rotate-2 font-black'
                    : 'bg-white text-brand-ink shadow-comic-sm hover:bg-brand-orange hover:text-brand-ink font-bold ' + rotation
                }`}
              >
                <div className="text-xs md:text-sm tracking-tighter">{day.day}</div>
                <div className="text-[9px] md:text-xs uppercase opacity-85 mt-0.5 tracking-wider font-mono">{day.date}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Itinerary Timeline */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDayIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {activeDay.events.map((event, idx) => {
              const accentColor = accentBgs[idx % 3];
              
              // Special Layout for All Day Outing (Day 5)
              if (event.time.toLowerCase() === 'all day') {
                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    key={idx}
                    className="border-comic bg-brand-orange text-brand-ink p-8 sm:p-12 rounded-xl shadow-comic text-center relative overflow-hidden my-8"
                  >
                    <div className="absolute top-3 right-3 text-[10px] font-mono font-black text-brand-ink/50 bg-brand-pink/15 px-2 py-0.5 border-comic-thin rounded rotate-3">
                      LEVEL 5 • COHORT EXCURSION
                    </div>
                    
                    <div className="relative p-6 mb-6 bg-brand-pink border-comic shadow-comic-sm rounded-lg text-brand-cloud inline-block rotate-[-3deg]">
                      <Compass size={48} className="animate-spin-slow" />
                    </div>

                    <h3 className="font-display text-4xl sm:text-5xl font-black mb-4 uppercase tracking-tighter">
                      {event.title}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 bg-brand-ink text-brand-cloud px-4 py-1.5 rounded-lg border-2 border-brand-cloud font-display text-sm font-black uppercase shadow-comic-sm rotate-1">
                      <MapPin size={16} className="text-brand-orange" /> {event.location}
                    </div>
                    <p className="text-brand-ink/80 text-xs sm:text-sm mt-8 max-w-md mx-auto leading-relaxed font-bold uppercase">
                      WHOOSH! AN ENTIRE DAY DEDICATED TO OUTDOOR ADVENTURES, TEAM BUILDING, AND EXPLORING OFF-CAMPUS WONDERS WITH THE REST OF THE FRESHERS!
                    </p>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.4) }}
                  key={idx}
                  className="border-comic p-5 rounded-xl transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start sm:items-center bg-white text-brand-ink shadow-comic hover:-translate-y-0.5 cursor-pointer"
                >
                  {/* Time Badge */}
                  <div
                    className={`border-2 border-brand-ink px-4 py-2 font-display font-black text-xs shadow-comic-sm shrink-0 w-full sm:w-48 text-center rounded-md whitespace-nowrap ${accentColor} text-brand-ink ${idx % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
                  >
                    <div className="flex items-center justify-center whitespace-nowrap">
                      <span className="tracking-wide uppercase font-mono whitespace-nowrap">{event.time}</span>
                    </div>
                  </div>

                  {/* Event details */}
                  <div className="flex gap-4 items-center flex-grow">
                    <div className="space-y-1.5">
                      <h3 className="font-display text-lg sm:text-xl font-black uppercase leading-tight tracking-tight text-brand-ink hover:text-brand-pink transition-colors">
                        {event.title}
                      </h3>
                      {event.location && (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider border-2 border-brand-ink bg-brand-cloud text-brand-ink shadow-[2px_2px_0px_0px_#030404]">
                          <MapPin size={10} className="text-brand-ink" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Footer Section */}
      <section className="mt-20 text-center relative z-10">
        <div className="border-comic bg-brand-ink text-brand-cloud max-w-2xl mx-auto p-6 rounded-xl shadow-comic -rotate-1 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="/schedule.pdf"
            download
            className="inline-flex items-center gap-2 border-2 border-brand-cloud bg-brand-orange text-brand-ink px-5 py-2.5 font-display text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#F5F1E5] hover:scale-[1.03] transition-transform active:scale-[0.98]"
          >
            <Download size={14} />
            DOWNLOAD SCHEDULE
          </a>
          <a
            href="https://drive.google.com/file/d/1ZYlhBmtHS6bgUEg6MdhIxg4ipDRmEkpj/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-brand-cloud bg-brand-cloud text-brand-ink px-5 py-2.5 font-display text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_#F5F1E5] hover:scale-[1.03] transition-transform active:scale-[0.98]"
          >
            <Download size={14} />
            DOWNLOAD RULES BOOK
          </a>
        </div>
      </section>
    </div>
    </div>
  );
}
