export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'contribution' | 'match' | 'fee' | 'rebalance';
  category: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string; // ISO or readable format, e.g., 'Today', '24 Aug 2024'
  period: string; // e.g., 'Today', 'October 2023', 'September 2023'
}

export interface ActivityLog {
  id: string;
  title: string;
  description: string;
  type: 'contribution' | 'tax_relief' | 'plan_change';
  amount?: number;
  statusText?: string;
  dateStr: string; // e.g. 'Oct 28', 'Oct 24'
  period: string; // e.g. 'October 2023', 'September 2023'
}

export interface PensionState {
  totalValue: number;
  yoyGrowth: number;
  earnedThisMonth: number;
  transactions: Transaction[];
  activities: ActivityLog[];
  growthData1Y: { name: string; value: number }[];
  growthDataAll: { name: string; value: number }[];
}

export interface UserProfile {
  name: string;
  email: string;
  planName: string;
  retirementAge: number;
  memberSince: string;
  avatarUrl: string;
  preferences: {
    pushNotifications: boolean;
    biometricLogin: boolean;
  };
}

// React Navigation replica types in Redux state
export type ScreenName = 
  | 'Splash' 
  | 'SignIn' 
  | 'Register' 
  | 'Home' 
  | 'Activity' 
  | 'Transactions' 
  | 'Profile';

export interface NavigationState {
  currentScreen: ScreenName;
  history: ScreenName[];
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  biometricPrompt: {
    isOpen: boolean;
    type: 'FaceID' | 'TouchID' | null;
  };
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  navigation: NavigationState;
  pension: PensionState;
}
