'use client';

import Link from "next/link";
import { productToSlug } from "../lib/slug";
import { Sparkles } from "lucide-react";

interface Product {
  id: number | string;
  slug: string;
  name: string;
  price: string | number;
  regular_price: string;
  images?: { src: string }[];
  category?: string;
  average_rating?: string;
  rating_count?: number;
  badge?: "New" | "Sale";
}

export default function ProductCard({ product }: { product: Product }) {
  const productUrl = `/product/${productToSlug(product)}`;
  const rating = Number(product.average_rating);
  const salePrice = Number(product.price);
  const originalPrice = Number(product.regular_price);
  const isOnSale = originalPrice > salePrice;

  const discountPercentage = isOnSale
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  return (
    <Link href={productUrl}>
      <div className="group relative overflow-hidden bg-white border-2 border-[#D4A574]/20 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:border-[#D4A574] hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#FFF8DC] to-[#F5DEB3]/30">
          <img
            src={product.images?.[0]?.src || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Discount Badge - Golden Theme */}
          {isOnSale && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-4 py-1.5 text-xs font-bold tracking-wide rounded-full shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              -{discountPercentage}%
            </div>
          )}

          {/* New Badge */}
          {product.badge === 'New' && (
            <div className="absolute top-3 right-3 bg-white text-[#D4A574] border-2 border-[#D4A574] text-xs font-bold px-4 py-1.5 tracking-wide rounded-full shadow-md">
              New
            </div>
          )}

          {/* Quick View Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#5D4E37]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="text-white text-sm font-bold tracking-wide">Quick View</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-3">
          {/* Category */}
          {product.category && (
            <div className="text-xs text-[#D4A574] uppercase tracking-widest font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#D4A574] rounded-full"></span>
              {product.category}
            </div>
          )}

          {/* Product Name */}
          <h3 className="text-base font-semibold text-[#5D4E37] line-clamp-2 leading-relaxed tracking-wide min-h-[3rem] group-hover:text-[#D4A574] transition-colors">
            {product.name}
          </h3>

          {/* Rating - Golden Stars */}
          {Number.isFinite(rating) && rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(rating) ? "text-[#D4A574] fill-[#D4A574]" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.92c.969 0 1.371 1.24.588 1.81l-3.977 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.977 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.977-2.89c-.784-.57-.38-1.81.588-1.81h4.92l1.518-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#5D4E37] font-semibold">
                {rating.toFixed(1)}
              </span>
              {product.rating_count && (
                <span className="text-xs text-gray-500">
                  ({product.rating_count})
                </span>
              )}
            </div>
          )}

          {/* Price Section */}
          <div className="pt-3 border-t-2 border-[#D4A574]/20">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#5D4E37]">
                ₹{salePrice.toLocaleString()}
              </span>
              {isOnSale && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Savings Text */}
            {isOnSale && (
              <div className="text-xs text-[#D4A574] mt-1 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Save ₹{(originalPrice - salePrice).toLocaleString()}
              </div>
            )}
          </div>

          {/* View Details Button - Golden Gradient */}
          <div className="pt-3">
            <button className="w-full py-3 text-sm text-white bg-gradient-to-r from-[#D4A574] to-[#C19A6B] tracking-widest uppercase font-bold hover:from-[#C19A6B] hover:to-[#8B7355] transition-all duration-300 rounded-lg shadow-md hover:shadow-xl group-hover:scale-105">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
