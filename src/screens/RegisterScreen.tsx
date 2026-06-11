import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '../hooks/useNavigation';
import { RootState } from '../store';
import { registerRequest, clearError } from '../store/authSlice';
import { Landmark, ArrowRight, ShieldCheck, Check, Info } from 'lucide-react';

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [step, setStep] = useState(1);
  
  // Step 1 Inputs
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [niNumber, setNiNumber] = useState('');
  
  // Step 2 Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Step 3 Consent
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [localError, setLocalError] = useState('');

  // Reset errors on state shifts
  useEffect(() => {
    dispatch(clearError());
    setLocalError('');
  }, [step, dispatch]);

  const handleStep1Continue = () => {
    setLocalError('');
    if (!fullName) {
      setLocalError('Full legal name is required');
      return;
    }
    if (!dob) {
      setLocalError('Date of birth is required');
      return;
    }
    if (!niNumber) {
      setLocalError('National Insurance number is required');
      return;
    }
    setStep(2);
  };

  const handleStep2Continue = () => {
    setLocalError('');
    if (!email || !email.includes('@')) {
      setLocalError('Please enter a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      setLocalError('Password must contain at least 6 characters');
      return;
    }
    setStep(3);
  };

  const handleFinalSubmit = () => {
    setLocalError('');
    if (!agreeTerms) {
      setLocalError('You must agree to the Terms of Service to join');
      return;
    }
    dispatch(registerRequest({
      name: fullName,
      email: email,
      dob: dob,
      ni: niNumber,
      password: password
    }));
  };

  return (
    <div className="flex-grow bg-[#f7f9fb] flex flex-col px-6 py-6 overflow-y-auto no-scrollbar">
      {/* Registration Header bar */}
      <header className="flex justify-between items-center mb-6 z-10 w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <Landmark className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-md font-bold text-slate-950 font-sans">SecurePension</span>
        </div>
        <button 
          onClick={() => alert("Connecting to 24/7 Pension Client Advocate...")}
          className="text-xs font-semibold text-[#006a61] hover:underline bg-transparent"
        >
          Need help?
        </button>
      </header>

      {/* Multi-step flow dynamic pipeline indicators */}
      <div className="flex justify-between items-center mb-8 px-4">
        {/* Step 1 indicator block */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
            step > 1 ? 'bg-[#006a61] text-white' : step === 1 ? 'bg-black text-white' : 'bg-[#e0e3e5] text-[#45464d]'
          }`}>
            {step > 1 ? <Check className="w-4 h-4 text-white" /> : '1'}
          </div>
          <span className={`text-[10px] font-semibold tracking-wide ${step >= 1 ? 'text-[#191c1e]' : 'text-[#76777d]'}`}>
            Identity
          </span>
        </div>
        
        {/* step 1-2 bar */}
        <div className="flex-grow h-[2px] bg-[#e0e3e5] mx-2 -mt-4">
          <div className="h-full bg-black transition-all duration-500" style={{ width: step > 1 ? '100%' : '0%' }} />
        </div>

        {/* Step 2 indicator block */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
            step > 2 ? 'bg-[#006a61] text-white' : step === 2 ? 'bg-black text-white' : 'bg-[#e0e3e5] text-[#45464d]'
          }`}>
            {step > 2 ? <Check className="w-4 h-4 text-white" /> : '2'}
          </div>
          <span className={`text-[10px] font-semibold tracking-wide ${step >= 2 ? 'text-[#191c1e]' : 'text-[#76777d]'}`}>
            Security
          </span>
        </div>

        {/* step 2-3 bar */}
        <div className="flex-grow h-[2px] bg-[#e0e3e5] mx-2 -mt-4">
          <div className="h-full bg-black transition-all duration-500" style={{ width: step > 2 ? '100%' : '0%' }} />
        </div>

        {/* Step 3 indicator block */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
            step === 3 ? 'bg-black text-white font-bold' : 'bg-[#e0e3e5] text-[#45464d]'
          }`}>
            '3'
          </div>
          <span className={`text-[10px] font-semibold tracking-wide ${step === 3 ? 'text-[#191c1e]' : 'text-[#76777d]'}`}>
            Confirm
          </span>
        </div>
      </div>

      {/* Form view cards with state switches */}
      <section className="bg-white border border-[#c6c6cd]/50 p-5 rounded-2xl shadow-sm flex flex-col justify-between font-sans">
        {step === 1 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-xl font-bold text-[#191c1e]">Personal Details</h2>
            <p className="text-xs text-[#45464d] leading-relaxed">
              We need a few details to verify your identity and protect your future savings.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#191c1e] mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alexander Hamilton"
                  className="w-full px-3 py-2.5 bg-[#f7f9fb] border border-[#c6c6cd] rounded-lg text-sm text-slate-800 focus:outline-[#006a61]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#191c1e] mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-2 py-2.3 bg-[#f7f9fb] border border-[#c6c6cd] rounded-lg text-sm text-slate-600 focus:outline-[#006a61] font-mono text-[12px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#191c1e] mb-1">NI Number</label>
                  <input
                    type="text"
                    value={niNumber}
                    onChange={(e) => setNiNumber(e.target.value)}
                    placeholder="QQ 12 34 56 C"
                    className="w-full px-3 py-2.5 bg-[#f7f9fb] border border-[#c6c6cd] rounded-lg text-sm text-slate-800 uppercase focus:outline-[#006a61]"
                  />
                </div>
              </div>
            </div>

            {/* Verification secure notice badge info */}
            <div className="bg-[#86f2e4]/10 p-3 rounded-xl border border-[#86f2e4]/20 flex gap-2.5 items-start">
              <Info className="w-5 h-5 text-[#006a61] shrink-0" />
              <p className="text-[11px] text-[#006f66] leading-relaxed">
                Your National Insurance number is used strictly for tax verification purposes. We encrypt all sensitive data with bank-grade security.
              </p>
            </div>

            {localError && <p className="text-xs text-red-600 pl-1">{localError}</p>}

            <button
              onClick={handleStep1Continue}
              className="w-full bg-black text-white hover:opacity-90 py-3.5 rounded-xl font-semibold text-xs tracking-wide flex justify-center items-center gap-1 px-4 mt-6"
            >
              <span>Continue to Security</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-xl font-bold text-[#191c1e]">Secure Your Account</h2>
            <p className="text-xs text-[#45464d] leading-relaxed">
              Set your login credentials to access your pension dashboard safely.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#191c1e] mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3 py-2.5 bg-[#f7f9fb] border border-[#c6c6cd] rounded-lg text-sm text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#191c1e] mb-1">Create Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 bg-[#f7f9fb] border border-[#c6c6cd] rounded-lg text-sm text-slate-800 font-sans"
                />
              </div>

              {/* Password dynamic strength scoring bar replica */}
              {password.length > 0 && (
                <div className="space-y-1.5 py-1">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-grow bg-[#006a61] rounded-full"></div>
                    <div className={`h-1.5 flex-grow rounded-full ${password.length >= 8 ? 'bg-[#006a61]' : 'bg-[#e0e3e5]'}`}></div>
                    <div className={`h-1.5 flex-grow rounded-full ${password.length >= 10 ? 'bg-[#006a61]' : 'bg-[#e0e3e5]'}`}></div>
                    <span className="text-[10px] font-bold text-[#006a61] ml-1">
                      {password.length < 8 ? 'Weak' : password.length < 10 ? 'Moderate' : 'Strong'}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#76777d] italic">Type at least 8 symbols including numbers.</p>
                </div>
              )}
            </div>

            {localError && <p className="text-xs text-red-600 pl-1">{localError}</p>}

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-[#c6c6cd] text-[#45464d] hover:bg-slate-50 py-3 rounded-lg text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={handleStep2Continue}
                className="flex-[2] bg-black text-white hover:opacity-90 py-3 rounded-lg text-xs font-bold"
              >
                Review &amp; Join
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in space-y-4">
            <div className="text-center pb-2">
              <div className="w-12 h-12 bg-[#86f2e4] text-[#006f66] rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#191c1e]">Almost there!</h2>
              <p className="text-xs text-[#45464d]">
                Review your details before creating your lifelong pension account.
              </p>
            </div>

            {/* Information snapshot frame */}
            <div className="bg-[#f2f4f6]/70 p-4 border border-[#c6c6cd]/40 rounded-xl space-y-2.5">
              <div className="flex justify-between items-center pb-1.5 border-b border-gray-200">
                <span className="text-[11px] text-[#45464d]">Full Name</span>
                <span className="text-xs font-semibold text-[#191c1e]">{fullName || 'Alexander Hamilton'}</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-gray-200">
                <span className="text-[11px] text-[#45464d]">Email</span>
                <span className="text-xs font-semibold text-[#191c1e] line-clamp-1">{email || 'alex@example.com'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[11px] text-[#45464d]">Pension Type</span>
                <span className="text-xs font-bold text-[#006a61]">Gold Private Account</span>
              </div>
            </div>

            {/* Terms and consent checkbox */}
            <div className="flex items-start gap-2 pt-2">
              <input
                id="agree"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-gray-300 text-black focus:ring-black h-4 w-4"
              />
              <label htmlFor="agree" className="text-[11px] text-[#45464d] leading-relaxed">
                I agree to the <a href="#" className="text-[#006a61] underline">Terms of Service</a> and <a href="#" className="text-[#006a61] underline">Privacy Policy</a>, and understand my capital is at risk as values fluctuates.
              </label>
            </div>

            {(localError || error) && (
              <p className="text-xs text-red-600 pl-1">{localError || error}</p>
            )}

            <button
              onClick={handleFinalSubmit}
              className="w-full bg-black hover:opacity-90 text-white py-3.5 rounded-xl font-semibold text-xs tracking-wide shadow-md flex justify-center items-center font-sans mt-4"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Provisioning Vault...
                </span>
              ) : (
                'Create Lifetime Account'
              )}
            </button>

            <button
              onClick={() => setStep(2)}
              className="w-full py-2.5 font-bold text-xs text-[#76777d] hover:text-[#191c1e]"
              disabled={loading}
            >
              Modify details
            </button>
          </div>
        )}
      </section>

      {/* Footer login options */}
      <div className="text-center mt-6">
        <p className="text-xs text-[#45464d] font-sans">
          Already a member?{' '}
          <button 
            onClick={() => navigate('SignIn')} 
            className="text-[#006a61] font-bold hover:underline bg-transparent"
          >
            Log in to your dashboard
          </button>
        </p>
      </div>
    </div>
  );
}
