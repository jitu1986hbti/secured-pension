import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { Home, LineChart, Receipt, User } from 'lucide-react';
import { ScreenName } from '../types';

interface BottomProps {
  activeScreen: ScreenName;
}

export default function BottomNavBar({ activeScreen }: BottomProps) {
  const { navigate } = useNavigation();

  const tabs = [
    { name: 'Home' as ScreenName, label: 'Home', icon: Home },
    { name: 'Activity' as ScreenName, label: 'Activity', icon: LineChart },
    { name: 'Transactions' as ScreenName, label: 'Transactions', icon: Receipt },
    { name: 'Profile' as ScreenName, label: 'Profile', icon: User },
  ];

  return (
    <nav className="absolute bottom-0 left-0 w-full z-40 bg-[#f7f9fb] border-t border-[#c6c6cd]/50 shadow-lg px-4 py-3 flex justify-around items-center h-16 font-sans">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeScreen === tab.name;

        return (
          <button
            key={tab.name}
            onClick={() => navigate(tab.name)}
            className={`flex flex-col items-center justify-center transition-all duration-300 ease-in-out active:scale-95 cursor-pointer relative py-1.5 px-3.5 ${
              isActive 
                ? 'bg-[#86f2e4] text-[#006f66] rounded-full font-bold' 
                : 'text-[#45464d] hover:text-[#006a61]'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] font-semibold mt-0.5 tracking-wide">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
