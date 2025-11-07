'use client';

import React, { useState } from 'react';
import { 
  Leaf, Zap, Heart, Sprout, Award, Users
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

// FeatureCard Component - Separate export
function FeatureCard({ item, isHovered, onHover, onLeave }: FeatureCardProps) {
  return (
    <div 
      className={`group bg-white rounded-lg p-8 transition-all duration-300 cursor-pointer border border-[#6B8E23]/20 hover:border-[#6B8E23] hover:shadow-lg ${
        isHovered ? 'shadow-lg border-[#6B8E23] bg-[#F4F4F0]' : ''
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="mb-6 flex justify-center">
        <div className="p-3 rounded-full border-2 border-[#6B8E23]/30 bg-[#6B8E23]/5">
          {item.icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-[#556B2F] mb-3 text-center tracking-wide">
        {item.title}
      </h3>
      <p className="text-sm text-gray-700 text-center leading-relaxed font-light">
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
      icon: <Leaf className="text-[#6B8E23] w-6 h-6" />,
      title: 'Pure & Natural',
      desc: 'We believe in the power of nature. All our dry fruits and snacks are 100% natural with no artificial additives or preservatives.',
    },
    {
      icon: <Zap className="text-[#6B8E23] w-6 h-6" />,
      title: 'Energy & Wellness',
      desc: 'Packed with essential nutrients, vitamins, and minerals that fuel your body and support a healthy lifestyle.',
    },
    {
      icon: <Heart className="text-[#6B8E23] w-6 h-6" />,
      title: 'Health First',
      desc: 'We prioritize your wellbeing by handpicking the finest quality produce and maintaining rigorous quality standards.',
    }
  ];

  const commitment: Feature[] = [
    {
      icon: <Sprout className="text-[#6B8E23] w-6 h-6" />,
      title: 'Organic Excellence',
      desc: 'Every product is lab-tested and sourced from premium suppliers to ensure the highest nutritional value.',
    },
    {
      icon: <Award className="text-[#6B8E23] w-6 h-6" />,
      title: 'Quality Assurance',
      desc: 'From farm to table, we maintain strict quality control at every step to deliver only the best to your doorstep.',
    },
    {
      icon: <Users className="text-[#6B8E23] w-6 h-6" />,
      title: 'Customer Care',
      desc: 'Your satisfaction is our mission. We are dedicated to providing exceptional service and authentic products.',
    }
  ];

  return (
    <section className="bg-white py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center lg:text-5xl font-bold text-[#556B2F] mb-6 tracking-wide">
          About Vyadhihar Foods
        </h2>
        
        <div className="w-20 h-1 bg-[#F4A460] mx-auto mb-8 rounded-full"></div>
        
        <p className="text-base lg:text-lg text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          At Vyadhihar Foods, we are committed to bringing the finest quality dry fruits, makhana snacks, 
          and mixed fresh fruits to your table. With a passion for health and wellness, we source, process, 
          and deliver premium natural products that nourish your body and delight your taste buds.
        </p>
      </div>

      {/* Philosophy Section */}
      <div className="mb-20 lg:mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#556B2F] mb-4 tracking-wide">
              Our Philosophy
            </h3>
            <div className="w-20 h-1 bg-[#F4A460] mx-auto rounded-full"></div>
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
      <div className="mb-16 bg-gradient-to-b from-[#F4F4F0] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#556B2F] mb-4 tracking-wide">
              Our Commitment
            </h3>
            <div className="w-20 h-1 bg-[#F4A460] mx-auto mb-6 rounded-full"></div>
            <p className="text-base text-gray-700 max-w-2xl mx-auto font-light leading-relaxed">
              We believe that quality nutrition should be accessible to everyone. That's why we bring 
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

      {/* CTA Section */}
      <div className="text-center mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#6B8E23] to-[#556B2F] rounded-2xl p-12 text-white shadow-xl">
            <h4 className="text-2xl lg:text-3xl font-semibold mb-6 tracking-wide">
              🌿 Start Your Healthy Journey Today
            </h4>
            <p className="text-white/90 mb-8 font-light text-lg">
              Discover the power of nature with our premium selection of dry fruits and wholesome snacks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-medium text-[#6B8E23] bg-white hover:bg-gray-100 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
              >
                Explore Collection
              </a>
              <a 
                href="/corporate"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-medium text-white border-2 border-white hover:bg-white/10 transition-all duration-300 rounded-lg"
              >
                Shop Corporate Gifts
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
