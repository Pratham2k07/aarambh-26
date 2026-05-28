'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  ArrowLeft,
  X,
  Sparkles,
  Cpu,
  Zap,
  Terminal,
  ShieldCheck,
  Layers,
  Flame,
  Compass,
  Activity,
  Globe
} from 'lucide-react';

// ============================================================================
// CUSTOM INLINE VECTOR SOCIAL ICONS (Solves lucide-react build issue)
// ============================================================================

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// ============================================================================
// DYNAMIC HOLOGRAM CARD FALLBACK FOR MEMBERS WITHOUT CUSTOM IMAGES
// ============================================================================

const HologramFallback = ({ themeColor, roleIcon }: { themeColor: string; roleIcon: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-slate-950/20 backdrop-blur-[2px]">
      {/* Grid lines inside hologram */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px'
        }}
      />
      {/* Spinning holographic circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-44 h-44 border border-dashed border-cyan-500/20 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-32 h-32 border border-dashed border-pink-500/25 rounded-full pointer-events-none"
      />

      {/* Hologram icon in the center */}
      <div className="z-10 flex flex-col items-center gap-2 pointer-events-none">
        <div className={`p-4 rounded-full bg-gradient-to-br ${themeColor} bg-opacity-20 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] relative`}>
          <div className="absolute inset-0 rounded-full blur-md opacity-40 bg-gradient-to-br from-cyan-400 to-purple-500" />
          <div className="text-white relative z-10 animate-pulse text-2xl">
            {roleIcon}
          </div>
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/30 font-black">Hologram Node</span>
      </div>
    </div>
  );
};

// ============================================================================
// TYPES
// ============================================================================

interface TeamMember {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  detailedBio: string;
  skills: string[];
  contributions: string[];
  image: string;
  themeColor: string;
  glowColor: string;
  accentColor: string;
  icon: React.ReactNode;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    email: string;
  };
  imageScale?: string;
  imagePosition?: string;
  bgColor?: string;
}

// ============================================================================
// DATA WITH EXPANDED CINEMATIC METADATA
// ============================================================================

const LEADERS: TeamMember[] = [
  {
    id: "1",
    name: "Devam Gupta",
    role: "CORE LEADER",
    tagline: "Mastermind of Core Systems & Architecture",
    bio: "Next.js mastermind crafting robust database layers and blazing-fast server systems.",
    detailedBio: "Devam is the primary architect behind Aarambh's server infrastructure and systems. He specializes in designing high-performance Next.js API routes, Firestore schemas, database integrity policies, and automated system scripts. When not writing clean code blocks, he's optimizing query response speeds and configuring server layers.",
    skills: ["React & Next.js", "TypeScript", "Node.js & Express", "Firestore & DB Rules", "Performance Eng."],
    contributions: [
      "Architected global state manager & Firestore schema integrity layers",
      "Designed secure database rules & scan endpoint authentications",
      "Configured API protection routes and high-speed registration pipelines"
    ],
    image: "/Team Photos/Tech Team/devam.png",
    themeColor: "from-[#FF188C] via-pink-500 to-[#FF9A00]",
    glowColor: "rgba(139, 92, 246, 0.25)",
    accentColor: "#8b5cf6",
    icon: <Cpu className="w-4 h-4" />,
    socials: {
      github: "https://github.com/Devam759",
      linkedin: "https://www.linkedin.com/in/devam-gupta/",
      instagram: "https://www.instagram.com/who.is.devam/",
      email: "mailto:devamgupta@jklu.edu.in"
    },
    imageScale: "scale(1.18)",
    imagePosition: "translateY(6px)",
    bgColor: "bg-[#8b5cf6]"
  },
  {
    id: "2",
    name: "yash bansal",
    role: "CORE LEADER",
    tagline: "Interaction Architect & Design Wizard",
    bio: "Pixel-perfect designer creating high-fidelity interactive layouts and neobrutalist grids.",
    detailedBio: "Yash brings concepts to life with his bold, graphic layouts and tactile front-end systems. He architected the visual design guidelines, color spectrum tokens, custom typography grids, and micro-interactive page transitions that define Aarambh's unique brand representation.",
    skills: ["UI/UX System Design", "Tailwind CSS", "Framer Motion", "Interaction Engineering", "Responsive Grids"],
    contributions: [
      "Engineered Aarambh's custom neobrutalist design guidelines",
      "Implemented responsive global component grids and animations",
      "Developed high-fidelity page transitions and micro-interaction states"
    ],
    image: "/tech_placeholder.png",
    themeColor: "from-[#FF9A00] via-orange-500 to-[#FF188C]",
    glowColor: "rgba(251, 191, 36, 0.25)",
    accentColor: "#fbbf24",
    icon: <Sparkles className="w-4 h-4" />,
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      email: "mailto:devam@jklu.edu.in"
    },
    bgColor: "bg-[#fbbf24]"
  }
];

const VOLUNTEERS: TeamMember[] = [
  {
    id: "3",
    name: "ASHUTOSH YADAV",
    role: "VOLUNTEER",
    tagline: "Surgical Layout & Component Engineer",
    bio: "Assembling responsive web components with surgical precision.",
    detailedBio: "Ashutosh is responsible for crafting high-fidelity components across the site. He ensures that complex layouts maintain proper grid alignment, responsive scaling, and click target sizes.",
    skills: ["React", "HTML5", "CSS Grid", "Component Architecture"],
    contributions: [
      "Designed reusable high-fidelity component architectures",
      "Optimized responsive layout viewports for mobile screens",
      "Reviewed click target zones and alignment rules across the app"
    ],
    image: "/Team Photos/Tech Team/ashutosh.png",
    themeColor: "from-[#0D21DD] to-[#FF188C]",
    glowColor: "rgba(236, 72, 153, 0.25)",
    accentColor: "#ec4899",
    icon: <Layers className="w-4 h-4" />,
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", instagram: "https://instagram.com", email: "mailto:aarav@jklu.edu.in" },
    imageScale: "scale(1.22)",
    imagePosition: "translateY(8px)",
    bgColor: "bg-[#ec4899]"
  },
  {
    id: "4",
    name: "RASHI KATIYAR",
    role: "VOLUNTEER",
    tagline: "Dialogue Crafter & Slogan Strategist",
    bio: "Crafting bold copy and high-impact digital messaging.",
    detailedBio: "Rashi shapes Aarambh's visual dialogue. She is the creative copywriter behind all the snappy starburst slogans, system notifications, and descriptive details across the portal.",
    skills: ["Copywriting", "Branding", "Content Strategy", "SEO"],
    contributions: [
      "Wrote all high-impact marketing copy and starburst details",
      "Designed tone-of-voice directives for core messaging",
      "Refined SEO content properties to maximize discovery rates"
    ],
    image: "/Team Photos/Tech Team/rashi.png",
    themeColor: "from-[#FF188C] to-[#FF9A00]",
    glowColor: "rgba(16, 185, 129, 0.25)",
    accentColor: "#10b981",
    icon: <Terminal className="w-4 h-4" />,
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", instagram: "https://instagram.com", email: "mailto:ananya@jklu.edu.in" },
    imageScale: "scale(2.15)",
    imagePosition: "translateY(-15px)",
    bgColor: "bg-[#10b981]"
  },
  {
    id: "5",
    name: "HERAMB SHARMA",
    role: "VOLUNTEER",
    tagline: "Query Optimizer & Database Architect",
    bio: "Optimizing queries and scaling backend structures.",
    detailedBio: "Heramb maintains the integrity of registration transactions and database triggers. He monitors system loads, coordinates bulk data uploads, and refactors storage operations for scalability.",
    skills: ["Firestore", "NoSQL", "Data Modeling", "API Testing"],
    contributions: [
      "Optimized Firestore transaction blocks and write counts",
      "Designed scalable NoSQL schemas for bulk operations",
      "Coordinated automated registration payload checks"
    ],
    image: "/Team Photos/Tech Team/heramb.png",
    themeColor: "from-[#FF9A00] to-[#0D21DD]",
    glowColor: "rgba(239, 68, 68, 0.25)",
    accentColor: "#ef4444",
    icon: <Activity className="w-4 h-4" />,
    socials: {
      github: "https://github.com/heramb-sharma-19",
      linkedin: "https://www.linkedin.com/in/heramb-sharma-3ab4a4376?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      instagram: "https://www.instagram.com/herambsharma_19?igsh=ZmY3bXA4czdpMjB4",
      email: "mailto:herambsharma@jklu.edu.in"
    },
    imageScale: "scale(0.86)",
    imagePosition: "translateY(12px)",
    bgColor: "bg-[#ef4444]"
  },
  {
    id: "6",
    name: "AALAP GOSWAMI",
    role: "VOLUNTEER",
    tagline: "Micro-Transition & SVG Physics Coder",
    bio: "Bringing animations to life with micro-transitions.",
    detailedBio: "Aalap ensures the portal feels tactile and reactive. He develops spring-loaded buttons, custom scrollbar visual changes, and sliding animations that respond to touch.",
    skills: ["Framer Motion", "SVG Design", "CSS Physics", "Visual FX"],
    contributions: [
      "Engineered spring-loaded physics details on core CTA buttons",
      "Designed reactive custom scrollbars and transition sliders",
      "Configured high-performance vector path animations"
    ],
    image: "/tech_placeholder.png",
    themeColor: "from-[#0D21DD] to-[#FF188C]",
    glowColor: "rgba(14, 165, 233, 0.25)",
    accentColor: "#0ea5e9",
    icon: <Flame className="w-4 h-4" />,
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", instagram: "https://instagram.com", email: "mailto:riya@jklu.edu.in" },
    bgColor: "bg-[#0ea5e9]"
  },
  {
    id: "7",
    name: "ARIHANT JAIN",
    role: "VOLUNTEER",
    tagline: "Security Shield & Authentication Guardian",
    bio: "Securing auth systems and validating token payloads.",
    detailedBio: "Arihant implements secure access patterns. He integrated Firebase Auth policies, built server-side JWT verification schemes, and audited security rules on scanning endpoints.",
    skills: ["Firebase Auth", "API Protection", "Data Encryption", "OAuth"],
    contributions: [
      "Integrated secure authentication rules on ticketing endpoints",
      "Engineered server-side JSON Web Token validations",
      "Audited scan records to prevent double-entry exploits"
    ],
    image: "/Team Photos/Tech Team/arihant.png",
    themeColor: "from-[#FF188C] to-[#0D21DD]",
    glowColor: "rgba(249, 115, 22, 0.25)",
    accentColor: "#f97316",
    icon: <ShieldCheck className="w-4 h-4" />,
    socials: {
      github: "https://github.com/arrieejain3149",
      linkedin: "https://www.linkedin.com/in/arihant-jain-0a2503383",
      instagram: "https://www.instagram.com/arriee.jain/",
      email: "mailto:arihantjain2025@jklu.edu.in"
    },
    imageScale: "scale(0.85)",
    imagePosition: "translateY(12px)",
    bgColor: "bg-[#f97316]"
  },
  {
    id: "8",
    name: "MANANT SRIVASTAVA",
    role: "VOLUNTEER",
    tagline: "Cypress Sweeper & E2E Testing Officer",
    bio: "Hunting down layout bugs and performance hiccups.",
    detailedBio: "Manant coordinates layout audits and user testing sweeps. He designs comprehensive Cypress integration tests and checks layout integrity across multiple mobile platforms.",
    skills: ["Cypress", "System Testing", "Bug Tracking", "Device Sweep"],
    contributions: [
      "Engineered thorough Cypress end-to-end user path tests",
      "Audited screen rendering parameters across multiple resolutions",
      "Identified and cataloged frontend bottlenecks for speedup"
    ],
    image: "/Team Photos/Tech Team/mananat.png",
    themeColor: "from-[#FF9A00] to-[#FF188C]",
    glowColor: "rgba(167, 139, 250, 0.25)",
    accentColor: "#a78bfa",
    icon: <Compass className="w-4 h-4" />,
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", instagram: "https://instagram.com", email: "mailto:zara@jklu.edu.in" },
    imageScale: "scale(1.15)",
    imagePosition: "translateY(6px)",
    bgColor: "bg-[#a78bfa]"
  },
  {
    id: "9",
    name: "PRATHAM",
    role: "VOLUNTEER",
    tagline: "Asset Speed & Performance Tuner",
    bio: "Optimizing asset sizes and fast loading speeds.",
    detailedBio: "Pratham oversees speed optimization. He compressed and converted project vector images, configured page caching schemas, and verified bundle splitting rules for high performance.",
    skills: ["Next/Image", "Bundle Analysis", "Web Vitals", "Asset Compression"],
    contributions: [
      "Achieved maximum compression metrics for site vector graphics",
      "Evaluated Next.js dynamic bundle division configurations",
      "Audited core web vitals and speed indexes across the portal"
    ],
    image: "/Team Photos/Tech Team/pratham.png",
    themeColor: "from-[#0D21DD] to-[#FF9A00]",
    glowColor: "rgba(52, 211, 153, 0.25)",
    accentColor: "#34d399",
    icon: <Zap className="w-4 h-4" />,
    socials: { github: "https://github.com", linkedin: "https://linkedin.com", instagram: "https://instagram.com", email: "mailto:rohan@jklu.edu.in" },
    imageScale: "scale(1.12)",
    imagePosition: "translateY(10px)",
    bgColor: "bg-[#34d399]"
  },
  {
    id: "10",
    name: "UDIT MISHRA",
    role: "VOLUNTEER",
    tagline: "DNS Overlord & Cloud Orchestrator",
    bio: "Managing CI/CD build scripts and deployment pipelines.",
    detailedBio: "Udit runs our cloud integration pipelines. He coordinates deployment builds on Vercel, designs workflow triggers, and manages DNS properties to keep downtime to zero.",
    skills: ["Vercel", "GitHub Actions", "CI/CD Orchestration", "DNS Management"],
    contributions: [
      "Configured automated CI/CD pipeline runs on GitHub Actions",
      "Maintained zero-downtime DNS routing patterns",
      "Optimized build script sizes on the Vercel edge runtime"
    ],
    image: "/Team Photos/Tech Team/udit.png",
    themeColor: "from-[#eab308] to-[#FF9A00]",
    glowColor: "rgba(251, 191, 36, 0.25)",
    accentColor: "#fbbf24",
    icon: <Globe className="w-4 h-4" />,
    socials: {
      github: "https://github.com",
      linkedin: "https://in.linkedin.com/in/udit-mishra-7696ab37a",
      instagram: "https://www.instagram.com/uditt_m_/",
      email: "mailto:uditmishra@jklu.edu.in"
    },
    imageScale: "scale(0.95)",
    imagePosition: "translateY(8px)",
    bgColor: "bg-[#fbbf24]"
  }
];

// Combine all volunteers for modular mapping
const ALL_MEMBERS = [...LEADERS, ...VOLUNTEERS];

// ============================================================================
// STAGGERED ASYMMETRICAL CARD GENERATOR
// ============================================================================

const getStaggerStyle = (index: number) => {
  const styles = [
    { translate: 'md:-translate-y-6 md:translate-x-4', rotate: 'md:-rotate-2', clip: 'polygon(0 0, 100% 8%, 100% 100%, 0 92%)' },
    { translate: 'md:translate-y-8 md:-translate-x-2', rotate: 'md:rotate-3', clip: 'polygon(0 8%, 100% 0, 100% 92%, 0 100%)' },
    { translate: 'md:-translate-y-2 md:translate-x-6', rotate: 'md:-rotate-1', clip: 'polygon(0 0, 100% 12%, 100% 100%, 0 88%)' },
    { translate: 'md:translate-y-6 md:-translate-x-6', rotate: 'md:rotate-2', clip: 'polygon(0 12%, 100% 0, 100% 88%, 0 100%)' },
    { translate: 'md:-translate-y-8 md:translate-x-2', rotate: 'md:-rotate-3', clip: 'polygon(0 0, 100% 6%, 100% 100%, 0 94%)' },
    { translate: 'md:translate-y-4 md:-translate-x-4', rotate: 'md:rotate-1', clip: 'polygon(0 6%, 100% 0, 100% 94%, 0 100%)' },
    { translate: 'md:-translate-y-4 md:translate-x-8', rotate: 'md:-rotate-2', clip: 'polygon(0 0, 100% 10%, 100% 100%, 0 90%)' },
    { translate: 'md:translate-y-10 md:-translate-x-6', rotate: 'md:rotate-2', clip: 'polygon(0 10%, 100% 0, 100% 90%, 0 100%)' }
  ];
  return styles[index % styles.length];
};

// ============================================================================
// ANIMATED NEON BACKGROUND
// ============================================================================

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#00a6e6]">
      {/* Halftone texture */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(circle, #030404 2.5px, transparent 2.5px)`,
          backgroundSize: '18px 18px'
        }}
      />

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(3, 4, 4, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(3, 4, 4, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Shifting Gradient Blobs */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -90, 50, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-[#FF188C]/15 rounded-full blur-[120px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -90, 0],
          scale: [1, 0.85, 1.15, 1]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-[#0D21DD]/20 rounded-full blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, 50, -80, 0],
          y: [0, 100, 40, 0],
          scale: [1, 1.1, 0.8, 1]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-40 left-1/3 w-[380px] h-[380px] bg-[#FF9A00]/15 rounded-full blur-[110px]"
      />
    </div>
  );
}

// ============================================================================
// DYNAMIC 3D TILTING CHARACTER CARD
// ============================================================================
// SOCIAL ID PARSER HELPERS
// ============================================================================

const getInstagramHandle = (url: string) => {
  if (!url || !url.includes("instagram.com")) return "";
  try {
    const cleanUrl = url.split('?')[0];
    const parts = cleanUrl.replace(/\/$/, "").split('/');
    const handle = parts[parts.length - 1];
    return handle && handle !== "instagram" ? `@${handle}` : "";
  } catch (e) {
    return "";
  }
};

const getGithubHandle = (url: string) => {
  if (!url || !url.includes("github.com")) return "";
  try {
    const cleanUrl = url.split('?')[0];
    const parts = cleanUrl.replace(/\/$/, "").split('/');
    const handle = parts[parts.length - 1];
    return handle && handle !== "github" ? `${handle}` : "";
  } catch (e) {
    return "";
  }
};

const getImageClipPath = (clipPathStr: string) => {
  if (!clipPathStr) return "";
  try {
    const coords = clipPathStr.replace("polygon(", "").replace(")", "").split(",");
    return `polygon(0 0, 100% 0, ${coords[2].trim()}, ${coords[3].trim()})`;
  } catch (e) {
    return clipPathStr;
  }
};

// ============================================================================

function TeamMemberCard({
  member,
  index,
  onClick
}: {
  member: TeamMember;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const stagger = getStaggerStyle(index);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // [-0.5, 0.5]
    const y = (e.clientY - rect.top) / rect.height - 0.5; // [-0.5, 0.5]
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const isLeader = member.role.includes("LEADER");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full ${isLeader ? 'max-w-[340px] md:max-w-[380px]' : 'max-w-[280px]'} mx-auto ${stagger.translate} ${stagger.rotate}`}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[3/4.2] w-full cursor-pointer group select-none overflow-visible"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateY(${coords.x * 12}deg) rotateX(${-coords.y * 12}deg) scale(1.025)`
            : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
          transition: 'transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}
      >
        {/* Soft Ambient Glow Shadow Behind Card */}
        <div
          className="absolute inset-4 opacity-25 blur-2xl group-hover:opacity-45 transition-opacity duration-300 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle, ${member.glowColor} 0%, transparent 70%)`
          }}
        />

        {/* Outer Tech Frame Overlay (Clipped to Angled Polygon) */}
        <div
          className={`absolute inset-0 ${member.bgColor || 'bg-[#8b5cf6]'} border-[3px] border-[#030404] transition-all duration-300 overflow-hidden shadow-[4px_6px_0px_#030404] group-hover:shadow-[6px_10px_0px_#030404]`}
          style={{
            clipPath: stagger.clip
          }}
        >
          {/* Simple, gorgeous graphic effects that replicate the movie poster panels */}
          {(() => {
            const effectIndex = index % 5;
            if (effectIndex === 0) {
              // Comic Sunburst Rays
              return (
                <div 
                  className="absolute inset-0 opacity-[0.16] group-hover:opacity-[0.24] transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundImage: 'conic-gradient(from 0deg at 50% 50%, #fff 0deg 10deg, transparent 10deg 20deg, #fff 20deg 30deg, transparent 30deg 40deg, #fff 40deg 50deg, transparent 50deg 60deg, #fff 60deg 70deg, transparent 70deg 80deg, #fff 80deg 90deg, transparent 90deg 100deg, #fff 100deg 110deg, transparent 110deg 120deg, #fff 120deg 130deg, transparent 130deg 140deg, #fff 140deg 150deg, transparent 150deg 160deg, #fff 160deg 170deg, transparent 170deg 180deg, #fff 180deg 190deg, transparent 190deg 200deg, #fff 200deg 210deg, transparent 210deg 220deg, #fff 220deg 230deg, transparent 230deg 240deg, #fff 240deg 250deg, transparent 250deg 260deg, #fff 260deg 270deg, transparent 270deg 280deg, #fff 280deg 290deg, transparent 290deg 300deg, #fff 300deg 310deg, transparent 310deg 320deg, #fff 320deg 330deg, transparent 330deg 340deg, #fff 340deg 350deg, transparent 350deg 360deg)'
                  }}
                />
              );
            } else if (effectIndex === 1) {
              // Vertical Action Speed Lines
              return (
                <div 
                  className="absolute inset-0 opacity-[0.12] group-hover:opacity-[0.2] transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #fff, #fff 10px, transparent 10px, transparent 20px)'
                  }}
                />
              );
            } else if (effectIndex === 2) {
              // Slanted Action Stripes
              return (
                <div 
                  className="absolute inset-0 opacity-[0.14] group-hover:opacity-[0.22] transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #fff, #fff 12px, transparent 12px, transparent 24px)'
                  }}
                />
              );
            } else if (effectIndex === 3) {
              // Action Focus Rings
              return (
                <div 
                  className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.24] transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, transparent 40%, #fff 41%, #fff 45%, transparent 46%, transparent 70%, #fff 71%, #fff 75%, transparent 76%)'
                  }}
                />
              );
            } else {
              // Halftone Action Grid Dots
              return (
                <div 
                  className="absolute inset-0 opacity-[0.18] group-hover:opacity-[0.28] transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)',
                    backgroundSize: '12px 12px'
                  }}
                />
              );
            }
          })()}

          {/* Subtle Halftone texture overlay inside card */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply group-hover:opacity-[0.1] transition-opacity duration-300"
            style={{
              backgroundImage: `radial-gradient(circle, #030404 1.5px, transparent 1.5px)`,
              backgroundSize: '8px 8px'
            }}
          />

          {/* Dynamic lighting gradient overlay */}
          <div
            className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent"
          />
        </div>

        {/* Character Image - Layered to "Break the Frame" & Clipped Flush at the Bottom */}
        <div
          className="absolute inset-x-0 -top-10 bottom-0 flex justify-center items-end overflow-visible pointer-events-none"
          style={{
            clipPath: getImageClipPath(stagger.clip)
          }}
        >
          <div
            className="relative w-full h-[105%] transition-transform duration-300"
            style={{
              transform: isHovered
                ? `${member.imageScale || 'scale(1)'} ${member.imagePosition || 'translateY(0px)'} translateY(-8px)`
                : `${member.imageScale || 'scale(1)'} ${member.imagePosition || 'translateY(0px)'}`,
              transformOrigin: 'bottom center'
            }}
          >
            {member.image === "/tech_placeholder.png" ? (
              <HologramFallback themeColor={member.themeColor} roleIcon={member.icon} />
            ) : (
              <Image
                src={member.image}
                alt={member.name}
                fill
                unoptimized
                sizes="(max-w-768px) 100vw, 300px"
                className="object-contain object-bottom filter drop-shadow-[0_8px_16px_rgba(3,4,4,0.22)] saturate-105 contrast-105"
                priority={isLeader}
              />
            )}
          </div>
        </div>

        {/* Character Title Capsules (Center-Bottom) */}
        <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center justify-end w-full px-4 text-center pointer-events-none">
          {/* Capsule Name Box - Styled as Bold Comic Sticker */}
          <div className="relative transform transition-all duration-300 group-hover:scale-105 shadow-[2px_4px_0px_#030404] rounded-md">
            <div className="relative bg-white border-[3px] border-[#030404] px-4 py-1.5 rounded-md">
              <span className="font-display font-black text-[11px] md:text-xs tracking-wider uppercase text-[#030404] block">
                {member.name}
              </span>
            </div>
          </div>

          {/* Social ID handle sticker underneath - Comic merchandise style */}
          {(() => {
            const instaHandle = getInstagramHandle(member.socials.instagram);
            const gitHandle = getGithubHandle(member.socials.github);
            const displayId = (instaHandle && instaHandle !== "@instagram")
              ? instaHandle
              : (gitHandle && gitHandle !== "github" ? `@${gitHandle}` : `@${member.name.toLowerCase().replace(/\s+/g, '')}`);

            return (
              <div className="relative mt-2 shadow-[1px_2px_0px_#030404] rounded-sm">
                <div className="flex items-center gap-1.5 bg-white border-[2px] border-[#030404] px-2.5 py-0.5 rounded-sm text-[#030404] font-mono text-[8px] md:text-[9px] tracking-wide leading-none font-black">
                  <InstagramIcon className="w-2.5 h-2.5" />
                  <span>{displayId}</span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* corner marks */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-300">
          <div className="w-1.5 h-1.5 border-t border-l border-[#030404]" />
        </div>
        <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-300">
          <div className="w-1.5 h-1.5 border-t border-r border-[#030404]" />
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PREMIUM INTERACTIVE MODAL DETAIL PREVIEW
// ============================================================================

function ProfileModal({
  member,
  onClose
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
    >
      {/* Dim backdrop with blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
      />

      {/* Cinematic Modal Container */}
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-4xl bg-[#F5F1E5] border-[4px] border-[#030404] rounded-2xl overflow-hidden shadow-[8px_16px_0px_#030404] flex flex-col md:flex-row relative z-10 max-h-[90vh] md:max-h-[85vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-white border-2 border-[#030404] shadow-[1px_2px_0px_#030404] hover:bg-red-500 hover:text-white active:scale-95 transition-all flex justify-center items-center cursor-pointer text-[#030404]"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Giant Roster Image panel */}
        <div
          className="w-full md:w-[350px] shrink-0 border-b md:border-b-0 md:border-r-[4px] border-[#030404] relative overflow-hidden min-h-[260px] md:min-h-full flex items-end justify-center"
          style={{
            background: `radial-gradient(circle at center, ${member.glowColor} 0%, #F5F1E5 100%)`
          }}
        >
          {/* Halftone texture inside modal left panel */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
            style={{
              backgroundImage: `radial-gradient(circle, #030404 1.5px, transparent 1.5px)`,
              backgroundSize: '12px 12px'
            }}
          />

          {/* Cyber lighting backdrop lines */}
          <div className="absolute top-1/4 inset-x-0 bottom-0 bg-gradient-to-t from-[#F5F1E5] to-transparent" />

          {/* Large portrait character cutout */}
          <div className="relative w-full h-[110%] bottom-[-5%] overflow-visible pointer-events-none">
            {member.image === "/tech_placeholder.png" ? (
              <HologramFallback themeColor={member.themeColor} roleIcon={member.icon} />
            ) : (
              <div
                className="relative w-full h-full"
                style={{
                  transform: `${member.imageScale || 'scale(1)'} ${member.imagePosition || 'translateY(0px)'}`,
                  transformOrigin: 'bottom center'
                }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  unoptimized
                  sizes="350px"
                  className="object-contain object-bottom filter drop-shadow-[0_10px_20px_rgba(3,4,4,0.15)] animate-scaleUpSmall"
                />
              </div>
            )}
          </div>

          {/* Dynamic accent color edge bar */}
          <div className={`absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r ${member.themeColor}`} />
        </div>

        {/* Right: Roster Info Details Pane */}
        <div className="p-6 md:p-8 grow flex flex-col justify-center overflow-y-auto bg-white/40">
          <div className="space-y-6">
            {/* Header info */}
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-[#030404] bg-white border-2 border-[#030404] shadow-[1px_2px_0px_#030404]`}>
                  {member.icon}
                  <span>{member.role}</span>
                </span>
              </div>
              <h3 className="text-3.5xl md:text-5xl font-display font-black uppercase text-[#030404] tracking-tight leading-none">
                {member.name}
              </h3>
              <p className="font-mono font-black text-sm uppercase tracking-wider text-[#030404]/60">
                {member.tagline}
              </p>
            </div>

            {/* Social IDs Coordinate Grid */}
            <div className="border-t-[3px] border-[#030404] pt-6 space-y-4">
              <h4 className="font-mono text-[10px] font-black uppercase text-[#030404] tracking-widest text-center md:text-left">
                SYSTEM COORDINATES & IDS
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {member.socials.instagram && (
                  <a
                    href={member.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 px-4 bg-white border-[3px] border-[#030404] hover:bg-[#FF188C] hover:text-white text-[#030404] active:scale-95 transition-all rounded-xl flex items-center gap-3 font-mono text-xs font-black shadow-[3px_3px_0px_#030404]"
                  >
                    <InstagramIcon className="w-5 h-5 shrink-0" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[8px] opacity-60 uppercase font-black text-slate-500">Instagram ID</span>
                      <span>{getInstagramHandle(member.socials.instagram) || `@${member.name.toLowerCase().replace(/\s+/g, '')}`}</span>
                    </div>
                  </a>
                )}

                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 px-4 bg-white border-[3px] border-[#030404] hover:bg-[#FF9A00] hover:text-[#030404] text-[#030404] active:scale-95 transition-all rounded-xl flex items-center gap-3 font-mono text-xs font-black shadow-[3px_3px_0px_#030404]"
                  >
                    <GithubIcon className="w-5 h-5 shrink-0" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[8px] opacity-60 uppercase font-black text-slate-500">GitHub ID</span>
                      <span>{getGithubHandle(member.socials.github) || 'github.com'}</span>
                    </div>
                  </a>
                )}

                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 px-4 bg-white border-[3px] border-[#030404] hover:bg-[#0D21DD] hover:text-white text-[#030404] active:scale-95 transition-all rounded-xl flex items-center gap-3 font-mono text-xs font-black shadow-[3px_3px_0px_#030404]"
                  >
                    <LinkedinIcon className="w-5 h-5 shrink-0" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[8px] opacity-60 uppercase font-black text-slate-500">LinkedIn</span>
                      <span className="truncate max-w-[140px]">View Profile</span>
                    </div>
                  </a>
                )}

                {member.socials.email && (
                  <a
                    href={member.socials.email}
                    className="h-14 px-4 bg-white border-[3px] border-[#030404] hover:bg-[#0ea5e9] hover:text-[#030404] text-[#030404] active:scale-95 transition-all rounded-xl flex items-center gap-3 font-mono text-xs font-black shadow-[3px_3px_0px_#030404]"
                  >
                    <Mail className="w-5 h-5 shrink-0" />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-[8px] opacity-60 uppercase font-black text-slate-500">Email Node</span>
                      <span className="truncate max-w-[140px]">{member.socials.email.replace("mailto:", "")}</span>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// MAIN CREDITS / TEAM SHOWCASE PAGE COMPONENT
// ============================================================================

export default function CreditsPage() {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeMember]);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMember(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeModal = useCallback(() => setActiveMember(null), []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#00a6e6] p-4 md:p-8 lg:p-12 font-sans select-none text-[#030404] z-10">
      {/* Futuristic Background layers */}
      <AnimatedBackground />

      <div className="w-full max-w-7xl mx-auto relative z-10">

        {/* Navigation */}
        <div className="mb-8 flex justify-start">
          <Link
            href="/"
            className="group flex items-center gap-2 bg-white border border-[#030404]/10 hover:border-[#030404]/30 text-[#030404] px-5 py-2.5 rounded-md font-mono text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_5px_15px_rgba(3,4,4,0.04)] active:scale-95"
            id="credits-back-to-home"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* ================================================================ */}
        {/* HERO HEADER SECTION */}
        {/* ================================================================ */}
        <div className="text-center py-6 md:py-10 max-w-2xl mx-auto space-y-3 relative mb-12">
          {/* Light Streak Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[3px] bg-gradient-to-r from-transparent via-[#FF188C]/20 to-transparent blur-[4px]" />

          <div className="relative z-10 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF188C] animate-pulse" />
            <span className="font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#FF188C]">
              AARAMBH &apos;26 SYSTEM CREDITS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF188C] animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-[#030404] leading-none relative z-10">
            THE <span className="bg-gradient-to-r from-[#FF188C] via-[#FF9A00] to-[#0D21DD] bg-clip-text text-transparent">TECH</span> TEAM
          </h1>

          <p className="font-mono text-[10px] md:text-xs text-[#030404]/60 font-bold uppercase tracking-widest relative z-10">
            The Digital Architects Behind The Roster Reveal
          </p>
        </div>

        {/* ================================================================ */}
        {/* ASYMMETRICAL COMIC GRID LAYOUT (Direct on global sky-blue background) */}
        {/* ================================================================ */}

        {/* SECTION 1: LEADERS (2 large centered panels) */}
        <div className="mb-20 relative">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="h-[2px] w-12 bg-[#030404]" />
            <span className="font-display font-black text-xl md:text-2xl uppercase tracking-widest text-[#030404]">
              CORE LEADERS
            </span>
            <div className="h-[2px] w-12 bg-[#030404]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 max-w-4xl mx-auto overflow-visible relative z-10">
            {LEADERS.map((leader, i) => (
              <TeamMemberCard
                key={leader.id}
                member={leader}
                index={i}
                onClick={() => setActiveMember(leader)}
              />
            ))}
          </div>
        </div>

        {/* SECTION 2: VOLUNTEERS (8 staggered overlapping panels) */}
        <div className="mb-24 relative">
          {/* Floating magazine-style background decorations to enhance collage depth */}
          <div className="absolute top-1/4 left-[-10%] w-56 h-56 rounded-full bg-[#0D21DD]/10 blur-3xl pointer-events-none hidden md:block" />
          <div className="absolute bottom-1/4 right-[-10%] w-64 h-64 rounded-full bg-[#FF188C]/10 blur-3xl pointer-events-none hidden md:block" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.08 }}
            viewport={{ once: true }}
            className="absolute -top-12 right-1/4 pointer-events-none font-mono text-[80px] font-black leading-none text-[#030404] tracking-tighter select-none hidden lg:block"
          >
            CREATIVE
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.08 }}
            viewport={{ once: true }}
            className="absolute -bottom-16 left-1/4 pointer-events-none font-mono text-[80px] font-black leading-none text-[#030404] tracking-tighter select-none hidden lg:block"
          >
            ROSTER
          </motion.div>

          <div className="flex items-center justify-center gap-3 mb-16 mt-20">
            <div className="h-[2px] w-12 bg-[#030404]" />
            <span className="font-display font-black text-xl md:text-2xl uppercase tracking-widest text-[#030404]">
              DEVELOPMENT VOLUNTEERS
            </span>
            <div className="h-[2px] w-12 bg-[#030404]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 md:gap-y-28 max-w-6xl mx-auto overflow-visible relative z-10">
            {VOLUNTEERS.map((volunteer, i) => (
              <TeamMemberCard
                key={volunteer.id}
                member={volunteer}
                index={i + 2}
                onClick={() => setActiveMember(volunteer)}
              />
            ))}
          </div>
        </div>

        {/* Footer info text */}
        <div className="text-center py-10 mt-6 border-t border-[#030404]/10 max-w-2xl mx-auto">
          <p className="text-[#030404]/40 font-mono text-[9px] font-black uppercase tracking-widest">
            TAP ANY ROSTER CARD TO INTERACT & VIEW CORRESPONDING SYSTEM PROFILE
          </p>
        </div>
      </div>

      {/* ================================================================ */}
      {/* MODAL POPUP PREVIEW RENDER */}
      {/* ================================================================ */}
      <AnimatePresence>
        {activeMember && (
          <ProfileModal
            member={activeMember}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>

      {/* Keyframe animations */}
      <style jsx global>{`
        @keyframes scaleUpSmall {
          from { transform: scale(0.95) translateY(10px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-scaleUpSmall {
          animation: scaleUpSmall 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
