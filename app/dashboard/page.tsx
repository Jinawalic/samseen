'use client';

import { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/Card';
import { useRouter } from 'next/navigation';

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    name: 'Beautiful 3-bedroom apartment',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    location: 'Downtown Area',
    price: '₦1,500,000',
    type: 'Apartment',
    posts: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        caption: 'Beautiful 3-bedroom apartment in downtown',
        time: '2 hours ago',
        title: 'Beautiful 3-bedroom apartment',
        location: 'Downtown Area',
        amount: '₦1,500,000'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        caption: 'Spacious living room with natural light',
        time: '2 hours ago',
        title: 'Spacious living room',
        location: 'Downtown Area',
        amount: '₦1,500,000'
      }
    ]
  },
  {
    id: 2,
    name: 'Luxury villa with pool',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    location: 'Beverly Hills',
    price: '₦5,000,000',
    type: 'Villa',
    posts: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        caption: 'Luxury villa with pool',
        time: '5 hours ago',
        title: 'Luxury villa with pool',
        location: 'Beverly Hills',
        amount: '₦5,000,000'
      }
    ]
  },
  {
    id: 3,
    name: 'Modern house with garden',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    location: 'Suburban Area',
    price: '₦2,200,000',
    type: 'House',
    posts: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        caption: 'Modern house with garden',
        time: '1 day ago',
        title: 'Modern house with garden',
        location: 'Suburban Area',
        amount: '₦2,200,000'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        caption: 'Open kitchen design',
        time: '1 day ago',
        title: 'Open kitchen design',
        location: 'Suburban Area',
        amount: '₦2,200,000'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
        caption: 'Master bedroom suite',
        time: '1 day ago',
        title: 'Master bedroom suite',
        location: 'Suburban Area',
        amount: '₦2,200,000'
      }
    ]
  },
  {
    id: 4,
    name: 'Cozy studio apartment',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    location: 'City Center',
    price: '₦950,000',
    type: 'Studio',
    posts: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        caption: 'Cozy studio apartment',
        time: '2 days ago',
        title: 'Cozy studio apartment',
        location: 'City Center',
        amount: '₦950,000'
      }
    ]
  }
];

export default function Dashboard() {
  const router = useRouter();
  const [properties] = useState(mockProperties);
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const propertyTypes = ['All', 'Apartment', 'House', 'Villa', 'Studio'];

  const filteredProperties = properties.filter(property => {
    const matchesType = selectedType === 'All' || property.type === selectedType;
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handlePropertyClick = (propertyId: number) => {
    router.push(`/status/${propertyId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
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
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#008FAB] text-white">
            <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="font-medium">Properties</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="font-medium">Chats</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium">Calls</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#008FAB] text-white top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="Samseen"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <h1 className="text-xl font-semibold">Samseen</h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-white hover:bg-white/20 px-3 py-1 rounded-full text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

      {/* Search Input */}
      <div className="max-w-4xl mx-auto px-2 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 text-slate-500 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008FAB] focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Properties Section */}
      <div className="max-w-4xl mx-auto px-1 py-2">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">Properties Near You</h2>
        
        {/* Property Type Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedType === type
                  ? 'bg-[#008FAB] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Property Cards */}
        <div className="space-y-1">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              onClick={() => handlePropertyClick(property.id)}
              className="flex gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              {/* Property Image */}
              <div className="relative w-18 h-18 flex-shrink-0">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              {/* Property Details */}
              <div className="flex-1 flex flex-col justify-center">
                <p className="truncate font-semibold text-[#111B21] text-[15px] mb-1">{property.name}</p>
                <p className="text-gray-500 text-sm mb-2">{property.location}</p>
                <p className="text-[#008FAB] font-bold">{property.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation - WhatsApp style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-[#008FAB]">
            <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs">Chats</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-xs">Calls</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
