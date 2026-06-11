import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from '../hooks/useNavigation';
import { addContribution, changeInvestmentPlan } from '../store/pensionSlice';
import BottomNavBar from '../components/BottomNavBar';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { Bell, ArrowUpRight, ArrowUpCircle, RefreshCw, PlusCircle, Check, ArrowRight, TrendingUp } from 'lucide-react';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);
  const pension = useSelector((state: RootState) => state.pension);

  // Growth chart filter scale
  const [timeframe, setTimeframe] = useState<'1Y' | 'ALL'>('1Y');
  
  // Interactive Modal state triggers
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [showPlanChange, setShowPlanChange] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const chartData = timeframe === '1Y' ? pension.growthData1Y : pension.growthDataAll;

  const handleTopUpConfirm = () => {
    const numericAmount = parseFloat(topUpAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    dispatch(addContribution(numericAmount));
    setShowTopUp(false);
    setTopUpAmount('');
    alert(`Top-up of £${numericAmount.toLocaleString()} successfully processed and added to your portfolio value!`);
  };

  const handlePlanConfirm = () => {
    if (!selectedPlan) return;
    dispatch(changeInvestmentPlan({
      planName: `${selectedPlan} Strategy`,
      description: `Risk profile shifted to high yield ${selectedPlan.toLowerCase()} investment parameters`
    }));
    setShowPlanChange(false);
    alert(`Your pension investment strategy has been successfully updated to the ${selectedPlan} Strategy.`);
  };

  return (
    <div className="flex-grow bg-[#f7f9fb] flex flex-col justify-between overflow-y-auto no-scrollbar relative pb-16 font-sans">
      {/* Scrollable Main Content section */}
      <div className="flex-1 px-5 py-6 space-y-6">
        
        {/* Top Header Row Panel */}
        <header className="flex justify-between items-center transition-all">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('Profile')}
              className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm hover:opacity-90 cursor-pointer"
            >
              <img 
                alt="User profile avatar" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'} 
              />
            </button>
            <div>
              <span className="text-[11px] font-bold text-[#76777d] uppercase tracking-wider block">Welcome Back</span>
              <h2 className="text-md font-bold text-slate-900 -mt-0.5">{user?.name || 'Alexander Hamilton'}</h2>
            </div>
          </div>
          <button 
            onClick={() => alert(`Pension notifications are active. Stable release 4.2.1.`)}
            className="w-10 h-10 rounded-full bg-white border border-[#c6c6cd]/50 flex items-center justify-center hover:bg-slate-50 cursor-pointer text-[#191c1e]"
          >
            <Bell className="w-5 h-5 text-slate-800" />
          </button>
        </header>

        {/* Dynamic Pension Value summary panel */}
        <section className="bg-white border border-[#c6c6cd]/50 rounded-2xl p-5 shadow-sm space-y-1.5 transition-all hover:border-[#006a61]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-[#45464d]">Total Pension Value</span>
            <span className="text-[11px] font-bold px-2.5 py-1 bg-[#86f2e4] text-[#006f66] rounded-full">
              +{pension.yoyGrowth}% YoY
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            £{pension.totalValue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 text-[#006a61]">
            <TrendingUp className="w-4 h-4 text-[#006a61]" />
            <span className="text-xs font-semibold">
              £{pension.earnedThisMonth.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} earned this month
            </span>
          </div>
        </section>

        {/* Growth timeline area interactive graphs */}
        <section className="bg-white border border-[#c6c6cd]/50 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Portfolio Growth</h3>
            
            {/* Toggle tabs controls */}
            <div className="flex bg-[#eceef0] rounded-xl p-1">
              <button 
                onClick={() => setTimeframe('1Y')}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  timeframe === '1Y' ? 'bg-white text-slate-900 shadow-sm' : 'text-[#45464d]'
                }`}
              >
                1Y
              </button>
              <button 
                onClick={() => setTimeframe('ALL')}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  timeframe === 'ALL' ? 'bg-white text-slate-900 shadow-sm' : 'text-[#45464d]'
                }`}
              >
                ALL
              </button>
            </div>
          </div>

          {/* Core SVG Recharts drawing layer */}
          <div className="h-44 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#86f2e4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#86f2e4" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ background: '#191c1e', border: 'none', borderRadius: '12px', color: '#ffdbca' }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '11px', color: 'white' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#006a61" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#chartColor)" 
                />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Floating visual indicator overlay */}
            <div className="absolute top-[35%] right-[20%] flex flex-col items-center">
              <div className="w-3 h-3 bg-[#006a61] rounded-full ring-4 ring-[#86f2e4]/60"></div>
              <div className="mt-1 bg-[#191c1e] text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-md">
                £{(pension.totalValue / 1000).toFixed(0)}k
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[#76777d] text-[10px] font-bold tracking-wider pt-2 border-t border-slate-100">
            {timeframe === '1Y' ? (
              <>
                <span>SEP 2023</span>
                <span>JAN 2024</span>
                <span>AUG 2024</span>
              </>
            ) : (
              <>
                <span>2018</span>
                <span>2021</span>
                <span>2024</span>
              </>
            )}
          </div>
        </section>

        {/* Dynamic actions grid layout */}
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 px-1">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            
            {/* Action 1 trigger */}
            <button 
              onClick={() => setShowTopUp(true)}
              className="bg-black hover:bg-slate-900 text-white rounded-2xl p-5 flex flex-col items-start gap-4 transition-all active:scale-95 text-left shadow-sm group"
            >
              <PlusCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold leading-tight">Top up contribution</span>
            </button>

            {/* Action 2 trigger */}
            <button 
              onClick={() => setShowPlanChange(true)}
              className="bg-white hover:bg-slate-50 border border-[#c6c6cd]/50 text-slate-900 rounded-2xl p-5 flex flex-col items-start gap-4 transition-all active:scale-95 text-left shadow-sm group"
            >
              <ArrowUpCircle className="w-7 h-7 text-[#006a61] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold leading-tight text-[#191c1e]">Change Strategy</span>
            </button>
          </div>
        </section>

        {/* Snapshot recent logs list */}
        <section className="bg-white border border-[#c6c6cd]/50 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-[#c6c6cd]/30 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
            <button 
              onClick={() => navigate('Activity')}
              className="text-[#006a61] text-xs font-bold hover:underline"
            >
              View All
            </button>
          </div>
          
          <div className="divide-y divide-slate-100">
            {pension.activities.slice(0, 2).map((act) => (
              <div 
                key={act.id} 
                onClick={() => navigate('Activity')}
                className="px-5 py-4 flex items-center justify-between hover:bg-slate-50/50 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    act.type === 'contribution' ? 'bg-[#86f2e4]/30 text-[#006a61]' :
                    act.type === 'tax_relief' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {act.type === 'contribution' ? <ArrowUpRight className="w-4.5 h-4.5" /> : 
                     act.type === 'tax_relief' ? <PlusCircle className="w-4.5 h-4.5" /> : <RefreshCw className="w-4.5 h-4.5" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{act.title}</h4>
                    <p className="text-[10px] text-[#76777d] font-semibold mt-0.5">{act.dateStr}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  {act.amount ? (
                    <span className="text-xs font-extrabold text-[#006a61]">+£{act.amount.toFixed(2)}</span>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full">{act.statusText}</span>
                  )}
                  <p className="text-[9px] text-[#76777d] font-semibold">Success</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Renders Bottom Navigation tabs */}
      <BottomNavBar activeScreen="Home" />

      {/* Interactive top-up cash modal */}
      {showTopUp && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-end justify-center z-[90] animate-fade-in font-sans">
          <div className="bg-white rounded-t-[30px] w-full p-6 space-y-5 pb-8 shadow-2xl relative animate-slide-up">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto" />
            
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-950">Top Up Pension</h3>
              <p className="text-xs text-[#76777d]">Transfer manual funds directly to compounding high-yield assets.</p>
            </div>

            {/* Quick value grids triggers */}
            <div className="grid grid-cols-4 gap-2">
              {['250', '500', '1000', '2500'].map((val) => (
                <button
                  key={val}
                  onClick={() => setTopUpAmount(val)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border border-slate-200 transition-colors ${
                    topUpAmount === val ? 'bg-[#131b2e] text-white border-transparent' : 'bg-slate-50 text-slate-800'
                  }`}
                >
                  +£{parseInt(val).toLocaleString()}
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 px-1">Or enter custom amount (£)</label>
              <input
                type="number"
                placeholder="e.g. 1500"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-950 font-bold font-sans text-sm outline-none focus:border-[#006a61]"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowTopUp(false); setTopUpAmount(''); }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleTopUpConfirm}
                className="flex-[2] bg-black hover:bg-slate-950 text-white py-3 rounded-xl text-xs font-bold"
              >
                Confirm Deposit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive strategy planning modal */}
      {showPlanChange && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-end justify-center z-[90] animate-fade-in font-sans">
          <div className="bg-white rounded-t-[30px] w-full p-6 space-y-5 pb-8 shadow-2xl relative animate-slide-up">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto" />
            
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-950">Change Pension Strategy</h3>
              <p className="text-xs text-[#76777d]">Choose a strategic allocation designed for your retirement path.</p>
            </div>

            {/* List options triggers */}
            <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
              {['Conservative Stable', 'Balanced Multi-Asset', 'Active Growth Strategy', 'Sustainable Green ESG'].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-colors ${
                    selectedPlan === plan 
                      ? 'bg-[#86f2e4]/20 border-[#006a61] text-[#006f66]' 
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold block">{plan}</span>
                    <span className="text-[10px] text-[#76777d] mt-0.5 block">
                      {plan.includes('Conserv') && 'Target yield: 3-5% • Zero market fluctuations'}
                      {plan.includes('Balanc') && 'Target yield: 6-8% • Balanced market securities'}
                      {plan.includes('Growth') && 'Target yield: 9-11% • Tech-forward high equity ratios'}
                      {plan.includes('Green') && 'Target yield: 5-7% • Organic carbon-neutral equities'}
                    </span>
                  </div>
                  {selectedPlan === plan && <Check className="w-5 h-5 text-[#006a61]" />}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShowPlanChange(false); setSelectedPlan(''); }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handlePlanConfirm}
                disabled={!selectedPlan}
                className="flex-[2] bg-black hover:bg-slate-950 disabled:opacity-40 text-white py-3 rounded-xl text-xs font-bold"
              >
                Update Assets Allocation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
