'use client';

import Image from 'next/image';
import { MapPin, ChevronDown, Bell } from 'lucide-react';
import { Property, formatPrice } from './mockData';
import { PropertyCard } from './PropertyCard';
import { SearchInput } from './SearchInput';
import { DashboardButton } from './DashboardButton';

interface HomeViewProps {
  homeFeaturedProperties: Property[];
  homeRecommendedProperties: Property[];
  favorites: number[];
  selectedCategory: 'All' | 'House' | 'Apartment' | 'Villa' | 'Townhouse' | 'Studio';
  setSelectedCategory: (category: 'All' | 'House' | 'Apartment' | 'Villa' | 'Townhouse' | 'Studio') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFavoriteToggle: (id: number, e?: React.MouseEvent) => void;
  onPropertyClick: (property: Property) => void;
  onNavigateToSearch: () => void;
  activeCity: string;
  showCityDropdown: boolean;
  setShowCityDropdown: (show: boolean) => void;
  setActiveCity: (city: 'Lagos, Nigeria' | 'Abuja, Nigeria' | 'Port Harcourt, Nigeria') => void;
  onNavigateToProfile: () => void;
  seekerUser: { name: string; email: string; avatar: string };
}

export function HomeView({
  homeFeaturedProperties,
  homeRecommendedProperties,
  favorites,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onFavoriteToggle,
  onPropertyClick,
  onNavigateToSearch,
  activeCity,
  showCityDropdown,
  setShowCityDropdown,
  setActiveCity,
  onNavigateToProfile,
  seekerUser,
}: HomeViewProps) {
  const categories = ['All', 'House', 'Apartment', 'Villa', 'Townhouse'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-6 w-full pb-24 md:pb-8">

      {/* Header Block: Brand, Location Select, Notification, Profile */}
      <div className="flex justify-between items-center py-2 relative">
        <div className="space-y-1.5">
          {/* Brand name and icon matching mockup - hidden on desktop */}
          <div className="flex items-center gap-1.5 md:hidden">
            <Image
              src="/images/logo.png"
              alt="Samseen Logo"
              width={25}
              height={25}
              className="object-contain"
            />
            <span className="text-gray-950 font-bold text-base text-[18px]">SAMSEEN</span>
          </div>

          {/* Desktop greeting - shown on desktop */}
          <div className="hidden md:block">
            <h2 className="text-gray-900 font-bold text-base text-[18px]">Good morning, Titus</h2>
          </div>

          {/* Location select dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              className="flex items-center gap-1 text-gray-800 text-xs font-extrabold"
            >
              <MapPin className="w-3.5 h-3.5 text-[#008FAB]" />
              <span>{activeCity}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            {showCityDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-40 py-2 divide-y divide-gray-50">
                {(['Lagos, Nigeria', 'Abuja, Nigeria', 'Port Harcourt, Nigeria'] as const).map(city => (
                  <button
                    key={city}
                    onClick={() => {
                      setActiveCity(city);
                      setShowCityDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 font-semibold"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notification & Avatar icons */}
        <div className="flex items-center gap-2">
          <DashboardButton
            variant="icon"
            active={false}
            icon={<Bell className="w-4.5 h-4.5" />}
            className="relative"
          >
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </DashboardButton>
          <DashboardButton
            variant="icon"
            active={false}
            onClick={onNavigateToProfile}
            className="rounded-full overflow-hidden bg-slate-100 border border-gray-200"
            icon={<img src={seekerUser.avatar} alt="User Avatar" className="w-full h-full object-cover" />}
          />
        </div>
      </div>

      {/* Search Input block */}
      <SearchInput
        placeholder="Search location, neighborhood, etc..."
        value={searchQuery}
        onChange={setSearchQuery}
        onFilterClick={onNavigateToSearch}
      />

      {/* Categories horizontal scroll tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-none">
        {categories.map(cat => (
          <DashboardButton
            key={cat}
            variant="category"
            active={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat as any)}
          >
            {cat === 'All' ? 'All' : cat}
          </DashboardButton>
        ))}
      </div>

      {/* Featured properties section */}
      <div className="space-y-3.5">
        <div className="flex justify-between items-center pl-1">
          <h3 className="text-gray-950 font-bold text-base text-[18px]">Featured properties</h3>
          <DashboardButton
            variant="outline"
            onClick={onNavigateToSearch}
            className="text-[#008FAB] font-bold text-xs hover:underline border-none bg-transparent"
          >
            See all
          </DashboardButton>
        </div>

        {/* Horizontal Scroll on mobile, Grid on desktop */}
        {homeFeaturedProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center text-gray-500 text-xs border border-gray-100">
            No featured properties listed in this city.
          </div>
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:gap-2">
            {homeFeaturedProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                variant="featured"
                isFavorite={favorites.includes(property.id)}
                onFavoriteToggle={(id, e) => onFavoriteToggle(id, e)}
                onClick={() => onPropertyClick(property)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recommended for you section */}
      <div className="space-y-3.5 pt-2">
        <div className="flex justify-between items-center pl-1">
          <h3 className="text-gray-950 font-bold text-base text-[18px]">Recommended for you</h3>
          <DashboardButton
            variant="outline"
            onClick={onNavigateToSearch}
            className="text-[#008FAB] font-bold text-xs hover:underline border-none bg-transparent"
          >
            See all
          </DashboardButton>
        </div>

        {/* Vertical Stack List on mobile, Grid on desktop */}
        {homeRecommendedProperties.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center text-gray-500 text-xs border border-gray-100">
            No recommendations in this city yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {homeRecommendedProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                variant="row"
                isFavorite={favorites.includes(property.id)}
                onFavoriteToggle={(id, e) => onFavoriteToggle(id, e)}
                onClick={() => onPropertyClick(property)}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
