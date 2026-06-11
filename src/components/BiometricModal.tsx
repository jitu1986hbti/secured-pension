import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { closeBiometricPrompt, biometricAuthRequest } from '../store/authSlice';
import { ShieldCheck, Fingerprint, ScanEye, CheckCircle, AlertCircle } from 'lucide-react';

export default function BiometricModal() {
  const dispatch = useDispatch();
  const { biometricPrompt, loading } = useSelector((state: RootState) => state.auth);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (biometricPrompt.isOpen) {
      setScanState('scanning');
      // Trigger Redux Saga request
      dispatch(biometricAuthRequest(biometricPrompt.type!));
    }
  }, [biometricPrompt.isOpen, biometricPrompt.type, dispatch]);

  useEffect(() => {
    if (biometricPrompt.isOpen && !loading) {
      setScanState('success');
      const timer = setTimeout(() => {
        setScanState('idle');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading, biometricPrompt.isOpen]);

  if (!biometricPrompt.isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[100] animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/50 w-[280px] rounded-3xl p-6 flex flex-col items-center text-center shadow-2xl transition-all duration-300 scale-100">
        <div className="mb-4">
          {biometricPrompt.type === 'FaceID' ? (
            <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center relative">
              <ScanEye className={`w-10 h-10 text-teal-400 ${scanState === 'scanning' ? 'animate-pulse scale-105' : ''}`} />
              {scanState === 'scanning' && (
                <div className="absolute inset-0 border-2 border-teal-400 rounded-2xl animate-ping opacity-25" />
              )}
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center relative">
              <Fingerprint className={`w-10 h-10 text-teal-400 ${scanState === 'scanning' ? 'animate-pulse scale-110' : ''}`} />
              {scanState === 'scanning' && (
                <div className="absolute inset-0 border-2 border-teal-400 rounded-full animate-ping opacity-25" />
              )}
            </div>
          )}
        </div>

        <h3 className="text-white font-semibold text-lg mb-1">
          {biometricPrompt.type === 'FaceID' ? 'FaceID Recognition' : 'TouchID Scanner'}
        </h3>
        
        <p className="text-xs text-slate-400 px-2 line-clamp-2 leading-relaxed">
          {scanState === 'scanning' && `Verifying identity secure signatures...`}
          {scanState === 'success' && 'Biometrics check approved'}
        </p>

        {scanState === 'scanning' && (
          <div className="mt-5 w-full flex justify-center">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
          </div>
        )}

        {scanState === 'success' && (
          <div className="mt-4 flex items-center gap-1.5 text-teal-400 text-xs font-medium bg-teal-500/10 px-3 py-1.5 rounded-full">
            <CheckCircle className="w-4 h-4" />
            Authenticated
          </div>
        )}

        <button
          onClick={() => dispatch(closeBiometricPrompt())}
          className="mt-6 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
