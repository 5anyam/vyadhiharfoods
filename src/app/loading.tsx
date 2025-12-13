// app/loading.tsx
import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white">
      {/* Animated Logo/Icon */}
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 border-4 border-[#FFF8DC] rounded-full animate-ping opacity-25"></div>
        <div className="absolute inset-0 border-4 border-t-[#D4A574] border-r-[#D4A574] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        {/* Optional: Add a small static logo or icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#5D4E37] rounded-full"></div>
        </div>
      </div>
      
      {/* Loading Text */}
      <h2 className="text-[#5D4E37] font-bold text-lg animate-pulse tracking-widest">
        LOADING...
      </h2>
      <p className="text-[#D4A574] text-xs mt-2 font-medium">
        Fetching fresh goodness
      </p>
    </div>
  );
}
