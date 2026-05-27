'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: ''
  });
  const [errors, setErrors] = useState({
    phone: ''
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
      phone: ''
    };
    let isValid = true;

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Check if user exists (in a real app, this would check backend)
      const existingUser = localStorage.getItem('user');
      if (existingUser) {
        const user = JSON.parse(existingUser);
        if (user.phone === formData.phone.replace(/\s/g, '')) {
          router.push('/dashboard');
          return;
        }
      }
      // If no user found, redirect to register
      router.push('/register');
    }
  };

  const handleBack = () => {
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#008FAB]/10 to-[#008FAB]/5 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
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
              Welcome Back
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Enter your phone number to login
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <Button
              type="submit"
              fullWidth
              size="lg"
              className="mt-8"
            >
              Login
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
        <p className="text-center text-gray-500 text-xs mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-[#008FAB] hover:underline font-medium"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
