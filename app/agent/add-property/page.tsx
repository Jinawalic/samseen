'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { ArrowLeft, Camera, Video, X, Sparkles, Eye, MapPin, Bed, Bath, Check, Home, Plus, RefreshCw, MessageSquare, LogOut, UserCircle, ArrowUpLeftFromSquareIcon, LucideArrowUpLeft } from 'lucide-react';
import { DashboardButton } from '@/components/agent/DashboardButton';
import SidebarNav from '@/components/agent/SidebarNav';
import BottomNav from '@/components/agent/BottomNav';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
}

export default function AddProperty() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    propertyType: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [] as string[]
  });

  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'Elevator',
    'Balcony', 'Garden', 'Air Conditioning', 'WiFi', 'Backup Generator',
    'Water Supply', 'Furnished', 'Pet Friendly', '24/7 Power', 'Clubhouse'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 20) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: true 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsCameraOpen(false);
    setIsRecording(false);
    setRecordingTime(0);
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageUrl = canvas.toDataURL('image/jpeg');
        setMediaItems(prev => [...prev, { id: Date.now().toString(), type: 'image', url: imageUrl }]);
      }
    }
  };

  const startRecording = () => {
    if (streamRef.current) {
      const mediaRecorder = new MediaRecorder(streamRef.current);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setMediaItems(prev => [...prev, { id: Date.now().toString(), type: 'video', url: videoUrl }]);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setRecordingTime(0);
  };

  const removeMedia = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
  };

  const handleGenerateDescription = async () => {
    if (!formData.title || !formData.propertyType) {
      alert('Please enter property title and select property type first.');
      return;
    }

    setIsGeneratingDescription(true);

    // Simulate AI generation with GPS coordinates
    setTimeout(() => {
      const generatedDescription = `Discover this stunning ${formData.propertyType} located in a prime area. This ${formData.title} offers modern living with excellent amenities. Situated in a strategic location with easy access to major landmarks, shopping centers, and transportation hubs. The property features contemporary architecture and premium finishes, making it perfect for comfortable living. GPS coordinates will be automatically captured upon submission to ensure accurate location verification.`;
      
      setFormData(prev => ({ ...prev, description: generatedDescription }));
      setIsGeneratingDescription(false);
    }, 2000);
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handlePublish = () => {
    // Store complete property data
    const completeData = {
      ...formData,
      mediaItems,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('newProperty', JSON.stringify(completeData));
    router.push('/agent/add-property/success');
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/prospect/onboarding');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <SidebarNav activePage="add" />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden bg-[#008FAB] text-white top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ArrowLeft className="w-5 h-5 text-white" />
              <h1 className="text-sm font-semibold truncate max-w-[200px]">Add Property</h1>
            </div>
            <DashboardButton
              variant="outline"
              onClick={handleLogout}
              className="text-white hover:bg-white/20 px-3 py-1 rounded-full text-sm transition-colors border-none bg-transparent"
            >
              Logout
            </DashboardButton>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:bg-[#008FAB] px-6 py-4 flex items-center gap-4">
          <button onClick={handleBack} className="text-white hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-xl font-bold">Add Property</h1>
        </div>

        {/* Content */}
        <div className="px-4 md:px-6 py-6 max-w-4xl mx-auto pb-24 md:pb-8">
        <div className="space-y-8">
          {/* Camera/Video Section */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Property Media
            </label>
            
            {!isCameraOpen ? (
              <div className="grid grid-cols-1 gap-4 mb-4">
                <button
                  onClick={openCamera}
                  className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#008FAB] hover:bg-[#E8F5F7] transition-all"
                >
                  <Camera className="w-8 h-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Take Photo</span>
                </button>
              </div>
            ) : (
              <div className="relative bg-black rounded-xl overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-64 md:h-96 object-cover"
                />
                <button
                  onClick={closeCamera}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                  <button
                    onClick={takePhoto}
                    className="bg-white/90 hover:bg-white p-4 rounded-full transition-colors"
                  >
                    <Camera className="w-6 h-6 text-gray-800" />
                  </button>
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="bg-red-500 hover:bg-red-600 p-4 rounded-full transition-colors"
                    >
                      <Video className="w-6 h-6 text-white" />
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="bg-red-500 hover:bg-red-600 p-4 rounded-full transition-colors animate-pulse"
                    >
                      <div className="w-6 h-6 bg-white rounded-full" />
                    </button>
                  )}
                </div>

                {isRecording && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Recording: {recordingTime}s / 20s
                  </div>
                )}
              </div>
            )}

            {/* Thumbnails Row */}
            {mediaItems.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {mediaItems.map((item) => (
                  <div key={item.id} className="relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-2 border-gray-200">
                    {item.type === 'image' ? (
                      <img src={item.url} alt="Property" className="w-full h-full object-cover" />
                    ) : (
                      <video src={item.url} className="w-full h-full object-cover" controls />
                    )}
                    <button
                      onClick={() => removeMedia(item.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-1 left-1 bg-black/50 text-white px-2 py-0.5 rounded text-xs">
                      {item.type === 'image' ? 'Photo' : 'Video'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Property Title & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Property Title
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Modern 3-Bedroom Apartment"
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008FAB] focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
              >
                <option value="">Select property type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
                <option value="studio">Studio</option>
              </select>
            </div>
          </div>

          {/* AI Description Generation */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Property Description
            </label>
            <div className="flex gap-2 mb-3">
              <Button
                onClick={handleGenerateDescription}
                disabled={isGeneratingDescription || !formData.title || !formData.propertyType}
                size="sm"
                className="rounded-xl flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {isGeneratingDescription ? 'Generating...' : 'AI Generate'}
              </Button>
            </div>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="AI will generate description based on title, type, and GPS location..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008FAB] focus:border-transparent transition-all duration-200 text-gray-900 bg-white resize-none"
            />
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Bedrooms
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Bed className="w-5 h-5" />
                </span>
                <Input
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  placeholder="3"
                  type="number"
                  className="pl-12 rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Bathrooms
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Bath className="w-5 h-5" />
                </span>
                <Input
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                  placeholder="2"
                  type="number"
                  className="pl-12 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Amenities
            </label>
            
            {/* Selected Amenities Display */}
            {formData.amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-3 py-1.5 bg-[#008FAB] text-white rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {amenity}
                    <button
                      onClick={() => toggleAmenity(amenity)}
                      className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Select Dropdown */}
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  toggleAmenity(e.target.value);
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008FAB] focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
            >
              <option value="">Select amenities</option>
              {amenitiesList
                .filter(amenity => !formData.amenities.includes(amenity))
                .map((amenity) => (
                  <option key={amenity} value={amenity}>
                    {amenity}
                  </option>
                ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handlePreview}
              variant="outline"
              size="md"
              className="rounded-xl flex-1 flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview
            </Button>
            <Button
              onClick={handlePublish}
              size="md"
              className="rounded-xl flex-1"
            >
              Publish
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Property Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Media Preview */}
              {mediaItems.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-700 mb-3">Media</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {mediaItems.map((item) => (
                      <div key={item.id} className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-200">
                        {item.type === 'image' ? (
                          <img src={item.url} alt="Property" className="w-full h-full object-cover" />
                        ) : (
                          <video src={item.url} className="w-full h-full object-cover" controls />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Details Preview */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">Title</h3>
                  <p className="text-gray-900">{formData.title || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">Type</h3>
                  <p className="text-gray-900 capitalize">{formData.propertyType || 'Not selected'}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">Description</h3>
                  <p className="text-gray-600 text-sm">{formData.description || 'Not provided'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-gray-700 mb-1">Bedrooms</h3>
                    <p className="text-gray-900">{formData.bedrooms || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-700 mb-1">Bathrooms</h3>
                    <p className="text-gray-900">{formData.bathrooms || 'Not specified'}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.length > 0 ? (
                      formData.amenities.map((amenity) => (
                        <span key={amenity} className="px-3 py-1 bg-[#E8F5F7] text-[#008FAB] rounded-full text-sm font-medium">
                          {amenity}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No amenities selected</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location Note */}
              <div className="bg-[#E8F5F7] rounded-xl p-4 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#008FAB] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">GPS Location</p>
                  <p className="text-xs text-gray-600 mt-1">Your exact GPS coordinates will be captured automatically upon submission to verify the property location.</p>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 flex gap-3">
              <Button
                onClick={() => setShowPreview(false)}
                variant="outline"
                size="md"
                className="rounded-xl flex-1"
              >
                Edit
              </Button>
              <Button
                onClick={handlePublish}
                size="md"
                className="rounded-xl flex-1"
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNav activePage="add" />
      </div>
    </div>
  );
}
