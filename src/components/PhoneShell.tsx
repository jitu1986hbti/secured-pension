import React, { useEffect, useState } from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';

interface PhoneShellProps {
  children: React.ReactNode;
}

export default function PhoneShell({ children }: PhoneShellProps) {
  const [timeStr, setTimeStr] = useState('16:25');

  // Continually update the device top clock to be accurate to actual user metadata local time
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-3 sm:p-6 select-none font-sans overflow-hidden">
      
      {/* Centering smartphone container frame desktop wrapper */}
      <div className="relative w-full max-w-[390px] h-[812px] bg-[#f7f9fb] rounded-[52px] border-[10px] border-slate-950 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col shrink-0 animate-fade-in ring-1 ring-slate-800">
        
        {/* Device camera hardware notch bar standard */}
        <div className="absolute top-0 inset-x-0 h-8 bg-slate-950 z-[100] flex justify-between items-center px-6">
          {/* Top Bar Left: Clock time indicator */}
          <span className="text-[12px] font-bold text-white font-sans tracking-tight">
            {timeStr}
          </span>

          {/* Symmetrical camera pill notch centered */}
          <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-28 h-[22px] bg-slate-950 rounded-full z-[101] flex items-center justify-around px-3 border-x border-[#1a1b1e]">
            {/* Simple lens mirror circle indicator */}
            <div className="w-[8px] h-[8px] bg-indigo-950 rounded-full border border-slate-800 shrink-0" />
            <div className="w-[18px] h-[3px] bg-slate-900 rounded-full opacity-60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#0d0d1e] flex items-center justify-center border border-slate-800">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900 opacity-80" />
            </div>
          </div>

          {/* Top Bar Right: WiFi, Cellular Signal, Battery Indicators */}
          <div className="flex items-center gap-1.5 text-white">
            <Signal className="w-3.5 h-3.5 shrink-0" />
            <Wifi className="w-3.5 h-3.5 shrink-0" />
            <div className="flex items-center gap-0.5 relative">
              <span className="text-[9px] font-bold tracking-tight opacity-90 pr-0.5">98%</span>
              <Battery className="w-4.5 h-4.5 rotate-0 fill-white" />
            </div>
          </div>
        </div>

        {/* Content Viewport Housing individual Screens (with 32px padding-top for notch offset) */}
        <div className="flex-1 pt-8 relative flex flex-col overflow-hidden bg-[#f7f9fb]">
          {children}
        </div>

        {/* iOS Swift Interactive Home swipe bar indicator standard in high quality shells */}
        <div className="absolute bottom-[4px] inset-x-0 h-4 flex items-center justify-center pointer-events-none z-[100]">
          <div className="w-36 h-1.5 bg-[#191c1e] rounded-full opacity-90 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
}
