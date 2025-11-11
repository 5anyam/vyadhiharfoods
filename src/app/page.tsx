"use client";
import Testimonials from "../../components/TestimonialsSection";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../lib/woocommerceApi";
import ProductCard from "../../components/ProductCard";
import HeroCarousel from "../../components/HeroCarousel";
import MarqueeBanner from "../../components/MarqueeBanner";
import AboutUsSection from "../../components/AboutUs";
import HomeFAQ from "../../components/HomeFaq";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Leaf, Award, ShieldCheck, Truck, Sparkles, Star, Heart, Target } from 'lucide-react';
import { useRef } from 'react';

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  description?: string;
  short_description?: string;
  images?: { src: string }[];
  categories?: { id: number; name: string; slug?: string }[];
  attributes?: { option: string }[];
  average_rating?: string;
  rating_count?: number;
}

// Loading Skeleton Component
const ProductSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden border-2 border-[#D4A574]/20 shadow-sm">
    <div className="aspect-square bg-gradient-to-br from-[#F5DEB3]/30 to-[#D4A574]/10 animate-pulse" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-[#D4A574]/20 rounded animate-pulse" />
      <div className="h-3 bg-[#D4A574]/10 rounded w-2/3 animate-pulse" />
    </div>
  </div>
);

export default function Homepage() {
  const allProductsSliderRef = useRef<HTMLDivElement>(null);

  // React Query configuration
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["homepage-products"],
    queryFn: async () => {
      const result = await fetchProducts();
      return (result || []) as Product[];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const all = Array.isArray(data) ? data : [];

  // Scroll function for all products
  const scrollAllProducts = (direction: 'left' | 'right') => {
    if (allProductsSliderRef.current) {
      const scrollAmount = 300;
      allProductsSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF8DC] to-white pb-16 overflow-x-hidden">
      <HeroCarousel />
      <MarqueeBanner />

      {/* Trust Badges Section */}
      <section className="py-16 bg-gradient-to-b from-[#FFF8DC] via-[#F5DEB3]/20 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A574]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8B7355]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-6 py-2 rounded-full mb-4 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">Why Choose Vyadhihar</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: "100% Natural", desc: "No preservatives" },
              { icon: Award, title: "Premium Quality", desc: "Handpicked selection" },
              { icon: ShieldCheck, title: "Quality Assured", desc: "Lab tested products" },
              { icon: Truck, title: "Fast Delivery", desc: "Nationwide shipping" }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg border-2 border-[#D4A574]/30 hover:shadow-xl hover:scale-105 hover:border-[#D4A574] transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4A574] to-[#C19A6B] rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-[#5D4E37] mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-[#D4A574] fill-[#D4A574]" />
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#8B7355] via-[#5D4E37] to-[#8B7355] bg-clip-text text-transparent tracking-wide">
                Our Products
              </h2>
              <Star className="w-5 h-5 text-[#D4A574] fill-[#D4A574]" />
            </div>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4A574] via-[#C19A6B] to-[#D4A574] mx-auto mb-4 rounded-full shadow-sm"></div>
            <p className="text-gray-700 text-base max-w-2xl mx-auto font-light">
              Premium quality dry fruits, makhana snacks, and healthy products. 100% natural and lab-tested.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <div className="bg-gradient-to-br from-[#FFF8DC] to-white rounded-2xl p-8 max-w-md mx-auto border-2 border-[#D4A574]/30 shadow-lg">
                <p className="text-gray-700 mb-4 font-medium">Unable to load products</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white text-sm font-semibold hover:from-[#C19A6B] hover:to-[#8B7355] transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          ) : all.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-[#FFF8DC] to-white rounded-2xl border-2 border-[#D4A574]/30 p-8">
              <p className="text-gray-700 font-medium">No products available at the moment.</p>
              <p className="text-sm text-gray-600 mt-2">Please check back later.</p>
            </div>
          ) : (
            <>
              {/* Desktop: Horizontal Slider */}
              <div className="hidden lg:block relative group">
                <button
                  onClick={() => scrollAllProducts('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gradient-to-r hover:from-[#D4A574] hover:to-[#C19A6B] hover:text-white text-[#8B7355] p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 border-[#D4A574]"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div
                  ref={allProductsSliderRef}
                  className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
                >
                  {all.map((prod) => (
                    <div key={prod.id} className="flex-shrink-0 w-72">
                      <ProductCard product={prod} />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollAllProducts('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gradient-to-r hover:from-[#D4A574] hover:to-[#C19A6B] hover:text-white text-[#8B7355] p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 border-[#D4A574]"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile & Tablet: Grid */}
              <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {all.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>

              {/* View All Button */}
              {all.length > 8 && (
                <div className="mt-12 flex justify-center">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-10 py-4 text-base font-bold text-white bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    <span>View All Products</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#5D4E37] via-[#8B7355] to-[#5D4E37] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A574]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C19A6B]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Founder Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl backdrop-blur-sm">
                  <img 
                    src="/founder.jpg" 
                    alt="Keshav Sharma - Founder of Vyadhihar Foods" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white/20 backdrop-blur-md border-2 border-white/40 rounded-2xl p-6 shadow-2xl">
                  <p className="text-white font-bold text-xl">Keshav Sharma</p>
                  <p className="text-white/90 text-sm">Founder & CEO</p>
                </div>
              </div>
            </div>

            {/* Right: Story Excerpt */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-6 border border-white/30">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-semibold">Our Story</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Built on Persistence, Powered by Vision
              </h2>
              
              <div className="space-y-4 text-white/90 text-base lg:text-lg leading-relaxed mb-8">
                <p className="text-lg italic border-l-4 border-white/50 pl-4">
                  I come from a business family, but I wanted to build something of my own—something 
                  that would help people live healthier lives.
                </p>
                <p>
                  From pitching door-to-door in Cyber City to losing a crore-worth deal with Dell, 
                  from fruit boxes to superfood mixtures—every setback taught me something valuable.
                </p>
                <p className="font-semibold text-white flex items-start gap-2">
                  <Target className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>This is not just a success story it is a real story of persistence, vision, and 
                  building brick by brick.</span>
                </p>
              </div>

              <Link
                href="/founder-story"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-[#5D4E37] bg-white hover:bg-[#FFF8DC] transition-all duration-300 rounded-full shadow-2xl hover:shadow-white/50 hover:scale-105"
              >
                <span>Read Full Story</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AboutUsSection />
      <Testimonials />
      <HomeFAQ />

     {/* Fresh Fruit Delivery Section */}
<section className="py-20 px-4 bg-gradient-to-br from-[#5D4E37] via-[#8B7355] to-[#5D4E37] relative overflow-hidden">
  <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A574]/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C19A6B]/10 rounded-full blur-3xl"></div>
  
  <div className="max-w-5xl mx-auto text-center relative z-10">
    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-6 border border-white/30">
      <Leaf className="w-4 h-4" />
      <span className="text-sm font-semibold">Fresh & Healthy</span>
    </div>
    
    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
      Daily Fresh Fruit Boxes for Your Office
    </h2>
    <p className="text-xl mb-10 text-white/90 max-w-3xl mx-auto">
      Healthy, fresh fruits delivered daily to your office in hygienic PET jars. 
      Perfect for teams who care about their health!
    </p>
    
    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
      {/* Daily Fresh */}
      <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 transition-all">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Daily Fresh</h3>
        <p className="text-white/80 text-sm">
          Fresh fruits delivered every morning to your office
        </p>
      </div>

      {/* Hygienic Packaging */}
      <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 transition-all">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Hygienic PET Jars</h3>
        <p className="text-white/80 text-sm">
          Clean, attractive packaging inspired by Korean style
        </p>
      </div>

      {/* Flexible Plans */}
      <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/20 transition-all">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Flexible Plans</h3>
        <p className="text-white/80 text-sm">
          Daily or weekly subscriptions available
        </p>
      </div>
    </div>

    {/* Benefits List */}
    <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-8 mb-10 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6">Why Choose Our Fresh Fruit Boxes?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm">✓</span>
          </div>
          <p className="text-white/90 text-base">Farm-fresh fruits sourced daily</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm">✓</span>
          </div>
          <p className="text-white/90 text-base">Hygienic PET jar packaging</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm">✓</span>
          </div>
          <p className="text-white/90 text-base">Customizable fruit selections</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm">✓</span>
          </div>
          <p className="text-white/90 text-base">Bulk orders for teams</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm">✓</span>
          </div>
          <p className="text-white/90 text-base">Delivery across Delhi NCR</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm">✓</span>
          </div>
          <p className="text-white/90 text-base">Special pricing for offices</p>
        </div>
      </div>
    </div>

    {/* CTA Button */}
    <a
      href="https://wa.me/917428408825?text=Hi,%20I%20want%20to%20enquire%20about%20daily%20fresh%20fruit%20boxes%20for%20office"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-bold text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-300 rounded-full shadow-2xl hover:shadow-green-500/50 hover:scale-105"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      <span>WhatsApp: +91-74284 08825</span>
    </a>
    
    <p className="text-white/70 text-sm mt-4">
      Perfect for MNC offices in Delhi, Gurgaon, Noida & surrounding areas
    </p>
  </div>
</section>


      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
