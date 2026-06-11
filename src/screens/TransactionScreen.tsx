import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from '../hooks/useNavigation';
import BottomNavBar from '../components/BottomNavBar';
import { Search, ChevronRight, TrendingUp, HelpCircle, ArrowUpRight, HelpCircle as Handshake, Landmark as Wallet, Bell, SlidersHorizontal, Info } from 'lucide-react';

export default function TransactionScreen() {
  const { navigate } = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);
  const pension = useSelector((state: RootState) => state.pension);

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'contribution' | 'match' | 'fee'>('all');

  const filteredTransactions = pension.transactions.filter((tx) => {
    // Search matching logic (title or category)
    const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type matching logic
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  // Date groups (Today, October 2023, September 2023, etc.)
  const periods = Array.from(new Set(filteredTransactions.map((tx) => tx.period)));

  return (
    <div className="flex-grow bg-[#f7f9fb] flex flex-col justify-between overflow-y-auto no-scrollbar relative pb-16 font-sans">
      
      {/* Top Header Row Panel */}
      <header className="px-5 py-4 w-full bg-white border-b border-[#c6c6cd]/30 h-16 flex justify-between items-center z-50 sticky top-0 md:relative">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('Profile')}
            className="w-10 h-10 rounded-full border border-gray-100 overflow-hidden shadow-sm"
          >
            <img 
              alt="UserProfile" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'} 
            />
          </button>
          <h1 className="font-extrabold text-slate-900 text-md">Transactions</h1>
        </div>
        <button 
          onClick={() => alert('No unread transaction alerts')}
          className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-slate-100 text-slate-800"
        >
          <Bell className="w-5 h-5 text-slate-800" />
        </button>
      </header>

      {/* Main scrolling layout content */}
      <main className="flex-1 px-5 py-5 space-y-5">
        
        {/* Search input with live simulation filters */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#76777d]" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#c6c6cd] rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#006a61] transition-all shadow-xs text-slate-800 font-sans font-medium"
          />
        </div>

        {/* Dynamic filters tags bar row */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <button 
            onClick={() => { setTypeFilter('all'); setSearchQuery(''); }}
            className={`px-4 py-2 text-[11px] font-bold rounded-full border transition-all whitespace-nowrap flex items-center gap-1 ${
              typeFilter === 'all' 
                ? 'bg-[#86f2e4] text-[#006f66] border-transparent shadow-xs' 
                : 'bg-white text-[#45464d] border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Time
          </button>
          
          <button 
            onClick={() => setTypeFilter(typeFilter === 'contribution' ? 'all' : 'contribution')}
            className={`px-4 py-2 text-[11px] font-bold rounded-full border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              typeFilter === 'contribution' 
                ? 'bg-[#86f2e4] text-[#006f66] border-transparent shadow-xs' 
                : 'bg-white text-[#45464d] border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>Type: Contributions</span>
          </button>
          
          <button 
            onClick={() => setTypeFilter(typeFilter === 'match' ? 'all' : 'match')}
            className={`px-4 py-2 text-[11px] font-bold rounded-full border transition-all whitespace-nowrap flex items-center gap-1.5 ${
              typeFilter === 'match' 
                ? 'bg-[#86f2e4] text-[#006f66] border-transparent shadow-xs' 
                : 'bg-white text-[#45464d] border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>Type: Matches</span>
          </button>
        </div>

        {/* Ledger Transaction group lists sections */}
        <div className="space-y-6">
          {periods.slice(0, 1).map((period) => {
            const periodTxs = filteredTransactions.filter((tx) => tx.period === period);
            return (
              <section key={period} className="space-y-3">
                <h2 className="text-[10px] font-bold uppercase text-[#76777d] tracking-widest pl-1">{period}</h2>
                <div className="space-y-3">
                  {periodTxs.map((tx) => (
                    <div 
                      key={tx.id} 
                      onClick={() => alert(`Transaction reference ID: ${tx.id}\nCategory: ${tx.category}\nStatus: ${tx.status}`)}
                      className="bg-white border border-[#c6c6cd]/50 rounded-2xl p-4 flex items-center gap-3.5 hover:border-[#006a61] cursor-pointer transition-colors group"
                    >
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                        tx.type === 'contribution' ? 'bg-[#89f5e7] text-[#005049]' :
                        tx.type === 'match' ? 'bg-[#ffdbca] text-[#763300]' :
                        tx.type === 'fee' ? 'bg-slate-100 text-[#45464d]' : 'bg-[#dae2fd] text-blue-900'
                      }`}>
                        {tx.type === 'contribution' ? <TrendingUp className="w-5 h-5 stroke-[2]" /> :
                         tx.type === 'match' ? <ArrowUpRight className="w-5 h-5 stroke-[2.5]" /> : <Wallet className="w-5 h-5" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                          <h3 className="text-xs font-bold text-slate-900 truncate pr-2">{tx.title}</h3>
                          <span className={`text-[13px] font-extrabold ${tx.amount > 0 ? 'text-[#006a61]' : 'text-slate-900'}`}>
                            {tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <p className="text-[#45464d] font-semibold truncate pr-2">
                            {tx.category} • {tx.status}
                          </p>
                          <ChevronRight className="w-4 h-4 text-[#76777d] group-hover:text-[#006a61] group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Asymmetric Portfolio Growth Insight Graphic Card standard in screenshot */}
          {periods.includes('October 2023') && (
            <section className="bg-[#131b2e] text-white rounded-2xl p-5 relative overflow-hidden shadow-md">
              <div className="relative z-10 space-y-4">
                <div>
                  <h3 className="text-sm font-extrabold mb-0.5 tracking-wide">Growth Summary</h3>
                  <p className="text-[11px] text-[#7c839b] leading-relaxed">
                    Your contributions have increased by 12% compared to last quarter.
                  </p>
                </div>
                
                <div className="flex items-end gap-2 pt-2">
                  <div className="w-8 bg-[#006f66]/60 rounded-t-lg h-10 transition-all duration-700"></div>
                  <div className="w-8 bg-[#006f66]/80 rounded-t-lg h-16 transition-all duration-700"></div>
                  <div className="w-8 bg-[#86f2e4] h-28 rounded-t-lg shadow-sm transition-all duration-700"></div>
                  
                  <div className="ml-auto text-right space-y-0.5">
                    <span className="block text-[10px] uppercase font-bold text-[#7c839b] tracking-wider">Estimated Yield</span>
                    <span className="text-xl font-black text-[#86f2e4] tracking-tight">+8.4%</span>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#3f465c]/10 rounded-full blur-2xl"></div>
            </section>
          )}

          {/* Second transaction block group for rest of folders */}
          {periods.slice(1).map((period) => {
            const periodTxs = filteredTransactions.filter((tx) => tx.period === period);
            return (
              <section key={period} className="space-y-3">
                <h2 className="text-[10px] font-bold uppercase text-[#76777d] tracking-widest pl-1">{period}</h2>
                <div className="space-y-3">
                  {periodTxs.map((tx) => (
                    <div 
                      key={tx.id} 
                      onClick={() => alert(`Transaction ID: ${tx.id}\nCategory: ${tx.category}\nStatus: ${tx.status}`)}
                      className="bg-white border border-[#c6c6cd]/50 rounded-2xl p-4 flex items-center gap-3.5 hover:border-[#006a61] cursor-pointer transition-colors group"
                    >
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                        tx.type === 'contribution' ? 'bg-[#89f5e7] text-[#005049]' :
                        tx.type === 'match' ? 'bg-[#ffdbca] text-[#763300]' :
                        tx.type === 'fee' ? 'bg-slate-100 text-[#45464d]' : 'bg-[#dae2fd] text-blue-900'
                      }`}>
                        {tx.type === 'contribution' ? <TrendingUp className="w-5 h-5 stroke-[2]" /> :
                         tx.type === 'match' ? <ArrowUpRight className="w-5 h-5 stroke-[2.5]" /> : <Wallet className="w-5 h-5" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                          <h3 className="text-xs font-bold text-slate-900 truncate pr-2">{tx.title}</h3>
                          <span className={`text-[13px] font-extrabold ${tx.amount > 0 ? 'text-[#006a61]' : 'text-slate-900'}`}>
                            {tx.amount > 0 ? '+' : ''}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                          <p className="text-[#45464d] font-semibold truncate pr-2">
                            {tx.category} • {tx.status}
                          </p>
                          <ChevronRight className="w-4 h-4 text-[#76777d] group-hover:text-[#006a61] group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {filteredTransactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3.5 bg-white p-6 border border-[#c6c6cd]/50 rounded-2xl shadow-xs animate-fade-in">
              <div className="w-12 h-12 bg-slate-100 text-[#76777d] rounded-full flex items-center justify-center">
                <Info className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#191c1e]">No transactions match search</p>
                <p className="text-xs text-[#45464d] mt-0.5 max-w-xs leading-normal">
                  We couldn't find any deposits corresponding to "{searchQuery}". Try modifying your filters.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNavBar activeScreen="Transactions" />
    </div>
  );
}
