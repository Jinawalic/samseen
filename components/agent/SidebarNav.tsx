'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Home, Plus, RefreshCw, MessageSquare, LogOut } from 'lucide-react';
import { DashboardButton } from './DashboardButton';

interface SidebarNavProps {
  activePage?: 'listings' | 'add' | 'subscriptions' | 'inquiries';
}

export default function SidebarNav({ activePage = 'listings' }: SidebarNavProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/prospect/onboarding');
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
          active={activePage === 'listings'}
          onClick={() => router.push('/agent/dashboard')}
          icon={<Home className="w-5 h-5 text-white" />}
        >
          My Listings
        </DashboardButton>
        <DashboardButton
          variant="sidebar"
          active={activePage === 'add'}
          onClick={() => router.push('/agent/add-property')}
          icon={<Plus className="w-5 h-5 text-gray-400" />}
        >
          Add Property
        </DashboardButton>
        <DashboardButton
          variant="sidebar"
          active={activePage === 'subscriptions'}
          icon={<RefreshCw className="w-5 h-5 text-gray-400" />}
        >
          Subscriptions
        </DashboardButton>
        <DashboardButton
          variant="sidebar"
          active={activePage === 'inquiries'}
          icon={<MessageSquare className="w-5 h-5 text-gray-400" />}
        >
          Inquiries
        </DashboardButton>
      </nav>

      <div className="p-4 border-t border-gray-200">
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
