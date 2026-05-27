// components/UserChoiceCard.tsx

import { Search, Building2, ChevronRight } from "lucide-react";

interface UserChoiceCardProps {
  onLookingForPlace?: () => void;
  onAgent?: () => void;
  className?: string;
}

export default function UserChoiceCard({ onLookingForPlace, onAgent, className = "" }: UserChoiceCardProps) {
  return (
    <div className={`absolute bottom-0 left-0 w-full bg-[#f5f5f5] rounded-t-[38px] px-5 pt-8 pb-6 shadow-2xl ${className}`}>
      {/* Heading */}
      <h2 className="text-center text-[20px] font-medium text-gray-500 mb-6">
        How do you want to use Samseen?
      </h2>

      {/* First Card */}
      <button
        onClick={onLookingForPlace}
        className="bg-white rounded-[18px] border border-gray-200 p-5 flex items-center justify-between mb-4 w-full hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-[#edf5f0] flex items-center justify-center">
            <Search className="w-8 h-8 text-[#0b7a4b]" strokeWidth={2.2} />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-[20px] font-bold text-gray-900 leading-tight">
              I'm looking for a place
            </h3>

            <p className="text-[16px] text-gray-500 leading-snug mt-1">
              Browse verified listings near you
            </p>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-7 h-7 text-gray-400" />
      </button>

      {/* Second Card */}
      <button
        onClick={onAgent}
        className="bg-white rounded-[18px] border border-gray-200 mb-6 p-5 flex items-center justify-between w-full hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-[#edf5f0] flex items-center justify-center">
            <Building2
              className="w-8 h-8 text-[#0b7a4b]"
              strokeWidth={2.2}
            />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-[20px] font-bold text-gray-900 leading-tight">
              I'm an agent
            </h3>

            <p className="text-[16px] text-gray-500 leading-snug mt-1">
              Post & manage property listings
            </p>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-7 h-7 text-gray-400" />
      </button>
    </div>
  );
}