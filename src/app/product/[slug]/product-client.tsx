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
import { Heart, Star, Shield, Truck, Award, CreditCard, Plus, Minus, ShoppingCart, Sparkles, Leaf, CheckCircle, Utensils } from 'lucide-react'

// --- Types ---
export interface ImageData { src: string }
export interface Attribute { 
  id: number
  name: string
  option: string
  options?: string[]
  visible?: boolean
  variation?: boolean
}

export interface ProductVariation {
  id: number
  price: string
  regular_price: string
  attributes: {
    id: number
    name: string
    option: string
  }[]
  image?: ImageData
}

export interface Product {
  id: number
  name: string
  slug: string
  type: 'simple' | 'variable'
  price: string
  regular_price: string
  description?: string
  short_description?: string
  images: ImageData[]
  attributes?: Attribute[]
  variations?: number[]
  variationData?: ProductVariation[]
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

  // --- Variation State ---
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})
  const [currentVariation, setCurrentVariation] = useState<ProductVariation | null>(null)

  // Initialize default attributes if variable product
  useEffect(() => {
    if (product?.type === 'variable' && product.attributes) {
      const defaults: Record<string, string> = {}
      product.attributes.forEach(attr => {
        if (attr.variation && attr.options && attr.options.length > 0) {
          defaults[attr.name] = attr.options[0]
        }
      })
      setSelectedAttributes(defaults)
    }
  }, [product])

  // Find matching variation when attributes change
  useEffect(() => {
    if (product?.type === 'variable' && product.variationData) {
      const match = product.variationData.find(v => {
        return v.attributes.every(vAttr => selectedAttributes[vAttr.name] === vAttr.option)
      })
      setCurrentVariation(match || null)
    }
  }, [selectedAttributes, product])

  // Facebook Pixel
  useEffect(() => {
    if (product) {
      trackViewContent({
        id: currentVariation ? currentVariation.id : product.id,
        name: product.name,
        price: currentVariation ? currentVariation.price : product.price,
      })
    }
  }, [product, currentVariation, trackViewContent])

  // Check if product is fruit box
  const isFruitBox = product?.slug === 'fruit-box' || product?.slug?.includes('fruit-box')

  // --- Loading / Error States ---
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

  // --- Pricing Logic ---
  const activePrice = currentVariation ? currentVariation.price : product.price
  const activeRegularPrice = currentVariation ? currentVariation.regular_price : (product.regular_price || product.price)

  const salePrice = parseFloat(activePrice || '0')
  const regularPrice = parseFloat(activeRegularPrice || '0')
  const hasSale = salePrice < regularPrice
  const discountPercent = hasSale ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0
  const totalPrice = salePrice * quantity
  const totalRegularPrice = regularPrice * quantity
  const totalSaving = hasSale ? totalRegularPrice - totalPrice : 0

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleAttributeSelect = (attributeName: string, option: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeName]: option
    }))
  }

  const handleAddToCart = async () => {
    console.log('🛒 Add to Cart clicked!');
    console.log('Product:', product);
    console.log('Current Variation:', currentVariation);
    console.log('Quantity:', quantity);
    
    if (product.type === 'variable' && !currentVariation) {
      console.log('❌ Variation not selected');
      toast({ title: 'Select Options', description: 'Please select all options before adding to cart.', variant: 'destructive' })
      return
    }
  
    setIsAddingToCart(true)
    try {
      const itemToAdd = {
        ...product,
        id: currentVariation ? currentVariation.id : product.id, 
        variation_id: currentVariation ? currentVariation.id : undefined,
        name: product.name,
        price: salePrice.toString(),
        regular_price: product.regular_price,
        images: (currentVariation?.image ? [currentVariation.image] : product.images) || [],
        selectedAttributes: currentVariation ? selectedAttributes : undefined,
        quantity: 1 // Add quantity property
      }
  
      console.log('📦 Item to add:', itemToAdd);
  
      for (let i = 0; i < quantity; i++) {
        console.log(`Adding item ${i + 1} of ${quantity}`);
        addToCart(itemToAdd)
      }
      
      trackAddToCart({ 
        id: itemToAdd.id, 
        name: itemToAdd.name, 
        price: salePrice 
      }, quantity)
  
      console.log('✅ Successfully added to cart');
  
      toast({
        title: 'Added to Cart',
        description: `${quantity} x ${product.name} added to your cart.`,
      })
    } catch (error) {
      console.error('❌ Add to cart failed:', error)
      toast({ title: 'Error', description: 'Failed to add item to cart', variant: 'destructive' })
    } finally {
      setTimeout(() => {
        console.log('🔄 Resetting button state');
        setIsAddingToCart(false)
      }, 1000)
    }
  }
  
  const handleBuyNow = async () => {
    console.log('💳 Buy Now clicked!');
    console.log('Product:', product);
    console.log('Current Variation:', currentVariation);
    
    if (product.type === 'variable' && !currentVariation) {
      console.log('❌ Variation not selected for Buy Now');
      toast({ title: 'Select Options', description: 'Please select all options.', variant: 'destructive' })
      return
    }
  
    setIsBuyingNow(true)
    try {
      const itemToAdd = {
        ...product,
        id: currentVariation ? currentVariation.id : product.id,
        variation_id: currentVariation ? currentVariation.id : undefined,
        name: product.name,
        price: salePrice.toString(),
        regular_price: product.regular_price,
        images: (currentVariation?.image ? [currentVariation.image] : product.images) || [],
        selectedAttributes: currentVariation ? selectedAttributes : undefined,
        quantity: 1
      }
  
      console.log('📦 Item for Buy Now:', itemToAdd);
  
      for (let i = 0; i < quantity; i++) {
        console.log(`Adding item ${i + 1} of ${quantity} for checkout`);
        addToCart(itemToAdd)
      }
  
      trackAddToCart({ id: itemToAdd.id, name: itemToAdd.name, price: salePrice }, quantity)
      const cartItems = [{ id: itemToAdd.id, name: itemToAdd.name, price: salePrice, quantity }]
      const total = salePrice * quantity
      trackInitiateCheckout(cartItems, total)
      
      console.log('✅ Redirecting to checkout...');
      
      setTimeout(() => {
        router.push('/checkout')
        setIsBuyingNow(false)
      }, 800)
    } catch (error) {
      console.error('❌ Buy now failed:', error)
      toast({ title: 'Error', description: 'Failed to process buy now', variant: 'destructive' })
      setIsBuyingNow(false)
    }
  }

  const handleEnquire = () => {
    let message = `Hi, I want to enquire about ${product.name}`;
    if (product.type === 'variable' && Object.keys(selectedAttributes).length > 0) {
      const attrs = Object.entries(selectedAttributes).map(([k, v]) => `${k}: ${v}`).join(', ')
      message += ` (${attrs})`
    }
    
    const whatsappUrl = `https://wa.me/917428408825?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
            <ImageGallery 
              images={currentVariation?.image ? [currentVariation.image, ...product.images] : (product.images || [])} 
            />
            
            {/* Trust Indicators Below Images */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { icon: <Leaf className="w-5 h-5" />, text: '100% Natural' },
                { icon: <Utensils className="w-5 h-5" />, text: 'Ready to Eat' },
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
            {!isFruitBox && hasSale && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-4 py-2 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold">SAVE {discountPercent}%</span>
              </div>
            )}

            {/* Ready to Eat Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#20BA5A] text-white px-4 py-2 rounded-full shadow-lg ml-2">
              <Utensils className="w-4 h-4" />
              <span className="text-sm font-bold">READY TO EAT</span>
            </div>

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

            {/* Ready to Eat Highlight */}
            <div className="bg-gradient-to-r from-[#25D366]/10 to-[#20BA5A]/10 border-2 border-[#25D366]/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Utensils className="w-8 h-8 text-[#25D366]" />
                <div>
                  <p className="font-bold text-[#5D4E37] text-base">Ready to Eat!</p>
                  <p className="text-sm text-gray-600">Just open the pack and enjoy. No preparation needed.</p>
                </div>
              </div>
            </div>

            {/* Short Description */}
            {product.short_description && (
              <div
                className="prose prose-base max-w-none text-[#5D4E37] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* Variation Selector */}
            {product.type === 'variable' && product.attributes && (
              <div className="space-y-4 py-4">
                {product.attributes.map((attr) => (
                  attr.variation && attr.options && attr.options.length > 0 ? (
                    <div key={attr.id} className="space-y-2">
                      <span className="text-sm font-bold text-[#5D4E37] uppercase tracking-wide">
                        Select {attr.name}: <span className="text-[#D4A574]">{selectedAttributes[attr.name]}</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {attr.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleAttributeSelect(attr.name, option)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all ${
                              selectedAttributes[attr.name] === option
                                ? 'border-[#D4A574] bg-[#D4A574] text-white shadow-md'
                                : 'border-[#D4A574]/30 text-[#5D4E37] hover:border-[#D4A574]'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
            )}

            {/* Price Section */}
            {!isFruitBox && (
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
            )}

            {/* Quantity Selector - FIXED WITH BLACK TEXT */}
            {!isFruitBox && (
              <div>
                <label className="block text-sm font-bold text-[#5D4E37] mb-3 uppercase tracking-wide">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-[#D4A574] rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-4 hover:bg-[#FFF8DC] transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-5 h-5 text-[#5D4E37]" />
                    </button>
                    <span className="px-8 py-4 font-bold !text-black text-xl border-x-2 border-[#D4A574]">
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
            )}

            {/* Action Buttons */}
            <div className="hidden lg:flex flex-col gap-4 pt-6">
              {isFruitBox ? (
                <button
                  className="w-full border-2 border-[#25D366] bg-[#25D366] text-white font-bold px-8 py-4 text-lg rounded-xl hover:bg-[#20BA5A] hover:border-[#20BA5A] transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                  onClick={handleEnquire}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Enquire Now on WhatsApp</span>
                </button>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t-2 border-[#D4A574]/20">
              {[
                ...(!isFruitBox ? [{
                  icon: <Truck className="w-5 h-5" />, 
                  label: 'Free Shipping', 
                  subtitle: 'Orders above ₹999' 
                }] : []),
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

      {/* Mobile Fixed Bottom - FIXED WITH BLACK TEXT */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#D4A574]/30 z-50 p-4 shadow-2xl">
        <div className="max-w-md mx-auto">
          {isFruitBox ? (
             <button
              className="w-full border-2 border-[#25D366] bg-[#25D366] text-white font-bold px-6 py-4 text-base rounded-xl hover:bg-[#20BA5A] transition-all shadow-lg flex items-center justify-center gap-2"
              onClick={handleEnquire}
            >
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Enquire Now</span>
            </button>
          ) : (
            <>
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
                <div className="flex items-center border-2 border-[#D4A574] rounded-lg bg-white">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-[#FFF8DC]"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 text-lg font-bold !text-black">{quantity}</span>
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
            </>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-7xl mx-auto mt-16 px-4">
        <div className="border-t-2 border-[#D4A574]/30">
          <Tab.Group>
            <Tab.List className="flex border-b-2 border-[#D4A574]/30 bg-white">
              {['Description', 'Benefits'].map((label, idx) => (
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
                  <h3 className="text-2xl font-bold text-[#5D4E37] tracking-wide">
                    {isFruitBox ? 'Freshness & Consumption' : 'Health Benefits'}
                  </h3>
                  
                  {isFruitBox ? (
                    <div className="grid grid-cols-1 gap-6">
                      <div className="border-2 border-[#D4A574]/30 p-6 rounded-xl bg-gradient-to-br from-[#FFF8DC] to-white">
                        <h4 className="font-bold text-lg text-[#5D4E37] mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#D4A574]" />
                          Freshness Guidelines
                        </h4>
                        <ul className="space-y-3 text-[#5D4E37] text-base">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
                            <span>Fresh fruits cut daily and delivered same day</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
                            <span><strong>Best consumed within 2 days of delivery</strong></span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
                            <span>Store in refrigerator immediately after delivery</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
                            <span>Keep PET jar sealed until consumption</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#D4A574] flex-shrink-0 mt-0.5" />
                            <span>No preservatives - 100% fresh and natural</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="border-2 border-[#25D366]/30 p-6 rounded-xl bg-gradient-to-br from-[#25D366]/5 to-white">
                        <h4 className="font-bold text-lg text-[#5D4E37] mb-4 flex items-center gap-2">
                          <Leaf className="w-5 h-5 text-[#25D366]" />
                          Why Choose Our Fruit Boxes?
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <p className="text-[#5D4E37] text-sm">Freshly cut every morning</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <p className="text-[#5D4E37] text-sm">Hygienic PET jar packaging</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <p className="text-[#5D4E37] text-sm">Ready to eat immediately</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-white text-xs">✓</span>
                            </div>
                            <p className="text-[#5D4E37] text-sm">Perfect for office snacking</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
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
                  )}
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
