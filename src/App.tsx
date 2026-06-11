/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import { RootState } from './store';
import PhoneShell from './components/PhoneShell';
import BiometricModal from './components/BiometricModal';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ActivityScreen from './screens/ActivityScreen';
import TransactionScreen from './screens/TransactionScreen';
import ProfileScreen from './screens/ProfileScreen';

function AppContent() {
  const currentScreen = useSelector((state: RootState) => state.navigation.currentScreen);

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen />;
      case 'SignIn':
        return <SignInScreen />;
      case 'Register':
        return <RegisterScreen />;
      case 'Home':
        return <HomeScreen />;
      case 'Activity':
        return <ActivityScreen />;
      case 'Transactions':
        return <TransactionScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <PhoneShell>
      {renderActiveScreen()}
      <BiometricModal />
    </PhoneShell>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
