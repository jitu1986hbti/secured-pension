import React, { useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { ShieldAlert, Landmark, ShieldCheck, KeyRound, LockKeyhole } from 'lucide-react';

export default function SplashScreen() {
  const { navigate } = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('SignIn');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      onClick={() => navigate('SignIn')}
      className="flex-1 bg-slate-950 flex flex-col justify-between items-center py-12 px-6 cursor-pointer select-none relative overflow-hidden"
    >
      {/* Decorative gradient glowing ambient blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-teal-500/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[50%] bg-blue-500/10 rounded-full blur-[80px]" />

      <div />

      {/* Main Lock Graphic Group */}
      <div className="flex flex-col items-center z-10 animate-fade-in text-center">
        <div className="mb-8 relative flex items-center justify-center">
          {/* Padlock layout with visual golden gradient feel */}
          <div className="w-32 h-32 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center shadow-2xl relative">
            <LockKeyhole className="w-16 h-16 text-teal-400 animate-pulse" />
            <div className="absolute -top-3 -right-3 bg-teal-500 w-8 h-8 rounded-full flex items-center justify-center border border-slate-950 shadow-md">
              <ShieldCheck className="w-4 h-4 text-slate-950" />
            </div>
          </div>
          <div className="absolute -inset-4 border border-teal-500/10 rounded-[40px] animate-pulse duration-[3000ms]" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-sans">
          Secured Pension
        </h1>
        <p className="text-sm font-medium text-slate-400 tracking-wide font-sans px-4">
          Safeguarding your financial future.
        </p>
      </div>

      {/* Corporate Footnotes and regulator badges */}
      <div className="flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] uppercase font-bold text-teal-500 tracking-widest bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          FCA Regulated &amp; FSCS Protected
        </span>
        <span className="text-[10px] text-slate-500 opacity-60">
          256-Bit Financial Grade Cryptography
        </span>
      </div>
    </div>
  );
}
