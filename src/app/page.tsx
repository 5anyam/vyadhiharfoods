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
import { ChevronLeft, ChevronRight, Leaf, Award, ShieldCheck, Truck } from 'lucide-react';
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
}

// Helper functions for product categorization
const isDryFruit = (p: Product): boolean => {
  const cats = p.categories || [];
  const inDryFruitCategory = cats.some((c) =>
    /dry fruit|almond|cashew|walnut|pistachio|raisin|date/i.test(c.name || c.slug || "")
  );
  const nameLooksDryFruit = /almond|cashew|walnut|pistachio|raisin|date/i.test(p.name || "");
  return inDryFruitCategory || nameLooksDryFruit;
};

const isMakhana = (p: Product): boolean => {
  const cats = p.categories || [];
  const inMakhanaCategory = cats.some((c) =>
    /makhana|fox nut|lotus seed/i.test(c.name || c.slug || "")
  );
  const nameLooksMakhana = /makhana|fox nut|lotus seed/i.test(p.name || "");
  return inMakhanaCategory || nameLooksMakhana;
};

const isMixedFruit = (p: Product): boolean => {
  const cats = p.categories || [];
  const inMixedCategory = cats.some((c) =>
    /mixed|dried fruit|berries|apricot|fig|cranberr/i.test(c.name || c.slug || "")
  );
  const nameLooksMixed = /mixed|dried fruit|berries|apricot|fig|cranberr/i.test(p.name || "");
  return inMixedCategory || nameLooksMixed;
};

// Loading Skeleton Component
const ProductSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
    <div className="aspect-square bg-gray-100 animate-pulse" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
      <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
    </div>
  </div>
);

export default function Homepage() {
  const makhanaSliderRef = useRef<HTMLDivElement>(null);
  const mixedFruitsSliderRef = useRef<HTMLDivElement>(null);

  // Fixed React Query configuration
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ["homepage-products"],
    queryFn: async () => {
      console.log('Fetching products...');
      const result = await fetchProducts();
      console.log('Products fetched:', result?.length);
      return (result || []) as Product[];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const all = Array.isArray(data) ? data : [];

  // Split collections by category
  const dryFruits = all.filter((p) => isDryFruit(p));
  const makhanaProducts = all.filter((p) => isMakhana(p));
  const mixedFruits = all.filter((p) => isMixedFruit(p));

  const dryFruitsTop6 = dryFruits.slice(0, 6);

  // Scroll functions
  const scrollMakhanaSlider = (direction: 'left' | 'right') => {
    if (makhanaSliderRef.current) {
      const scrollAmount = 300;
      makhanaSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollMixedFruitsSlider = (direction: 'left' | 'right') => {
    if (mixedFruitsSliderRef.current) {
      const scrollAmount = 300;
      mixedFruitsSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  console.log('Query state:', { isLoading, isError, dataLength: all.length });

  return (
    <div className="min-h-screen bg-white pb-16 overflow-x-hidden">
      <HeroCarousel />
      <MarqueeBanner />

      {/* Trust Badges Section */}
      <section className="py-12 bg-gradient-to-b from-[#F4F4F0] to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-[#6B8E23]/10 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#6B8E23]/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-7 h-7 text-[#6B8E23]" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">100% Natural</h3>
              <p className="text-xs text-gray-600">No preservatives</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-[#6B8E23]/10 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#6B8E23]/10 rounded-full flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-[#6B8E23]" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Premium Quality</h3>
              <p className="text-xs text-gray-600">Handpicked selection</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-[#6B8E23]/10 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#6B8E23]/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-7 h-7 text-[#6B8E23]" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Quality Assured</h3>
              <p className="text-xs text-gray-600">Lab tested products</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-[#6B8E23]/10 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#6B8E23]/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-7 h-7 text-[#6B8E23]" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Fast Delivery</h3>
              <p className="text-xs text-gray-600">Nationwide shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Dry Fruits Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#556B2F] mb-3 tracking-wide">
              Premium Dry Fruits
            </h2>
            <div className="w-20 h-1 bg-[#F4A460] mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 text-base max-w-2xl mx-auto font-light">
              Handpicked almonds, cashews, walnuts, and more. Rich in nutrients and natural goodness.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto border border-gray-200">
                <p className="text-gray-600 mb-4">Unable to load products</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-[#6B8E23] text-white text-sm hover:bg-[#556B2F] transition-colors rounded-lg"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          ) : dryFruitsTop6.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Products will be available soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {dryFruitsTop6.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

          {dryFruits.length > 6 && (
            <div className="mt-10 flex justify-center">
              <Link
                href="/dry-fruits"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-white bg-[#6B8E23] hover:bg-[#556B2F] transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
              >
                View All Dry Fruits
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Makhana Snacks Section - Slider */}
      {!isLoading && makhanaProducts.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-b from-[#F4F4F0] to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#556B2F] mb-3 tracking-wide">
                Makhana Snacks
              </h2>
              <div className="w-20 h-1 bg-[#F4A460] mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-600 text-base max-w-2xl mx-auto font-light">
                Crunchy, healthy, and delicious fox nuts in various flavors. Perfect guilt-free snacking.
              </p>
            </div>

            <div className="relative group">
              <button
                onClick={() => scrollMakhanaSlider('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#6B8E23] hover:text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hidden lg:block border-2 border-[#6B8E23]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div
                ref={makhanaSliderRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
              >
                {makhanaProducts.map((prod) => (
                  <div key={prod.id} className="flex-shrink-0 w-72">
                    <ProductCard product={prod} />
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollMakhanaSlider('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#6B8E23] hover:text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hidden lg:block border-2 border-[#6B8E23]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      )}
      {/* Mixed Fresh Fruits Section - Slider */}
      {!isLoading && mixedFruits.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#556B2F] mb-3 tracking-wide">
                Mixed Fresh Fruits
              </h2>
              <div className="w-20 h-1 bg-[#F4A460] mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-600 text-base max-w-2xl mx-auto font-light">
                Dried apricots, figs, cranberries and more. Nature's candy packed with vitamins.
              </p>
            </div>

            <div className="relative group">
              <button
                onClick={() => scrollMixedFruitsSlider('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#6B8E23] hover:text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hidden lg:block border-2 border-[#6B8E23]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div
                ref={mixedFruitsSliderRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
              >
                {mixedFruits.map((prod) => (
                  <div key={prod.id} className="flex-shrink-0 w-72">
                    <ProductCard product={prod} />
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollMixedFruitsSlider('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#6B8E23] hover:text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hidden lg:block border-2 border-[#6B8E23]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Corporate Gifting CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#6B8E23] to-[#556B2F]">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Looking for Corporate Gifting Solutions?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Premium dry fruit gift hampers perfect for your employees and clients. Bulk orders available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/corporate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-[#6B8E23] bg-white hover:bg-gray-100 transition-all duration-300 rounded-lg shadow-lg"
            >
              Explore Corporate Gifting
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi,%20I%20want%20to%20enquire%20about%20corporate%20gifting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-300 rounded-lg shadow-lg"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <AboutUsSection />
      <Testimonials />
      <HomeFAQ />

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
