'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';

export default function AddPropertySuccess() {
  const router = useRouter();

  useEffect(() => {
    // Clear the stored data
    localStorage.removeItem('addPropertyStep1');
    localStorage.removeItem('addPropertyComplete');
  }, []);

  const handleViewProperty = () => {
    router.push('/agent/dashboard');
  };

  const handleAddAnother = () => {
    router.push('/agent/add-property');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-8 text-center shadow-lg">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-[#E8F5F7] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#008FAB]" />
          </div>

          {/* Success Message */}
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Property Added Successfully!
          </h1>
          <p className="text-gray-600 text-sm mb-8">
            Your property has been listed and is now visible to potential seekers.
          </p>

          {/* Property Summary Card */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#E8F5F7] rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-[#008FAB]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Property Listed</h3>
                <p className="text-gray-500 text-xs">Ready for viewings</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <p className="text-gray-600 text-xs">
                Your property will be reviewed and published within 24 hours.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleViewProperty}
              fullWidth
              size="md"
              className="rounded-xl flex items-center justify-center gap-2"
            >
              View My Properties
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={handleAddAnother}
              fullWidth
              size="md"
              variant="outline"
              className="rounded-xl"
            >
              Add Another Property
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
}
