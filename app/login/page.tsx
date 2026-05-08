'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Check role
      const roleDoc = await getDoc(doc(db, 'roles', uid));
      if (roleDoc.exists()) {
        const role = roleDoc.data().role;
        if (role === 'admin') {
          router.push('/admin');
        } else if (role === 'scanner') {
          router.push('/scanner');
        } else {
          setError('Invalid role assigned.');
        }
      } else {
        // Fallback for missing role document
        setError('Unauthorized account.');
        auth.signOut();
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('This domain (localhost) is not authorized in Firebase Console.');
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-admin-bg text-admin-text font-adminBody flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-admin-surface border border-admin-border rounded-xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="font-adminHeading text-3xl font-bold mb-2">Aarambh Portal</h1>
          <p className="text-admin-muted text-sm">Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-admin-muted">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" size={18} />
              <input
                type="email"
                suppressHydrationWarning={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent transition-colors"
                placeholder="admin@aarambh.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-admin-muted">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-muted" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-admin-accent focus:ring-1 focus:ring-admin-accent transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-admin-accent hover:bg-yellow-500 text-black font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
