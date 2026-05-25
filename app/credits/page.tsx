'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ============================================================================
// BESPOKE GEOMETRIC SVG ICONS (Gradient-free, Sharp, Heavy-mitre)
// ============================================================================

const GitHubIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedInIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const EmailIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ArrowLeftIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3.2" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const CodeIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    strokeLinejoin="miter" 
    className={className}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export default function CreditsPage() {
  const TEAM_MEMBERS = [
    {
      name: "Aman Pratap Singh",
      role: "Lead Full-Stack Developer",
      bio: "Crafting bulletproof Next.js code systems, optimization pipelines, and dynamic database layers. Focused on robustness, responsiveness, and performance scalability.",
      skills: ["React & Next.js", "TypeScript", "Node.js & Express", "Firestore & Realtime DB", "Performance Engineering"],
      shadowColor: "shadow-[8px_8px_0px_0px_#FF188C]", // Pink
      borderColor: "border-brand-pink",
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "mailto:aman@jklu.edu.in"
      }
    },
    {
      name: "Devam Gupta",
      role: "Lead UI/UX Designer & Frontend Engineer",
      bio: "Creating high-fidelity, neobrutalist interactive experiences. Dedicated to flawless styling, geometric details, typography systems, and tactile vector transitions.",
      skills: ["UI/UX System Design", "Tailwind CSS Architecture", "Framer Motion Animations", "Interaction Engineering", "Responsive Layouts"],
      shadowColor: "shadow-[8px_8px_0px_0px_#FF9A00]", // Orange
      borderColor: "border-brand-orange",
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "mailto:devam@jklu.edu.in"
      }
    }
  ];

  const TECH_STACK = [
    "Next.js App Router",
    "React v18",
    "Tailwind CSS v3",
    "Firebase Firestore",
    "Vercel Cloud Hosting",
    "SEO Semantic Engine"
  ];

  return (
    <div className="min-h-screen bg-brand-cloud p-4 md:p-8 font-sans relative pb-24 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(#030404_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto z-10 relative mt-4 md:mt-8">
        
        {/* Navigation Action */}
        <div className="mb-6 flex justify-start">
          <Link
            href="/"
            className="comic-interactive border-2 border-brand-ink bg-white text-brand-ink py-2 px-4 font-display text-xs font-black uppercase tracking-wider transition-all rounded-md cursor-pointer flex items-center gap-2 shadow-[3px_3px_0px_0px_#030404] hover:bg-brand-orange active:translate-y-1 active:shadow-none"
            id="credits-back-to-home"
          >
            <ArrowLeftIcon size={16} />
            Back to Home
          </Link>
        </div>

        {/* Banner Block */}
        <div className="bg-white border-4 border-brand-ink p-8 shadow-[8px_8px_0px_0px_#030404] rounded-lg mb-12 text-center">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight uppercase text-brand-ink">
              The Tech Team
            </h1>
            <p className="text-brand-ink/65 text-xs md:text-sm font-mono max-w-xl mx-auto leading-relaxed font-bold">
              The designers and engineers behind the Aarambh&apos;26 digital portal. We write clean structures, create high-impact neobrutalist visual experiences, and build robust features without compromises.
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {TEAM_MEMBERS.map((member) => (
            <div 
              key={member.name}
              className={`bg-white border-4 border-brand-ink p-6 md:p-8 rounded-lg flex flex-col justify-between transition-transform duration-200 hover:scale-[1.01] ${member.shadowColor}`}
            >
              <div className="space-y-6">
                
                {/* Photo & Identity Section */}
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left">
                  <div className="relative w-28 h-28 shrink-0 rounded-lg overflow-hidden border-2 border-brand-ink bg-brand-cloud shadow-[4px_4px_0px_0px_#030404]">
                    <Image
                      src="/favicon.ico"
                      alt={member.name}
                      fill
                      sizes="112px"
                      className="object-contain p-2 hover:scale-105 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className={`inline-block border-2 border-brand-ink bg-brand-cloud text-brand-ink font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md`}>
                      {member.role.split(' ')[0]} Specialist
                    </span>
                    <h2 className="text-xl md:text-2xl font-display font-black uppercase text-brand-ink tracking-tight leading-none">
                      {member.name}
                    </h2>
                    <p className="text-brand-pink font-bold text-xs uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="border-t-2 border-brand-ink/10 pt-4">
                  <p className="text-brand-ink/80 text-xs md:text-sm font-mono font-bold leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Skills Chips */}
                <div className="space-y-2">
                  <span className="block font-mono text-[9px] font-black uppercase text-brand-ink/50 tracking-wider">
                    Core Competencies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="bg-brand-cloud border border-brand-ink/20 text-brand-ink font-mono text-[10px] font-bold px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Social Actions Block */}
              <div className="border-t-2 border-brand-ink/10 pt-6 mt-8 flex justify-start gap-3">
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 bg-white border-2 border-brand-ink text-brand-ink hover:bg-brand-pink hover:text-white active:translate-y-1 transition-all rounded-md flex justify-center items-center shadow-[3px_3px_0px_0px_#030404] cursor-pointer"
                >
                  <GitHubIcon size={18} />
                </a>
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 bg-white border-2 border-brand-ink text-brand-ink hover:bg-brand-blue hover:text-white active:translate-y-1 transition-all rounded-md flex justify-center items-center shadow-[3px_3px_0px_0px_#030404] cursor-pointer"
                >
                  <LinkedInIcon size={18} />
                </a>
                <a
                  href={member.socials.email}
                  aria-label="Send Email"
                  className="w-10 h-10 bg-white border-2 border-brand-ink text-brand-ink hover:bg-brand-orange hover:text-white active:translate-y-1 transition-all rounded-md flex justify-center items-center shadow-[3px_3px_0px_0px_#030404] cursor-pointer"
                >
                  <EmailIcon size={18} />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Tech Stack Footer */}
        <div className="bg-white border-4 border-brand-ink p-6 rounded-lg shadow-[6px_6px_0px_0px_#030404]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 border-2 border-brand-ink bg-brand-cloud rounded-md">
                <CodeIcon size={20} className="text-brand-ink" />
              </div>
              <div>
                <h3 className="text-sm font-display font-black uppercase text-brand-ink leading-tight">
                  System Architecture
                </h3>
                <p className="text-brand-ink/50 text-[10px] font-mono font-bold uppercase">
                  Powered by clean & modern web technologies
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              {TECH_STACK.map((tech) => (
                <span 
                  key={tech}
                  className="bg-brand-cloud border-2 border-brand-ink text-brand-ink font-mono text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
