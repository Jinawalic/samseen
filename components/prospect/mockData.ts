export interface Agent {
  name: string;
  role: string;
  reviews: number;
  phone: string;
  avatar: string;
}

export interface NearbyPlace {
  name: string;
  type: string;
  distance: string;
}

export interface Property {
  id: number;
  title: string;
  name?: string; // For backward compatibility
  location: string;
  price: number;
  oldPrice?: number;
  priceDropMessage?: string;
  beds: number;
  baths: number;
  area: string;
  rating: number;
  category: 'House' | 'Apartment' | 'Villa' | 'Townhouse' | 'Studio';
  featured: boolean;
  image: string;
  gallery: string[];
  buildingArea?: string;
  builtYear?: number;
  power?: string;
  certificate?: string;
  parking?: string;
  water?: string;
  description: string;
  amenities: string[];
  nearby: NearbyPlace[];
  agent: Agent;
  savedDate?: string;
}

export const mockProperties: Property[] = [
  {
    id: 1,
    title: "Luxury modern house",
    name: "Luxury modern house",
    location: "12, Admiralty Way, Lekki Phase 1, Lagos",
    price: 185000000,
    oldPrice: 195000000,
    priceDropMessage: "Price drop ₦10,000,000 since you saved!",
    beds: 4,
    baths: 4,
    area: "250m²",
    rating: 4.9,
    category: "House",
    featured: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    buildingArea: "280m²",
    builtYear: 2022,
    power: "15 kVA Generator",
    certificate: "C of O (Certificate of Occupancy)",
    parking: "3 Cars",
    water: "Borehole & Clean Treatment Plant",
    description: "Discover luxury living in this stunning modern house located in the prestigious Lekki Phase 1 area. This property offers spacious rooms, high-end finishing, fully fitted kitchen, swimming pool, automated gate, and state-of-the-art security.",
    amenities: ["Air conditioning", "Wifi", "Security 24/7", "Laundry Area", "Water heater", "CCTV", "Swimming Pool"],
    nearby: [
      { name: "Lekki British School", type: "Education", distance: "1.2 km" },
      { name: "Evercare Hospital", type: "Healthcare", distance: "1.8 km" },
      { name: "Lekki Grand Mall", type: "Shopping", distance: "0.5 km" },
      { name: "Admiralty Bus Stop", type: "Transport", distance: "1.0 km" }
    ],
    agent: {
      name: "Sarah Jonson",
      role: "Senior property consultant",
      reviews: 127,
      phone: "+2348031234567",
      avatar: "https://i.pravatar.cc/150?img=47"
    },
    savedDate: "Saved 2d ago"
  },
  {
    id: 2,
    title: "Luxury condo",
    name: "Luxury condo",
    location: "Kunle Adebowale St, Victoria Island, Lagos",
    price: 130000000,
    oldPrice: 135000000,
    priceDropMessage: "Price drop ₦5,000,000 since you saved!",
    beds: 3,
    baths: 3,
    area: "120m²",
    rating: 4.8,
    category: "Apartment",
    featured: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"
    ],
    buildingArea: "150m²",
    builtYear: 2021,
    power: "24/7 Grid & Gen backup",
    certificate: "Deed of Assignment",
    parking: "2 Cars",
    water: "Clean borehole treatment",
    description: "Enjoy a breathtaking skyline view from this premium condo in Victoria Island. High-floor unit with massive floor-to-ceiling windows, modern fittings, and access to a shared gym and rooftop lounge.",
    amenities: ["Air conditioning", "Wifi", "Security 24/7", "Gym Access", "Water heater", "CCTV"],
    nearby: [
      { name: "British International School", type: "Education", distance: "2.1 km" },
      { name: "Reddington Hospital", type: "Healthcare", distance: "1.0 km" },
      { name: "The Palms Shopping Mall", type: "Shopping", distance: "1.5 km" }
    ],
    agent: {
      name: "Tunde Alabi",
      role: "VI Specialist Agent",
      reviews: 94,
      phone: "+2348098765432",
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    savedDate: "Saved 3d ago"
  },
  {
    id: 3,
    title: "Spacious townhouse",
    name: "Spacious townhouse",
    location: "Maitama Extension, Maitama, Abuja",
    price: 250000000,
    beds: 4,
    baths: 4,
    area: "320m²",
    rating: 4.7,
    category: "Townhouse",
    featured: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800"
    ],
    buildingArea: "350m²",
    builtYear: 2023,
    power: "20 kVA Solar & Gen Hybrid",
    certificate: "C of O",
    parking: "4 Cars",
    water: "FCT Water Board & Borehole",
    description: "Nestled in the quiet, secure, and prestigious neighborhood of Maitama Extension, this high-end townhouse offers modern security systems, green lawns, and massive ensuite bedrooms.",
    amenities: ["Air conditioning", "Wifi", "Security 24/7", "Solar Inverter", "CCTV", "Garden"],
    nearby: [
      { name: "Abuja Prep School", type: "Education", distance: "1.4 km" },
      { name: "National Hospital", type: "Healthcare", distance: "3.2 km" },
      { name: "Transcorp Hilton", type: "Social", distance: "1.8 km" }
    ],
    agent: {
      name: "Chidi Okafor",
      role: "Abuja Luxury Homes Consultant",
      reviews: 83,
      phone: "+2348123456789",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    savedDate: "Saved 1w ago"
  },
  {
    id: 11,
    title: "Beachfront villa",
    name: "Beachfront villa",
    location: "Lekki Phase 1, Lagos",
    price: 420000000,
    beds: 5,
    baths: 5,
    area: "500m²",
    rating: 4.9,
    category: "Villa",
    featured: true,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    ],
    buildingArea: "550m²",
    builtYear: 2023,
    power: "30kVA Generator",
    certificate: "C of O",
    parking: "5 Cars",
    water: "Borehole & Treatment Plant",
    description: "Stunning beachfront villa with direct ocean access, private infinity pool, and breathtaking sunset views. Features include smart home automation, home theater, and guest quarters.",
    amenities: ["Air conditioning", "Wifi", "Security 24/7", "Swimming Pool", "Private Beach", "Smart Home", "CCTV"],
    nearby: [
      { name: "Lekki British School", type: "Education", distance: "2.0 km" },
      { name: "Evercare Hospital", type: "Healthcare", distance: "2.5 km" },
      { name: "Lekki Grand Mall", type: "Shopping", distance: "1.0 km" }
    ],
    agent: {
      name: "Sarah Jonson",
      role: "Senior property consultant",
      reviews: 127,
      phone: "+2348031234567",
      avatar: "https://i.pravatar.cc/150?img=47"
    }
  },
  {
    id: 12,
    title: "Modern penthouse",
    name: "Modern penthouse",
    location: "Victoria Island, Lagos",
    price: 280000000,
    beds: 4,
    baths: 4,
    area: "350m²",
    rating: 4.8,
    category: "Apartment",
    featured: true,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
    ],
    buildingArea: "380m²",
    builtYear: 2022,
    power: "24/7 Power",
    certificate: "Deed of Assignment",
    parking: "3 Cars",
    water: "Treated Water",
    description: "Ultra-modern penthouse with panoramic city views, private elevator access, rooftop terrace, and luxury finishes throughout. Perfect for the discerning buyer.",
    amenities: ["Air conditioning", "Wifi", "Security 24/7", "Gym Access", "Rooftop Terrace", "Smart Home", "CCTV"],
    nearby: [
      { name: "British International School", type: "Education", distance: "1.5 km" },
      { name: "Reddington Hospital", type: "Healthcare", distance: "1.2 km" },
      { name: "The Palms Shopping Mall", type: "Shopping", distance: "1.0 km" }
    ],
    agent: {
      name: "Tunde Alabi",
      role: "VI Specialist Agent",
      reviews: 94,
      phone: "+2348098765432",
      avatar: "https://i.pravatar.cc/150?img=33"
    }
  },
  {
    id: 4,
    title: "Cozy apartment",
    name: "Cozy apartment",
    location: "Herbert Macaulay Way, Yaba, Lagos",
    price: 45000000,
    beds: 2,
    baths: 2,
    area: "95m²",
    rating: 4.5,
    category: "Apartment",
    featured: false,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"
    ],
    buildingArea: "105m²",
    builtYear: 2020,
    power: "Prepaid Meter & Shared Generator",
    certificate: "Registered Survey & Receipt",
    parking: "1 Car",
    water: "Borehole & Basic Filter",
    description: "An affordable yet stunning 2-bedroom apartment in the heart of Yaba. Perfect for young professionals or students who want proximity to the Mainland hubs.",
    amenities: ["Air conditioning", "Wifi", "Water heater", "Kitchen Cabinets"],
    nearby: [
      { name: "University of Lagos (Unilag)", type: "Education", distance: "0.8 km" },
      { name: "Yaba College of Technology", type: "Education", distance: "1.2 km" },
      { name: "E-Center Mall (Cinema)", type: "Shopping", distance: "0.4 km" }
    ],
    agent: {
      name: "Segun Arinze",
      role: "Mainland Agent Specialist",
      reviews: 48,
      phone: "+2347065432109",
      avatar: "https://i.pravatar.cc/150?img=60"
    }
  },
  {
    id: 5,
    title: "Spacious villa",
    name: "Spacious villa",
    location: "Maitama Extension, Abuja",
    price: 480000000,
    beds: 5,
    baths: 6,
    area: "450m²",
    rating: 4.95,
    category: "Villa",
    featured: false,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    ],
    buildingArea: "520m²",
    builtYear: 2023,
    power: "30kVA Standby Generator",
    certificate: "C of O",
    parking: "6 Cars",
    water: "Dedicated Borehole & Advanced Reverse Osmosis System",
    description: "Ultimate luxury and safety. A grand 5-bedroom villa with massive smart home systems, cinema room, private swimming pool, guest chalet, and premium finishings in Abuja's finest area.",
    amenities: ["Air conditioning", "Wifi", "Security 24/7", "Swimming Pool", "Private Gym", "Smart Automation", "CCTV"],
    nearby: [
      { name: "British School of Abuja", type: "Education", distance: "2.3 km" },
      { name: "Maitama Clinic", type: "Healthcare", distance: "1.1 km" },
      { name: "Abuja Farmers Market", type: "Shopping", distance: "1.5 km" }
    ],
    agent: {
      name: "Chidi Okafor",
      role: "Abuja Luxury Homes Consultant",
      reviews: 83,
      phone: "+2348123456789",
      avatar: "https://i.pravatar.cc/150?img=12"
    }
  },
  {
    id: 6,
    title: "Family house",
    name: "Family house",
    location: "GRA Phase 2, Port Harcourt",
    price: 95000000,
    oldPrice: 105000000,
    priceDropMessage: "Price drop ₦10,000,000 since you saved!",
    beds: 4,
    baths: 4,
    area: "200m²",
    rating: 4.6,
    category: "House",
    featured: false,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
    ],
    buildingArea: "230m²",
    builtYear: 2019,
    power: "15kVA Soundproof Generator",
    certificate: "C of O",
    parking: "3 Cars",
    water: "Borehole & treatment plant",
    description: "Spacious family home in a quiet, tree-lined street in GRA Phase 2, Port Harcourt. Includes a boys-quarter (BQ), study, children's play area, and high perimeter fencing.",
    amenities: ["Air conditioning", "Security 24/7", "Water heater", "Children Play Area", "BQ included"],
    nearby: [
      { name: "Greenoak International School", type: "Education", distance: "1.7 km" },
      { name: "Braithewaite Memorial Specialist Hospital", type: "Healthcare", distance: "2.4 km" },
      { name: "Genesis Deluxe Cinema", type: "Entertainment", distance: "1.0 km" }
    ],
    agent: {
      name: "Blessing Nze",
      role: "Garden City Property Pro",
      reviews: 56,
      phone: "+2348055554444",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    savedDate: "Saved 4d ago"
  },
  {
    id: 7,
    title: "Modern studio apartment",
    name: "Modern studio apartment",
    location: "Ikeja GRA, Lagos",
    price: 28000000,
    beds: 1,
    baths: 1,
    area: "45m²",
    rating: 4.3,
    category: "Studio",
    featured: false,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"
    ],
    buildingArea: "50m²",
    builtYear: 2021,
    power: "Prepaid Meter",
    certificate: "Governor's Consent",
    parking: "1 Car",
    water: "Borehole",
    description: "Perfect for young professionals, this modern studio apartment in Ikeja GRA offers a compact yet comfortable living space with modern fittings and proximity to business districts.",
    amenities: ["Air conditioning", "Wifi", "Water heater", "Kitchen Cabinets"],
    nearby: [
      { name: "Ikeja City Mall", type: "Shopping", distance: "0.8 km" },
      { name: "Lagos State University Teaching Hospital", type: "Healthcare", distance: "2.1 km" }
    ],
    agent: {
      name: "Funmi Adeyemi",
      role: "Lagos Mainland Specialist",
      reviews: 72,
      phone: "+2348123456780",
      avatar: "https://i.pravatar.cc/150?img=45"
    }
  },
  {
    id: 8,
    title: "Elegant townhouse",
    name: "Elegant townhouse",
    location: "Wuse 2, Abuja",
    price: 180000000,
    beds: 3,
    baths: 3,
    area: "180m²",
    rating: 4.7,
    category: "Townhouse",
    featured: false,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
    ],
    buildingArea: "200m²",
    builtYear: 2022,
    power: "Solar Inverter",
    certificate: "C of O",
    parking: "2 Cars",
    water: "Borehole",
    description: "Elegant townhouse in the heart of Wuse 2, Abuja. Features modern design, spacious rooms, and excellent security in a prime location.",
    amenities: ["Air conditioning", "Wifi", "Security 24/7", "Water heater", "Garden"],
    nearby: [
      { name: "Wuse Market", type: "Shopping", distance: "0.5 km" },
      { name: "National Hospital", type: "Healthcare", distance: "1.5 km" }
    ],
    agent: {
      name: "Amina Mohammed",
      role: "Abuja Property Expert",
      reviews: 65,
      phone: "+2348098765430",
      avatar: "https://i.pravatar.cc/150?img=23"
    }
  },
  {
    id: 9,
    title: "Luxury penthouse",
    name: "Luxury penthouse",
    location: "Banana Island, Lagos",
    price: 350000000,
    beds: 4,
    baths: 5,
    area: "400m²",
    rating: 5.0,
    category: "Apartment",
    featured: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
    ],
    buildingArea: "450m²",
    builtYear: 2023,
    power: "24/7 Power",
    certificate: "C of O",
    parking: "4 Cars",
    water: "Treated Water Supply",
    description: "Exclusive penthouse in prestigious Banana Island with panoramic views, private elevator, rooftop terrace, and luxury finishes throughout.",
    amenities: ["Air conditioning", "Wifi", "Security 24/7", "Swimming Pool", "Private Gym", "Smart Home", "CCTV"],
    nearby: [
      { name: "Lagoon School", type: "Education", distance: "1.0 km" },
      { name: "Reddington Hospital", type: "Healthcare", distance: "2.0 km" }
    ],
    agent: {
      name: "Emeka Okonkwo",
      role: "Luxury Property Specialist",
      reviews: 112,
      phone: "+2348034567890",
      avatar: "https://i.pravatar.cc/150?img=11"
    }
  },
  {
    id: 10,
    title: "Cozy family home",
    name: "Cozy family home",
    location: "Trans Amadi, Port Harcourt",
    price: 65000000,
    beds: 3,
    baths: 2,
    area: "150m²",
    rating: 4.4,
    category: "House",
    featured: false,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    ],
    buildingArea: "170m²",
    builtYear: 2018,
    power: "Generator",
    certificate: "C of O",
    parking: "2 Cars",
    water: "Borehole",
    description: "Comfortable family home in Trans Amadi with good access to amenities. Perfect for families looking for affordable housing in Port Harcourt.",
    amenities: ["Air conditioning", "Security 24/7", "Water heater"],
    nearby: [
      { name: "Port Harcourt Mall", type: "Shopping", distance: "1.2 km" },
      { name: "University of Port Harcourt", type: "Education", distance: "3.5 km" }
    ],
    agent: {
      name: "Chinedu Eze",
      role: "Port Harcourt Agent",
      reviews: 38,
      phone: "+2348076543210",
      avatar: "https://i.pravatar.cc/150?img=52"
    }
  }
];

export const formatPrice = (price: number): string => {
  return '₦' + price.toLocaleString('en-NG');
};
