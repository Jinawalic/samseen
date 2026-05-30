'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Bell, User, Search, Home, Heart, UserCheck, MessageSquare,
  MapPin, SlidersHorizontal, ChevronDown, Compass, Award,
  Grid, Map, ArrowRight, Menu
} from 'lucide-react';

import { mockProperties, Property, formatPrice } from '@/components/prospect/mockData';
import { PropertyDetail } from '@/components/prospect/PropertyDetail';
import { SimulatedMap } from '@/components/prospect/SimulatedMap';
import { ProfileView } from '@/components/prospect/ProfileView';
import { FavoritesView } from '@/components/prospect/FavoritesView';
import { DashboardButton } from '@/components/agent/DashboardButton';
import { SearchView } from '@/components/prospect/SearchView';
import { HomeView } from '@/components/prospect/HomeView';
import SidebarNav from '@/components/prospect/SidebarNav';
import BottomNav from '@/components/prospect/BottomNav';

export default function Dashboard() {
  const router = useRouter();

  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'favorites' | 'profile' | 'details'>('home');
  const [viewHistory, setViewHistory] = useState<('home' | 'search' | 'favorites' | 'profile' | 'details')[]>(['home']);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'House' | 'Apartment' | 'Villa' | 'Townhouse' | 'Studio'>('All');
  const [searchMode, setSearchMode] = useState<'list' | 'map'>('list');
  const [activeCity, setActiveCity] = useState<'Lagos, Nigeria' | 'Abuja, Nigeria' | 'Port Harcourt, Nigeria'>('Lagos, Nigeria');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Seeker State
  const [favorites, setFavorites] = useState<number[]>([1, 2, 6]); // Pre-populate some favorites

  // Sync user info
  const [seekerUser, setSeekerUser] = useState({
    name: 'Michelle Andrea',
    email: 'michelleand@gmail.com',
    avatar: 'https://i.pravatar.cc/150?img=47'
  });

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        // Only set name/email if user type is matching, else keep default Michelle
        if (parsed.name) {
          setSeekerUser(prev => ({
            ...prev,
            name: parsed.name,
            email: parsed.email || `${parsed.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`
          }));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Custom Navigation Push/Pop
  const navigateTo = (view: 'home' | 'search' | 'favorites' | 'profile' | 'details', propertyData?: Property) => {
    if (view === 'details' && propertyData) {
      setSelectedProperty(propertyData);
    }
    setViewHistory(prev => [...prev, view]);
    setCurrentView(view);
    // Scroll window back to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBack = () => {
    if (viewHistory.length > 1) {
      const newHistory = [...viewHistory];
      newHistory.pop(); // Remove current
      const prevView = newHistory[newHistory.length - 1];
      setViewHistory(newHistory);
      setCurrentView(prevView);
    } else {
      setCurrentView('home');
    }
  };

  const handleFavoriteToggle = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/prospect/onboarding');
  };

  const handleScheduleViewing = (property: Property) => {
    alert(`Viewing for ${property.title} in ${property.location} scheduled! We'll notify you on WhatsApp shortly.`);
  };

  // Filter logic for main page cards
  const homeFeaturedProperties = mockProperties
    .filter(p => p.featured && (selectedCategory === 'All' || p.category === selectedCategory))
    .filter(p => p.location.includes(activeCity.split(',')[0]))
    .filter(p =>
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const homeRecommendedProperties = mockProperties
    .filter(p => !p.featured && (selectedCategory === 'All' || p.category === selectedCategory))
    .filter(p => p.location.includes(activeCity.split(',')[0]))
    .filter(p =>
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const searchResultsProperties = mockProperties
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => p.location.includes(activeCity.split(',')[0]))
    .filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

      {/* ========================================================================= */}
      {/* 1. DESKTOP SIDEBAR NAVIGATION */}
      {/* ========================================================================= */}
      <SidebarNav
        activePage={currentView === 'details' ? 'home' : currentView}
        onNavigate={(page) => {
          if (page === 'search') {
            setSearchMode('list');
          }
          navigateTo(page);
        }}
        onLogout={handleLogout}
        userName={seekerUser.name}
        userAvatar={seekerUser.avatar}
      />

      {/* ========================================================================= */}
      {/* 2. MAIN CONTAINER */}
      {/* ========================================================================= */}
      <main className="flex-1 md:ml-72 min-h-screen flex flex-col bg-gray-50">

        {/* Render View Router */}
        {currentView === 'details' && selectedProperty ? (
          <PropertyDetail
            property={selectedProperty}
            isFavorite={favorites.includes(selectedProperty.id)}
            onBack={navigateBack}
            onFavoriteToggle={(id) => handleFavoriteToggle(id)}
          />
        ) : currentView === 'favorites' ? (
          <FavoritesView
            favorites={favorites}
            onPropertyClick={(p) => navigateTo('details', p)}
            onFavoriteToggle={(id, e) => handleFavoriteToggle(id, e)}
            onScheduleViewing={handleScheduleViewing}
          />
        ) : currentView === 'profile' ? (
          <ProfileView
            onLogout={handleLogout}
            user={seekerUser}
          />
        ) : currentView === 'search' && searchMode === 'map' ? (
          <SimulatedMap
            onPropertyClick={(p) => navigateTo('details', p)}
            onCloseMap={() => setSearchMode('list')}
            onFavoriteToggle={handleFavoriteToggle}
            favorites={favorites}
          />
        ) : currentView === 'search' && searchMode === 'list' ? (
          <SearchView
            searchResultsProperties={searchResultsProperties}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            onPropertyClick={(p) => navigateTo('details', p)}
            onMapClick={() => setSearchMode('map')}
            onClearAll={() => setSelectedCategory('All')}
            activeCity={activeCity}
          />
        ) : (
          <HomeView
            homeFeaturedProperties={homeFeaturedProperties}
            homeRecommendedProperties={homeRecommendedProperties}
            favorites={favorites}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onFavoriteToggle={handleFavoriteToggle}
            onPropertyClick={(p) => navigateTo('details', p)}
            onNavigateToSearch={() => navigateTo('search')}
            activeCity={activeCity}
            showCityDropdown={showCityDropdown}
            setShowCityDropdown={setShowCityDropdown}
            setActiveCity={setActiveCity}
            onNavigateToProfile={() => navigateTo('profile')}
            seekerUser={seekerUser}
          />
        )}

      </main>

      {/* ========================================================================= */}
      {/* 3. MOBILE BOTTOM NAVIGATION BAR */}
      {/* ========================================================================= */}
      <BottomNav
        activePage={currentView === 'details' ? 'home' : currentView}
        onNavigate={(page) => navigateTo(page)}
        onSearchClick={() => {
          setSearchMode('list');
          navigateTo('search');
        }}
      />

    </div>
  );
}

// Small utility icons for filter cards
function XIcon() {
  return (
    <svg className="w-3 h-3 hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
