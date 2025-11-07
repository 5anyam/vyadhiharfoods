'use client';

const MarqueeBanner = () => {
  const bannerItems = [
    { text: "100% Natural", icon: "🌿" },
    { text: "Premium Quality", icon: "⭐" },
    { text: "No Preservatives", icon: "🚫" },
    { text: "Handpicked Selection", icon: "👌" },
    { text: "Lab Tested", icon: "🔬" },
    { text: "Fresh & Healthy", icon: "💚" },
    { text: "Nationwide Shipping", icon: "🚚" },
    { text: "Hygienically Packed", icon: "📦" },
    { text: "Rich in Nutrients", icon: "🥜" }
  ];

  return (
    <div className="overflow-hidden bg-gradient-to-r from-[#6B8E23] via-[#556B2F] to-[#6B8E23] py-3 sm:py-4 text-white font-medium whitespace-nowrap relative border-y border-[#F4A460]/30">
      {/* Subtle animated shimmer with green tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse opacity-60"></div>
      
      <div className="animate-marquee inline-block min-w-full text-xs sm:text-sm tracking-wider relative z-10">
        {/* First set of items */}
        {bannerItems.map((item, index) => (
          <span 
            key={`first-${index}`} 
            className="inline-flex items-center gap-2 sm:gap-3 mx-4 sm:mx-8 text-white/90 hover:text-white transition-colors duration-300"
          >
            <span className="text-base sm:text-lg opacity-90" role="img" aria-label={`${item.text} icon`}>
              {item.icon}
            </span>
            <span className="font-medium text-xs sm:text-sm uppercase tracking-widest">
              {item.text}
            </span>
            <span className="hidden sm:inline-block w-1 h-1 bg-[#F4A460] rounded-full mx-2"></span>
          </span>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {bannerItems.map((item, index) => (
          <span 
            key={`second-${index}`} 
            className="inline-flex items-center gap-2 sm:gap-3 mx-4 sm:mx-8 text-white/90 hover:text-white transition-colors duration-300"
          >
            <span className="text-base sm:text-lg opacity-90" role="img" aria-label={`${item.text} icon`}>
              {item.icon}
            </span>
            <span className="font-medium text-xs sm:text-sm uppercase tracking-widest">
              {item.text}
            </span>
            <span className="hidden sm:inline-block w-1 h-1 bg-[#F4A460] rounded-full mx-2"></span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        
        /* Slower, more readable animation on mobile */
        @media (max-width: 640px) {
          .animate-marquee {
            animation: marquee 45s linear infinite;
          }
        }
        
        /* Subtle pause interaction */
        @media (min-width: 641px) {
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        }
        
        /* Touch-friendly pause on mobile */
        @media (max-width: 640px) {
          .animate-marquee:active {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
};

export default MarqueeBanner;
