'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../../../lib/woocommerceApi'
import { useCart } from '../../../../lib/cart'
import { toast } from '../../../../hooks/use-toast'
import { useFacebookPixel } from '../../../../hooks/useFacebookPixel'
import ImageGallery from '../../../../components/ImageGallery'
import { Tab } from '@headlessui/react'
import ProductFAQ from '../../../../components/ProductFaq'
import RelatedProducts from '../../../../components/RelatedProducts'
import ProductReviews from '../../../../components/ProductReviews'
import { Heart, Star, Shield, Truck, Award, CreditCard, Plus, Minus, ShoppingCart, Sparkles, Leaf, CheckCircle } from 'lucide-react'

export interface ImageData { src: string }
export interface Attribute { option: string }
export interface Product {
  id: number
  name: string
  slug: string
  price: string
  regular_price: string
  description?: string
  short_description?: string
  images: ImageData[]
  attributes?: Attribute[]
}

export default function ProductClient({
  initialProduct,
  allProductsInitial,
  slug,
}: {
  initialProduct?: Product | undefined
  allProductsInitial?: Product[] | undefined
  slug: string
}) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { trackViewContent, trackAddToCart, trackInitiateCheckout } = useFacebookPixel()

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['all-products'],
    queryFn: async () => await fetchProducts() as Product[],
    initialData: allProductsInitial,
    staleTime: 60_000,
    enabled: Boolean(slug),
  })

  const product: Product | undefined =
    initialProduct ??
    products?.find((p) => p.slug === slug || p.id.toString() === slug)

  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (product) {
      trackViewContent({
        id: product.id,
        name: product.name,
        price: product.price,
      })
    }
  }, [product, trackViewContent])

  if (isLoading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF8DC] to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#D4A574] border-t-transparent mx-auto mb-4"></div>
          <p className="text-[#5D4E37] text-base font-medium">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || (!products && !product) || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF8DC] to-white">
        <div className="text-center max-w-md p-8 bg-white border-2 border-[#D4A574]/30 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-[#5D4E37] mb-3">Product Not Found</h2>
          <p className="text-sm text-gray-600 mb-6">The product you are looking for does not exist.</p>
          <button 
            onClick={() => router.push('/shop')}
            className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] transition-all rounded-full shadow-lg"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const salePrice = parseFloat(product.price || '0')
  const regularPrice = parseFloat(product.regular_price || product.price || '0')
  const hasSale = salePrice < regularPrice
  const discountPercent = hasSale ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0
  const totalPrice = salePrice * quantity
  const totalRegularPrice = regularPrice * quantity
  const totalSaving = hasSale ? totalRegularPrice - totalPrice : 0

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          ...product,
          name: product.name,
          price: salePrice.toString(),
          images: product.images || [],
        })
      }
      trackAddToCart({ id: product.id, name: product.name, price: salePrice }, quantity)
      toast({
        title: 'Added to Cart',
        description: `${quantity} x ${product.name} added to your cart.`,
      })
    } catch (error) {
      console.error('Add to cart failed:', error)
      toast({ title: 'Error', description: 'Failed to add item to cart', variant: 'destructive' })
    } finally {
      setTimeout(() => setIsAddingToCart(false), 1000)
    }
  }

  const handleBuyNow = async () => {
    setIsBuyingNow(true)
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          ...product,
          name: product.name,
          price: salePrice.toString(),
          images: product.images || [],
        })
      }
      trackAddToCart({ id: product.id, name: product.name, price: salePrice }, quantity)
      const cartItems = [{ id: product.id, name: product.name, price: salePrice, quantity }]
      const total = salePrice * quantity
      trackInitiateCheckout(cartItems, total)
      setTimeout(() => {
        router.push('/checkout')
        setIsBuyingNow(false)
      }, 800)
    } catch (error) {
      console.error('Buy now failed:', error)
      toast({ title: 'Error', description: 'Failed to process buy now', variant: 'destructive' })
      setIsBuyingNow(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF8DC] to-white pb-20 lg:pb-8">
      {/* Breadcrumb */}
      <div className="border-b-2 border-[#D4A574]/20 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-[#5D4E37] font-medium">
            <button onClick={() => router.push('/shop')} className="hover:text-[#D4A574] transition-colors">
              Shop
            </button>
            <span className="text-[#D4A574]">›</span>
            <span className="text-[#D4A574] truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 px-4 flex flex-col lg:flex-row gap-12">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <div className="sticky top-8">
            <ImageGallery images={product.images || []} />
            
            {/* Trust Indicators Below Images */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { icon: <Leaf className="w-5 h-5" />, text: '100% Natural' },
                { icon: <Shield className="w-5 h-5" />, text: 'Lab Tested' },
                { icon: <Award className="w-5 h-5" />, text: 'Premium Quality' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4 bg-white border-2 border-[#D4A574]/20 rounded-lg">
                  <div className="text-[#D4A574] mb-2">{item.icon}</div>
                  <div className="text-xs font-semibold text-[#5D4E37]">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2">
          <div className="space-y-6">
            {/* Sale Badge */}
            {hasSale && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-4 py-2 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold">SAVE {discountPercent}%</span>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-3xl lg:text-5xl font-bold text-[#5D4E37] tracking-wide leading-tight">
              {product.name}
            </h1>

            {/* Rating & Wishlist */}
            <div className="flex items-center gap-4 pb-6 border-b-2 border-[#D4A574]/20">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4A574] fill-[#D4A574]" />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-semibold">4.8 (247 reviews)</span>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="ml-auto p-2 rounded-full border-2 border-[#D4A574]/30 hover:border-[#D4A574] hover:bg-[#FFF8DC] transition-all"
              >
                <Heart className={`w-6 h-6 transition-colors ${isWishlisted ? 'fill-[#D4A574] text-[#D4A574]' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Short Description */}
            {product.short_description && (
              <div
                className="prose prose-base max-w-none text-[#5D4E37] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Price Section */}
            <div className="py-6 border-y-2 border-[#D4A574]/20 bg-gradient-to-br from-[#FFF8DC] to-white rounded-xl p-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-[#5D4E37]">
                  ₹{totalPrice.toLocaleString()}
                </span>
                {hasSale && (
                  <>
                    <span className="line-through text-gray-400 font-medium text-xl">
                      ₹{totalRegularPrice.toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              {hasSale && (
                <div className="flex items-center gap-2 text-[#D4A574]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-bold">
                    You Save ₹{totalSaving.toLocaleString()} ({discountPercent}% OFF)
                  </span>
                </div>
              )}
              {quantity > 1 && (
                <div className="text-sm text-gray-600 mt-3 font-medium">
                  ₹{salePrice.toLocaleString()} per unit
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-bold text-[#5D4E37] mb-3 uppercase tracking-wide">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-[#D4A574] rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-4 hover:bg-[#FFF8DC] transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5 text-[#5D4E37]" />
                  </button>
                  <span className="px-8 py-4 font-bold text-[#5D4E37] text-lg border-x-2 border-[#D4A574]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-4 hover:bg-[#FFF8DC] transition-colors"
                  >
                    <Plus className="w-5 h-5 text-[#5D4E37]" />
                  </button>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {quantity > 1 ? `${quantity} items` : '1 item'} in cart
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex flex-col gap-4 pt-6">
              <button
                className={`w-full bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white font-bold px-8 py-4 text-base rounded-xl hover:from-[#C19A6B] hover:to-[#8B7355] transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 ${isAddingToCart ? 'opacity-50' : ''}`}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              <button
                className={`w-full border-2 border-[#D4A574] text-[#5D4E37] font-bold px-8 py-4 text-base rounded-xl hover:bg-[#FFF8DC] transition-all shadow-md hover:shadow-lg ${isBuyingNow ? 'opacity-50' : ''}`}
                onClick={handleBuyNow}
                disabled={isBuyingNow}
              >
                {isBuyingNow ? 'Processing...' : 'Buy Now'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-[#D4A574]/20">
              {[
                { icon: <Truck className="w-5 h-5" />, label: 'Free Shipping', subtitle: 'Orders above ₹999' },
                { icon: <Shield className="w-5 h-5" />, label: 'Quality Assured', subtitle: 'Lab tested' },
                { icon: <Award className="w-5 h-5" />, label: 'Premium Quality', subtitle: '100% natural' },
                { icon: <CreditCard className="w-5 h-5" />, label: 'Secure Payment', subtitle: 'Protected checkout' },
              ].map((item, idx) => (
                <div key={idx} className="text-center p-4 border-2 border-[#D4A574]/20 rounded-lg hover:border-[#D4A574] hover:bg-[#FFF8DC] transition-all">
                  <div className="text-[#D4A574] mb-2 flex justify-center">
                    {item.icon}
                  </div>
                  <div className="font-bold text-xs text-[#5D4E37] mb-1">{item.label}</div>
                  <div className="text-xs text-gray-600">{item.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#D4A574]/30 z-50 p-4 shadow-2xl">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <div className="text-xs text-gray-600 mb-1 font-medium">Total Price</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#5D4E37]">
                  ₹{totalPrice.toLocaleString()}
                </span>
                {hasSale && (
                  <span className="line-through text-gray-400 text-sm">
                    ₹{totalRegularPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center border-2 border-[#D4A574] rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-[#FFF8DC]"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-base font-bold">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-[#FFF8DC]"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="flex-1 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white font-bold px-4 py-3.5 text-sm rounded-xl hover:from-[#C19A6B] hover:to-[#8B7355] transition-all shadow-lg flex items-center justify-center gap-2"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
            <button
              className="flex-1 border-2 border-[#D4A574] text-[#5D4E37] font-bold px-4 py-3.5 text-sm rounded-xl hover:bg-[#FFF8DC] transition-all"
              onClick={handleBuyNow}
              disabled={isBuyingNow}
            >
              {isBuyingNow ? 'Processing' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto mt-16 px-4">
        <div className="border-t-2 border-[#D4A574]/30">
          <Tab.Group>
            <Tab.List className="flex border-b-2 border-[#D4A574]/30 bg-white">
              {['Description', 'Benefits', 'How to Use'].map((label, idx) => (
                <Tab key={idx} className={({ selected }) =>
                  `flex-1 py-4 px-6 text-sm font-bold outline-none transition-all uppercase tracking-wide ${
                    selected 
                      ? 'text-[#D4A574] border-b-4 border-[#D4A574] bg-[#FFF8DC]' 
                      : 'text-gray-600 hover:text-[#D4A574] hover:bg-[#FFF8DC]'
                  }`
                }>
                  {label}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="py-8 bg-white rounded-b-2xl">
              <Tab.Panel>
                <div className="prose prose-base max-w-none text-[#5D4E37] leading-relaxed p-6" 
                     dangerouslySetInnerHTML={{ __html: product.description || '' }} />
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-6 p-6">
                  <h3 className="text-2xl font-bold text-[#5D4E37] tracking-wide">Health Benefits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: 'Rich in Nutrients', desc: 'Packed with essential vitamins and minerals for daily health' },
                      { title: 'Energy Boost', desc: 'Natural source of energy for active lifestyle' },
                      { title: 'Heart Healthy', desc: 'Supports cardiovascular health with good fats' },
                      { title: 'Immunity Support', desc: 'Strengthens immune system naturally' },
                    ].map((item, idx) => (
                      <div key={idx} className="border-2 border-[#D4A574]/30 p-6 rounded-xl hover:border-[#D4A574] hover:bg-[#FFF8DC] transition-all">
                        <h4 className="font-bold text-base text-[#5D4E37] mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#D4A574]" />
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-700">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="space-y-6 p-6">
                  <h3 className="text-2xl font-bold text-[#5D4E37] tracking-wide">Storage & Usage</h3>
                  <div className="border-2 border-[#D4A574]/30 p-6 rounded-xl bg-gradient-to-br from-[#FFF8DC] to-white">
                    <ul className="space-y-4 text-[#5D4E37] text-base">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
                        <span>Store in a cool, dry place away from direct sunlight</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
                        <span>Keep in airtight container after opening</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
                        <span>Best consumed within 6-12 months for optimal freshness</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
                        <span>Can be eaten as a snack or added to recipes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 px-4">
        <ProductFAQ productSlug={slug} productName={product.name} />
      </div>
      <div className="max-w-7xl mx-auto mt-16 px-4">
        <ProductReviews productId={product.id} productName={product.name} />
      </div>
      <RelatedProducts currentProduct={product} allProducts={products || []} />
    </div>
  )
}
