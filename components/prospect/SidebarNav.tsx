'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Home, Grid, Compass, Heart, User, LogOut } from 'lucide-react';
import { DashboardButton } from '../agent/DashboardButton';

interface SidebarNavProps {
  activePage?: 'home' | 'search' | 'favorites' | 'profile';
  onNavigate?: (page: 'home' | 'search' | 'favorites' | 'profile') => void;
  onLogout?: () => void;
  userName?: string;
  userAvatar?: string;
}

export default function SidebarNav({ 
  activePage = 'home', 
  onNavigate,
  onLogout,
  userName,
  userAvatar
}: SidebarNavProps) {
  const router = useRouter();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('user');
      router.push('/prospect/onboarding');
    }
  };

  const handleNavigate = (page: 'home' | 'search' | 'favorites' | 'profile') => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      router.push('/prospect/dashboard');
    }
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="/images/logo.png"
              alt="Samseen"
              fill
              className="object-contain rounded-full"
            />
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Samseen</h1>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <DashboardButton
          variant="sidebar"
          active={activePage === 'home'}
          onClick={() => handleNavigate('home')}
          icon={<Home className="w-5 h-5 text-white" />}
        >
          Home
        </DashboardButton>
        <DashboardButton
          variant="sidebar"
          active={activePage === 'search'}
          onClick={() => handleNavigate('search')}
          icon={<Grid className="w-5 h-5 text-gray-400" />}
        >
          Search & Filter
        </DashboardButton>
        <DashboardButton
          variant="sidebar"
          active={activePage === 'search'}
          onClick={() => handleNavigate('search')}
          icon={<Compass className="w-5 h-5 text-gray-400" />}
        >
          Map Locator
        </DashboardButton>
        <DashboardButton
          variant="sidebar"
          active={activePage === 'favorites'}
          onClick={() => handleNavigate('favorites')}
          icon={<Heart className="w-5 h-5 text-gray-400" />}
        >
          My Favourites
        </DashboardButton>
        <DashboardButton
          variant="sidebar"
          active={activePage === 'profile'}
          onClick={() => handleNavigate('profile')}
          icon={<User className="w-5 h-5 text-gray-400" />}
        >
          My Profile
        </DashboardButton>
      </nav>

      <div className="p-4 border-t border-gray-200">
        {(userName || userAvatar) && (
          <div className="flex items-center gap-3 mb-3">
            {userAvatar && (
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={userAvatar} alt={userName || 'User'} className="object-cover w-full h-full" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              {userName && <h5 className="text-gray-900 font-extrabold text-sm truncate">{userName}</h5>}
              <p className="text-gray-400 text-xs truncate">Seeker Account</p>
            </div>
          </div>
        )}
        <DashboardButton
          variant="sidebar"
          active={false}
          onClick={handleLogout}
          icon={<LogOut className="w-5 h-5 text-gray-400" />}
        >
          Logout
        </DashboardButton>
      </div>
    </div>
  );
}
