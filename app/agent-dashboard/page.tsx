'use client';

import { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/Card';
import { useRouter } from 'next/navigation';
import { Bell, UserCircle, Home, Plus, RefreshCw, MessageSquare, LogOut, Search } from 'lucide-react';
import { SearchInput } from '@/components/dashboard/SearchInput';
import { DashboardButton } from '@/components/dashboard/DashboardButton';

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
    <div className="min-h-screen bg-gray-50">
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
          <DashboardButton
            variant="sidebar"
            active={true}
            icon={<Home className="w-5 h-5 text-white" />}
          >
            My Listings
          </DashboardButton>
          <DashboardButton
            variant="sidebar"
            active={false}
            icon={<Plus className="w-5 h-5 text-gray-400" />}
          >
            Add Property
          </DashboardButton>
          <DashboardButton
            variant="sidebar"
            active={false}
            icon={<RefreshCw className="w-5 h-5 text-gray-400" />}
          >
            Subscriptions
          </DashboardButton>
          <DashboardButton
            variant="sidebar"
            active={false}
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
        <SearchInput
          placeholder="Search your listings..."
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      {/* Properties Section */}
      <div className="max-w-4xl mx-auto px-1 py-2">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">My Property Listings</h2>
        
        {/* Property Type Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {propertyTypes.map((type) => (
            <DashboardButton
              key={type}
              variant="category"
              active={selectedType === type}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </DashboardButton>
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
          <DashboardButton
            variant="bottomNav"
            active={true}
            icon={<Home className="w-5.5 h-5.5" />}
          >
            Listings
          </DashboardButton>
          <DashboardButton
            variant="bottomNav"
            active={false}
            icon={<Plus className="w-5.5 h-5.5" />}
          >
            Add
          </DashboardButton>
          <DashboardButton
            variant="bottomNav"
            active={false}
            icon={<RefreshCw className="w-5.5 h-5.5" />}
          >
            Subscriptions
          </DashboardButton>
          <DashboardButton
            variant="bottomNav"
            active={false}
            icon={<MessageSquare className="w-5.5 h-5.5" />}
          >
            Inquiries
          </DashboardButton>
        </div>
      </div>
      </div>
    </div>
  );
}
