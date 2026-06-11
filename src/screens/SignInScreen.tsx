import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '../hooks/useNavigation';
import { RootState } from '../store';
import { loginRequest, openBiometricPrompt, clearError } from '../store/authSlice';
import { Mail, Lock, Eye, EyeOff, Landmark, ShieldCheck, Fingerprint, ScanFace } from 'lucide-react';

export default function SignInScreen() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(clearError());
    setFormError('');
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email) {
      setFormError('Email address is required');
      return;
    }
    if (!email.includes('@')) {
      setFormError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setFormError('Password is required');
      return;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    dispatch(loginRequest({ email, password }));
  };

  const handleBiometricClick = (type: 'FaceID' | 'TouchID') => {
    dispatch(openBiometricPrompt(type));
  };

  return (
    <div className="flex-1 bg-[#f7f9fb] flex flex-col px-6 py-8 overflow-y-auto no-scrollbar">
      {/* Visual background lighting accents */}
      <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#86f2e4]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-[#dae2fd]/20 rounded-full blur-[60px] pointer-events-none" />

      {/* Header Landmark Logo & Greetings */}
      <div className="flex flex-col items-center text-center mt-4 mb-8">
        <div className="w-16 h-16 bg-[#131b2e] rounded-2xl flex items-center justify-center shadow-md mb-4">
          <Landmark className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold font-sans text-[#191c1e] tracking-tight">
          Secured Pension
        </h1>
        <p className="text-sm text-[#45464d] mt-1 font-sans">
          Safeguarding your financial future.
        </p>
      </div>

      {/* Login Credentials Base Frame */}
      <div className="bg-white border border-[#c6c6cd]/50 rounded-2xl p-5 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input field */}
          <div>
            <label className="block text-xs font-semibold text-[#45464d] mb-1 pl-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#76777d]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-[#f7f9fb] border border-[#c6c6cd] rounded-xl text-sm focus:outline-none focus:border-[#006a61] transition-all placeholder-[#76777d]/60 font-sans text-slate-800"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex justify-between items-center mb-1 px-1">
              <label className="text-xs font-semibold text-[#45464d]">
                Password
              </label>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert("Verification code sent to registered contact."); }}
                className="text-xs text-[#006a61] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#76777d]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-[#f7f9fb] border border-[#c6c6cd] rounded-xl text-sm focus:outline-none focus:border-[#006a61] transition-all placeholder-[#76777d]/60 font-sans text-slate-800"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#76777d] hover:text-[#45464d]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error messages if validation triggers or Saga yields failures */}
          {(formError || error) && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl flex items-center font-sans">
              {formError || error}
            </div>
          )}

          {/* Sign In Primary Trigger */}
          <button
            type="submit"
            className="w-full bg-black text-white hover:bg-[#131b2e] py-3.5 rounded-xl text-sm font-semibold hover:shadow-md transition-all active:scale-[0.98] duration-200 flex justify-center items-center font-sans tracking-wide"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Authenticating...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Biometrics divider */}
        <div className="relative flex items-center py-4 mt-2">
          <div className="flex-grow border-t border-[#c6c6cd]/50"></div>
          <span className="flex-shrink mx-3 text-[10px] font-bold text-[#76777d] uppercase tracking-widest pl-1">
            Secure Quick Access
          </span>
          <div className="flex-grow border-t border-[#c6c6cd]/50"></div>
        </div>

        <p className="text-center text-xs text-[#45464d] mb-4">
          Use biometric authentication for faster access
        </p>

        {/* Dynamic biometric access grids */}
        <div className="grid grid-cols-2 gap-3.5">
          <button
            type="button"
            onClick={() => handleBiometricClick('FaceID')}
            className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-[#006a61] text-[#006a61] rounded-xl hover:bg-[#86f2e4]/10 transition-all active:scale-95 text-xs font-semibold"
          >
            <ScanFace className="w-5 h-5 text-[#006a61]" />
            <span>FaceID</span>
          </button>

          <button
            type="button"
            onClick={() => handleBiometricClick('TouchID')}
            className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-[#006a61] text-[#006a61] rounded-xl hover:bg-[#86f2e4]/10 transition-all active:scale-95 text-xs font-semibold"
          >
            <Fingerprint className="w-5 h-5 text-[#006a61]" />
            <span>TouchID</span>
          </button>
        </div>
      </div>

      {/* Account footer link hooks */}
      <div className="text-center mt-6">
        <p className="text-xs text-[#45464d] font-sans">
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('Register')} 
            className="text-[#006a61] font-semibold hover:underline bg-transparent border-none cursor-pointer"
          >
            Register now
          </button>
        </p>
        
        <div className="mt-5 flex items-center justify-center gap-4 text-xs font-medium text-[#76777d]">
          <a href="#" className="hover:text-[#191c1e] transition-colors">Privacy Policy</a>
          <span className="w-1 h-1 bg-[#c6c6cd] rounded-full"></span>
          <a href="#" className="hover:text-[#191c1e] transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Security level badges */}
      <div className="mt-8 flex items-center justify-center gap-1.5 px-4 py-2 bg-[#eceef0]/70 rounded-full border border-[#c6c6cd]/30 mx-auto w-fit">
        <ShieldCheck className="w-4 h-4 text-[#006a61]" />
        <span className="text-[11px] font-medium text-[#45464d] tracking-wide select-none">
          256-bit encrypted secure login
        </span>
      </div>
    </div>
  );
}
