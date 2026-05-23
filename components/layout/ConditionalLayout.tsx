'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../ui/CustomCursor';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminOrScanner = pathname?.startsWith('/admin') || pathname?.startsWith('/scanner') || pathname?.startsWith('/login');

  if (isAdminOrScanner) {
    return <>{children}</>;
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
