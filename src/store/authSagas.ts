import { put, takeLatest, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  biometricAuthRequest,
  biometricAuthSuccess,
  biometricAuthFailure,
  defaultUser
} from './authSlice';
import { navigate, resetNav } from './navigationSlice';
import { UserProfile } from '../types';

// Worker Saga: standard email credentials verification
function* handleLogin(action: PayloadAction<{ email: string; password?: string }>) {
  try {
    yield delay(1500); // Simulate secure network request
    const { email } = action.payload;

    if (!email || !email.includes('@')) {
      yield put(loginFailure('Please enter a valid email address'));
      return;
    }

    // Build user record based on email prefix or fall back to default
    const namePrefix = email.split('@')[0];
    const capitalName = namePrefix.charAt(0).toUpperCase() + namePrefix.slice(1);
    
    const loggedUser: UserProfile = {
      ...defaultUser,
      name: capitalName === 'Name' ? 'Alexander Hamilton' : capitalName,
      email: email,
    };

    yield put(loginSuccess(loggedUser));
    yield put(resetNav('Home')); // Navigate securely to standard dashboard
  } catch (error: any) {
    yield put(loginFailure(error.message || 'An unknown error occurred'));
  }
}

// Worker Saga: full registration multi-step entry
function* handleRegister(action: PayloadAction<{ name: string; email: string; dob: string; ni: string }>) {
  try {
    yield delay(2000); // Simulate bank grade registration checking
    const { name, email } = action.payload;

    if (!name || name.trim().length === 0) {
      yield put(registerFailure('Name is required'));
      return;
    }
    if (!email || !email.includes('@')) {
      yield put(registerFailure('Valid email is required'));
      return;
    }

    const registeredUser: UserProfile = {
      ...defaultUser,
      name,
      email,
      memberSince: 'Jun 2026', // Current time registration
    };

    yield put(registerSuccess(registeredUser));
    yield put(resetNav('Home')); // Open home screen on success
  } catch (error: any) {
    yield put(registerFailure(error.message || 'Registration failed'));
  }
}

// Worker Saga: biometric recognition simulation
function* handleBiometricAuth(action: PayloadAction<'FaceID' | 'TouchID'>) {
  try {
    yield delay(1800); // Simulate biometric hardware verification
    
    // Auto logins the default user securely
    yield put(biometricAuthSuccess(defaultUser));
    yield put(resetNav('Home'));
  } catch (error: any) {
    yield put(biometricAuthFailure('Biometric verification failed. Please try with credentials.'));
  }
}

// Watcher Sagas
export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
  yield takeLatest(biometricAuthRequest.type, handleBiometricAuth);
}
