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
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-100 fixed h-full z-30 px-6 py-8 shadow-sm">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="flex items-center gap-1.5">
                  <Image
                    src="/images/logo.png"
                    alt="Samseen Logo"
                    width={35}
                    height={35}
                    className="object-contain"
                  />
                </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight">SAMSEEN</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider -mt-1">Seeker Portal</p>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 space-y-2">
          <DashboardButton
            variant="sidebar"
            active={currentView === 'home'}
            onClick={() => navigateTo('home')}
            icon={<Home className={`w-5 h-5 ${currentView === 'home' ? 'text-[#008FAB]' : 'text-gray-400'}`} />}
          >
            Home Seeker
          </DashboardButton>

          <DashboardButton
            variant="sidebar"
            active={currentView === 'search' && searchMode === 'list'}
            onClick={() => {
              setSearchMode('list');
              navigateTo('search');
            }}
            icon={<Grid className={`w-5 h-5 ${currentView === 'search' && searchMode === 'list' ? 'text-[#008FAB]' : 'text-gray-400'}`} />}
          >
            Search & Filter
          </DashboardButton>

          <DashboardButton
            variant="sidebar"
            active={currentView === 'search' && searchMode === 'map'}
            onClick={() => {
              setSearchMode('map');
              navigateTo('search');
            }}
            icon={<Compass className={`w-5 h-5 ${currentView === 'search' && searchMode === 'map' ? 'text-[#008FAB]' : 'text-gray-400'}`} />}
          >
            Map Locator
          </DashboardButton>

          <DashboardButton
            variant="sidebar"
            active={currentView === 'favorites'}
            onClick={() => navigateTo('favorites')}
            icon={<Heart className={`w-5 h-5 ${currentView === 'favorites' ? 'text-[#008FAB]' : 'text-gray-400'}`} />}
          >
            My Favourites
          </DashboardButton>

          <DashboardButton
            variant="sidebar"
            active={currentView === 'profile'}
            onClick={() => navigateTo('profile')}
            icon={<User className={`w-5 h-5 ${currentView === 'profile' ? 'text-[#008FAB]' : 'text-gray-400'}`} />}
          >
            My Profile
          </DashboardButton>
        </nav>

        {/* User Card info inside sidebar */}
        <div className="pt-6 border-t border-gray-100 flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
            <img src={seekerUser.avatar} alt={seekerUser.name} className="object-cover w-full h-full" />
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="text-gray-900 font-extrabold text-sm truncate">{seekerUser.name}</h5>
            <p className="text-gray-400 text-xs truncate">Seeker Account</p>
          </div>
          <DashboardButton
            variant="icon"
            active={false}
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            }
          />
        </div>
      </aside>

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
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 py-3 px-6 flex justify-between items-center z-40 shadow-2xl">
        <DashboardButton
          variant="bottomNav"
          active={currentView === 'home'}
          onClick={() => navigateTo('home')}
          icon={<Home className="w-5.5 h-5.5" />}
        >
          Home
        </DashboardButton>

        <DashboardButton
          variant="bottomNav"
          active={currentView === 'search'}
          onClick={() => {
            setSearchMode('list');
            navigateTo('search');
          }}
          icon={<Search className="w-5.5 h-5.5" />}
        >
          Search
        </DashboardButton>

        <DashboardButton
          variant="bottomNav"
          active={currentView === 'favorites'}
          onClick={() => navigateTo('favorites')}
          icon={<Heart className="w-5.5 h-5.5" />}
        >
          Favourites
        </DashboardButton>

        <DashboardButton
          variant="bottomNav"
          active={currentView === 'profile'}
          onClick={() => navigateTo('profile')}
          icon={<User className="w-5.5 h-5.5" />}
        >
          Profile
        </DashboardButton>
      </footer>

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
