import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserProfile } from '../types';

const defaultUser: UserProfile = {
  name: 'Alexander Hamilton',
  email: 'alex@example.com',
  planName: 'Gold Retirement Tier',
  retirementAge: 65,
  memberSince: 'Jan 2018',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  preferences: {
    pushNotifications: true,
    biometricLogin: true,
  }
};

const initialState: AuthState = {
  user: null, // Initially not logged in, user can log in with standard or register
  isAuthenticated: false,
  biometricPrompt: {
    isOpen: false,
    type: null,
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<{ email: string; password?: string }>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    registerRequest: (state, action: PayloadAction<{ name: string; email: string; dob: string; ni: string; password?: string }>) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    openBiometricPrompt: (state, action: PayloadAction<'FaceID' | 'TouchID'>) => {
      state.biometricPrompt.isOpen = true;
      state.biometricPrompt.type = action.payload;
    },
    closeBiometricPrompt: (state) => {
      state.biometricPrompt.isOpen = false;
      state.biometricPrompt.type = null;
    },
    
    biometricAuthRequest: (state, action: PayloadAction<'FaceID' | 'TouchID'>) => {
      state.loading = true;
    },
    biometricAuthSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.biometricPrompt.isOpen = false;
      state.biometricPrompt.type = null;
    },
    biometricAuthFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.biometricPrompt.isOpen = false;
      state.biometricPrompt.type = null;
    },

    togglePushNotifications: (state) => {
      if (state.user) {
        state.user.preferences.pushNotifications = !state.user.preferences.pushNotifications;
      }
    },
    toggleBiometricLoginSetting: (state) => {
      if (state.user) {
        state.user.preferences.biometricLogin = !state.user.preferences.biometricLogin;
      }
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  openBiometricPrompt,
  closeBiometricPrompt,
  biometricAuthRequest,
  biometricAuthSuccess,
  biometricAuthFailure,
  togglePushNotifications,
  toggleBiometricLoginSetting,
  logout,
  clearError
} = authSlice.actions;

export { defaultUser };
export default authSlice.reducer;
