'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured, FIREBASE_SETUP_MESSAGE } from '../../lib/firebase';
import { Html5Qrcode } from 'html5-qrcode';
import { Loader2, LogOut, Camera, Check, X, User, AlertCircle, Mail, Phone, ShieldCheck, MapPin } from 'lucide-react';

export default function ScannerView() {
  const [loading, setLoading] = useState(true);
  const [scannerAccount, setScannerAccount] = useState<any>(null);
  const [scannedData, setScannedData] = useState<any>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'idle', message: string }>({ type: 'idle', message: '' });
  const [cameraError, setCameraError] = useState(false);
  const [processingAction, setProcessingAction] = useState(false);
  const router = useRouter();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanning = useRef(true);

  useEffect(() => {
    if (!isFirebaseConfigured() || !auth || !db) {
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
        if (roleDoc.exists() && roleDoc.data().role === 'scanner') {
          const accountDoc = await getDoc(doc(db, 'scannerAccounts', user.uid));
          if (accountDoc.exists()) {
            setScannerAccount(accountDoc.data());
            setLoading(false);
          } else {
            router.push('/login');
          }
        } else {
          router.push('/login');
        }
      } catch (err) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!loading && scannerAccount && !scannedData) {
      const startScanner = async () => {
        try {
          const scanner = new Html5Qrcode("qr-reader");
          scannerRef.current = scanner;
          
          await scanner.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            onScanSuccess,
            () => {}
          );
          isScanning.current = true;
        } catch (e) {
          setCameraError(true);
        }
      };
      startScanner();
    }

    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [loading, scannerAccount, scannedData]);

  const onScanSuccess = async (decodedText: string) => {
    if (!isScanning.current) return;
    isScanning.current = false;

    try {
      const regID = decodedText.trim();
      const regDoc = await getDoc(doc(db, 'registrations', regID));

      if (!regDoc.exists()) {
        setStatus({ type: 'error', message: 'INVALID QR CODE' });
        setTimeout(() => {
          setStatus({ type: 'idle', message: '' });
          isScanning.current = true;
        }, 2000);
      } else {
        const data = regDoc.data();
        setScannedData({ ...data, id: regID });
        if (scannerRef.current) await scannerRef.current.stop();
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'FETCH ERROR' });
      isScanning.current = true;
    }
  };

  const handleAction = async (approved: boolean) => {
    if (processingAction || !scannedData) return;
    setProcessingAction(true);

    try {
      if (approved) {
        if (scannedData.hasEntered) {
          setStatus({ type: 'error', message: 'ALREADY ENTERED' });
        } else {
          await updateDoc(doc(db, 'registrations', scannedData.id), {
            hasEntered: true,
            enteredAt: serverTimestamp(),
            enteredBy: scannerAccount.volunteerName
          });
          
          await addDoc(collection(db, 'scanLogs'), {
            scannerId: scannerAccount.scannerId,
            volunteerName: scannerAccount.volunteerName,
            registrationID: scannedData.id,
            attendeeName: scannedData.name,
            timestamp: serverTimestamp(),
            result: 'accepted'
          });
          
          setStatus({ type: 'success', message: 'ENTRY APPROVED' });
        }
      } else {
        setStatus({ type: 'idle', message: 'ENTRY DECLINED' });
      }
    } catch (e) {
      setStatus({ type: 'error', message: 'ACTION FAILED' });
    }

    setTimeout(() => {
      setScannedData(null);
      setStatus({ type: 'idle', message: '' });
      setProcessingAction(false);
    }, 2000);
  };

  const handleLogout = async () => {
    if (auth) await auth.signOut();
    router.push('/login');
  };

  if (!isFirebaseConfigured()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white border-2 border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-red-500 mb-4 uppercase tracking-tight">Firebase Unconfigured</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            {FIREBASE_SETUP_MESSAGE}
          </p>
          <div className="text-xs bg-gray-100 p-4 border border-gray-200 rounded text-left font-mono overflow-x-auto text-gray-500">
            1. Copy .env.example to .env.local<br/>
            2. Fill in your Firebase configuration keys
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader2 className="animate-spin text-yellow-500" size={32} /></div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col overflow-hidden">
      <header className="bg-yellow-400 p-4 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-3">
          <Camera size={20} />
          <div>
            <h1 className="font-bold text-base">Gate Control</h1>
            <p className="text-[10px] uppercase font-bold text-black/60">{scannerAccount?.volunteerName}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="p-2 cursor-pointer hover:bg-black/5 rounded-full transition-colors active:bg-black/10"><LogOut size={18} /></button>
      </header>

      <main className="flex-1 flex flex-col items-center p-6 gap-6 overflow-hidden">
        {status.message && (
          <div className={`w-full max-w-md p-4 border-2 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            status.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' :
            status.type === 'error' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-gray-100 border-gray-400 text-gray-600'
          }`}>
            {status.type === 'success' ? <Check size={20} /> : <AlertCircle size={20} />}
            <span className="font-bold uppercase text-xs tracking-widest">{status.message}</span>
          </div>
        )}

        {!scannedData ? (
          <>
            <div className="w-full max-w-sm aspect-square bg-gray-100 border-2 border-gray-200 overflow-hidden relative shadow-inner">
              {cameraError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <AlertCircle className="text-gray-400 mb-2" size={32} />
                  <p className="text-xs font-bold text-gray-400 uppercase">Camera Blocked</p>
                </div>
              ) : (
                <div id="qr-reader" className="w-full h-full"></div>
              )}
            </div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">Scanning Live...</p>
          </>
        ) : (
          <div className="w-full max-w-md bg-white border-4 border-gray-900 p-6 flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden max-h-[85vh]">
            <div className="flex justify-between items-start mb-4 flex-shrink-0">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">Verify Entry</h2>
              <div className={`px-2 py-1 text-[10px] font-black uppercase border ${scannedData.hasEntered ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'}`}>
                {scannedData.hasEntered ? 'Already In' : 'New Entry'}
              </div>
            </div>

            <div className="space-y-6 overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-gray-200">
              {/* Student Info */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0 border border-gray-200"><User size={20} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Student Name</p>
                    <p className="font-bold text-xl leading-tight">{scannedData.name}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0 border border-gray-200"><Mail size={20} /></div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                    <p className="font-bold text-sm leading-tight break-all">{scannedData.email}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0 border border-gray-200"><Phone size={20} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Mobile Number</p>
                    <p className="font-bold text-lg leading-tight">{scannedData.phone}</p>
                  </div>
                </div>
              </div>

              {/* Family Details */}
              <div className="pt-4 border-t border-gray-200 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck size={14} className="text-gray-400" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Guardian Details</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Father</p>
                    <p className="font-bold text-sm">{scannedData.fatherName || 'N/A'}</p>
                    <p className="text-[10px] text-gray-500 font-mono mt-1">{scannedData.fatherMobile || '-'}</p>
                  </div>
                  <div className="bg-gray-50 p-3 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Mother</p>
                    <p className="font-bold text-sm">{scannedData.motherName || 'N/A'}</p>
                    <p className="text-[10px] text-gray-500 font-mono mt-1">{scannedData.motherMobile || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-gray-400" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Residential Address</p>
                </div>
                <div className="bg-gray-50 p-4 border border-gray-100">
                  <p className="text-xs font-bold text-gray-600 leading-relaxed uppercase tracking-tight">{scannedData.address || 'No address provided'}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 flex-shrink-0">
              <button 
                disabled={processingAction}
                onClick={() => handleAction(false)}
                className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 font-bold py-4 uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <X size={14} /> Decline
              </button>
              <button 
                disabled={processingAction || scannedData.hasEntered}
                onClick={() => handleAction(true)}
                className="bg-black hover:bg-zinc-800 active:bg-zinc-700 text-white font-bold py-4 uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer transition-colors"
              >
                <Check size={14} /> Approve
              </button>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        #qr-reader { border: none !important; width: 100% !important; height: 100% !important; }
        #qr-reader video { object-fit: cover !important; width: 100% !important; height: 100% !important; }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
      `}</style>
    </div>
  );
}
