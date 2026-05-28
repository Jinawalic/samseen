import React, { useState } from 'react';
import { Property, mockProperties } from './mockData';
import { PropertyCard } from './PropertyCard';
import { Heart, Calendar, Clock, Smile } from 'lucide-react';

interface FavoritesViewProps {
  favorites: number[];
  onPropertyClick: (property: Property) => void;
  onFavoriteToggle: (id: number, e: React.MouseEvent) => void;
  onScheduleViewing: (property: Property) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onPropertyClick,
  onFavoriteToggle,
  onScheduleViewing
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent'>('all');
  const [showViewingModal, setShowViewingModal] = useState(false);
  const [selectedViewingProp, setSelectedViewingProp] = useState<Property | null>(null);

  // Filter properties that are in favorites
  const favoriteProperties = mockProperties.filter(p => favorites.includes(p.id));

  // Apply tab filters (all properties in our mock are Sale except maybe Yaba and VI which could be simulated as Rent)
  // Let's assume price > 100M is Sale, and Yaba (45M) is Rent for the sake of filtering, or mock it:
  const filteredFavorites = favoriteProperties.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'sale') return p.price >= 80000000;
    if (activeTab === 'rent') return p.price < 80000000;
    return true;
  });

  const handleScheduleViewingClick = (property: Property, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedViewingProp(property);
    setShowViewingModal(true);
  };

  const handleMoreActionsClick = (property: Property, e: React.MouseEvent) => {
    e.stopPropagation();
    // Copy link to clipboard
    navigator.clipboard.writeText(`${window.location.origin}/status/${property.id}`);
    alert(`Link for ${property.title} copied to clipboard!`);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-8">
      <div className="max-w-xl mx-auto px-4 py-4 space-y-6">
        
        {/* Favorites Title Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-gray-900 font-extrabold text-2xl">Favourites</h2>
        </div>

        {/* Category Tags Tabs */}
        <div className="flex gap-2.5">
          {(['all', 'sale', 'rent'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-[#008FAB] text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {tab === 'all' && 'All'}
              {tab === 'sale' && 'For sale'}
              {tab === 'rent' && 'For rent'}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="flex justify-between items-center pl-1">
          <span className="text-gray-500 font-bold text-sm">
            {filteredFavorites.length} saved {filteredFavorites.length === 1 ? 'property' : 'properties'}
          </span>
        </div>

        {/* Empty State */}
        {filteredFavorites.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E8F5F7] flex items-center justify-center text-[#008FAB]">
              <Heart className="w-8 h-8 fill-none stroke-current" />
            </div>
            <div>
              <h4 className="text-gray-900 font-bold text-base">No saved properties</h4>
              <p className="text-gray-400 text-xs mt-1 max-w-[240px] mx-auto">
                Tap the heart icon on properties to save them here for quick access.
              </p>
            </div>
          </div>
        ) : (
          /* Favorites list grid */
          <div className="grid grid-cols-1 gap-6">
            {filteredFavorites.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                variant="favorite"
                isFavorite={true}
                onFavoriteToggle={(id, e) => onFavoriteToggle(id, e)}
                onClick={() => onPropertyClick(property)}
                onScheduleViewing={(prop, e) => handleScheduleViewingClick(prop, e)}
                onMoreActions={(prop, e) => handleMoreActionsClick(prop, e)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Mock Viewing Scheduler Modal */}
      {showViewingModal && selectedViewingProp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-scale-in">
            <div className="bg-[#008FAB] p-6 text-white text-center space-y-2">
              <Calendar className="w-12 h-12 mx-auto animate-bounce" />
              <h3 className="font-extrabold text-lg">Schedule a Viewing</h3>
              <p className="text-white/80 text-xs">For {selectedViewingProp.title}</p>
            </div>
            
            <div className="p-6 space-y-4 text-center">
              <p className="text-gray-600 text-sm">
                We will match you with <span className="font-bold text-gray-900">{selectedViewingProp.agent.name}</span> for a guided tour of the property.
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-100 flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#008FAB]" />
                <div>
                  <span className="block text-gray-900 font-bold text-xs">Suggested Timing</span>
                  <span className="block text-gray-500 text-[11px]">Saturdays & Sundays, 10:00 AM - 4:00 PM</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowViewingModal(false)}
                  className="flex-1 border border-gray-200 hover:border-gray-300 text-gray-700 py-3 rounded-2xl font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowViewingModal(false);
                    onScheduleViewing(selectedViewingProp);
                  }}
                  className="flex-1 bg-[#008FAB] hover:bg-[#007a96] text-white py-3 rounded-2xl font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-1"
                >
                  <Smile className="w-4 h-4" />
                  <span>Confirm Tour</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
