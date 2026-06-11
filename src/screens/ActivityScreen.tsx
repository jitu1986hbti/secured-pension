import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from '../hooks/useNavigation';
import BottomNavBar from '../components/BottomNavBar';
import { ArrowLeft, Bell, Sliders, ArrowUpRight, PlusCircle, RefreshCw, HelpCircle, Inbox } from 'lucide-react';

export default function ActivityScreen() {
  const { navigate } = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);
  const activities = useSelector((state: RootState) => state.pension.activities);

  const [activeFilter, setActiveFilter] = useState<'all' | 'contribution' | 'tax_relief' | 'plan_change'>('all');

  const filteredActivities = activities.filter((act) => {
    if (activeFilter === 'all') return true;
    return act.type === activeFilter;
  });

  // Unique periods for headings
  const periods = Array.from(new Set(filteredActivities.map((act) => act.period)));

  return (
    <div className="flex-grow bg-[#f7f9fb] flex flex-col justify-between overflow-y-auto no-scrollbar relative pb-16 font-sans">
      
      {/* Top Header bar */}
      <header className="px-5 py-4 w-full bg-white border-b border-[#c6c6cd]/30 h-16 flex justify-between items-center z-50 sticky top-0 md:relative">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('Profile')}
            className="w-8 h-8 rounded-full border border-[#c6c6cd]/40 overflow-hidden shadow-sm"
          >
            <img 
              alt="User" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'} 
            />
          </button>
          <span className="font-extrabold text-slate-900 text-md">Welcome Back</span>
        </div>
        <button 
          onClick={() => alert('No unread notifications')}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-800"
        >
          <Bell className="w-5 h-5 text-slate-800" />
        </button>
      </header>

      {/* Main scrolling core contents */}
      <main className="flex-1 px-5 py-5 space-y-5">
        
        {/* Horizontal scrollable Filter Segmented Buttons bar layout */}
        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-[#c6c6cd]/50 shadow-sm">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 shrink">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'all' 
                  ? 'bg-[#86f2e4] text-[#006f66]' 
                  : 'text-[#45464d] hover:bg-slate-50'
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => setActiveFilter('contribution')}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'contribution' 
                  ? 'bg-[#86f2e4] text-[#006f66]' 
                  : 'text-[#45464d] hover:bg-slate-50'
              }`}
            >
              Contributions
            </button>
            <button
              onClick={() => setActiveFilter('tax_relief')}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'tax_relief' 
                  ? 'bg-[#86f2e4] text-[#006f66]' 
                  : 'text-[#45464d] hover:bg-slate-50'
              }`}
            >
              Tax Relief
            </button>
            <button
              onClick={() => setActiveFilter('plan_change')}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-full transition-all whitespace-nowrap ${
                activeFilter === 'plan_change' 
                  ? 'bg-[#86f2e4] text-[#006f66]' 
                  : 'text-[#45464d] hover:bg-slate-50'
              }`}
            >
              Plan Changes
            </button>
          </div>
          
          <button 
            onClick={() => alert("Sliders configuration filters unlocked in future updates.")}
            className="p-1.5 text-[#76777d] hover:text-slate-900 border-l border-slate-100 pl-2 shrink-0 select-none"
          >
            <Sliders className="w-4 h-4 text-[#76777d]" />
          </button>
        </div>

        {/* Dynamic chronology timeline sections */}
        {periods.length > 0 ? (
          <div className="space-y-6">
            {periods.map((period) => {
              const periodActs = filteredActivities.filter((act) => act.period === period);
              
              return (
                <section key={period} className="space-y-3">
                  <h3 className="text-[10px] font-bold uppercase text-[#76777d] tracking-widest pl-1">
                    {period}
                  </h3>

                  <div className="space-y-3">
                    {periodActs.map((act) => (
                      <div
                        key={act.id}
                        className="bg-white border border-[#c6c6cd]/50 rounded-xl p-4 flex items-center justify-between hover:border-[#006a61] transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            act.type === 'contribution' ? 'bg-[#86f2e4]/20 text-[#006a61]' :
                            act.type === 'tax_relief' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {act.type === 'contribution' ? <ArrowUpRight className="w-5 h-5 stroke-[2.5]" /> :
                             act.type === 'tax_relief' ? <PlusCircle className="w-5 h-5 stroke-[2]" /> : <RefreshCw className="w-5 h-5 stroke-[2]" />}
                          </div>

                          <div>
                            <h4 className="text-xs font-black text-[#191c1e] group-hover:text-[#006a61] transition-colors leading-snug">
                              {act.title}
                            </h4>
                            <p className="text-[10px] text-[#45464d] mt-0.5 leading-snug">
                              {act.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          {act.amount ? (
                            <p className="text-xs font-extrabold text-[#006a61]">+£{act.amount.toFixed(2)}</p>
                          ) : (
                            <p className="text-[10px] font-bold text-slate-900 bg-slate-100 px-2 rounded-full py-0.5">{act.statusText}</p>
                          )}
                          <p className="text-[9px] text-[#76777d] mt-1 font-bold">{act.dateStr}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          /* Empty Timeline query block fall-back */
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <Inbox className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#191c1e]">No activities found</p>
              <p className="text-xs text-[#45464d] px-8 max-w-xs mt-1">
                Try selecting a different filter above to display security entries.
              </p>
            </div>
          </div>
        )}
      </main>

      <BottomNavBar activeScreen="Activity" />
    </div>
  );
}
