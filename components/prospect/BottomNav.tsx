'use client';

import { useRouter } from 'next/navigation';
import { Home, Search, Heart, User } from 'lucide-react';
import { DashboardButton } from '../agent/DashboardButton';

interface BottomNavProps {
  activePage?: 'home' | 'search' | 'favorites' | 'profile';
  onNavigate?: (page: 'home' | 'search' | 'favorites' | 'profile') => void;
  onSearchClick?: () => void;
}

export default function BottomNav({ 
  activePage = 'home', 
  onNavigate,
  onSearchClick
}: BottomNavProps) {
  const router = useRouter();

  const handleNavigate = (page: 'home' | 'search' | 'favorites' | 'profile') => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      router.push('/prospect/dashboard');
    }
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      handleNavigate('search');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-around">
        <DashboardButton
          variant="bottomNav"
          active={activePage === 'home'}
          onClick={() => handleNavigate('home')}
          icon={<Home className="w-5.5 h-5.5" />}
        >
          Home
        </DashboardButton>
        <DashboardButton
          variant="bottomNav"
          active={activePage === 'search'}
          onClick={handleSearchClick}
          icon={<Search className="w-5.5 h-5.5" />}
        >
          Search
        </DashboardButton>
        <DashboardButton
          variant="bottomNav"
          active={activePage === 'favorites'}
          onClick={() => handleNavigate('favorites')}
          icon={<Heart className="w-5.5 h-5.5" />}
        >
          Favorites
        </DashboardButton>
        <DashboardButton
          variant="bottomNav"
          active={activePage === 'profile'}
          onClick={() => handleNavigate('profile')}
          icon={<User className="w-5.5 h-5.5" />}
        >
          Profile
        </DashboardButton>
      </div>
    </div>
  );
}
