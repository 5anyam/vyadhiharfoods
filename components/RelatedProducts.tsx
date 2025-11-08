'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Star, Sparkles, ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  description?: string;
  short_description?: string;
  images?: { src: string }[];
  attributes?: { option: string }[];
}

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct, allProducts }) => {
  const router = useRouter();

  const getRelatedProducts = (): Product[] => {
    const related = allProducts
      .filter(product => product.id !== currentProduct.id)
      .slice(0, 4);
    
    return related;
  };

  const relatedProducts = getRelatedProducts();

  if (relatedProducts.length === 0) {
    return null;
  }

  const handleProductClick = (productSlug: string) => {
    router.push(`/product/${productSlug}`);
  };

  const formatPrice = (price: string) => {
    return parseFloat(price || '0').toFixed(0);
  };

  return (
    <div className="bg-gradient-to-b from-white via-[#FFF8DC] to-white py-20 border-t-2 border-[#D4A574]/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">More Products</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-[#8B7355] via-[#5D4E37] to-[#8B7355] bg-clip-text text-transparent mb-4 tracking-wide">
            You May Also Like
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4A574] via-[#C19A6B] to-[#D4A574] mx-auto mb-4 rounded-full shadow-sm"></div>
          <p className="text-[#5D4E37] text-base font-light max-w-2xl mx-auto">
            Discover more premium products from our collection
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => {
            const salePrice = parseFloat(product.price || '0');
            const regularPrice = parseFloat(product.regular_price || product.price || '0');
            const hasDiscount = salePrice < regularPrice;
            const discountPercent = hasDiscount 
              ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group bg-white border-2 border-[#D4A574]/20 rounded-2xl hover:shadow-2xl hover:border-[#D4A574] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => handleProductClick(product.slug)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#FFF8DC] to-[#F5DEB3]/30">
                  {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white text-xs font-bold px-4 py-1.5 z-10 rounded-full shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      -{discountPercent}%
                    </div>
                  )}
                  
                  <div className="aspect-square flex items-center justify-center group-hover:scale-110 transition-transform duration-700 p-4">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0].src}
                        alt={product.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#D4A574]/10 to-[#C19A6B]/10 flex items-center justify-center rounded-xl">
                        <span className="text-gray-400 text-sm font-medium">No Image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5 space-y-3">
                  {/* Product Category */}
                  {product.attributes && product.attributes.length > 0 && (
                    <div className="text-xs text-[#D4A574] uppercase tracking-widest font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-[#D4A574] rounded-full"></span>
                      {product.attributes[0].option}
                    </div>
                  )}

                  {/* Product Name */}
                  <h3 className="font-semibold text-[#5D4E37] text-base line-clamp-2 leading-relaxed tracking-wide group-hover:text-[#D4A574] transition-colors">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#D4A574] fill-[#D4A574]" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-semibold">4.8</span>
                  </div>

                  {/* Price */}
                  <div className="pt-3 border-t-2 border-[#D4A574]/20">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[#5D4E37]">
                        ₹{formatPrice(product.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm line-through text-gray-400 font-medium">
                          ₹{formatPrice(product.regular_price)}
                        </span>
                      )}
                    </div>
                    {hasDiscount && (
                      <div className="flex items-center gap-1 text-[#D4A574] mt-1">
                        <Sparkles className="w-3 h-3" />
                        <span className="text-xs font-bold">
                          Save ₹{(regularPrice - salePrice).toFixed(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    className="w-full bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white font-bold py-3 text-sm rounded-lg hover:from-[#C19A6B] hover:to-[#8B7355] transition-all duration-300 shadow-md hover:shadow-xl group-hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.slug);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => router.push('/shop')}
            className="inline-flex items-center gap-2 px-10 py-4 text-base text-white bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 font-bold"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>View All Products</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
