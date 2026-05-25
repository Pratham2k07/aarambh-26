'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured, FIREBASE_SETUP_MESSAGE } from '../../lib/firebase';
import Sidebar from './Sidebar';
import { Loader2 } from 'lucide-react';

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
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
        <div className="max-w-md bg-admin-surface border-4 border-brand-ink p-8 rounded-md shadow-[6px_6px_0px_0px_#030404]">
          <h2 className="text-2xl font-black text-brand-orange mb-4 font-adminHeading uppercase tracking-tight">Firebase Unconfigured</h2>
          <p className="text-brand-ink/75 text-sm mb-6 leading-relaxed font-bold">
            {FIREBASE_SETUP_MESSAGE}
          </p>
          <div className="text-xs bg-brand-cloud border-2 border-brand-ink p-4 rounded-md text-left font-mono overflow-x-auto text-brand-ink font-semibold">
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
        <header className="sticky top-0 z-30 bg-admin-surface px-4 md:px-8 h-16 flex items-center justify-end border-b-2 border-brand-ink">
          <span className="text-xs font-black text-admin-muted uppercase tracking-widest">
            Admin Portal
          </span>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
