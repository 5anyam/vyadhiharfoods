import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const IMAGES = [
  {
    src: 'http://cms.vyadhiharfoods.com/wp-content/uploads/2025/11/Vyadhihar-banner-1-scaled.jpg',
    alt: 'Premium Dry Fruits Collection',
  },
  {
    src: 'http://cms.vyadhiharfoods.com/wp-content/uploads/2025/11/Vyadhihar-banner-scaled.jpg',
    alt: 'Makhana Snacks',
  }
];

export default function HeroCarousel() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % IMAGES.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
  };

  const handleBannerClick = () => {
    router.push('/shop');
  };

  return (
    <div className="w-full relative bg-gradient-to-b from-[#FFF8DC] to-white overflow-hidden">
      {/* Main carousel container - Banner aspect ratio */}
      <div className="w-full relative overflow-hidden cursor-pointer" style={{ aspectRatio: '16/6' }}>
        
        {/* Images container */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {IMAGES.map((img, index) => (
            <div 
              key={index} 
              className="w-full h-full flex-shrink-0 relative group"
              onClick={handleBannerClick}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#5D4E37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Navigation buttons - Golden themed */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 
            bg-white/90 hover:bg-gradient-to-r hover:from-[#D4A574] hover:to-[#C19A6B] hover:text-white 
            border-2 border-[#D4A574]/30 text-[#5D4E37]
            w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 hover:scale-110
            flex items-center justify-center shadow-lg hover:shadow-xl backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 
            bg-white/90 hover:bg-gradient-to-r hover:from-[#D4A574] hover:to-[#C19A6B] hover:text-white 
            border-2 border-[#D4A574]/30 text-[#5D4E37]
            w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 hover:scale-110
            flex items-center justify-center shadow-lg hover:shadow-xl backdrop-blur-sm"
          aria-label="Next image"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Slide indicators - Golden themed */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30 
          flex gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2.5 shadow-lg border-2 border-[#D4A574]/30">
          {IMAGES.map((_, index) => (
            <button
              key={index}
              className={`rounded-full cursor-pointer transition-all duration-300 
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#D4A574]/50 
                ${index === current
                  ? 'bg-gradient-to-r from-[#D4A574] to-[#C19A6B] w-8 sm:w-10 h-2.5 sm:h-3 shadow-md' 
                  : 'bg-gray-300 hover:bg-[#D4A574]/50 w-2.5 sm:w-3 h-2.5 sm:h-3'
                }`}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar for current slide - Golden themed */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50 z-20">
          <div 
            className="h-full bg-gradient-to-r from-[#D4A574] to-[#C19A6B] transition-all duration-300 shadow-sm"
            style={{ width: `${((current + 1) / IMAGES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
