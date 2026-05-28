'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Crown, 
  GraduationCap, 
  Award, 
  Users, 
  ChevronDown 
} from 'lucide-react';
import { TEAM_DATA, TeamMember } from '@/constants/team';
import ChromaGrid, { ChromaItem } from '@/components/ui/ChromaGrid';
import Image from 'next/image';
import DoodleBg from '@/components/ui/DoodleBg';

interface SectionHeadingProps {
  label: string;
  sub?: string;
  accent?: string;
}

function SectionHeading({ label, sub, accent }: SectionHeadingProps) {
  return (
    <div className="text-center mb-10 relative z-10 flex flex-col items-center">
      {sub && (
        <span 
          className="inline-block text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] px-2.5 sm:px-3.5 py-1 sm:py-1.5 border-comic text-brand-cloud rotate-[-2deg] shadow-comic-sm mb-4"
          style={{ backgroundColor: accent || '#FF188C' }}
        >
          {sub}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-ink uppercase leading-none tracking-tight">
        {label}
      </h2>
    </div>
  );
}

export default function TeamPage() {
  // Helper to map member to chroma item
  const mapMemberToChromaItem = (member: TeamMember, type: 'vc' | 'osa' | 'orgHead' | 'tl'): ChromaItem => {
    let borderColor = '#F5F1E5'; // default brand.white/cloud
    let gradient = 'linear-gradient(145deg, rgba(245, 241, 229, 0.05), rgba(3, 4, 4, 0.95))';

    if (type === 'vc') {
      borderColor = '#FF9A00'; // brand.orange
      gradient = 'linear-gradient(145deg, rgba(255, 154, 0, 0.15), rgba(3, 4, 4, 0.98))';
    } else if (type === 'osa') {
      borderColor = '#FF9A00'; // Match VC brand.orange color scheme
      gradient = 'linear-gradient(145deg, rgba(255, 154, 0, 0.15), rgba(3, 4, 4, 0.98))';
    } else if (type === 'orgHead') {
      borderColor = '#FF188C'; // brand.pink
      gradient = 'linear-gradient(145deg, rgba(255, 24, 140, 0.15), rgba(3, 4, 4, 0.98))';
    } else if (type === 'tl') {
      const dept = member.department?.toLowerCase() || '';
      if (dept.includes('tech')) {
        borderColor = '#FF9A00'; // brand.orange
        gradient = 'linear-gradient(145deg, rgba(255, 154, 0, 0.1), rgba(3, 4, 4, 0.95))';
      } else if (dept.includes('sponsorship') || dept.includes('finance')) {
        borderColor = '#10B981'; // emerald green
        gradient = 'linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(3, 4, 4, 0.95))';
      } else if (dept.includes('media') || dept.includes('design')) {
        borderColor = '#FF188C'; // brand.pink
        gradient = 'linear-gradient(145deg, rgba(255, 24, 140, 0.1), rgba(3, 4, 4, 0.95))';
      } else if (dept.includes('hospitality')) {
        borderColor = '#8B5CF6'; // purple
        gradient = 'linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(3, 4, 4, 0.95))';
      } else {
        borderColor = '#0D21DD'; // brand.blue
        gradient = 'linear-gradient(145deg, rgba(13, 33, 221, 0.1), rgba(3, 4, 4, 0.95))';
      }
    }

    return {
      image: member.photo || undefined,
      title: member.name,
      subtitle: type === 'tl' ? '' : member.designation,
      handle: member.socials?.linkedin ? '@' + member.name.toLowerCase().replace(/\s+/g, '') : undefined,
      location: member.department,
      borderColor,
      gradient,
      url: member.socials?.linkedin || (member.socials?.email ? `mailto:${member.socials.email}` : undefined),
      socials: member.socials
    };
  };

  const topRowItems = useMemo(() => [
    { ...mapMemberToChromaItem(TEAM_DATA.vc, 'vc'), socials: undefined },
    { ...mapMemberToChromaItem(TEAM_DATA.osa[0], 'osa'), socials: undefined } // Deepak Sogani
  ], []);

  const bottomRowItems = useMemo(() => TEAM_DATA.osa.slice(1).map(m => mapMemberToChromaItem(m, 'osa')), []); // Anushka, Vaibhav, Gajendra, Rajesh

  // Group team leaders into committees and cluster heads
  const groupedTeamLeaders = useMemo(() => {
    const groups: { heading: string; items: TeamMember[] }[] = [
      { heading: "Cluster Heads", items: [] },
      { heading: "Technical", items: [] },
      { heading: "Design", items: [] },
      { heading: "Photography", items: [] },
      { heading: "Media", items: [] },
      { heading: "Social Media", items: [] },
      { heading: "Food & Accommodation", items: [] },
      { heading: "Discipline", items: [] },
      { heading: "Internal Arrangements", items: [] },
      { heading: "Feedback & Registration", items: [] },
    ];

    TEAM_DATA.teamLeaders.forEach(member => {
      const dept = member.department || "";
      if (dept === "Cluster Head") {
        groups[0].items.push(member);
      } else if (dept === "Technical") {
        groups[1].items.push(member);
      } else if (dept === "Design") {
        groups[2].items.push(member);
      } else if (dept === "Photography") {
        groups[3].items.push(member);
      } else if (dept === "Media") {
        groups[4].items.push(member);
      } else if (dept === "Social Media") {
        groups[5].items.push(member);
      } else if (dept === "Food & Accommodation") {
        groups[6].items.push(member);
      } else if (dept === "Discipline") {
        groups[7].items.push(member);
      } else if (dept === "Internal Arrangements") {
        groups[8].items.push(member);
      } else if (dept === "Feedback & Registration") {
        groups[9].items.push(member);
      }
    });

    return groups.filter(g => g.items.length > 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Doodle Pattern */}
      <DoodleBg />

      {/* Decorative Background Glows */}
      <div className="hero-glow w-[500px] h-[500px] bg-brand-orange/10 -top-20 left-1/4 z-0" />
      <div className="hero-glow w-[400px] h-[400px] bg-brand-pink/10 top-1/3 -right-20 z-0" />
      <div className="hero-glow w-[600px] h-[600px] bg-brand-blue/10 bottom-0 -left-20 z-0" />

      <div className="py-28 px-4 md:px-6 max-w-7xl mx-auto relative z-10">

      {/* Header */}
      <header className="text-center mb-24 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="page-title mb-6 !text-brand-ink"
        >
          Our Team
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="page-subtitle mx-auto !text-brand-ink/75"
        >
          Meet the visionary leadership, dedicated mentors, and passionate student core working behind the scenes to make AARAMBH&apos;26 a grand success.
        </motion.p>
      </header>

      {/* Hierarchy Section */}
      <div className="space-y-32 relative z-10">
        
        {/* Consolidated Leadership and Mentorship Grid */}
        <section className="flex flex-col items-center w-full gap-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center gap-12"
          >
            {/* Top Row: VC and Deepak Sogani */}
            <div className="w-full flex justify-center">
              <ChromaGrid items={topRowItems} radius={400} flipTrigger="none" />
            </div>

            {/* Bottom Row: Anushka, Vaibhav, Gajendra, Rajesh */}
            <div className="w-full flex justify-center">
              <ChromaGrid items={bottomRowItems} radius={400} flipTrigger="none" className="max-w-[1200px]" />
            </div>
          </motion.div>
        </section>

        {/* ── SECTION 2: ORGANIZING HEADS ─────────────────────────────────── */}
        <section className="mb-20 sm:mb-28 overflow-hidden">
          <SectionHeading label="Organizing Heads" accent="#FF188C" />

          {/* SVG definitions for torn-paper clipPaths and jagged filters */}
          <svg className="absolute w-0 h-0" width="0" height="0">
            <defs>
              {/* Displacement filter for rough/torn paper edges */}
              <filter id="torn-paper-filter" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Poster Composition Container */}
          <div className="relative w-full max-w-4xl mx-auto aspect-[2/3] sm:aspect-[4/5] overflow-hidden rounded-3xl border-4 border-[#030404] shadow-[12px_12px_0px_#030404] bg-[#FEFEFC] select-none">
            {/* Texture overlay over the entire poster */}
            <div className="absolute inset-0 halftone-bg opacity-15 pointer-events-none z-30" />
            <div 
              className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none z-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />

            {/* 1. VAISHNAVI PANEL (Top-Left) */}
            <div
              className="absolute group overflow-hidden transition-all duration-300 hover:brightness-105"
              style={{
                top: 0,
                left: 0,
                width: '50%',
                height: '48%',
                clipPath: 'polygon(0% 0%, 51% 0%, 100% 100%, 0% 100%)',
                backgroundColor: '#0D21DD'
              }}
            >
              <div className="absolute inset-0 halftone-bg opacity-25" />

              {/* Graffiti / Scrawls */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <span className="font-display text-[80px] sm:text-[110px] font-black uppercase text-white rotate-[-12deg] tracking-tight">VAISHU</span>
              </div>
              <div className="absolute top-16 left-8 text-[#FF9A00]/40 font-display text-2xl sm:text-4xl font-black tracking-widest uppercase -rotate-12">
                OH // 2026
              </div>

              {/* Photo */}
              <div className="absolute bottom-0 left-0 right-0 top-14 flex items-end justify-center">
                <div className="relative w-[110%] sm:w-[100%] h-[110%] sm:h-[105%] transition-transform duration-500 group-hover:scale-105 origin-bottom -translate-x-[8%]">
                  <Image
                    src="/images/PNG/Vaishnavi Shukla.png"
                    alt="Vaishnavi Shukla"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>

            {/* 2. AMBIKA PANEL (Top-Right) */}
            <div
              className="absolute group overflow-hidden transition-all duration-300 hover:brightness-105"
              style={{
                top: 0,
                right: 0,
                width: '50%',
                height: '48%',
                clipPath: 'polygon(49% 0%, 100% 0%, 100% 100%, 0% 100%)',
                backgroundColor: '#FF9A00'
              }}
            >
              <div className="absolute inset-0 halftone-bg opacity-25" />

              {/* Graffiti / Scrawls */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <span className="font-display text-[80px] sm:text-[110px] font-black uppercase text-white rotate-[12deg] tracking-tight">AMBIKA</span>
              </div>
              <div className="absolute top-16 right-8 text-[#FF188C]/40 font-display text-2xl sm:text-4xl font-black tracking-widest uppercase rotate-12">
                CORE // HEAD
              </div>

              {/* Photo */}
              <div className="absolute bottom-0 left-0 right-0 top-14 flex items-end justify-center">
                <div className="relative w-[110%] sm:w-[100%] h-[110%] sm:h-[105%] transition-transform duration-500 group-hover:scale-105 origin-bottom translate-x-[8%]">
                  <Image
                    src="/images/PNG/Ambika Dalmia.png"
                    alt="Ambika Dalmia"
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>

            {/* 3. VEDIKA PANEL (Top-Center / Prominent Leader Wedge) */}
            <div
              className="absolute group overflow-hidden transition-all duration-300 hover:brightness-105 z-10"
              style={{
                top: 0,
                left: '15%',
                width: '70%',
                height: '48%',
                clipPath: 'polygon(15% 0%, 85% 0%, 50% 100%)',
                backgroundColor: '#FF188C'
              }}
            >
              <div className="absolute inset-0 halftone-bg opacity-25" />

              {/* Graffiti / Scrawls */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                <span className="font-display text-[90px] sm:text-[130px] font-black uppercase text-white tracking-tight rotate-3">VEDIKA</span>
              </div>


              {/* Photo */}
              <div className="absolute bottom-0 left-0 right-0 top-12 flex items-end justify-center">
                <div className="relative w-[95%] sm:w-[90%] h-[105%] sm:h-[110%]">
                  <Image
                    src="/images/PNG/Vedika Agrawal.png"
                    alt="Vedika Agrawal"
                    fill
                    className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105 origin-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
                  />
                </div>
              </div>
            </div>

            {/* 4. AMAN PANEL (Bottom-Left) */}
            <div
              className="absolute group overflow-hidden transition-all duration-300 hover:brightness-105"
              style={{
                bottom: 0,
                left: 0,
                width: '50%',
                height: '52%',
                clipPath: 'polygon(0% 0%, 100% 3.8%, 100% 100%, 0% 100%)',
                backgroundColor: '#FF9A00'
              }}
            >
              <div className="absolute inset-0 halftone-bg opacity-25" />

              {/* Graffiti / Scrawls */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <span className="font-display text-[80px] sm:text-[110px] font-black uppercase text-white rotate-[-6deg] tracking-tight">AMAN</span>
              </div>
              <div className="absolute bottom-20 left-8 text-black/20 font-display text-2xl sm:text-4xl font-black tracking-widest uppercase -rotate-6">
                COMMAND //
              </div>

              {/* Photo */}
              <div className="absolute bottom-0 left-0 right-0 top-10 flex items-end justify-center">
                <div className="relative w-[105%] sm:w-[95%] h-[110%] sm:h-[105%] transition-transform duration-500 group-hover:scale-105 origin-bottom -translate-x-[15%]">
                  <Image
                    src="/images/PNG/Aman Pratap Singh.png"
                    alt="Aman Pratap Singh"
                    fill
                    className="object-contain object-bottom drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </div>
            </div>

            {/* 5. TANIK PANEL (Bottom-Right) */}
            <div
              className="absolute group overflow-hidden transition-all duration-300 hover:brightness-105"
              style={{
                bottom: 0,
                right: 0,
                width: '50%',
                height: '52%',
                clipPath: 'polygon(0% 3.8%, 100% 0%, 100% 100%, 0% 100%)',
                backgroundColor: '#0D21DD'
              }}
            >
              <div className="absolute inset-0 halftone-bg opacity-25" />

              {/* Graffiti / Scrawls */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <span className="font-display text-[80px] sm:text-[110px] font-black uppercase text-white rotate-[6deg] tracking-tight">TANIK</span>
              </div>
              <div className="absolute bottom-20 right-8 text-[#FF9A00]/40 font-display text-2xl sm:text-4xl font-black tracking-widest uppercase rotate-6">
                CORE // HEAD
              </div>

              {/* Photo */}
              <div className="absolute bottom-0 left-0 right-0 top-10 flex items-end justify-center">
                <div className="relative w-[105%] sm:w-[95%] h-[110%] sm:h-[105%] transition-transform duration-500 group-hover:scale-105 origin-bottom translate-x-[15%]">
                  <Image
                    src="/images/PNG/Tanik Gupta.png"
                    alt="Tanik Gupta"
                    fill
                    className="object-contain object-bottom drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </div>
            </div>

            {/* 6. CENTER TORN PAPER WEDGE (Bottom-Center) */}
            <div
              className="absolute z-20"
              style={{
                bottom: 0,
                left: '18%',
                width: '64%',
                height: '52%'
              }}
            >
              {/* Background wedge shape WITH displacement filter (for torn paper edges) */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                  backgroundColor: '#FEFEFC',
                  filter: 'url(#torn-paper-filter)'
                }}
              >
                {/* Paper Crumple & Dot pattern */}
                <div className="absolute inset-0 bg-[#F5F1E5] opacity-40" />
                <div className="absolute inset-0 halftone-bg opacity-20" />
              </div>

              {/* Content Container WITHOUT displacement filter (keeps text & logo razor-sharp) */}
              <div 
                className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-4 sm:pb-8 px-2 sm:px-4 text-center"
                style={{
                  clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
                }}
              >
                {/* Logo (Scaled up 2.5x) */}
                <div className="relative w-24 h-24 sm:w-64 sm:h-64 mb-1 sm:mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] animate-float">
                  <Image 
                    src="/logo.svg" 
                    alt="Aarambh Logo" 
                    fill 
                    className="object-contain" 
                  />
                </div>

                {/* Subtitle */}
                <span className="font-mono text-[5px] sm:text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#FF188C] mb-0.5">
                  COMMAND CORE / AARAMBH '26
                </span>

                {/* Main Text (Flat and Clean, no shadow overfitting) */}
                <h3 className="font-display text-[10px] sm:text-4xl font-black uppercase text-[#030404] tracking-tight leading-none mb-1 sm:mb-2">
                  ORGANIZING HEADS
                </h3>

                {/* Names list */}
                <p className="font-mono text-[5px] sm:text-[9px] font-black text-[#030404] uppercase tracking-widest max-w-[90%] mb-1 sm:mb-3 leading-relaxed">
                  VEDIKA AGRAWAL • VAISHNAVI SHUKLA • AMBIKA DALMIA • AMAN P. SINGH • TANIK GUPTA
                </p>

                {/* Sponsor Logos / Retro Icons (Hidden on Mobile) */}
                <div className="hidden sm:flex gap-3 sm:gap-4 items-center justify-center opacity-65 grayscale hover:grayscale-0 transition-all duration-300">
                  <span className="font-display text-[8px] sm:text-[9px] font-extrabold tracking-widest text-[#030404]/50">// JKLU</span>
                  <span className="font-display text-[8px] sm:text-[9px] font-extrabold tracking-widest text-[#030404]/50">// SABHA</span>
                  <span className="font-display text-[8px] sm:text-[9px] font-extrabold tracking-widest text-[#030404]/50">// AARAMBH</span>
                </div>
              </div>
            </div>

            {/* Jagged Seam Lines Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 800 1000"
              preserveAspectRatio="none"
              style={{ filter: 'url(#torn-paper-filter)' }}
            >
              {/* White torn seams with shadow */}
              <line x1="204" y1="0" x2="400" y2="480" stroke="white" strokeWidth="8" strokeLinecap="round" />
              <line x1="596" y1="0" x2="400" y2="480" stroke="white" strokeWidth="8" strokeLinecap="round" />
              <line x1="0" y1="480" x2="400" y2="480" stroke="white" strokeWidth="8" strokeLinecap="round" />
              <line x1="800" y1="480" x2="400" y2="480" stroke="white" strokeWidth="8" strokeLinecap="round" />
              <line x1="400" y1="480" x2="144" y2="1000" stroke="white" strokeWidth="10" strokeLinecap="round" />
              <line x1="400" y1="480" x2="656" y2="1000" stroke="white" strokeWidth="10" strokeLinecap="round" />
            </svg>

            {/* 7. HIGH-FIDELITY OVERLAY LABELS (Clean, bold, stickerless typography at root level) */}
            
            {/* Vedika (OH - Centered top of photo, small & elegant) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 text-center select-none scale-90 sm:scale-100 transition-transform duration-300">
              <span className="font-mono text-[7px] sm:text-[9px] font-extrabold text-[#FF188C] uppercase tracking-[0.25em] drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)] block mb-0.5">
                ORGANIZING HEAD
              </span>
              <h4 className="font-display text-sm sm:text-2xl font-black text-white uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex flex-col items-center">
                <span>VEDIKA</span>
                <span>AGRAWAL</span>
              </h4>
            </div>

            {/* Vaishnavi (Bottom of her panel, right above the seam) */}
            <div className="absolute bottom-[54%] left-6 z-30 select-none scale-90 sm:scale-100 origin-bottom-left transition-transform duration-300">
              <span className="font-mono text-[6px] sm:text-[8px] font-bold text-white/70 uppercase tracking-widest block mb-0.5 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)]">
                ORGANIZING HEAD
              </span>
              <span className="font-display text-sm sm:text-2xl font-black text-white uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex flex-col items-start">
                <span>VAISHNAVI</span>
                <span>SHUKLA</span>
              </span>
            </div>

            {/* Ambika (Bottom of her panel, right above the seam) */}
            <div className="absolute bottom-[54%] right-6 z-30 text-right select-none scale-90 sm:scale-100 origin-bottom-right transition-transform duration-300">
              <span className="font-mono text-[6px] sm:text-[8px] font-bold text-white/70 uppercase tracking-widest block mb-0.5 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)]">
                ORGANIZING HEAD
              </span>
              <span className="font-display text-sm sm:text-2xl font-black text-white uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex flex-col items-end">
                <span>AMBIKA</span>
                <span>DALMIA</span>
              </span>
            </div>

            {/* Aman (Top of his panel, right below the seam) */}
            <div className="absolute top-[50%] left-6 z-30 select-none scale-90 sm:scale-100 origin-top-left transition-transform duration-300">
              <span className="font-mono text-[6px] sm:text-[8px] font-bold text-white/70 uppercase tracking-widest block mb-0.5 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)]">
                ORGANIZING HEAD
              </span>
              <span className="font-display text-sm sm:text-2xl font-black text-white uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex flex-col items-start">
                <span>AMAN</span>
                <span>P. SINGH</span>
              </span>
            </div>

            {/* Tanik (Top of his panel, right below the seam) */}
            <div className="absolute top-[50%] right-6 z-30 text-right select-none scale-90 sm:scale-100 origin-top-right transition-transform duration-300">
              <span className="font-mono text-[6px] sm:text-[8px] font-bold text-white/70 uppercase tracking-widest block mb-0.5 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)]">
                ORGANIZING HEAD
              </span>
              <span className="font-display text-sm sm:text-2xl font-black text-white uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] flex flex-col items-end">
                <span>TANIK</span>
                <span>GUPTA</span>
              </span>
            </div>

          </div>
        </section>

        {/* Tier 4: Team Leaders */}
        <section className="flex flex-col items-center pt-8 border-t border-brand-ink/10 w-full">
          <div className="w-full text-center mb-16">
            <h2 className="text-3xl font-display font-black text-brand-ink flex items-center justify-center gap-2 uppercase tracking-wide">
              Team Leaders
            </h2>
            <p className="text-sm text-brand-ink/60 mt-2 font-mono uppercase tracking-wider">
              Coordinators of Aarambh &apos;26 by Committee
            </p>
          </div>

          {/* Grouped Committees */}
          <div className="w-full space-y-16">
            {groupedTeamLeaders.map((group) => {
              const mappedItems = group.items.map(m => mapMemberToChromaItem(m, 'tl'));
              return (
                <div key={group.heading} className="w-full relative">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-4.5 h-4.5 rounded-md border-2 border-brand-ink bg-brand-pink shrink-0 shadow-comic-sm" />
                    <h3 className="text-lg sm:text-xl font-display font-black uppercase text-brand-ink tracking-wide">
                      {group.heading}
                    </h3>
                    <div className="h-[2px] bg-brand-ink/10 flex-grow" />
                  </div>
                  <ChromaGrid items={mappedItems} radius={500} flipTrigger="none" />
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  </div>
  );
}
