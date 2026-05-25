'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { auth, db, isFirebaseConfigured, FIREBASE_SETUP_MESSAGE } from '../../lib/firebase';
import { logAdminAction } from '../../lib/audit';

// ============================================================================
// BESPOKE CUSTOM GEOMETRIC SVG ICONS (Gradient-free, Sharp, Heavy-mitre, No standard libraries)
// ============================================================================

const CustomMailIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <rect x="2" y="4" width="20" height="16" />
    <path d="M22 4L12 13L2 4" />
    <path d="M2 20L9 13" />
    <path d="M22 20L15 13" />
  </svg>
);

const CustomLockIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <rect x="3" y="11" width="18" height="11" />
    <path d="M7 11V7C7 4.2 9.2 2 12 2C14.8 2 17 4.2 17 7V11" />
    <line x1="12" y1="15" x2="12" y2="18" />
  </svg>
);

const CustomEyeIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CustomEyeOffIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <path d="M20 16.5A11 11 0 0 1 12 20C5 20 1 12 1 12S3.5 7.5 8 5" />
    <path d="M12 4c7 0 11 8 11 8s-.8 1.6-2.5 3.5" />
    <path d="M14.2 14.2A3 3 0 0 1 9.8 9.8" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

const CustomKeyIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <circle cx="7" cy="12" r="4" />
    <path d="M11 12H22V16H18V12H15V16H11" />
  </svg>
);

const CustomWarningIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
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
    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
    <line x1="12" y1="8" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CustomLoaderIcon = ({ className = '', size = 18 }: { className?: string; size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3.2" 
    strokeLinecap="square" 
    className={`animate-spin ${className}`}
  >
    <path d="M12 2A10 10 0 0 1 22 12" />
  </svg>
);

// ============================================================================
// LOGIN VIEW PAGE
// ============================================================================

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFirebaseConfigured() || !auth || !db) {
      setError(FIREBASE_SETUP_MESSAGE);
      return;
    }
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);

    const inputClean = email.trim();
    const isUid = /^AAR-/i.test(inputClean);

    try {
      if (isUid) {
        // UID Login Fallback
        const { collection, query, where, getDocs } = await import('firebase/firestore');
        const q = query(collection(db, 'volunteers'), where('uid', '==', inputClean.toUpperCase()));
        const snap = await getDocs(q);
        
        if (!snap.empty) {
          const volDoc = snap.docs[0];
          const volData = volDoc.data();
          const hashedInput = await sha256(password);
          
          if (volData.passwordHash === hashedInput) {
            // Save session
            const sessionData = {
              uid: volDoc.id,
              email: volData.email,
              role: volData.role === 'Team Leader' ? 'team_leader' : 'volunteer',
              name: volData.name,
              volUid: volData.uid
            };
            localStorage.setItem('aarambh_session', JSON.stringify(sessionData));
            
            // Log successful UID fallback login
            const performer = volData.email || volData.name || volData.uid;
            await logAdminAction('LOGIN_UID', 'sessions', `Volunteer ${performer} signed in successfully via UID fallback`, performer);

            router.push('/volunteer');
            return;
          }
        }
        setError('Invalid UID or password.');
      } else {
        // Standard Email Login with Firestore Fallback
        try {
          const userCredential = await signInWithEmailAndPassword(auth, inputClean, password);
          const uid = userCredential.user.uid;
          
          // Clear any stale local storage session since we are using Firebase Auth
          localStorage.removeItem('aarambh_session');

          const roleDoc = await getDoc(doc(db, 'roles', uid));
          if (roleDoc.exists()) {
            const role = roleDoc.data().role;
            
            // Log successful login
            await logAdminAction('LOGIN', 'sessions', `User ${inputClean} signed in successfully with role: ${role}`);

            if (role === 'admin') {
              router.push('/admin');
            } else if (role === 'scanner') {
              router.push('/scanner');
            } else if (role === 'feedback') {
              router.push('/feedback');
            } else if (role === 'volunteer' || role === 'team_leader') {
              router.push('/volunteer');
            } else {
              setError('Access denied: Invalid account role.');
              await auth.signOut();
            }
          } else {
            setError('Access denied: Unauthorized account.');
            await auth.signOut();
          }
        } catch (authErr) {
          // If auth sign-in fails, try checking Firestore credentials (fallback for rate-limited sign-ups)
          const { collection, query, where, getDocs } = await import('firebase/firestore');
          const q = query(collection(db, 'volunteers'), where('email', '==', inputClean.toLowerCase()));
          const snap = await getDocs(q);
          
          if (!snap.empty) {
            const volDoc = snap.docs[0];
            const volData = volDoc.data();
            const hashedInput = await sha256(password);
            
            if (volData.passwordHash === hashedInput) {
              const sessionData = {
                uid: volDoc.id,
                email: volData.email,
                role: volData.role === 'Team Leader' ? 'team_leader' : 'volunteer',
                name: volData.name,
                volUid: volData.uid
              };
              localStorage.setItem('aarambh_session', JSON.stringify(sessionData));
              
              // Log successful credentials fallback login
              const performer = volData.email || volData.name || volData.uid;
              await logAdminAction('LOGIN_FALLBACK', 'sessions', `Volunteer ${performer} signed in successfully via credentials fallback`, performer);

              router.push('/volunteer');
              return;
            }
          }
          console.error('Login error:', authErr);
          setError('Invalid email or password.');
        }
      }
    } catch (err: any) {
      console.error('Login system error:', err);
      setError('An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cloud flex flex-col items-center justify-center p-4 md:p-8 font-sans relative select-none">
      {/* Background structural design details (grid pattern) */}
      <div className="absolute inset-0 bg-[radial-gradient(#030404_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
      
      <div className="w-full max-w-[440px] z-10">
        {/* Core Premium Card */}
        <div className="bg-white border-4 border-brand-ink p-8 md:p-10 shadow-[8px_8px_0px_0px_#030404] rounded-lg">
          
          {/* Header & Logo */}
          <div className="text-center mb-8">
            <div className="inline-block p-1 border-2 border-brand-ink bg-white shadow-[3px_3px_0px_0px_#030404] rounded-md mb-6">
              <Image 
                src="/logo.svg" 
                alt="AARAMBH '26" 
                width={200} 
                height={46} 
                priority
                className="h-10 w-auto object-contain"
              />
            </div>
            <h1 className="text-xl font-display font-black tracking-wider uppercase text-brand-ink">
              Management Portal
            </h1>
            <div className="h-1 w-12 bg-brand-pink mx-auto mt-2.5 border-2 border-brand-ink" />
          </div>

          {/* Firebase Configuration Warnings */}
          {!isFirebaseConfigured() && (
            <div className="mb-6 p-4 bg-brand-orange/15 text-brand-ink text-xs font-semibold border-2 border-brand-ink rounded-md flex gap-3 items-start shadow-comic-sm">
              <CustomWarningIcon className="text-brand-orange shrink-0 mt-0.5" size={18} />
              <div className="leading-relaxed">
                <strong className="block text-sm font-bold uppercase mb-1">Firebase Unconfigured</strong>
                {FIREBASE_SETUP_MESSAGE}
              </div>
            </div>
          )}

          {/* Error Message Display */}
          {error && (
            <div className="mb-6 p-3 bg-brand-pink/15 text-brand-ink text-xs font-bold border-2 border-brand-ink rounded-md flex gap-2 items-center shadow-comic-sm">
              <CustomWarningIcon className="text-brand-pink shrink-0" size={16} />
              <span className="uppercase tracking-wide">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-brand-ink/65 tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <CustomMailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink/40" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border-2 border-brand-ink rounded-md py-3 pl-11 pr-4 focus:outline-none focus:border-brand-pink text-sm text-brand-ink font-bold placeholder:text-brand-ink/30 transition-colors shadow-inner"
                  placeholder="admin@aarambh.jklu.edu.in"
                  required
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-brand-ink/65 tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <CustomLockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink/40" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-2 border-brand-ink rounded-md py-3 pl-11 pr-11 focus:outline-none focus:border-brand-pink text-sm text-brand-ink font-bold placeholder:text-brand-ink/30 transition-colors shadow-inner"
                  placeholder="••••••••"
                  required
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-ink/40 hover:text-brand-ink focus:outline-none cursor-pointer transition-colors"
                >
                  {showPassword ? <CustomEyeOffIcon size={16} /> : <CustomEyeIcon size={16} />}
                </button>
              </div>
            </div>

            {/* Submission Button */}
            <button
              type="submit"
              disabled={loading}
              suppressHydrationWarning
              className="w-full bg-brand-orange hover:bg-[#E68A00] text-brand-ink font-black py-4 border-2 border-brand-ink shadow-[4px_4px_0px_0px_#030404] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#030404] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-100 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
            >
              {loading ? (
                <CustomLoaderIcon className="text-brand-ink" size={18} />
              ) : (
                <>
                  <CustomKeyIcon size={16} />
                  <span className="uppercase tracking-widest text-xs">Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-brand-ink/50 text-[10px] uppercase font-black tracking-[0.2em]">
          JK Lakshmipat University
        </p>
      </div>
    </div>
  );
}
