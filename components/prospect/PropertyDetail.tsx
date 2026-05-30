import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ArrowLeft, Share2, Heart, Star, MapPin, Bed, Bath, Maximize, 
  Home, Calendar, Zap, FileText, Car, Droplet, Check, ShieldAlert,
  Phone, MessageCircle, ChevronDown, ChevronUp, Compass
} from 'lucide-react';
import { Property, formatPrice } from './mockData';

interface PropertyDetailProps {
  property: Property;
  isFavorite: boolean;
  onBack: () => void;
  onFavoriteToggle: (id: number) => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  isFavorite,
  onBack,
  onFavoriteToggle
}) => {
  const [activeImage, setActiveImage] = useState(property.image);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Share Link copied: ${window.location.href}`);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello, I'm interested in "${property.title}" at ${property.location} listed for ${formatPrice(property.price)}. Can you please provide more details?`);
    window.open(`https://wa.me/${property.agent.phone.replace(/\+/g, '')}?text=${text}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${property.agent.phone}`, '_self');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Back navigation header for desktop */}
        <div className="hidden md:flex items-center gap-2 mb-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#008FAB] font-semibold transition-colors bg-white px-4 py-2.5 rounded-full shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to listings</span>
          </button>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Images & Gallery (6 Cols on Desktop) */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Hero Image Container */}
            <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden shadow-md">
              <Image
                src={activeImage}
                alt={property.title}
                fill
                priority
                className="object-cover"
              />
              
              {/* Back button (Mobile only) */}
              <button 
                onClick={onBack}
                className="md:hidden absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              {/* Share & Like actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={handleShare}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-gray-700 hover:bg-white shadow transition-colors"
                >
                  <Share2 className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={() => onFavoriteToggle(property.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-red-500 hover:bg-white shadow transition-colors"
                >
                  <Heart className={`w-4.5 h-4.5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                </button>
              </div>

              {/* Floating Price Badge */}
              <div className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl text-white font-extrabold text-lg md:text-xl border border-white/20 shadow-lg">
                {formatPrice(property.price)}
              </div>
            </div>

            {/* Thumbnail Gallery (Clickable) */}
            <div className="flex gap-3 overflow-x-auto py-1 scrollbar-none">
              {property.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-14 md:w-24 md:h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-[#008FAB] scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* 360 Virtual Tour Banner */}
            <div className="bg-[#E8F5F7] border border-[#D0E8EB] rounded-3xl p-4 md:p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#008FAB] rounded-full flex items-center justify-center text-white">
                  <Compass className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm md:text-base">360° Virtual Tour</h5>
                  <p className="text-gray-500 text-xs md:text-sm">Experience the property from anywhere</p>
                </div>
              </div>
              <button className="bg-[#008FAB] hover:bg-[#007a96] text-white px-4 py-2 rounded-full font-bold text-xs md:text-sm transition-colors shadow-sm">
                Start Tour
              </button>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-gray-900 font-bold text-base md:text-lg mb-3">Description</h4>
              <p className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${isDescExpanded ? '' : 'line-clamp-3'}`}>
                {property.description}
              </p>
              <button 
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="text-[#008FAB] font-bold text-xs mt-3 flex items-center gap-1 hover:underline"
              >
                {isDescExpanded ? (
                  <>Read less <ChevronUp className="w-3.5 h-3.5" /></>
                ) : (
                  <>Read more <ChevronDown className="w-3.5 h-3.5" /></>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Title, Specs, Location, Agent (5 Cols on Desktop) */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Header / Brand block */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-gray-900 font-bold text-xl md:text-2xl ">{property.title}</h3>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-lg border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                      <span>{property.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm flex items-start gap-1">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>{property.location}</span>
                  </p>
                </div>
              </div>

              {/* Distance Info tag */}
              <div className="bg-gray-100 text-gray-700 text-xs font-semibold px-3.5 py-2.5 rounded-2xl flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#008FAB] inline-block animate-pulse"></span>
                <span>2.5 km from your current location</span>
              </div>

              {/* Core Features */}
              <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
                <div className="bg-gray-50 rounded-2xl p-3 text-center flex flex-col items-center">
                  <Bed className="w-5 h-5 text-[#008FAB] mb-1" />
                  <span className="text-gray-900 font-bold text-sm">{property.beds} Beds</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-3 text-center flex flex-col items-center">
                  <Bath className="w-5 h-5 text-[#008FAB] mb-1" />
                  <span className="text-gray-900 font-bold text-sm">{property.baths} Baths</span>
                </div>
                <div className="bg-gray-50 rounded-2xl p-3 text-center flex flex-col items-center">
                  <Maximize className="w-5 h-5 text-[#008FAB] mb-1" />
                  <span className="text-gray-900 font-bold text-xs truncate max-w-full">{property.area}</span>
                </div>
              </div>
            </div>

            {/* Technical details grid */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-gray-900 font-bold text-base md:text-lg mb-4">Technical Details</h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                <div className="flex gap-2.5 items-center">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                    <Home className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Building Area</span>
                    <span className="text-gray-800 text-xs font-semibold">{property.buildingArea || property.area}</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-center">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Built Year</span>
                    <span className="text-gray-800 text-xs font-semibold">{property.builtYear || 2021}</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-center">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                    <Zap className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Power capacity</span>
                    <span className="text-gray-800 text-xs font-semibold">{property.power || "N/A"}</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-center">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Certificate</span>
                    <span className="text-gray-800 text-[10px] font-semibold truncate max-w-[120px] inline-block" title={property.certificate}>
                      {property.certificate || "C of O"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-center">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                    <Car className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Parking Space</span>
                    <span className="text-gray-800 text-xs font-semibold">{property.parking || "2 Cars"}</span>
                  </div>
                </div>

                <div className="flex gap-2.5 items-center">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                    <Droplet className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Water Supply</span>
                    <span className="text-gray-800 text-xs font-semibold">{property.water || "Borehole"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities & Features */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-gray-900 font-bold text-base md:text-lg mb-3">Amenities & Features</h4>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, idx) => (
                  <span 
                    key={idx}
                    className="bg-[#E8F5F7] text-[#008FAB] text-xs font-semibold px-3.5 py-2 rounded-full flex items-center gap-1.5 border border-[#D0E8EB]/50"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{amenity}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Location & Nearby Places */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-gray-900 font-bold text-base md:text-lg">Location & Nearby</h4>
                <button className="text-[#008FAB] font-bold text-xs hover:underline">View on map</button>
              </div>

              {/* Map Preview Graphic */}
              <div className="relative h-[150px] w-full rounded-2xl overflow-hidden bg-slate-100 border border-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-cover bg-center filter saturate-[0.8]" style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/3.42,6.45,12,0/400x150?access_token=mock')` }}>
                  {/* Fallback styling/gradient to represent Lagos map grid */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#008FAB]/10 to-[#008FAB]/30 mix-blend-overlay"></div>
                  <div className="absolute inset-0" style={{ 
                    backgroundImage: 'radial-gradient(circle, transparent 20%, #ffffff 80%)', 
                    backgroundSize: '15px 15px', 
                    opacity: 0.15 
                  }} />
                </div>
                
                {/* Simulated Pins */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#008FAB] rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg animate-bounce">
                    <MapPin className="w-5 h-5 fill-white text-[#008FAB]" />
                  </div>
                  <span className="bg-black/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-md mt-1.5 shadow-md">
                    {property.title}
                  </span>
                </div>
              </div>

              {/* Nearby List */}
              <div className="space-y-3.5 pt-2">
                {property.nearby.map((place, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 font-semibold border border-gray-100">
                        {place.type[0]}
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800 leading-tight">{place.name}</h5>
                        <p className="text-gray-400 text-[10px]">{place.type}</p>
                      </div>
                    </div>
                    <span className="text-gray-500 font-semibold">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent / Contact details */}
            <div className="bg-white rounded-3xl p-5 shadow-md border border-[#008FAB]/20 flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                  <Image
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-extrabold text-gray-900 text-sm leading-tight">{property.agent.name}</h5>
                  </div>
                  <p className="text-gray-500 text-xs">{property.agent.role}</p>
                  <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold mt-0.5">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>({property.agent.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Call & WhatsApp actions */}
              <div className="flex gap-2">
                <button 
                  onClick={handleCall}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#008FAB] hover:bg-gray-50 transition-colors shadow-sm"
                  title="Call Agent"
                >
                  <Phone className="w-4.5 h-4.5" />
                </button>
                <button 
                  onClick={handleWhatsApp}
                  className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20ba59] transition-colors shadow-md"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4.5 h-4.5 fill-white text-[#25D366]" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Floating Bottom Nav Action bar (Mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3 z-30 md:hidden shadow-2xl">
        <button 
          onClick={handleCall}
          className="flex-1 bg-gray-100 text-gray-800 font-bold py-3.5 rounded-2xl text-sm transition-colors border border-gray-200 flex items-center justify-center gap-2"
        >
          <Phone className="w-4.5 h-4.5 text-[#008FAB]" />
          <span>Call Agent</span>
        </button>
        <button 
          onClick={handleWhatsApp}
          className="flex-1 bg-[#008FAB] hover:bg-[#007a96] text-white font-bold py-3.5 rounded-2xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4.5 h-4.5 fill-white text-[#008FAB]" />
          <span>WhatsApp Seeker</span>
        </button>
      </div>
    </div>
  );
};
