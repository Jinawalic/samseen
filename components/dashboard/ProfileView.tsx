import React from 'react';
import Image from 'next/image';
import { 
  UserCircle, FileText, Calendar, Search, History, BellRing, 
  Globe, Landmark, MapPin, ShieldCheck, Share2, LogOut, ChevronRight
} from 'lucide-react';

interface ProfileViewProps {
  onLogout: () => void;
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onLogout,
  user = {
    name: 'Michelle Andrea',
    email: 'michelleand@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=47'
  }
}) => {
  
  const accountItems = [
    {
      icon: <FileText className="w-5 h-5 text-[#008FAB]" />,
      title: 'My listings',
      description: "Properties you've listed",
      badge: '2',
      badgeColor: 'bg-red-500 text-white'
    },
    {
      icon: <Calendar className="w-5 h-5 text-[#008FAB]" />,
      title: 'Schedule viewings',
      description: 'Upcoming property tours',
      badge: '3',
      badgeColor: 'bg-[#008FAB] text-white'
    },
    {
      icon: <Search className="w-5 h-5 text-[#008FAB]" />,
      title: 'Search history',
      description: 'Your recent searches'
    },
    {
      icon: <History className="w-5 h-5 text-[#008FAB]" />,
      title: 'Recently viewed',
      description: "Properties you've checked out"
    },
    {
      icon: <BellRing className="w-5 h-5 text-[#008FAB]" />,
      title: 'Saved searches',
      description: 'Get notified about new listings',
      badge: '11',
      badgeColor: 'bg-[#008FAB] text-white'
    }
  ];

  const preferenceItems = [
    {
      icon: <BellRing className="w-5 h-5 text-[#008FAB]" />,
      title: 'Notification',
      description: 'Notification settings'
    },
    {
      icon: <Globe className="w-5 h-5 text-[#008FAB]" />,
      title: 'Language',
      description: 'English'
    },
    {
      icon: <Landmark className="w-5 h-5 text-[#008FAB]" />,
      title: 'Currency',
      description: 'NGN (₦)'
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#008FAB]" />,
      title: 'Default location',
      description: 'Lagos, Nigeria'
    }
  ];

  const verificationItems = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#008FAB]" />,
      title: 'Identity verification',
      description: 'Two-step verification'
    },
    {
      icon: <Share2 className="w-5 h-5 text-[#008FAB]" />,
      title: 'Connected accounts',
      description: 'Sync your account'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-8">
      <div className="max-w-xl mx-auto px-4 py-4 space-y-6">
        
        {/* Profile Title Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-gray-900 font-extrabold text-2xl">Profile</h2>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-100 border-4 border-[#E8F5F7]">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-gray-900 font-extrabold text-lg leading-tight">{user.name}</h3>
            <p className="text-gray-400 text-xs mt-0.5">{user.email}</p>
            <span className="inline-block bg-[#E8F5F7] text-[#008FAB] text-[10px] font-bold px-3 py-1 rounded-full mt-2.5">
              Member since 2023
            </span>
          </div>

          <button className="w-full bg-[#008FAB] hover:bg-[#007a96] text-white font-bold py-3.5 rounded-2xl text-sm transition-colors shadow-sm">
            Edit profile
          </button>
        </div>

        {/* Account Section */}
        <div className="space-y-3">
          <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-wider pl-1">Account</h4>
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm divide-y divide-gray-50">
            {accountItems.map((item, idx) => (
              <button 
                key={idx}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F5F7] flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-gray-900 text-sm font-bold leading-tight">{item.title}</span>
                    <span className="block text-gray-400 text-xs mt-0.5 font-medium">{item.description}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-3">
          <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-wider pl-1">Preferences</h4>
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm divide-y divide-gray-50">
            {preferenceItems.map((item, idx) => (
              <button 
                key={idx}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F5F7] flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-gray-900 text-sm font-bold leading-tight">{item.title}</span>
                    <span className="block text-gray-400 text-xs mt-0.5 font-medium">{item.description}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Verification Section */}
        <div className="space-y-3">
          <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-wider pl-1">Verification</h4>
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm divide-y divide-gray-50">
            {verificationItems.map((item, idx) => (
              <button 
                key={idx}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F5F7] flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-gray-900 text-sm font-bold leading-tight">{item.title}</span>
                    <span className="block text-gray-400 text-xs mt-0.5 font-medium">{item.description}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Log Out CTA */}
        <button 
          onClick={onLogout}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-4 rounded-3xl text-sm transition-colors border border-red-100 flex items-center justify-center gap-2 mt-4"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Log Out Account</span>
        </button>

      </div>
    </div>
  );
};
