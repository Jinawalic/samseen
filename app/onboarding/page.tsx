'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import UserChoiceCard from '@/components/UserChoiceCard';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const router = useRouter();
  const [showChoiceCard, setShowChoiceCard] = useState(false);

  const handleGetStarted = () => {
    setShowChoiceCard(true);
  };

  const handleLookingForPlace = () => {
    router.push('/register?type=user');
  };

  const handleAgent = () => {
    router.push('/register?type=agent');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Teal Header Section */}
      <div className="bg-[#008FAB] px-6 py-8 flex-shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-12 h-12">
            <Image
              src="/images/logo.png"
              alt="Samseen Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">Samseen</h1>
            <p className="text-white/90 text-sm">Find your next home</p>
          </div>
        </div>
      </div>

      {/* White Content Section */}
      <div className="flex-1 bg-white px-6 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Verified properties, real people, near you.
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Browse property listings from verified landlords and agents. Connect directly via WhatsApp and find your perfect home today.
          </p>
        </div>

        {/* Feature Buttons */}
        <div className="flex gap-3 mb-8">
          <button className="flex-1 bg-[#E8F5F7] text-[#008FAB] px-4 py-3 rounded-lg text-sm font-medium hover:bg-[#D0E8EB] transition-colors">
            GPS Verified
          </button>
          <button className="flex-1 bg-[#E8F5F7] text-[#008FAB] px-4 py-3 rounded-lg text-sm font-medium hover:bg-[#D0E8EB] transition-colors">
            7-Day Fresh
          </button>
          <button className="flex-1 bg-[#E8F5F7] text-[#008FAB] px-4 py-3 rounded-lg text-sm font-medium hover:bg-[#D0E8EB] transition-colors">
            WhatsApp Direct
          </button>
        </div>

        {/* Get Started Button */}
        <Button
          onClick={handleGetStarted}
          fullWidth
          size="md"
          className="mb-4"
        >
          Get Started
        </Button>

        {/* Login Link */}
        <div className="text-center">
          <button
            onClick={handleLogin}
            className="text-[#008FAB] font-medium hover:underline"
          >
            Log in
          </button>
        </div>

        {/* Privacy Policy */}
        <p className="text-center text-gray-500 text-xs mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      {/* User Choice Card */}
      {showChoiceCard && (
        <>
          {/* Blur Overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40" />
          <UserChoiceCard
            onLookingForPlace={handleLookingForPlace}
            onAgent={handleAgent}
            className="z-50"
          />
        </>
      )}
    </div>
  );
}
