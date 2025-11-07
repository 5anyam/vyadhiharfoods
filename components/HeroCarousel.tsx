import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [
  {
    src: '/banner1.jpg',
    alt: 'Premium Dry Fruits Collection',
    title: 'Premium Dry Fruits',
    subtitle: '100% Natural & Healthy',
  },
  {
    src: '/banner2.jpg',
    alt: 'Makhana Snacks',
    title: 'Crunchy Makhana Snacks',
    subtitle: 'Guilt-Free Snacking',
  },
  {
    src: '/banner3.jpg',
    alt: 'Corporate Gifting',
    title: 'Corporate Gifting Solutions',
    subtitle: 'Premium Gift Hampers',
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, 4000); // Increased to 4 seconds for better readability

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

  return (
    <div className="w-full relative bg-gradient-to-b from-[#F4F4F0] to-white overflow-hidden">
      {/* Main carousel container - Banner aspect ratio */}
      <div className="w-full relative overflow-hidden" style={{ aspectRatio: '16/6' }}>
        
        {/* Images container */}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {IMAGES.map((img, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-300"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              
              {/* Green gradient overlay for organic feel */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6B8E23]/40 via-transparent to-[#556B2F]/40 pointer-events-none" />
              
              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-center drop-shadow-lg">
                  {img.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center drop-shadow-md mb-6">
                  {img.subtitle}
                </p>
                <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#6B8E23] hover:bg-[#556B2F] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons - Green themed */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 
            bg-white/90 hover:bg-[#6B8E23] hover:text-white border-2 border-[#6B8E23]/30 text-gray-700 
            w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 hover:scale-110
            flex items-center justify-center shadow-lg hover:shadow-xl"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 
            bg-white/90 hover:bg-[#6B8E23] hover:text-white border-2 border-[#6B8E23]/30 text-gray-700 
            w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 hover:scale-110
            flex items-center justify-center shadow-lg hover:shadow-xl"
          aria-label="Next image"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Slide indicators - Green themed */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-30 
          flex gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2.5 shadow-lg border border-[#6B8E23]/20">
          {IMAGES.map((_, index) => (
            <button
              key={index}
              className={`rounded-full cursor-pointer transition-all duration-300 
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/50 
                ${index === current
                  ? 'bg-[#6B8E23] w-8 sm:w-10 h-2.5 sm:h-3' 
                  : 'bg-gray-300 hover:bg-[#6B8E23]/50 w-2.5 sm:w-3 h-2.5 sm:h-3'
                }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar for current slide */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50 z-20">
          <div 
            className="h-full bg-[#6B8E23] transition-all duration-300"
            style={{ width: `${((current + 1) / IMAGES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
