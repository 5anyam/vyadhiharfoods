'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import { Star, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: 'Anjali Verma',
    quote: "The quality of almonds from Vyadhihar is exceptional. They're fresh, perfectly roasted, and have become a daily part of my healthy routine. Highly recommended!",
    image: '/users/parul.avif',
    rating: 5,
    product: 'Premium Almonds',
    location: 'Mumbai'
  },
  {
    name: 'Rajesh Kumar',
    quote: "I buy their makhana snacks for my family. The taste is amazing, completely natural, and the crunch is perfect. No artificial flavors whatsoever.",
    image: '/users/anil-tyagi.jpeg',
    rating: 5,
    product: 'Roasted Makhana',
    location: 'Delhi'
  },
  {
    name: 'Priya Desai',
    quote: "Best cashews I've ever tasted! Vyadhihar's commitment to quality is evident in every bite. They're crispy, flavorful, and worth every penny.",
    image: '/users/savita.webp',
    rating: 5,
    product: 'Cashew Nuts',
    location: 'Bangalore'
  },
  {
    name: 'Vikram Singh',
    quote: "Their mixed dried fruits are perfect for my post-workout snack. Natural energy boost and incredibly healthy. Great customer service too!",
    image: '/users/ankit.jpeg',
    rating: 5,
    product: 'Mixed Dried Fruits',
    location: 'Pune'
  },
  {
    name: 'Meera Nair',
    quote: "I ordered their gift hamper for corporate gifting. The presentation was elegant and everyone loved it. Truly a premium product!",
    image: '/users/parul.avif',
    rating: 5,
    product: 'Premium Gift Hamper',
    location: 'Hyderabad'
  },
  {
    name: 'Arun Iyer',
    quote: "Walnuts from Vyadhihar are always fresh and of superior quality. I've been buying for 6 months now and never disappointed. Consistent excellence!",
    image: '/users/anil-tyagi.jpeg',
    rating: 5,
    product: 'Walnuts',
    location: 'Chennai'
  }
];

const TestimonialsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    cssEase: 'ease-in-out',
    dotsClass: 'slick-dots custom-dots',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-[#D4A574] fill-[#D4A574]' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-white via-[#FFF8DC] to-[#F5DEB3]/30 py-20 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A574]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C19A6B]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Customer Love</span>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-6 h-6 text-[#D4A574] fill-[#D4A574]" />
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#8B7355] via-[#5D4E37] to-[#8B7355] bg-clip-text text-transparent tracking-wide">
              Customer Reviews
            </h2>
            <Star className="w-6 h-6 text-[#D4A574] fill-[#D4A574]" />
          </div>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4A574] via-[#C19A6B] to-[#D4A574] mx-auto mb-4 rounded-full shadow-sm"></div>
          <p className="text-[#5D4E37] text-base font-light max-w-2xl mx-auto">
            Thousands of satisfied customers trust Vyadhihar Foods for premium quality and natural goodness
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonials-slider">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="bg-white border-2 border-[#D4A574]/30 p-8 min-h-[420px] flex flex-col hover:shadow-2xl hover:border-[#D4A574] hover:scale-105 transition-all duration-300 rounded-2xl">
                  
                  {/* Profile Section */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-[#C19A6B]/20 mb-4 overflow-hidden border-4 border-[#D4A574]/30 shadow-md">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    <h3 className="text-[#5D4E37] font-bold text-lg mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-xs mb-3 font-light">
                      📍 {testimonial.location}
                    </p>
                    <div className="text-white text-xs font-bold tracking-wide bg-gradient-to-r from-[#D4A574] to-[#C19A6B] px-4 py-1.5 rounded-full shadow-md">
                      {testimonial.product}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Quote */}
                  <blockquote className="text-[#5D4E37] text-sm leading-relaxed flex-1 font-light text-center">
                    {testimonial.quote}
                  </blockquote>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-6 border-2 border-[#D4A574]/40 bg-white px-10 py-6 rounded-2xl hover:border-[#D4A574] hover:shadow-2xl transition-all duration-300">
            <div className="flex -space-x-3">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <div key={index} className="relative">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border-4 border-white object-cover hover:scale-125 hover:z-10 transition-transform shadow-md"
                  />
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-[#5D4E37] font-bold text-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4A574]" />
                10,000+ Happy Customers
              </p>
              <p className="text-gray-600 text-sm font-light">
                Trusted for premium quality & natural goodness
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonials-slider .custom-dots {
          bottom: -50px;
          display: flex !important;
          justify-content: center;
          align-items: center;
          gap: 12px;
        }
        .testimonials-slider .custom-dots li {
          margin: 0;
          width: auto;
          height: auto;
        }
        .testimonials-slider .custom-dots li button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #d1d5db;
          border: none;
          transition: all 0.3s ease;
          padding: 0;
        }
        .testimonials-slider .custom-dots li button:before {
          display: none;
        }
        .testimonials-slider .custom-dots li.slick-active button {
          background: linear-gradient(135deg, #D4A574, #C19A6B);
          width: 32px;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(212, 165, 116, 0.4);
        }
        .testimonials-slider .custom-dots li button:hover {
          background: #D4A574;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsCarousel;
