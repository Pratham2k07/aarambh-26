'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured, FIREBASE_SETUP_MESSAGE } from '../../lib/firebase';
import { Lock, Mail, Loader2, Eye, EyeOff } from 'lucide-react';

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

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const roleDoc = await getDoc(doc(db, 'roles', uid));
      if (roleDoc.exists()) {
        const role = roleDoc.data().role;
        if (role === 'admin') router.push('/admin');
        else if (role === 'scanner') router.push('/scanner');
        else setError('Access denied: Invalid role.');
      } else {
        setError('Unauthorized account.');
        await auth.signOut();
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[360px]">
        {/* Simple Header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-yellow-400 mx-auto mb-4 flex items-center justify-center">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">AARAMBH &apos;26</h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Management Portal</p>
        </div>

        {/* Simple Light Card */}
        <div className="bg-white border-2 border-gray-200 p-8">
          {!isFirebaseConfigured() && (
            <div className="mb-6 p-4 bg-orange-50 text-orange-900 text-xs font-semibold border border-orange-200 text-left rounded leading-relaxed">
              <strong className="block text-sm font-bold mb-1 uppercase tracking-tight text-orange-950">Firebase Unconfigured</strong>
              {FIREBASE_SETUP_MESSAGE}
            </div>
          )}
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 text-xs font-bold border border-red-100 text-center uppercase">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-none py-2.5 pl-10 pr-4 focus:outline-none focus:border-yellow-400 text-sm text-gray-900"
                  placeholder="admin@jklu.edu.in"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-none py-2.5 pl-10 pr-10 focus:outline-none focus:border-yellow-400 text-sm text-gray-900"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black font-bold py-3 transition-colors flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <span className="uppercase tracking-widest text-[10px]">Sign In</span>}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-gray-400 text-[10px] uppercase font-bold tracking-widest">
          JK Lakshmipat University
        </p>
      </div>
    </div>
  );
}
