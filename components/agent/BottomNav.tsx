'use client';

import { useRouter } from 'next/navigation';
import { Home, Plus, RefreshCw, MessageSquare } from 'lucide-react';
import { DashboardButton } from './DashboardButton';

interface BottomNavProps {
  activePage?: 'listings' | 'add' | 'subscriptions' | 'inquiries';
}

export default function BottomNav({ activePage = 'listings' }: BottomNavProps) {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-around">
        <DashboardButton
          variant="bottomNav"
          active={activePage === 'listings'}
          onClick={() => router.push('/agent/dashboard')}
          icon={<Home className="w-5.5 h-5.5" />}
        >
          Home
        </DashboardButton>
        <DashboardButton
          variant="bottomNav"
          active={activePage === 'add'}
          onClick={() => router.push('/agent/add-property')}
          icon={<Plus className="w-5.5 h-5.5" />}
        >
          Add
        </DashboardButton>
        <DashboardButton
          variant="bottomNav"
          active={activePage === 'subscriptions'}
          icon={<RefreshCw className="w-5.5 h-5.5" />}
        >
          Subscriptions
        </DashboardButton>
        <DashboardButton
          variant="bottomNav"
          active={activePage === 'inquiries'}
          icon={<MessageSquare className="w-5.5 h-5.5" />}
        >
          Inquiries
        </DashboardButton>
      </div>
    </div>
  );
}
