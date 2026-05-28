import React, { useState } from 'react';
import { Search, SlidersHorizontal, List, Plus, Minus, Navigation, X, MapPin } from 'lucide-react';
import { Property, mockProperties } from './mockData';
import { PropertyCard } from './PropertyCard';

interface SimulatedMapProps {
  onPropertyClick: (property: Property) => void;
  onCloseMap: () => void;
  onFavoriteToggle: (id: number, e: React.MouseEvent) => void;
  favorites: number[];
}

export const SimulatedMap: React.FC<SimulatedMapProps> = ({
  onPropertyClick,
  onCloseMap,
  onFavoriteToggle,
  favorites
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(mockProperties[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(13);

  // Hardcode map coordinates to distribute them nicely on our custom visual SVG map
  const mapPins = [
    { id: 1, x: '45%', y: '35%' }, // Lekki House
    { id: 2, x: '25%', y: '50%' }, // VI Condo
    { id: 3, x: '70%', y: '65%' }, // Maitama Townhouse (simulated nearby on map)
    { id: 4, x: '15%', y: '20%' }, // Yaba Apartment
    { id: 5, x: '75%', y: '25%' }, // Maitama Villa
    { id: 6, x: '55%', y: '70%' }, // PH Family House
  ];

  const handlePinClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 10));
  };

  const filteredProperties = mockProperties.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full h-[calc(100vh-60px)] md:h-screen overflow-hidden bg-[#e5e9f0]">
      {/* 1. Stylized Vector Map Background (Lagos / Island Vibe) */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-out origin-center"
        style={{ transform: `scale(${zoomLevel / 13})` }}
      >
        <svg className="w-full h-full min-w-[1000px] min-h-[600px]" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Water Lagoon */}
          <rect width="1000" height="600" fill="#c4dbf6" />
          
          {/* Landmass 1 (Mainland / Yaba) */}
          <path d="M 0 0 L 250 0 L 200 180 C 180 250, 100 280, 50 350 L 0 350 Z" fill="#f4f3f0" stroke="#dcd9d4" strokeWidth="2"/>
          
          {/* Landmass 2 (Victoria Island) */}
          <path d="M 120 400 C 180 380, 320 380, 380 410 C 450 440, 550 430, 600 480 L 600 600 L 100 600 Z" fill="#f1efe9" stroke="#dcd9d4" strokeWidth="2"/>
          
          {/* Landmass 3 (Lekki Peninsula) */}
          <path d="M 380 410 C 420 350, 550 340, 650 330 C 780 320, 900 350, 1000 320 L 1000 600 L 600 600 Z" fill="#f2ede4" stroke="#dcd9d4" strokeWidth="2"/>
          
          {/* Bridges (Third Mainland, Carter, Eko) */}
          <path d="M 180 120 L 320 420" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <path d="M 180 120 L 320 420" stroke="#9ba4b4" strokeWidth="2" strokeLinecap="round" />

          <path d="M 120 180 C 180 240, 220 300, 260 390" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
          <path d="M 120 180 C 180 240, 220 300, 260 390" stroke="#a0a5b5" strokeWidth="1.5" strokeLinecap="round" />

          {/* Major Roads Grid */}
          {/* Mainland Grid */}
          <path d="M 20 50 L 220 50" stroke="#ffffff" strokeWidth="4" />
          <path d="M 20 50 L 220 50" stroke="#e0dcd3" strokeWidth="1" />
          <path d="M 80 0 L 80 300" stroke="#ffffff" strokeWidth="4" />
          <path d="M 80 0 L 80 300" stroke="#e0dcd3" strokeWidth="1" />
          <path d="M 180 50 L 120 280" stroke="#ffffff" strokeWidth="3" />

          {/* Island Highway / Admiralty Way */}
          <path d="M 320 420 C 450 420, 600 380, 800 370 C 900 365, 1000 380, 1000 380" stroke="#ffebc2" strokeWidth="8" strokeLinecap="round" />
          <path d="M 320 420 C 450 420, 600 380, 800 370 C 900 365, 1000 380, 1000 380" stroke="#eab676" strokeWidth="3" strokeLinecap="round" />

          <path d="M 450 400 L 480 550" stroke="#ffffff" strokeWidth="4" />
          <path d="M 580 385 L 560 520" stroke="#ffffff" strokeWidth="4" />
          <path d="M 720 375 L 750 500" stroke="#ffffff" strokeWidth="4" />

          {/* Parks & Greenery */}
          <circle cx="520" cy="460" r="35" fill="#d2ebd4" opacity="0.8"/>
          <path d="M 820 420 Q 860 410, 880 450 T 820 500 Z" fill="#d0e9c8" opacity="0.7"/>

          {/* Text Labels */}
          <text x="80" y="240" fill="#758296" fontSize="10" fontWeight="bold" fontFamily="sans-serif">YABA</text>
          <text x="240" y="480" fill="#758296" fontSize="10" fontWeight="bold" fontFamily="sans-serif">VICTORIA ISLAND</text>
          <text x="500" y="350" fill="#586c85" fontSize="11" fontWeight="bold" fontFamily="sans-serif">LEKKI PHASE 1</text>
          <text x="550" y="210" fill="#4d6f8a" fontSize="12" fontWeight="bold" fontFamily="sans-serif">LAGOS LAGOON</text>
        </svg>
      </div>

      {/* 2. Floating Search & Filter Bar (Top) */}
      <div className="absolute top-4 inset-x-4 max-w-xl mx-auto z-20 flex gap-2">
        <div className="flex-1 relative bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 flex items-center px-4 py-3">
          <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search in this area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-slate-800 text-sm bg-transparent focus:outline-none placeholder-gray-400 font-medium"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button 
          onClick={onCloseMap}
          className="w-12 h-12 bg-white/95 backdrop-blur-md text-[#008FAB] rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 hover:bg-gray-50 transition-colors"
          title="Switch to List View"
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      {/* 3. Map Controls (Zoom / Locate) */}
      <div className="absolute right-4 top-24 z-20 flex flex-col gap-2">
        <button 
          onClick={handleZoomIn}
          className="w-10 h-10 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="w-10 h-10 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-50"
        >
          <Minus className="w-5 h-5" />
        </button>
        <button 
          className="w-10 h-10 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center text-[#008FAB] hover:bg-gray-50 mt-2"
        >
          <Navigation className="w-5 h-5 fill-current" />
        </button>
      </div>

      {/* 4. Interactive Property Pins */}
      {mockProperties.map(property => {
        const pin = mapPins.find(p => p.id === property.id);
        if (!pin) return null;

        const isSelected = selectedProperty?.id === property.id;

        return (
          <div
            key={property.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
            style={{ left: pin.x, top: pin.y }}
            onClick={() => handlePinClick(property)}
          >
            <div className="relative flex flex-col items-center">
              {/* Outer Pulsing Aura (only for selected) */}
              {isSelected && (
                <div className="absolute w-12 h-12 rounded-full bg-[#008FAB]/30 animate-ping -top-1"></div>
              )}

              {/* Pin Base */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-lg transition-transform ${
                  isSelected 
                    ? 'bg-[#008FAB] text-white border-white scale-110' 
                    : 'bg-white text-[#008FAB] border-[#008FAB] hover:scale-105'
                }`}
              >
                <MapPin className={`w-5 h-5 ${isSelected ? 'fill-white text-[#008FAB]' : 'fill-[#008FAB]/10 text-[#008FAB]'}`} />
              </div>

              {/* Pin Hover/Selected Label */}
              <span className={`px-2 py-0.5 rounded-md mt-1 shadow-md font-extrabold text-[9px] uppercase tracking-wider ${
                isSelected 
                  ? 'bg-black text-white' 
                  : 'bg-white/90 text-gray-700 border border-gray-100'
              }`}>
                ₦{(property.price / 1000000).toFixed(0)}M
              </span>
            </div>
          </div>
        );
      })}

      {/* 5. Floating Hover Preview Card (Only visible if pin selected) */}
      {selectedProperty && (
        <div className="absolute bottom-[240px] left-4 right-4 md:left-auto md:right-4 md:bottom-28 z-20 max-w-sm mx-auto md:mx-0 animate-fade-in bg-white rounded-3xl p-3.5 shadow-2xl border border-gray-100 flex gap-3.5">
          <button 
            onClick={() => setSelectedProperty(null)}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div 
            onClick={() => onPropertyClick(selectedProperty)}
            className="flex gap-3 w-full cursor-pointer"
          >
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-between pr-4">
              <div>
                <h4 className="text-gray-900 font-bold text-sm truncate leading-snug">{selectedProperty.title}</h4>
                <p className="text-gray-500 text-[11px] truncate flex items-center gap-0.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span>{selectedProperty.location.split(',').slice(-2).join(',').trim()}</span>
                </p>
              </div>
              <div className="mt-1">
                <span className="text-[#008FAB] font-extrabold text-sm block">
                  ₦{selectedProperty.price.toLocaleString('en-NG')}
                </span>
                <span className="text-[10px] text-gray-400">
                  {selectedProperty.beds} Beds • {selectedProperty.baths} Baths • {selectedProperty.area}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Bottom Sheet / Drawer list (Screen 6 Drawer) */}
      <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md rounded-t-[32px] shadow-2xl border-t border-gray-100 z-20 h-[220px] flex flex-col">
        {/* Drag handle decoration */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3 flex-shrink-0"></div>

        {/* Drawer Header */}
        <div className="px-5 pb-2 flex justify-between items-center flex-shrink-0">
          <div>
            <h3 className="text-gray-900 font-extrabold text-sm md:text-base">Properties in this area</h3>
            <p className="text-gray-500 text-xs">{filteredProperties.length} properties found</p>
          </div>
          <span className="text-xs bg-gray-100 text-gray-700 font-bold px-3 py-1.5 rounded-xl border border-gray-200">
            Lekki & VI
          </span>
        </div>

        {/* Horizontal scroll of list cards (Scrollable properties matching Screen 6) */}
        <div className="flex-1 overflow-x-auto px-5 pb-5 flex gap-3.5 items-center scrollbar-none">
          {filteredProperties.map(property => (
            <div 
              key={property.id} 
              className="w-[280px] md:w-[320px] flex-shrink-0"
            >
              <PropertyCard
                property={property}
                variant="row"
                isFavorite={favorites.includes(property.id)}
                onFavoriteToggle={(id, e) => onFavoriteToggle(id, e)}
                onClick={() => onPropertyClick(property)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
