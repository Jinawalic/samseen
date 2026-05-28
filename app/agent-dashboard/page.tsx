'use client';

import { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/Card';
import { useRouter } from 'next/navigation';
import { Bell, UserCircle } from 'lucide-react';

// Mock data for agent properties
const mockAgentProperties = [
  {
    id: 1,
    name: 'Beautiful 3-bedroom apartment',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    location: 'Dutse, Abuja',
    price: '₦1,500,000',
    type: 'Apartment',
    status: 'Active',
    views: 245,
    inquiries: 12
  },
  {
    id: 2,
    name: 'Luxury villa with pool',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    location: 'Sauka, Airpot Rd',
    price: '₦5,000,000',
    type: 'Villa',
    status: 'Active',
    views: 189,
    inquiries: 8
  },
  {
    id: 3,
    name: 'Modern house with garden',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    location: 'Liver Park',
    price: '₦2,200,000',
    type: 'House',
    status: 'Pending',
    views: 156,
    inquiries: 5
  },
  {
    id: 4,
    name: 'Luxury villa with pool',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    location: 'Gwarimpa',
    price: '₦5,000,000',
    type: 'Villa',
    status: 'Active',
    views: 96,
    inquiries: 25
  }
];

export default function AgentDashboard() {
  const router = useRouter();
  const [properties] = useState(mockAgentProperties);
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const propertyTypes = ['All', 'Apartment', 'House', 'Villa'];

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
            <span className="font-medium">My Listings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="font-medium">Add Property</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
              <path d="M16 16h5v5"/>
            </svg>
            <span className="font-medium">Subscriptions</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="font-medium">Inquiries</span>
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
              <UserCircle className="w-10 h-10 text-white" />
              <h1 className="text-xl font-semibold truncate max-w-[200px]">Titus Jinawa</h1>
            </div>
            <button
              onClick={handleLogout}
              className="text-white hover:bg-white/20 px-3 py-1 rounded-full text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

      {/* Top Bar for Desktop */}
      <div className="hidden md:flex justify-between items-center max-w-4xl mx-auto px-4 py-4">
        <h2 className="text-xl font-semibold text-gray-800">Good morning, Titus.</h2>
        <div className="flex items-center gap-4">
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
          <UserCircle className="w-8 h-8 text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-4xl mx-auto px-2 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search your listings..."
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">My Property Listings</h2>
        
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              onClick={() => handlePropertyClick(property.id)}
              className="flex flex-col p-4 hover:bg-gray-50 transition-colors"
            >
              {/* Property Image */}
              <div className="relative w-full h-48 mb-3">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              {/* Property Details */}
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-[#111B21] text-[15px] mb-1">{property.name}</p>
                <p className="text-gray-500 text-sm mb-2">{property.location}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[#008FAB] font-bold">{property.price}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    property.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {property.status}
                  </span>
                </div>
                <div className="flex gap-4 mt-1 text-xs text-gray-500">
                  <span>{property.views} views</span>
                  <span>{property.inquiries} inquiries</span>
                </div>
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
            <span className="text-xs">Listings</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs">Add</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
              <path d="M16 16h5v5"/>
            </svg>
            <span className="text-xs">Subscriptions</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs">Inquiries</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
