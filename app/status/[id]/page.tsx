'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Card from '@/components/Card';

// Mock data for property statuses
const mockStatuses = [
  {
    id: 1,
    name: 'John Smith',
    avatar: 'https://i.pravatar.cc/150?img=1',
    time: '2 hours ago',
    posts: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        caption: 'Beautiful 3-bedroom apartment in downtown',
        time: '2 hours ago',
        title: 'Beautiful 3-bedroom apartment',
        location: 'Downtown Area',
        amount: '₦1,500,000',
        amenities: ['3 Bedrooms', '2 Bathrooms', 'Spacious Living Room', 'Modern Kitchen', 'Parking Space']
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        caption: 'Spacious living room with natural light',
        time: '2 hours ago',
        title: 'Spacious living room',
        location: 'Downtown Area',
        amount: '₦1,500,000',
        amenities: ['3 Bedrooms', '2 Bathrooms', 'Spacious Living Room', 'Modern Kitchen', 'Parking Space']
      }
    ]
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=5',
    time: '5 hours ago',
    posts: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        caption: 'Luxury villa with pool',
        time: '5 hours ago',
        title: 'Luxury villa with pool',
        location: 'Beverly Hills',
        amount: '₦5,000,000',
        amenities: ['5 Bedrooms', '4 Bathrooms', 'Private Pool', 'Garden', 'Garage', 'Security']
      }
    ]
  },
  {
    id: 3,
    name: 'Mike Wilson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    time: '1 day ago',
    posts: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        caption: 'Modern house with garden',
        time: '1 day ago',
        title: 'Modern house with garden',
        location: 'Suburban Area',
        amount: '₦2,200,000',
        amenities: ['4 Bedrooms', '3 Bathrooms', 'Garden', 'Parking', 'Modern Design']
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        caption: 'Open kitchen design',
        time: '1 day ago',
        title: 'Open kitchen design',
        location: 'Suburban Area',
        amount: '₦2,200,000',
        amenities: ['4 Bedrooms', '3 Bathrooms', 'Garden', 'Parking', 'Modern Design']
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
        caption: 'Master bedroom suite',
        time: '1 day ago',
        title: 'Master bedroom suite',
        location: 'Suburban Area',
        amount: '₦2,200,000',
        amenities: ['4 Bedrooms', '3 Bathrooms', 'Garden', 'Parking', 'Modern Design']
      }
    ]
  },
  {
    id: 4,
    name: 'Emily Davis',
    avatar: 'https://i.pravatar.cc/150?img=9',
    time: '2 days ago',
    posts: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        caption: 'Cozy studio apartment',
        time: '2 days ago',
        title: 'Cozy studio apartment',
        location: 'City Center',
        amount: '₦950,000',
        amenities: ['Studio', '1 Bathroom', 'City View', 'Modern Furnishings']
      }
    ]
  }
];

export default function StatusViewer() {
  const params = useParams();
  const router = useRouter();
  const statusId = parseInt(params.id as string);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [status, setStatus] = useState<typeof mockStatuses[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const foundStatus = mockStatuses.find(s => s.id === statusId);
    if (foundStatus) {
      setStatus(foundStatus);
    }
  }, [statusId]);

  const handleNext = () => {
    if (status && currentPostIndex < status.posts.length - 1) {
      setCurrentPostIndex(prev => prev + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(prev => prev - 1);
    }
  };

  const handleViewDetails = () => {
    setShowModal(true);
  };

  const handleChatAgent = () => {
    const phoneNumber = '1234567890'; // Replace with actual agent phone number
    const message = encodeURIComponent(`Hi, I'm interested in the property: ${currentPost?.title} at ${currentPost?.location}. Can you provide more details?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleClose = () => {
    router.push('/dashboard');
  };

  if (!status) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const currentPost = status.posts[currentPostIndex];

  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* Status Viewer */}
      <div className="flex-1 relative flex items-center justify-center bg-black" style={{ height: 'calc(100vh - 80px)' }}>
        {/* Progress indicators */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
          {status.posts.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                index < currentPostIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Current post image */}
        <div className="relative w-full h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-0">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}
          <img
            src={currentPost.image}
            alt={currentPost.caption}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        </div>

        {/* Caption overlay */}
        <div className="absolute bottom-20 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white text-lg font-medium mb-1">{currentPost.title}</p>
          <p className="text-white/80 text-sm mb-2">{currentPost.location}</p>
          <p className="text-white text-lg font-semibold">{currentPost.amount}</p>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          disabled={currentPostIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Tap areas for navigation */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer"
          onClick={handlePrevious}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer"
          onClick={handleNext}
        />
      </div>

      {/* View Details Button */}
      <div className="px-4 py-4 flex items-center justify-center">
        <button
          onClick={handleViewDetails}
          className="flex items-center gap-3 bg-white text-[#008FAB] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View Details
        </button>
      </div>

      {/* Property Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-[#008FAB] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-xl font-semibold">Property Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentPost?.title}</h3>
              <p className="text-gray-600 text-lg mb-4">{currentPost?.location}</p>
              <p className="text-[#008FAB] text-2xl font-bold mb-6">{currentPost?.amount}</p>

              <h4 className="text-lg font-semibold text-gray-800 mb-3">Amenities</h4>
              <div className="space-y-2 mb-6">
                {currentPost?.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#008FAB] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>

              {/* Chat Agent Button */}
              <button
                onClick={handleChatAgent}
                className="w-full flex items-center justify-center gap-3 bg-[#008FAB] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#007A8F] transition-colors shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
