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

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // List of departments for filtering Team Leaders
  const departments = useMemo(() => {
    const depts = new Set<string>();
    TEAM_DATA.teamLeaders.forEach(tl => {
      if (tl.department) depts.add(tl.department);
    });
    return ['All', ...Array.from(depts)];
  }, []);

  // Filter Team Leaders
  const filteredTeamLeaders = useMemo(() => {
    return TEAM_DATA.teamLeaders.filter(tl => {
      const matchesSearch = tl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tl.designation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === 'All' || tl.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept]);

  // Helper to map member to chroma item
  const mapMemberToChromaItem = (member: TeamMember, type: 'vc' | 'osa' | 'orgHead' | 'tl'): ChromaItem => {
    let borderColor = '#F5F1E5'; // default brand.white/cloud
    let gradient = 'linear-gradient(145deg, rgba(245, 241, 229, 0.05), rgba(3, 4, 4, 0.95))';

    if (type === 'vc') {
      borderColor = '#FF9A00'; // brand.orange
      gradient = 'linear-gradient(145deg, rgba(255, 154, 0, 0.15), rgba(3, 4, 4, 0.98))';
    } else if (type === 'osa') {
      borderColor = '#0D21DD'; // brand.blue
      gradient = 'linear-gradient(145deg, rgba(13, 33, 221, 0.15), rgba(3, 4, 4, 0.98))';
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
      subtitle: member.designation,
      handle: member.socials?.linkedin ? '@' + member.name.toLowerCase().replace(/\s+/g, '') : undefined,
      location: member.department,
      borderColor,
      gradient,
      url: member.socials?.linkedin || (member.socials?.email ? `mailto:${member.socials.email}` : undefined),
      socials: member.socials
    };
  };

  const vcItem = useMemo(() => [mapMemberToChromaItem(TEAM_DATA.vc, 'vc')], []);
  const osaItems = useMemo(() => TEAM_DATA.osa.map(m => mapMemberToChromaItem(m, 'osa')), []);
  const orgHeadItems = useMemo(() => TEAM_DATA.organizingHeads.map(m => mapMemberToChromaItem(m, 'orgHead')), []);
  const tlItems = useMemo(() => filteredTeamLeaders.map(m => mapMemberToChromaItem(m, 'tl')), [filteredTeamLeaders]);

  return (
    <div className="py-28 px-4 md:px-6 max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="hero-glow w-[500px] h-[500px] bg-brand-orange/10 -top-20 left-1/4" />
      <div className="hero-glow w-[400px] h-[400px] bg-brand-pink/10 top-1/3 -right-20" />
      <div className="hero-glow w-[600px] h-[600px] bg-brand-blue/10 bottom-0 -left-20" />

      {/* Header */}
      <header className="text-center mb-24 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-eyebrow"
        >
          The Driving Force
        </motion.span>
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
        
        {/* Tier 1: Vice Chancellor */}
        <section className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full text-center"
          >
            <h2 className="text-xs uppercase font-extrabold tracking-[0.25em] text-accent-dark mb-8 flex items-center justify-center gap-2">
              <Crown size={16} /> Patron Leadership
            </h2>
            <div className="flex justify-center w-full">
              <ChromaGrid items={vcItem} radius={400} />
            </div>
          </motion.div>
        </section>

        {/* Tier 2: Office of Student Affairs */}
        <section className="flex flex-col items-center w-full">
          <h2 className="text-xs uppercase font-extrabold tracking-[0.25em] text-brand-blue mb-10 flex items-center justify-center gap-2">
            <GraduationCap size={18} /> Office of Student Affairs
          </h2>
          <div className="w-full flex justify-center">
            <ChromaGrid items={osaItems} radius={400} />
          </div>
        </section>

        {/* Tier 3: Organizing Heads */}
        <section className="flex flex-col items-center w-full">
          <h2 className="text-xs uppercase font-extrabold tracking-[0.25em] text-brand-pink mb-10 flex items-center justify-center gap-2">
            <Award size={18} /> Organizing Heads
          </h2>
          <div className="w-full flex justify-center">
            <ChromaGrid items={orgHeadItems} radius={450} />
          </div>
        </section>

        {/* Tier 4: Team Leaders */}
        <section className="flex flex-col items-center pt-8 border-t border-brand-ink/10 w-full">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="text-left">
              <h2 className="text-2xl font-display font-bold text-brand-ink flex items-center gap-2">
                <Users className="text-brand-blue" size={24} /> Core Team Members
              </h2>
              <p className="text-sm text-brand-ink/60 mt-1">
                Showing {filteredTeamLeaders.length} of {TEAM_DATA.teamLeaders.length} coordinators
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink/40" size={18} />
                <input
                  type="text"
                  placeholder="Search team leaders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-ink/5 border border-brand-ink/15 hover:border-brand-ink/30 focus:border-brand-pink/60 rounded-full pl-10 pr-4 py-2.5 text-sm text-brand-ink placeholder-brand-ink/40 outline-none transition-all"
                />
              </div>

              {/* Department Dropdown Filter */}
              <div className="relative w-full sm:w-48">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full appearance-none bg-brand-ink/5 border border-brand-ink/15 hover:border-brand-ink/30 focus:border-brand-pink/60 rounded-full px-5 py-2.5 text-sm text-brand-ink outline-none transition-all cursor-pointer"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="bg-brand-cloud text-brand-ink">
                      {dept === 'All' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-ink/40 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Team Leaders Grid */}
          <div className="w-full relative min-h-[400px]">
            {filteredTeamLeaders.length > 0 ? (
              <ChromaGrid items={tlItems} radius={500} />
            ) : (
              <div 
                className="py-16 text-center text-brand-ink/50 text-lg border border-dashed border-brand-ink/15 rounded-2xl bg-brand-ink/[0.02] w-full"
              >
                No team leaders found matching &apos;{searchQuery}&apos; in {selectedDept === 'All' ? 'all departments' : selectedDept}.
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
