'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import { Star, Leaf } from 'lucide-react';

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
            className={`w-4 h-4 ${
              i < rating ? 'text-[#6B8E23] fill-[#6B8E23]' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-white to-[#F4F4F0] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-[#6B8E23]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#556B2F] tracking-wide">
              Customer Reviews
            </h2>
            <Leaf className="w-6 h-6 text-[#6B8E23]" />
          </div>
          <div className="w-20 h-1 bg-[#F4A460] mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-700 text-base font-light max-w-2xl mx-auto">
            Thousands of satisfied customers trust Vyadhihar Foods for premium quality and natural goodness
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonials-slider">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4">
                <div className="bg-white border-2 border-[#6B8E23]/20 p-8 min-h-[420px] flex flex-col hover:shadow-lg hover:border-[#6B8E23] transition-all duration-300 rounded-lg">
                  
                  {/* Profile Section */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#6B8E23]/10 mb-4 overflow-hidden border-3 border-[#6B8E23]/30">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    
                    <h3 className="text-[#556B2F] font-semibold text-base mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-xs mb-2 font-light">
                      {testimonial.location}
                    </p>
                    <div className="text-[#6B8E23] text-xs font-medium tracking-wide bg-[#6B8E23]/10 px-3 py-1 rounded-full">
                      {testimonial.product}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 text-sm leading-relaxed flex-1 font-light text-center italic">
                    {testimonial.quote}
                  </blockquote>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-6 border-2 border-[#6B8E23]/20 bg-white px-8 py-5 rounded-lg hover:border-[#6B8E23] transition-all duration-300">
            <div className="flex -space-x-3">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <Image
                  key={index}
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-3 border-white object-cover hover:scale-110 transition-transform"
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-[#556B2F] font-semibold text-base">
                10,000+ Happy Customers
              </p>
              <p className="text-gray-600 text-xs font-light">
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
          gap: 10px;
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
          background: #6B8E23;
          width: 28px;
          border-radius: 6px;
        }
        .testimonials-slider .custom-dots li button:hover {
          background: #6B8E23;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsCarousel;
