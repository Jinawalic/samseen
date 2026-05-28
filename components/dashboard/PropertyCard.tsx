import React from 'react';
import Image from 'next/image';
import { Heart, Star, MapPin, Bed, Bath, Maximize, TrendingDown, ChevronRight } from 'lucide-react';
import { Property, formatPrice } from './mockData';

interface PropertyCardProps {
  property: Property;
  variant: 'featured' | 'compact' | 'row' | 'favorite';
  isFavorite?: boolean;
  onFavoriteToggle?: (id: number, e: React.MouseEvent) => void;
  onClick?: () => void;
  onScheduleViewing?: (property: Property, e: React.MouseEvent) => void;
  onMoreActions?: (property: Property, e: React.MouseEvent) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  variant,
  isFavorite = false,
  onFavoriteToggle,
  onClick,
  onScheduleViewing,
  onMoreActions
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(property.id, e);
    }
  };

  if (variant === 'featured') {
    return (
      <div 
        onClick={onClick}
        className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer w-[260px] flex-shrink-0 border border-gray-100"
      >
        {/* Image Container */}
        <div className="relative h-[180px] w-full bg-slate-100 overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="260px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Top badging */}
          <div className="absolute top-3 left-3 bg-[#008FAB] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Featured
          </div>
          
          {/* Favorite button */}
          <button 
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart 
              className={`w-4.5 h-4.5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>

          {/* Price overlay at bottom */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-sm font-bold border border-white/20">
            {formatPrice(property.price)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-gray-900 font-bold text-base truncate flex-1">{property.title}</h4>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold ml-2">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>{property.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-3.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{property.location.split(',').slice(-2).join(',').trim()}</span>
          </div>

          {/* Specs Row */}
          <div className="mt-auto flex justify-between items-center text-[11px] text-gray-600 border-t border-gray-50 pt-3">
            <div className="flex items-center gap-1 font-medium">
              <Bed className="w-3.5 h-3.5 text-[#008FAB]" />
              <span>{property.beds} Beds</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <Bath className="w-3.5 h-3.5 text-[#008FAB]" />
              <span>{property.baths} Baths</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <Maximize className="w-3.5 h-3.5 text-[#008FAB]" />
              <span>{property.area}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        onClick={onClick}
        className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
      >
        <div className="relative h-[120px] w-full bg-slate-100 overflow-hidden">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 50vw, 30vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button 
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/85 hover:bg-white text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart 
              className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>
          <div className="absolute bottom-2 left-2 bg-black/75 px-2 py-1 rounded-lg text-white text-[11px] font-bold">
            {formatPrice(property.price)}
          </div>
        </div>
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h5 className="text-gray-800 font-bold text-xs truncate mb-0.5">{property.title}</h5>
            <p className="text-gray-500 text-[10px] truncate flex items-center gap-0.5 mb-1.5">
              <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span>{property.location.split(',')[1] || property.location}</span>
            </p>
          </div>
          <div className="flex justify-between items-center text-[9px] text-gray-500 border-t border-gray-50 pt-2">
            <span className="font-semibold">{property.beds} Bed</span>
            <span className="font-semibold">{property.baths} Bath</span>
            <span className="font-semibold">{property.area}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'row') {
    return (
      <div 
        onClick={onClick}
        className="group bg-white rounded-2xl p-2.5 flex gap-3 shadow-sm border border-gray-100 transition-all duration-300 cursor-pointer items-center"
      >
        <div className="relative w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={property.image}
            alt={property.title}
            fill
            sizes="80px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0 pr-1 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-start mb-0.5">
              <h5 className="text-gray-900 font-bold text-sm truncate flex-1 leading-tight">{property.title}</h5>
              <span className="text-[#008FAB] font-extrabold text-sm ml-2">{formatPrice(property.price)}</span>
            </div>
            <p className="text-gray-500 text-xs truncate flex items-center gap-0.5 mb-2">
              <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>
          <div className="flex gap-3 text-[10px] text-gray-500 font-medium">
            <span className="flex items-center gap-0.5"><Bed className="w-3.5 h-3.5 text-[#008FAB]/70" /> {property.beds} Beds</span>
            <span className="flex items-center gap-0.5"><Bath className="w-3.5 h-3.5 text-[#008FAB]/70" /> {property.baths} Baths</span>
            <span className="flex items-center gap-0.5"><Maximize className="w-3.5 h-3.5 text-[#008FAB]/70" /> {property.area}</span>
          </div>
        </div>
      </div>
    );
  }

  // Favorite view card
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
    >
      {/* Image container */}
      <div className="relative h-[200px] w-full bg-slate-100 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {property.featured && (
          <div className="absolute top-3 left-3 bg-[#008FAB] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Featured
          </div>
        )}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-white text-red-500 transition-colors"
        >
          <Heart 
            className="w-4.5 h-4.5 fill-red-500 text-red-500" 
          />
        </button>

        {/* Floating price */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
          {property.oldPrice && (
            <span className="text-gray-400 line-through text-xs font-normal">
              {formatPrice(property.oldPrice)}
            </span>
          )}
          <span className="text-white text-base font-extrabold">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      {/* Price drop alert banner */}
      {property.priceDropMessage && (
        <div className="bg-[#E8F5F7] text-[#008FAB] px-4 py-2 text-xs font-semibold flex items-center gap-2 border-b border-[#D0E8EB]">
          <TrendingDown className="w-4 h-4" />
          <span>{property.priceDropMessage}</span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-gray-900 font-bold text-lg leading-tight truncate flex-1">{property.title}</h4>
          <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold ml-2">
            <Star className="w-3.5 h-3.5 fill-amber-500" />
            <span>{property.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
          <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Specs Row */}
        <div className="flex gap-4 text-xs text-gray-600 mb-4 pb-4 border-b border-gray-50 font-medium">
          <span className="flex items-center gap-1"><Bed className="w-4 h-4 text-[#008FAB]" /> {property.beds} Beds</span>
          <span className="flex items-center gap-1"><Bath className="w-4 h-4 text-[#008FAB]" /> {property.baths} Baths</span>
          <span className="flex items-center gap-1"><Maximize className="w-4 h-4 text-[#008FAB]" /> {property.area}</span>
        </div>

        {/* Bottom Save State & Actions */}
        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
          <span>{property.savedDate || "Saved recently"}</span>
          <span className="text-[#008FAB] font-semibold hover:underline flex items-center">
            View details <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Buttons Row */}
        <div className="flex gap-3 mt-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onMoreActions) onMoreActions(property, e);
            }}
            className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2.5 rounded-xl text-xs transition-colors"
          >
            More action
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onScheduleViewing) onScheduleViewing(property, e);
            }}
            className="flex-1 bg-[#008FAB] hover:bg-[#007a96] text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-sm"
          >
            Schedule viewing
          </button>
        </div>
      </div>
    </div>
  );
};
