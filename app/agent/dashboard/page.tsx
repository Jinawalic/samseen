'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Card from '@/components/Card';
import { useRouter } from 'next/navigation';
import { Bell, UserCircle, Home, Plus, RefreshCw, MessageSquare, LogOut, Search, Building2, House, MapPin, Star, ChevronRight } from 'lucide-react';
import { DashboardButton } from '@/components/agent/DashboardButton';
import SidebarNav from '@/components/agent/SidebarNav';
import BottomNav from '@/components/agent/BottomNav';

// Mock data for agent properties
const mockAgentProperties = [
  {
    id: 1,
    name: 'Beautiful 3-bedroom apartment',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    location: 'Dutse, Abuja',
    price: '₦1,500,000',
    type: 'Apartment',
    rating: '4.8',
    reviews: 324,
    distance: '0.5 km'
  },
  {
    id: 2,
    name: 'Luxury villa with pool',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    location: 'Sauka, Airport Rd',
    price: '₦5,000,000',
    type: 'Villa',
    rating: '4.9',
    reviews: 256,
    distance: '1.2 km'
  },
  {
    id: 3,
    name: 'Modern house with garden',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    location: 'Liver Park',
    price: '₦2,200,000',
    type: 'House',
    rating: '4.7',
    reviews: 189,
    distance: '0.8 km'
  },
  {
    id: 4,
    name: 'Penthouse with city view',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    location: 'Gwarimpa',
    price: '₦5,000,000',
    type: 'Apartment',
    rating: '4.6',
    reviews: 145,
    distance: '2.1 km'
  }
];

const categories = [
  { id: 1, name: 'My Listings', icon: Building2, color: 'bg-[#E8F5F7]' },
  { id: 2, name: 'Houses', icon: House, color: 'bg-[#E8F5F7]' },
  { id: 3, name: 'Villas', icon: Home, color: 'bg-[#E8F5F7]' },
  { id: 4, name: 'Other', icon: MapPin, color: 'bg-[#E8F5F7]' }
];

export default function AgentDashboard() {
  const router = useRouter();
  const [properties] = useState(mockAgentProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('Titus');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.name) {
          setUserName(parsed.name.split(' ')[0]);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handlePropertyClick = (propertyId: number) => {
    router.push(`/prospect/status/${propertyId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/prospect/onboarding');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarNav activePage="listings" />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#008FAB] text-white top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCircle className="w-10 h-10 text-white" />
              <h1 className="text-xl font-semibold truncate max-w-[200px]">Titus Jinawa</h1>
            </div>
            <DashboardButton
              variant="outline"
              onClick={handleLogout}
              className="text-white hover:bg-white/20 px-3 py-1 rounded-full text-sm transition-colors border-none bg-transparent"
            >
              Logout
            </DashboardButton>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center max-w-4xl mx-auto px-4 py-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Hi, {userName} 👋</h2>
            <p className="text-gray-500 text-sm mt-1">Welcome to our property family</p>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-[#008FAB] transition-colors" />
            <UserCircle className="w-8 h-8 text-gray-600 cursor-pointer hover:text-[#008FAB] transition-colors" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#008FAB] focus:border-transparent transition-all text-gray-900"
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Categories</h3>
            <button className="text-[#008FAB] text-sm font-medium hover:underline">See All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center`}>
                  <category.icon className="w-8 h-8 text-[#008FAB]" />
                </div>
                <span className="text-xs font-medium text-gray-700">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

      <BottomNav activePage="listings" />
      </div>
    </div>
  );
}
