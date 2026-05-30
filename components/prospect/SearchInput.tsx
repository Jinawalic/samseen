import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onFilterClick?: () => void;
  onClearClick?: () => void;
  className?: string;
  variant?: 'home' | 'map';
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  onFocus,
  onFilterClick,
  onClearClick,
  className = "",
  variant = 'home'
}) => {
  if (variant === 'map') {
    return (
      <div className={`flex-1 relative bg-white/95 backdrop-blur-md rounded-2xl border border-gray-100 flex items-center px-4 py-3 ${className}`}>
        <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          className="w-full text-slate-800 text-sm bg-transparent focus:outline-none placeholder-gray-400 font-medium"
        />
        {value && onClearClick && (
          <button 
            type="button"
            onClick={onClearClick} 
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        className="w-full px-5 py-4 pl-12 pr-12 text-slate-800 text-sm bg-white border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#008FAB] placeholder-gray-400 font-semibold transition-all"
      />
      <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
      {onFilterClick && (
        <button 
          type="button"
          onClick={onFilterClick}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-xl hover:bg-gray-50 text-gray-500 flex items-center justify-center"
        >
          <SlidersHorizontal className="w-4.5 h-4.5 text-[#008FAB]" />
        </button>
      )}
    </div>
  );
};
