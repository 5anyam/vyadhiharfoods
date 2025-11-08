'use client';

import React, { useState } from 'react';
import { 
  Leaf, Zap, Heart, Sprout, Award, Users, Sparkles
} from 'lucide-react';

type Feature = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

type FeatureCardProps = {
  item: Feature;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
};

// FeatureCard Component with Golden Theme
function FeatureCard({ item, isHovered, onHover, onLeave }: FeatureCardProps) {
  return (
    <div 
      className={`group bg-white rounded-2xl p-8 transition-all duration-300 cursor-pointer border-2 border-[#D4A574]/30 hover:border-[#D4A574] hover:shadow-xl hover:scale-105 ${
        isHovered ? 'shadow-xl border-[#D4A574] bg-gradient-to-br from-[#FFF8DC] to-white' : ''
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="mb-6 flex justify-center">
        <div className="p-4 rounded-full border-2 border-[#D4A574] bg-gradient-to-br from-[#D4A574]/10 to-[#C19A6B]/10 group-hover:scale-110 transition-transform duration-300 shadow-md">
          {item.icon}
        </div>
      </div>
      <h3 className="text-lg font-bold text-[#5D4E37] mb-3 text-center tracking-wide">
        {item.title}
      </h3>
      <p className="text-sm text-[#5D4E37] text-center leading-relaxed font-light">
        {item.desc}
      </p>
    </div>
  );
}

// Main AboutUsSection Component
export default function AboutUsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const philosophy: Feature[] = [
    {
      icon: <Leaf className="text-[#D4A574] w-7 h-7" />,
      title: 'Pure & Natural',
      desc: 'We believe in the power of nature. All our dry fruits and snacks are 100% natural with no artificial additives or preservatives.',
    },
    {
      icon: <Zap className="text-[#D4A574] w-7 h-7" />,
      title: 'Energy & Wellness',
      desc: 'Packed with essential nutrients, vitamins, and minerals that fuel your body and support a healthy lifestyle.',
    },
    {
      icon: <Heart className="text-[#D4A574] w-7 h-7" />,
      title: 'Health First',
      desc: 'We prioritize your wellbeing by handpicking the finest quality produce and maintaining rigorous quality standards.',
    }
  ];

  const commitment: Feature[] = [
    {
      icon: <Sprout className="text-[#D4A574] w-7 h-7" />,
      title: 'Organic Excellence',
      desc: 'Every product is lab-tested and sourced from premium suppliers to ensure the highest nutritional value.',
    },
    {
      icon: <Award className="text-[#D4A574] w-7 h-7" />,
      title: 'Quality Assurance',
      desc: 'From farm to table, we maintain strict quality control at every step to deliver only the best to your doorstep.',
    },
    {
      icon: <Users className="text-[#D4A574] w-7 h-7" />,
      title: 'Customer Care',
      desc: 'Your satisfaction is our mission. We are dedicated to providing exceptional service and authentic products.',
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white via-[#FFF8DC] to-white py-20 lg:py-24 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C19A6B]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Our Story</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl text-center lg:text-5xl font-bold bg-gradient-to-r from-[#8B7355] via-[#5D4E37] to-[#8B7355] bg-clip-text text-transparent mb-6 tracking-wide">
            About Vyadhihar Foods
          </h2>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4A574] via-[#C19A6B] to-[#D4A574] mx-auto mb-8 rounded-full shadow-sm"></div>
          
          <p className="text-base lg:text-lg text-[#5D4E37] max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            At Vyadhihar Foods, we are committed to bringing the finest quality dry fruits, makhana snacks, 
            and mixed fresh fruits to your table. With a passion for health and wellness, we source, process, 
            and deliver premium natural products that nourish your body and delight your taste buds.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="mb-20 lg:mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5D4E37] mb-4 tracking-wide">
              Our Philosophy
            </h3>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {philosophy.map((item, index) => (
              <FeatureCard 
                key={`philosophy-${index}`}
                item={item}
                isHovered={hoveredCard === `philosophy-${index}`}
                onHover={() => setHoveredCard(`philosophy-${index}`)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16 bg-gradient-to-b from-[#FFF8DC] via-[#F5DEB3]/30 to-white rounded-3xl border-2 border-[#D4A574]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5D4E37] mb-4 tracking-wide">
              Our Commitment
            </h3>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] mx-auto mb-6 rounded-full"></div>
            <p className="text-base text-[#5D4E37] max-w-2xl mx-auto font-light leading-relaxed">
              We believe that quality nutrition should be accessible to everyone. That is why we bring 
              premium dry fruits and healthy snacks directly to your home, ensuring freshness and purity at every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {commitment.map((item, index) => (
              <FeatureCard 
                key={`commitment-${index}`}
                item={item}
                isHovered={hoveredCard === `commitment-${index}`}
                onHover={() => setHoveredCard(`commitment-${index}`)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Golden Premium Design */}
      <div className="text-center mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#5D4E37] via-[#8B7355] to-[#5D4E37] rounded-3xl p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A574]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C19A6B]/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Start Today</span>
              </div>
              
              <h4 className="text-2xl lg:text-4xl font-bold mb-6 tracking-wide">
                Start Your Healthy Journey Today
              </h4>
              <p className="text-white/90 mb-10 font-light text-lg max-w-xl mx-auto">
                Discover the power of nature with our premium selection of dry fruits and wholesome snacks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-[#5D4E37] bg-white hover:bg-[#FFF8DC] transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 text-[#D4A574]" />
                  Explore Collection
                </a>
                <a 
                  href="/corporate"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white border-2 border-white hover:bg-white/10 transition-all duration-300 rounded-full shadow-xl hover:scale-105"
                >
                  <Award className="w-5 h-5" />
                  Shop Corporate Gifts
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
