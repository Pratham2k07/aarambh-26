'use client';

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { SkeletonCard } from '../../components/admin/SkeletonLoader';

// ============================================================================
// ADMIN OVERVIEW PAGE COMPONENT
// ============================================================================

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    todayRegistrations: 0,
    totalEntriesToday: 0,
    totalEntries: 0,
    loading: true
  });

  useEffect(() => {
    const unsubRegs = onSnapshot(collection(db, 'registrations'), (snap) => {
      setStats(s => ({ ...s, totalRegistrations: snap.size, loading: false }));
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch new registrations created today
    const unsubTodayRegs = onSnapshot(query(collection(db, 'registrations'), where('createdAt', '>=', today)), (snap) => {
      setStats(s => ({ ...s, todayRegistrations: snap.size }));
    });

    // Fetch entries today
    const unsubScans = onSnapshot(query(collection(db, 'scanLogs'), where('timestamp', '>=', today), where('result', '==', 'accepted')), (snap) => {
      setStats(s => ({ ...s, totalEntriesToday: snap.size }));
    });

    // Fetch total entries of all time
    const unsubTotalEntries = onSnapshot(query(collection(db, 'registrations'), where('hasEntered', '==', true)), (snap) => {
      setStats(s => ({ ...s, totalEntries: snap.size }));
    });

    return () => {
      unsubRegs();
      unsubTodayRegs();
      unsubScans();
      unsubTotalEntries();
    };
  }, []);

  return (
    <div className="space-y-10 select-none">
      {/* Title Header */}
      <div>
        <h1 className="font-adminHeading text-3xl font-black uppercase tracking-tight text-brand-ink mb-1.5">Overview</h1>
        <p className="text-admin-muted font-bold text-xs uppercase tracking-wider">Live snapshot of Aarambh 2026</p>
      </div>

      {/* Quick Statistics Grid */}
      {stats.loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Registrations */}
          <div className="bg-admin-surface border-4 border-brand-ink p-6 rounded-md shadow-[4px_4px_0px_0px_#030404] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#030404]">
            <div className="mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-admin-muted">Total Registrations</h3>
            </div>
            <p className="font-adminHeading text-4xl font-black text-brand-ink">{stats.totalRegistrations}</p>
          </div>
          
          {/* Card 2: Today's Registrations */}
          <div className="bg-admin-surface border-4 border-brand-ink p-6 rounded-md shadow-[4px_4px_0px_0px_#030404] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#030404]">
            <div className="mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-admin-muted">Today&apos;s Registrations</h3>
            </div>
            <p className="font-adminHeading text-4xl font-black text-brand-ink">{stats.todayRegistrations}</p>
          </div>

          {/* Card 3: Entries Today */}
          <div className="bg-admin-surface border-4 border-brand-ink p-6 rounded-md shadow-[4px_4px_0px_0px_#030404] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#030404]">
            <div className="mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-admin-muted">Entries Today</h3>
            </div>
            <p className="font-adminHeading text-4xl font-black text-brand-ink">{stats.totalEntriesToday}</p>
          </div>

          {/* Card 4: Total Entries */}
          <div className="bg-admin-surface border-4 border-brand-ink p-6 rounded-md shadow-[4px_4px_0px_0px_#030404] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#030404]">
            <div className="mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-admin-muted">Total Entries</h3>
            </div>
            <p className="font-adminHeading text-4xl font-black text-brand-ink">{stats.totalEntries}</p>
          </div>
        </div>
      )}
    </div>
  );
}
