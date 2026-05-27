'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get('type') || 'user';
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    certificationNumber: ''
  });
  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    certificationNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      phone: '',
      certificationNumber: ''
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    if (userType === 'agent' && !formData.certificationNumber.trim()) {
      newErrors.certificationNumber = 'Certification number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Store user data (in a real app, this would go to a backend)
      localStorage.setItem('user', JSON.stringify({ ...formData, userType }));
      router.push('/location');
    }
  };

  const handleBack = () => {
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#008FAB]/10 to-[#008FAB]/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-12">
          {/* Header */}
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative w-20 h-20">
                <Image
                  src="/images/logo.png"
                  alt="Samseen Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Enter your details to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-3">
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors.fullName}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
              error={errors.phone}
              required
            />

            {userType === 'agent' && (
              <Input
                label="Certification Number"
                name="certificationNumber"
                value={formData.certificationNumber}
                onChange={handleChange}
                placeholder="Enter your certification number"
                error={errors.certificationNumber}
                required
              />
            )}

            <Button
              type="submit"
              fullWidth
              size="lg"
              className="mt-3"
            >
              Register
            </Button>
          </form>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="w-full mt-4 text-center text-[#008FAB] hover:underline text-sm font-medium"
          >
            ← Back to onboarding
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-2">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-[#008FAB] hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
