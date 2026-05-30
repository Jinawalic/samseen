'use client';

import { Property, formatPrice } from './mockData';
import { PropertyCard } from './PropertyCard';
import { DashboardButton } from '../agent/DashboardButton';
import { Map, MapPin, ChevronDown, X as XIcon } from 'lucide-react';

interface SearchViewProps {
  searchResultsProperties: Property[];
  favorites: number[];
  onFavoriteToggle: (id: number, e?: React.MouseEvent) => void;
  onPropertyClick: (property: Property) => void;
  onMapClick: () => void;
  onClearAll: () => void;
  activeCity: string;
}

export function SearchView({
  searchResultsProperties,
  favorites,
  onFavoriteToggle,
  onPropertyClick,
  onMapClick,
  onClearAll,
  activeCity,
}: SearchViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-6 w-full pb-24 md:pb-8">
      {/* Header Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-gray-900 font-bold text-base text-[18px]">Properties in {activeCity.split(',')[0]}</h2>
        <DashboardButton
          variant="icon"
          active={false}
          onClick={onMapClick}
          icon={<Map className="w-5 h-5" />}
          title="Switch to Map"
        />
      </div>

      {/* Filter Tags Row */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="bg-[#E8F5F7] text-[#008FAB] text-xs font-bold px-3.5 py-2 rounded-full border border-[#D0E8EB]/50 flex items-center gap-1.5 whitespace-nowrap">
          For sale <XIcon />
        </span>
        <span className="bg-[#E8F5F7] text-[#008FAB] text-xs font-bold px-3.5 py-2 rounded-full border border-[#D0E8EB]/50 flex items-center gap-1.5 whitespace-nowrap">
          2-4 Beds <XIcon />
        </span>
        <DashboardButton
          variant="outline"
          onClick={onClearAll}
          className="text-gray-400 font-extrabold text-xs ml-2 hover:underline hover:text-[#008FAB] whitespace-nowrap border-none bg-transparent"
        >
          Clear all
        </DashboardButton>
      </div>

      {/* Sub-header Count & Sort */}
      <div className="flex justify-between items-center pl-1">
        <span className="text-gray-500 font-bold text-xs">{searchResultsProperties.length} properties found</span>
        <DashboardButton
          variant="outline"
          icon={<ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
        >
          Newest
        </DashboardButton>
      </div>

      {/* Property Cards Grid (2 Columns on mobile, 4 on desktop) */}
      {searchResultsProperties.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center text-gray-500">
          No properties found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResultsProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              variant="compact"
              isFavorite={favorites.includes(property.id)}
              onFavoriteToggle={(id, e) => onFavoriteToggle(id, e)}
              onClick={() => onPropertyClick(property)}
            />
          ))}
        </div>
      )}

      {/* Sponsored Property Section (matches Screen 2 details list) */}
      <div className="space-y-3 pt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-gray-900 font-bold text-base text-[18px] pl-1">Sponsored property</h4>
          <button className="text-[#008FAB] font-bold text-xs hover:underline">See all</button>
        </div>

        {/* Highlight sponsored card layout (Large card vertical list styled like image 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {searchResultsProperties.slice(0, 3).map(property => (
            <div
              key={property.id}
              onClick={() => onPropertyClick(property)}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 p-3.5 flex flex-col md:flex-row gap-4 cursor-pointer"
            >
              <div className="relative h-44 md:w-48 md:h-36 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                <div className="absolute top-2.5 left-2.5 bg-[#008FAB] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Featured
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between py-1 min-w-0 pr-2">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-gray-900 font-extrabold text-base truncate pr-2">{property.title}</h4>
                    <span className="text-[#008FAB] font-extrabold text-base whitespace-nowrap">{formatPrice(property.price)}</span>
                  </div>
                  <p className="text-gray-500 text-xs truncate flex items-center gap-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{property.location}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-4 md:mt-0">
                  <span className="text-[10px] text-gray-500 font-medium">
                    {property.beds} Beds • {property.baths} Baths • {property.area}
                  </span>
                  <DashboardButton
                    variant="outline"
                    className="bg-[#E8F5F7] hover:bg-[#008FAB] text-[#008FAB] hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 border-[#D0E8EB]/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPropertyClick(property);
                    }}
                  >
                    View
                  </DashboardButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
