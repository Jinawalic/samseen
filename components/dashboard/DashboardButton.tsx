import React from 'react';

interface DashboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'category' | 'sidebar' | 'bottomNav' | 'icon';
  active?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export const DashboardButton: React.FC<DashboardButtonProps> = ({
  variant = 'primary',
  active = false,
  fullWidth = false,
  icon,
  children,
  badge,
  badgeColor = 'bg-[#008FAB] text-white',
  className = '',
  ...props
}) => {
  const widthStyle = fullWidth ? 'w-full' : '';

  if (variant === 'category') {
    return (
      <button
        type="button"
        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
          active
            ? 'bg-[#008FAB] text-white'
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
        } ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (variant === 'sidebar') {
    return (
      <button
        type="button"
        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
          active
            ? 'bg-[#008FAB]/10 text-[#008FAB]'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        } ${className}`}
        {...props}
      >
        {icon}
        <span className="flex-1 text-left">{children}</span>
        {badge && (
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${badgeColor} ml-2`}>
            {badge}
          </span>
        )}
      </button>
    );
  }

  if (variant === 'bottomNav') {
    return (
      <button
        type="button"
        className={`flex flex-col items-center gap-1 flex-1 ${
          active ? 'text-[#008FAB]' : 'text-gray-400 hover:text-gray-600'
        } ${className}`}
        {...props}
      >
        {icon}
        <span className="text-[10px] font-bold">{children}</span>
      </button>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        className={`w-10 h-10 rounded-2xl flex items-center justify-center border transition-all ${
          active 
            ? 'bg-[#008FAB] text-white border-transparent' 
            : 'bg-white text-gray-600 border-gray-100 hover:bg-gray-50'
        } ${className}`}
        {...props}
      >
        {icon || children}
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button
        type="button"
        className={`border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 ${widthStyle} ${className}`}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  }

  // default primary
  return (
    <button
      type="button"
      className={`bg-[#008FAB] hover:bg-[#007a96] text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 ${widthStyle} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};
