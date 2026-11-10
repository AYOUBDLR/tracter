import React from 'react';

interface TscLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white';
}

export const TscLogo: React.FC<TscLogoProps> = ({ className = '', variant = 'full' }) => {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 select-none ${className}`}>
        <div className="w-8 h-8 rounded-md bg-[#CC0000] flex items-center justify-center text-white shadow-xs">
          <span className="font-extrabold text-xs tracking-tighter">TSC</span>
        </div>
        <span className="font-bold text-sm tracking-tight text-slate-900">
          Tractor Supply Co.
        </span>
      </div>
    );
  }

  if (variant === 'white') {
    return (
      <div className={`flex items-center gap-2.5 select-none ${className}`}>
        <div className="w-9 h-9 rounded-md bg-white text-[#CC0000] flex items-center justify-center shadow-xs font-black text-sm tracking-tighter">
          TSC
        </div>
        <div className="leading-tight text-left">
          <div className="text-white font-extrabold text-base tracking-tight uppercase">
            Tractor Supply Co.
          </div>
          <div className="text-white/80 text-[10px] font-semibold tracking-wider uppercase">
            Official Promotional Pass
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* TSC Brand Gear Icon */}
      <div className="relative w-10 h-10 rounded-xl bg-[#CC0000] flex items-center justify-center text-white shadow-sm ring-2 ring-red-100">
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          {/* Tractor silhouette & gear emblem */}
          <path d="M4 16a3 3 0 1 0 6 0 3 3 0 0 0-6 0zm14-1a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm-7.5-6h3l1.5 3h3v2h-1.2A3.99 3.99 0 0 0 14 12.18V10h-2.1l-1.3-2.6A1 1 0 0 0 9.7 7H5v2h4.3l1.2 2H7a4.99 4.99 0 0 0-4.9 4H1v2h1.1A4.99 4.99 0 0 0 7 19a4.99 4.99 0 0 0 4.8-3.6 3.99 3.99 0 0 0 4.2-1.4h.8a3.99 3.99 0 0 0 3.2 1.6 3.99 3.99 0 0 0 4-4v-1h-6.2l-1.8-3.6z" />
        </svg>
      </div>

      <div className="text-left">
        <span className="font-extrabold text-2xl tracking-tight text-slate-900 uppercase">
          Tractor Supply <span className="text-[#CC0000]">Co.</span>
        </span>
      </div>
    </div>
  );
};
