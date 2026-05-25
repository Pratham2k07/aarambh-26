'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { auth, isFirebaseConfigured } from '../../lib/firebase';

// ============================================================================
// BESPOKE CUSTOM GEOMETRIC SVG ICONS FOR SIDEBAR (Gradient-free, Sharp, Heavy-mitre)
// ============================================================================

const CustomDashboardIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const CustomBarChartIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <rect x="3" y="13" width="4" height="8" />
    <rect x="10" y="7" width="4" height="14" />
    <rect x="17" y="3" width="4" height="18" />
  </svg>
);

const CustomClipboardIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <rect x="5" y="5" width="14" height="16" />
    <path d="M9 5V2H15V5" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="14" x2="15" y2="14" />
  </svg>
);

const CustomEntryLogsIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <rect x="3" y="3" width="18" height="18" />
    <path d="M9 9l3 3-3 3" />
    <line x1="15" y1="12" x2="12" y2="12" />
  </svg>
);

const CustomAuditIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <rect x="3" y="4" width="18" height="16" />
    <line x1="7" y1="8" x2="17" y2="8" />
    <line x1="7" y1="12" x2="13" y2="12" />
    <line x1="7" y1="16" x2="11" y2="16" />
  </svg>
);

const CustomDutyIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <rect x="3" y="4" width="18" height="16" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

const CustomLogoutIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <path d="M10 22H3V2H10" />
    <path d="M21 12H9" />
    <path d="M16 7L21 12L16 17" />
  </svg>
);

const CustomMenuIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    className={className}
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CustomCloseIcon = ({ className = '', size = 24 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="square" 
    className={className}
  >
    <line x1="4" y1="4" x2="20" y2="20" />
    <line x1="20" y1="4" x2="4" y2="20" />
  </svg>
);

const CustomScannerIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <path d="M4 4h4V2H2v6h2V4zm12-2v2h4v4h2V2h-6zM4 20h4v2H2v-6h2v4zm16 2v-2h-4v-2h6v6h-2z" />
    <line x1="7" y1="12" x2="17" y2="12" />
  </svg>
);

// ============================================================================
// NAVIGATION CONFIGURATION (Cleaned, Light theme compliant)
// ============================================================================

const navItems = [
  { name: 'Overview', href: '/admin', icon: CustomDashboardIcon },
  { name: 'Registration', href: '/admin/registrations', icon: CustomClipboardIcon },
  { name: 'Ticket Scanner', href: '/admin/scanner', icon: CustomScannerIcon },
  { name: 'Entry Logs', href: '/admin/entry-logs', icon: CustomEntryLogsIcon },
  { name: 'Audit Logs', href: '/admin/audit', icon: CustomAuditIcon },
  { name: 'Feedback Analytics', href: '/admin/analytics', icon: CustomBarChartIcon },
  { name: 'Duty Management', href: '/admin/duty-management', icon: CustomDutyIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    let performer = 'Admin';
    if (isFirebaseConfigured() && auth && auth.currentUser) {
      performer = auth.currentUser.email || auth.currentUser.uid || 'Admin';
    }
    try {
      const { logAdminAction } = await import('../../lib/audit');
      await logAdminAction('LOGOUT', 'sessions', `Admin ${performer} signed out successfully`, performer);
    } catch (err) {
      console.error("Failed to log logout action:", err);
    }
    if (isFirebaseConfigured() && auth) {
      await auth.signOut();
    }
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Hamburger Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b-2 border-brand-ink flex items-center justify-between px-4 z-50">
        <Link href="/admin" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Aarambh Logo" className="h-8 w-auto object-contain" />
          <span className="font-adminHeading text-md font-black text-brand-ink hidden xs:block">Admin</span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-brand-ink p-2 cursor-pointer focus:outline-none"
        >
          {isOpen ? <CustomCloseIcon size={24} /> : <CustomMenuIcon size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-[#030404]/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Contents */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r-2 border-brand-ink flex flex-col transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Desktop Sidebar Logo */}
        <div className="h-16 flex items-center px-6 border-b-2 border-brand-ink bg-white hidden md:flex">
          <Link href="/admin" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Aarambh Logo" className="h-10 w-auto object-contain" />
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 bg-white">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 border-2 transition-all duration-100 ${
                  isActive 
                    ? 'bg-brand-cloud border-brand-ink text-brand-ink font-black shadow-[3px_3px_0px_0px_#030404] rounded-md translate-x-[-2px] translate-y-[-2px]' 
                    : 'border-transparent text-admin-muted hover:bg-admin-bg hover:text-brand-ink hover:border-brand-ink hover:rounded-md'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm tracking-wide uppercase font-black text-xs">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t-2 border-brand-ink bg-white">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-md border-2 border-transparent text-admin-muted hover:border-brand-ink hover:bg-brand-pink/15 hover:text-brand-pink hover:font-black hover:shadow-[3px_3px_0px_0px_#030404] transition-all duration-100 cursor-pointer"
          >
            <CustomLogoutIcon size={18} />
            <span className="text-sm tracking-wide uppercase font-black text-xs">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
