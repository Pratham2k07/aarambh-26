'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/') {
      if (href.startsWith('/#')) {
        e.preventDefault();
        const targetId = href.replace('/#', '');
        const element = document.getElementById(targetId);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else if (href === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Speakers', href: '/speakers' },
    { name: 'Team', href: '/team' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Gallery', href: '/gallery' },
  ];

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 transition-all duration-300 rounded-full border ${isScrolled
          ? 'bg-brand-ink/80 backdrop-blur-xl border-brand-pink/30 py-2.5 px-6 shadow-[0_8px_32px_rgba(255,24,140,0.15)] shadow-brand-pink/10'
          : 'bg-brand-ink/40 backdrop-blur-md border-brand-cloud/10 py-3.5 px-6 shadow-lg'
          }`}
      >
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.svg"
              alt="AARAMBH'26"
              width={150}
              height={32}
              className="h-8 md:h-9 w-auto hover:scale-105 transition-transform"
              priority
              loading="eager"
            />
          </Link>

          {/* Links for Desktop */}
          <div className="hidden md:flex items-center gap-6 bg-brand-ink/40 py-1.5 px-5 rounded-full border border-brand-cloud/5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 px-3 text-xs font-bold tracking-widest uppercase transition-colors duration-200 ${pathname === link.href ? 'text-brand-pink' : 'text-brand-cloud/70 hover:text-brand-pink'
                  }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-pink rounded-full shadow-[0_0_8px_var(--color-brand-pink)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions (CTA) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/register"
              className={`relative group overflow-hidden rounded-full py-2 px-5 font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${
                pathname?.startsWith('/register')
                  ? 'text-brand-cloud bg-brand-blue shadow-[0_4px_12px_rgba(13,33,221,0.4)]'
                  : 'text-brand-cloud bg-brand-pink shadow-[0_4px_12px_rgba(255,24,140,0.3)] hover:shadow-[0_4px_20px_rgba(255,24,140,0.5)]'
              }`}
            >
              <span className="relative z-10 transition-colors">Register</span>
              {!pathname?.startsWith('/register') && (
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-brand-blue transition-transform duration-300 ease-out -z-0" />
              )}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-brand-cloud p-1 hover:text-brand-pink transition-colors relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-[calc(100%+0.75rem)] left-0 w-full bg-brand-ink/95 backdrop-blur-xl border border-brand-pink/20 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-bold tracking-widest uppercase transition-colors py-2 border-b border-brand-cloud/5 ${pathname === link.href ? 'text-brand-pink' : 'text-brand-cloud/80 hover:text-brand-pink'
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/register"
                className={`w-full text-center py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-colors shadow-lg mt-2 ${
                  pathname?.startsWith('/register')
                    ? 'text-brand-cloud bg-brand-blue'
                    : 'text-brand-cloud bg-brand-pink hover:bg-brand-blue'
                }`}
              >
                Register
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
