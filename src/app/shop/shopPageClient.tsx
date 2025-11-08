'use client';

import { useState, useMemo } from 'react';
import ProductCard from "../../../components/ProductCard";
import { Product } from "./page";
import { SlidersHorizontal, X, Search, Sparkles, Leaf } from 'lucide-react';

interface ShopPageClientProps {
  products: Product[];
}

type ProductWithSlug = Product & {
  slug: string;
  regular_price: string;
};

export default function ShopPageClient({ products }: ShopPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach(product => {
      product.categories?.forEach(cat => cats.add(cat.name));
    });
    return Array.from(cats);
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      if (selectedCategory && !product.categories?.some(cat => cat.name === selectedCategory)) {
        return false;
      }

      if (priceRange.min || priceRange.max) {
        const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
        if (priceRange.min && price < parseFloat(priceRange.min)) return false;
        if (priceRange.max && price > parseFloat(priceRange.max)) return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseFloat(a.price.replace(/[^\d.]/g, '')) - parseFloat(b.price.replace(/[^\d.]/g, ''));
        case 'price-high':
          return parseFloat(b.price.replace(/[^\d.]/g, '')) - parseFloat(a.price.replace(/[^\d.]/g, ''));
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF8DC] to-white">
      {/* Hero Section - Golden Theme */}
      <div className="border-b-2 border-[#D4A574]/30 bg-gradient-to-b from-[#FFF8DC] to-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">Premium Collection</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#8B7355] via-[#5D4E37] to-[#8B7355] bg-clip-text text-transparent mb-4 tracking-wide">
              Shop Dry Fruits
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4A574] via-[#C19A6B] to-[#D4A574] mx-auto mb-6 rounded-full shadow-sm"></div>
            <p className="text-base text-[#5D4E37] max-w-2xl mx-auto font-light">
              Discover our curated selection of premium natural dry fruits and healthy snacks
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar - Golden Theme */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#D4A574]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-4 pl-12 border-2 border-[#D4A574]/30 rounded-xl focus:border-[#D4A574] focus:outline-none transition-colors bg-white text-[#5D4E37] placeholder:text-gray-400 font-light shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#D4A574] hover:text-[#C19A6B] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Toggle - Mobile */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white py-3.5 px-6 text-sm font-bold rounded-xl hover:from-[#C19A6B] hover:to-[#8B7355] transition-all shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar - Golden Theme */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-gradient-to-b from-[#FFF8DC] to-white border-2 border-[#D4A574]/30 p-6 rounded-2xl sticky top-6 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-base font-bold text-[#5D4E37] tracking-wide uppercase flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#D4A574]" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#D4A574] hover:text-[#C19A6B] font-bold tracking-wide uppercase"
                >
                  Clear
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-[#5D4E37] mb-3 uppercase tracking-widest">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#D4A574]/30 rounded-lg focus:border-[#D4A574] focus:outline-none text-[#5D4E37] font-medium text-sm bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-[#5D4E37] mb-3 uppercase tracking-widest">
                  Price Range
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-1/2 px-4 py-3 border-2 border-[#D4A574]/30 rounded-lg focus:border-[#D4A574] focus:outline-none text-[#5D4E37] font-medium text-sm bg-white"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-1/2 px-4 py-3 border-2 border-[#D4A574]/30 rounded-lg focus:border-[#D4A574] focus:outline-none text-[#5D4E37] font-medium text-sm bg-white"
                  />
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-[#5D4E37] mb-3 uppercase tracking-widest">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#D4A574]/30 rounded-lg focus:border-[#D4A574] focus:outline-none text-[#5D4E37] font-medium text-sm bg-white"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Active Filters */}
              {(searchTerm || selectedCategory || priceRange.min || priceRange.max) && (
                <div className="border-t-2 border-[#D4A574]/20 pt-6">
                  <h3 className="text-xs font-bold text-[#5D4E37] mb-3 uppercase tracking-widest">
                    Active Filters
                  </h3>
                  <div className="space-y-2">
                    {searchTerm && (
                      <div className="text-xs text-[#5D4E37] font-medium bg-[#D4A574]/10 px-3 py-2 rounded-lg">
                        Search: {searchTerm}
                      </div>
                    )}
                    {selectedCategory && (
                      <div className="text-xs text-[#5D4E37] font-medium bg-[#D4A574]/10 px-3 py-2 rounded-lg">
                        Category: {selectedCategory}
                      </div>
                    )}
                    {(priceRange.min || priceRange.max) && (
                      <div className="text-xs text-[#5D4E37] font-medium bg-[#D4A574]/10 px-3 py-2 rounded-lg">
                        Price: ₹{priceRange.min || '0'} - ₹{priceRange.max || '∞'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-[#D4A574]/30">
              <h2 className="text-base font-bold text-[#5D4E37] tracking-wide">
                {filteredProducts.length} {filteredProducts.length !== 1 ? 'Products' : 'Product'}
              </h2>
              <div className="hidden md:flex items-center text-sm text-[#5D4E37] font-medium">
                Showing {filteredProducts.length} of {products.length}
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-[#FFF8DC] to-white rounded-2xl border-2 border-[#D4A574]/30">
                <div className="mb-6">
                  <div className="w-20 h-20 border-2 border-[#D4A574] rounded-full flex items-center justify-center mx-auto bg-white">
                    <Search className="w-8 h-8 text-[#D4A574]" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#5D4E37] mb-3 tracking-wide">
                  No Results Found
                </h3>
                <p className="text-[#5D4E37] mb-8 max-w-md mx-auto font-light text-sm">
                  We could not find any products matching your criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-block px-8 py-3 text-sm text-white bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] transition-all rounded-full shadow-lg font-bold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={{
                      ...product,
                      slug: product.slug || `product-${product.id}`
                    } as ProductWithSlug} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Section - Golden Theme */}
      <div className="mt-20 border-t-2 border-[#D4A574]/30 bg-gradient-to-br from-[#5D4E37] via-[#8B7355] to-[#5D4E37] py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A574]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C19A6B]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-6">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Need Help?</span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">
            Need Assistance?
          </h2>
          <div className="w-20 h-1 bg-white/50 mx-auto mb-6 rounded-full"></div>
          <p className="text-base text-white/90 mb-8 font-light">
            Our team is here to help you find the perfect products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:care@vyadhiharfoods.com"
              className="inline-block px-8 py-3.5 text-sm text-[#5D4E37] bg-white hover:bg-[#FFF8DC] transition-all rounded-full shadow-lg font-bold"
            >
              📧 Email Us
            </a>
            <a 
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 text-sm text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all rounded-full shadow-lg font-bold"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
