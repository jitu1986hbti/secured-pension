import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from '../hooks/useNavigation';
import { logout, togglePushNotifications, toggleBiometricLoginSetting } from '../store/authSlice';
import BottomNavBar from '../components/BottomNavBar';
import { ShieldCheck, User, Shield, FileText, BellRing, Fingerprint, LogOut, Verified, Bell, ChevronRight } from 'lucide-react';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of your Secured Pension vault?')) {
      dispatch(logout());
      navigate('SignIn');
    }
  };

  const handleSettingClick = (setting: string) => {
    alert(`Accessing ${setting} safe panel... Verification link successfully matched.`);
  };

  return (
    <div className="flex-grow bg-[#f7f9fb] flex flex-col justify-between overflow-y-auto no-scrollbar relative pb-16 font-sans">
      
      {/* Top Header bar */}
      <header className="px-5 py-4 w-full bg-white border-b border-[#c6c6cd]/30 h-16 flex justify-between items-center z-50 sticky top-0 md:relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#c6c6cd]/50 overflow-hidden shadow-sm">
            <img 
              alt="Profile" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'} 
            />
          </div>
          <h1 className="font-extrabold text-slate-900 text-md">Welcome Back</h1>
        </div>
        <button 
          onClick={() => alert('App notifications settings are synchronized.')}
          className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-slate-100 text-slate-800"
        >
          <Bell className="w-5 h-5 text-slate-800" />
        </button>
      </header>

      {/* Main layout contents */}
      <main className="flex-1 px-5 py-5 space-y-6">
        
        {/* Profile tier bento summary card */}
        <section className="bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-[#c6c6cd]/50 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold text-[#7c839b] uppercase tracking-wider mb-0.5">Current Plan</p>
              <h2 className="text-lg font-extrabold text-slate-950 tracking-tight">{user?.planName || 'Gold Retirement Tier'}</h2>
            </div>
            
            <div className="h-10 w-10 bg-[#86f2e4] text-[#006f66] rounded-full flex items-center justify-center">
              <Verified className="w-5 h-5 fill-[#006f66] stroke-white" />
            </div>
          </div>

          <div className="flex gap-8 pt-2 border-t border-slate-100">
            <div>
              <p className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider mb-0.5">Retirement Age</p>
              <p className="text-xs font-bold text-slate-950">{user?.retirementAge || 65} Years</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#76777d] uppercase tracking-wider mb-0.5">Member Since</p>
              <p className="text-xs font-bold text-slate-950">{user?.memberSince || 'Jan 2018'}</p>
            </div>
          </div>
        </section>

        {/* Account options block */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-extrabold text-[#76777d] uppercase tracking-wider pl-1">Account Settings</h3>
          <div className="bg-white rounded-2xl border border-[#c6c6cd]/50 overflow-hidden shadow-xs divide-y divide-slate-100">
            
            {/* Setting 1 */}
            <div 
              onClick={() => handleSettingClick('Personal Information')}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <User className="w-5 h-5 text-[#006a61]" />
                <div>
                  <p className="text-xs font-bold text-slate-950 leading-none">Personal Information</p>
                  <p className="text-[10px] text-[#76777d] mt-1 font-semibold leading-none">Manage your contact details</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#76777d] group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Setting 2 */}
            <div 
              onClick={() => handleSettingClick('Security & Privacy')}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <Shield className="w-5 h-5 text-[#006a61]" />
                <div>
                  <p className="text-xs font-bold text-slate-950 leading-none">Security &amp; Privacy</p>
                  <p className="text-[10px] text-[#76777d] mt-1 font-semibold leading-none">2FA, Biometrics, Password</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#76777d] group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Setting 3 */}
            <div 
              onClick={() => handleSettingClick('Documents & Statements')}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <FileText className="w-5 h-5 text-[#006a61]" />
                <div>
                  <p className="text-xs font-bold text-slate-950 leading-none">Documents &amp; Statements</p>
                  <p className="text-[10px] text-[#76777d] mt-1 font-semibold leading-none">Annual reports and certificates</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#76777d] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </section>

        {/* Preferences Toggle boxes */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-extrabold text-[#76777d] uppercase tracking-wider pl-1">Preferences</h3>
          <div className="bg-white rounded-2xl border border-[#c6c6cd]/50 overflow-hidden shadow-xs divide-y divide-slate-100">
            
            {/* Preference item 1 */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3.5">
                <BellRing className="w-5 h-5 text-[#006a61]" />
                <p className="text-xs font-bold text-slate-950">Push Notifications</p>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={user?.preferences.pushNotifications || false}
                  onChange={() => dispatch(togglePushNotifications())}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006a61]"></div>
              </label>
            </div>

            {/* Preference item 2 */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3.5">
                <Fingerprint className="w-5 h-5 text-[#006a61]" />
                <p className="text-xs font-bold text-slate-950">Biometric Login</p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={user?.preferences.biometricLogin || false}
                  onChange={() => dispatch(toggleBiometricLoginSetting())}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006a61]"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Danger zone log out trigger */}
        <section className="pt-2">
          <button 
            type="button"
            onClick={handleLogout}
            className="w-full bg-white border border-red-200 hover:bg-red-50 text-red-600 font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-[0.98]"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
          
          <p className="text-center text-[10px] text-[#76777d] mt-4 font-semibold opacity-60">
            App Version 4.2.1-stable
          </p>
        </section>
      </main>

      <BottomNavBar activeScreen="Profile" />
    </div>
  );
}
