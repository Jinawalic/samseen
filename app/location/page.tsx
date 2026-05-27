'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function Location() {
  const router = useRouter();
  const [locationEnabled, setLocationEnabled] = useState(false);

  const handleProceed = () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.userType === 'agent') {
      router.push('/agent-dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#008FAB]/10 to-[#008FAB]/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Enable Location
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Allow us to find properties near you
            </p>
          </div>

          {/* Google Map Card */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden mb-6 relative h-64">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto text-[#008FAB] mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-gray-500 text-sm">Google Map Preview</p>
              </div>
            </div>
          </div>

          {/* Location Note */}
          <div className="bg-[#E8F5F7] rounded-xl p-4 mb-6">
            <p className="text-[#008FAB] text-sm font-medium text-center">
              Turn on location to find nearby properties
            </p>
          </div>

          {/* Toggle Button */}
          <div className="flex items-center justify-center gap-7 mb-8">
            <span className="text-gray-600 text-sm">Location</span>
            <span className={`text-sm font-medium ${locationEnabled ? 'text-[#008FAB]' : 'text-gray-400'}`}>
              {locationEnabled ? 'On' : 'Off'}
            </span>
            <button
              onClick={() => setLocationEnabled(!locationEnabled)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                locationEnabled ? 'bg-[#008FAB]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  locationEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            
          </div>

          {/* Proceed Button */}
          <Button
            onClick={handleProceed}
            fullWidth
            size="lg"
            disabled={!locationEnabled}
            className={!locationEnabled ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}
