'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured, FIREBASE_SETUP_MESSAGE } from '../../lib/firebase';
import Sidebar from '../../components/admin/Sidebar';
import { Loader2, AlertCircle } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState(false);
  const router = useRouter();
  const firebaseReady = isFirebaseConfigured();
  useEffect(() => {
    if (!firebaseReady || !auth || !db) {
      setConfigError(true);
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const roleDoc = await getDoc(doc(db, 'roles', user.uid));
        if (roleDoc.exists() && roleDoc.data().role === 'admin') {
          setLoading(false);
        } else {
          router.push('/scanner');
        }
      } catch {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router, firebaseReady]);

  if (configError) {
    return (
      <div className="min-h-screen bg-admin-bg flex items-center justify-center p-6 text-center font-adminBody">
        <div className="max-w-md bg-admin-border/20 border border-admin-border p-8 rounded-2xl backdrop-blur-md">
          <h2 className="text-2xl font-bold text-orange-500 mb-4 font-adminHeading">Firebase Unconfigured</h2>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            {FIREBASE_SETUP_MESSAGE}
          </p>
          <div className="text-xs bg-black/40 p-4 rounded-xl text-left font-mono overflow-x-auto text-gray-400">
            1. Copy .env.example to .env.local<br/>
            2. Fill in your Firebase configuration keys
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-admin-bg flex items-center justify-center">
        <Loader2 className="animate-spin text-admin-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-admin-bg text-admin-text font-adminBody">
      <Sidebar />
      <main className="flex-1 w-full md:w-[calc(100%-16rem)] pt-16 md:pt-0 overflow-y-auto relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-admin-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <header className="sticky top-0 z-30 bg-admin-bg/60 backdrop-blur-md px-4 md:px-8 h-16 flex items-center justify-end border-b border-admin-border/50">
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-admin-muted uppercase tracking-widest hidden sm:block">
              Admin Portal
            </span>
            <div className="h-4 w-px bg-admin-border hidden sm:block" />
            <img src="/logo.svg" alt="AARAMBH'26" className="h-8 w-auto" />
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
