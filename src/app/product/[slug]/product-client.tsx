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
import {
  Heart, Star, Shield, Truck, Award, CreditCard,
  Plus, Minus, ShoppingCart, Sparkles, Leaf, CheckCircle,
  Utensils, Gift, Tag, Percent, ChevronRight, Zap,
} from 'lucide-react'

export interface ImageData { src: string }
export interface Attribute {
  id: number; name: string; option: string
  options?: string[]; visible?: boolean; variation?: boolean
}
export interface ProductVariation {
  id: number; price: string; regular_price: string
  attributes: { id: number; name: string; option: string }[]
  image?: ImageData
}
export interface Product {
  id: number; name: string; slug: string
  type: 'simple' | 'variable'; price: string; regular_price: string
  description?: string; short_description?: string
  images: ImageData[]; attributes?: Attribute[]
  variations?: number[]; variationData?: ProductVariation[]
}

export default function ProductClient({
  initialProduct, allProductsInitial, slug,
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
    initialProduct ?? products?.find((p) => p.slug === slug || p.id.toString() === slug)

  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuyingNow, setIsBuyingNow] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [applyFirstOrderDiscount, setApplyFirstOrderDiscount] = useState(false)
  const [selectedMakhanaFlavour, setSelectedMakhanaFlavour] = useState<string>('Peri Peri')
  const [showMakhanaOffer, setShowMakhanaOffer] = useState(false)
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})
  const [currentVariation, setCurrentVariation] = useState<ProductVariation | null>(null)

  useEffect(() => {
    if (product?.type === 'variable' && product.attributes && product.variationData) {
      const defaults: Record<string, string> = {}
      product.attributes.forEach(attr => {
        if (attr.variation && attr.options && attr.options.length > 0)
          defaults[attr.name] = attr.options[0]
      })
      if (Object.keys(defaults).length > 0) setSelectedAttributes(defaults)
    }
  }, [product])

  useEffect(() => {
    if (product?.type === 'variable' && product.variationData && Object.keys(selectedAttributes).length > 0) {
      const match = product.variationData.find(variation =>
        variation.attributes.every(vAttr => selectedAttributes[vAttr.name] === vAttr.option)
      )
      setCurrentVariation(match || null)
    }
  }, [selectedAttributes, product])

  useEffect(() => {
    if (product) {
      trackViewContent({
        id: currentVariation ? currentVariation.id : product.id,
        name: product.name,
        price: currentVariation ? currentVariation.price : product.price,
      })
    }
  }, [product, currentVariation, trackViewContent])

  const isFruitBox = !!(
  product?.slug === 'fruit-box' || product?.slug?.includes('fruit-box')
)

const isSuperfood = !!(
  product?.name?.toLowerCase().includes('superfood') ||
  product?.slug?.includes('superfood')
)

  useEffect(() => {
    setShowMakhanaOffer(isSuperfood && quantity >= 2)
  }, [quantity, isSuperfood])

  if (isLoading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF7]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-[#D4A574] border-t-transparent mx-auto mb-4" />
          <p className="text-[#5D4E37] font-medium">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF7]">
        <div className="text-center max-w-sm p-8 bg-white rounded-2xl shadow-xl border border-[#D4A574]/20">
          <div className="w-16 h-16 bg-[#FFF8DC] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-[#D4A574]" />
          </div>
          <h2 className="text-2xl font-bold text-[#5D4E37] mb-2">Product Not Found</h2>
          <p className="text-gray-500 text-sm mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/shop')}
            className="px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#D4A574] to-[#C19A6B] rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const isVariableProduct = product.type === 'variable'
  const canProceed = isVariableProduct ? currentVariation !== null : true

  const activePrice = currentVariation ? currentVariation.price : product.price
  const activeRegularPrice = currentVariation ? currentVariation.regular_price : (product.regular_price || product.price)

  const salePrice = parseFloat(activePrice || '0')
  const regularPrice = parseFloat(activeRegularPrice || '0')
  const hasSale = salePrice < regularPrice
  const discountPercent = hasSale ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0

  let totalPrice = salePrice * quantity
  const totalRegularPrice = regularPrice * quantity
  let totalSaving = hasSale ? totalRegularPrice - totalPrice : 0

  let firstOrderDiscount = 0
  if (applyFirstOrderDiscount && totalPrice >= 500) {
    firstOrderDiscount = totalPrice * 0.05
    totalPrice -= firstOrderDiscount
    totalSaving += firstOrderDiscount
  }
  const makhanaOfferSaving = showMakhanaOffer ? 175 : 0

  const handleQuantityChange = (delta: number) => setQuantity(Math.max(1, quantity + delta))

  const handleAttributeSelect = (attributeName: string, option: string) => {
    setSelectedAttributes(prev => ({ ...prev, [attributeName]: option }))
  }

  const handleAddToCart = async () => {
    if (isVariableProduct && !currentVariation) {
      toast({ title: 'Select Options', description: 'Please choose all options before adding to cart.', variant: 'destructive' })
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
        regular_price: activeRegularPrice.toString(),
        images: (currentVariation?.image ? [currentVariation.image] : product.images) || [],
        selectedAttributes: currentVariation ? selectedAttributes : undefined,
        quantity: 1,
        appliedOffers: {
          firstOrderDiscount: applyFirstOrderDiscount && totalPrice >= 500,
          makhanaFree: showMakhanaOffer,
          makhanaFlavour: selectedMakhanaFlavour,
        },
      }
      for (let i = 0; i < quantity; i++) addToCart(itemToAdd)
      trackAddToCart({ id: itemToAdd.id, name: itemToAdd.name, price: salePrice }, quantity)
      toast({ title: '✅ Added to Cart', description: `${quantity} × ${product.name}` })
    } catch {
      toast({ title: 'Error', description: 'Failed to add item', variant: 'destructive' })
    } finally {
      setTimeout(() => setIsAddingToCart(false), 1000)
    }
  }

  const handleBuyNow = async () => {
    if (isVariableProduct && !currentVariation) {
      toast({ title: 'Select Options', description: 'Please choose all options to proceed.', variant: 'destructive' })
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
        regular_price: activeRegularPrice.toString(),
        images: (currentVariation?.image ? [currentVariation.image] : product.images) || [],
        selectedAttributes: currentVariation ? selectedAttributes : undefined,
        quantity: 1,
        appliedOffers: {
          firstOrderDiscount: applyFirstOrderDiscount && totalPrice >= 500,
          makhanaFree: showMakhanaOffer,
          makhanaFlavour: selectedMakhanaFlavour,
        },
      }
      for (let i = 0; i < quantity; i++) addToCart(itemToAdd)
      trackAddToCart({ id: itemToAdd.id, name: itemToAdd.name, price: salePrice }, quantity)
      trackInitiateCheckout([{ id: itemToAdd.id, name: itemToAdd.name, price: salePrice, quantity }], totalPrice)
      setTimeout(() => { router.push('/checkout'); setIsBuyingNow(false) }, 800)
    } catch {
      toast({ title: 'Error', description: 'Failed to process', variant: 'destructive' })
      setIsBuyingNow(false)
    }
  }

  const handleEnquire = () => {
    let message = `Hi, I want to enquire about ${product.name}`
    if (isVariableProduct && Object.keys(selectedAttributes).length > 0) {
      const attrs = Object.entries(selectedAttributes).map(([k, v]) => `${k}: ${v}`).join(', ')
      message += ` (${attrs})`
    }
    window.open(`https://wa.me/917428408825?text=${encodeURIComponent(message)}`, '_blank')
  }

  const trustBadges = [
    ...(!isFruitBox ? [{ icon: <Truck className="w-5 h-5" />, label: 'Free Shipping', sub: 'On all orders' }] : []),
    { icon: <Shield className="w-5 h-5" />, label: 'Quality Assured', sub: 'Lab tested' },
    { icon: <Award className="w-5 h-5" />, label: 'Premium Quality', sub: '100% natural' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Secure Payment', sub: 'Safe checkout' },
  ]

  return (
    <div className="min-h-screen bg-[#FFFDF7] pb-28 lg:pb-12">

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-[#D4A574]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <button onClick={() => router.push('/shop')} className="hover:text-[#D4A574] transition-colors font-medium">
              Shop
            </button>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-[#5D4E37] font-semibold truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ── Superfood Promo Banner ── */}
      {isSuperfood && (
        <div className="bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFA500] py-2.5">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 text-white">
            <Gift className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold text-sm sm:text-base tracking-wide">
              🎁 SPECIAL OFFER: Buy 2 Superfood — Get 1 Makhana FREE!
            </span>
            <Gift className="w-5 h-5 flex-shrink-0" />
          </div>
        </div>
      )}

      {/* ── Main Product Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 lg:mt-10">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">

          {/* LEFT — Image Gallery */}
          <div className="lg:w-[48%]">
            <div className="sticky top-6">
              <ImageGallery
                images={currentVariation?.image
                  ? [currentVariation.image, ...product.images]
                  : (product.images || [])}
              />
              {/* Mini feature pills below gallery */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { icon: <Leaf className="w-4 h-4" />, text: '100% Natural' },
                  { icon: <Utensils className="w-4 h-4" />, text: 'Ready to Eat' },
                  { icon: <Award className="w-4 h-4" />, text: 'Premium Quality' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 py-3 px-2 bg-white border border-[#D4A574]/25 rounded-xl text-center shadow-sm">
                    <span className="text-[#D4A574]">{item.icon}</span>
                    <span className="text-[10px] font-bold text-[#5D4E37] uppercase tracking-wide">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Product Info */}
          <div className="lg:w-[52%] space-y-5">

            {/* ── Badges Row ── */}
            <div className="flex flex-wrap items-center gap-2">
              {!isFruitBox && hasSale && (
                <span className="inline-flex items-center gap-1.5 bg-[#D4A574] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  <Zap className="w-3.5 h-3.5" /> SAVE {discountPercent}%
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 bg-[#ECFDF5] text-[#059669] border border-[#059669]/20 text-xs font-bold px-3 py-1.5 rounded-full">
                <Utensils className="w-3.5 h-3.5" /> READY TO EAT
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FFF7ED] text-[#EA580C] border border-[#EA580C]/20 text-xs font-bold px-3 py-1.5 rounded-full">
                <Leaf className="w-3.5 h-3.5" /> 100% NATURAL
              </span>
            </div>

            {/* ── Product Name ── */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#3D2F1F] leading-tight tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* ── Rating Row ── */}
            <div className="flex items-center gap-3 pb-4 border-b border-[#D4A574]/15">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#D4A574] fill-[#D4A574]" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-600">4.8</span>
              <span className="text-sm text-gray-400">(247 reviews)</span>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="ml-auto p-2 rounded-full hover:bg-[#FFF8DC] transition-colors"
              >
                <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-[#D4A574] text-[#D4A574]' : 'text-gray-300'}`} />
              </button>
            </div>

            {/* ── Short Description ── */}
            {product.short_description && (
              <div
                className="text-[#5D4E37] text-sm leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {/* ── Variation Selector ── */}
            {isVariableProduct && product.attributes && (
              <div className="bg-white border border-[#D4A574]/25 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#D4A574]" />
                  <h3 className="text-sm font-bold text-[#5D4E37] uppercase tracking-wide">Choose Your Options</h3>
                </div>

                {product.attributes.map((attr) =>
                  attr.variation && attr.options && attr.options.length > 0 ? (
                    <div key={attr.id} className="space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {attr.name}:{' '}
                        <span className="text-[#D4A574] normal-case font-bold">
                          {selectedAttributes[attr.name] || 'Not Selected'}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {attr.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleAttributeSelect(attr.name, option)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                              selectedAttributes[attr.name] === option
                                ? 'border-[#D4A574] bg-[#D4A574] text-white shadow-md scale-105'
                                : 'border-gray-200 text-gray-600 hover:border-[#D4A574] hover:text-[#5D4E37]'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null
                )}

                <div className={`flex items-center gap-2.5 rounded-xl p-3 text-sm font-semibold ${
                  currentVariation
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  {currentVariation
                    ? `✅ ${Object.values(selectedAttributes).join(' · ')} selected`
                    : 'Please select all options above'}
                </div>
              </div>
            )}

            {/* ── Offers Section ── */}
            {!isFruitBox && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-[#D4A574]" />
                  <h3 className="text-sm font-bold text-[#5D4E37] uppercase tracking-wide">Available Offers</h3>
                </div>

                {/* Makhana Free Offer */}
                {isSuperfood && showMakhanaOffer && (
                  <div className="bg-gradient-to-br from-[#FFF0F0] to-[#FFF5EE] border border-[#FF6B6B]/30 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#FF6B6B]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Gift className="w-5 h-5 text-[#FF6B6B]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#5D4E37] text-sm">🎁 Buy 2 Get 1 FREE Makhana!</p>
                        <p className="text-xs text-gray-500 mt-0.5 mb-3">Choose your free Makhana flavour:</p>
                        <div className="flex flex-wrap gap-2">
                          {['Peri Peri', 'Cream & Onion', 'Pudina', 'Himalayan Pink Salt'].map((flavour) => (
                            <button
                              key={flavour}
                              onClick={() => setSelectedMakhanaFlavour(flavour)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                selectedMakhanaFlavour === flavour
                                  ? 'border-[#FF6B6B] bg-[#FF6B6B] text-white'
                                  : 'border-gray-200 text-gray-600 hover:border-[#FF6B6B]'
                              }`}
                            >
                              {flavour}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-[#FF6B6B] font-bold mt-2">💰 You Save: ₹{makhanaOfferSaving}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* First Order Discount */}
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  applyFirstOrderDiscount
                    ? 'bg-[#ECFDF5] border-[#059669]/30'
                    : 'bg-white border-gray-200 hover:border-[#D4A574]/40'
                }`}>
                  <input
                    type="checkbox"
                    checked={applyFirstOrderDiscount}
                    onChange={(e) => setApplyFirstOrderDiscount(e.target.checked)}
                    className="w-4 h-4 mt-0.5 accent-[#059669] cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-[#059669]" />
                      <p className="font-bold text-sm text-[#5D4E37]">First Order: 5% OFF</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Valid on orders above ₹500</p>
                    {applyFirstOrderDiscount && totalPrice >= 500 && (
                      <p className="text-xs text-[#059669] font-bold mt-1">✅ Saving ₹{firstOrderDiscount.toFixed(0)}</p>
                    )}
                    {applyFirstOrderDiscount && totalPrice < 500 && (
                      <p className="text-xs text-amber-600 font-bold mt-1">
                        Add ₹{(500 - salePrice * quantity).toFixed(0)} more to unlock
                      </p>
                    )}
                  </div>
                </label>
              </div>
            )}

            {/* ── Price Block ── */}
            {!isFruitBox && (
              <div className="bg-gradient-to-br from-[#FFF8DC] to-white border border-[#D4A574]/25 rounded-2xl p-5 shadow-sm">
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-4xl font-extrabold text-[#3D2F1F]">
                    ₹{Math.round(totalPrice).toLocaleString()}
                  </span>
                  {(hasSale || firstOrderDiscount > 0) && (
                    <span className="text-lg line-through text-gray-400 mb-1">
                      ₹{totalRegularPrice.toLocaleString()}
                    </span>
                  )}
                  {hasSale && (
                    <span className="text-sm font-bold text-[#D4A574] mb-1">{discountPercent}% off</span>
                  )}
                </div>
                {totalSaving > 0 && (
                  <p className="text-sm text-[#D4A574] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    You save ₹{Math.round(totalSaving + makhanaOfferSaving).toLocaleString()} on this order
                  </p>
                )}
                {quantity > 1 && (
                  <p className="text-xs text-gray-400 mt-1">₹{salePrice.toLocaleString()} per unit</p>
                )}
              </div>
            )}

            {/* ── Quantity Selector ── */}
            {!isFruitBox && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Quantity{isSuperfood && <span className="text-[#FF6B6B] ml-1">(Buy 2+ for FREE Makhana!)</span>}
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white border-2 border-[#D4A574]/40 rounded-xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="px-4 py-3 text-[#5D4E37] hover:bg-[#FFF8DC] transition-colors disabled:opacity-30"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 text-lg font-extrabold text-[#3D2F1F] border-x-2 border-[#D4A574]/30 min-w-[56px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-4 py-3 text-[#5D4E37] hover:bg-[#FFF8DC] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{quantity} item{quantity > 1 ? 's' : ''}</span>
                </div>
              </div>
            )}

            {/* ── Desktop CTA Buttons ── */}
            <div className="hidden lg:flex flex-col gap-3 pt-2">
              {isFruitBox ? (
                <button
                  onClick={handleEnquire}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Enquire on WhatsApp
                </button>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    disabled={!canProceed || isAddingToCart}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white shadow-lg transition-all ${
                      !canProceed || isAddingToCart
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] hover:shadow-xl hover:-translate-y-0.5'
                    }`}
                  >
                    {isAddingToCart ? (
                      <><CheckCircle className="w-5 h-5 animate-spin" /> Adding to Cart...</>
                    ) : (
                      <><ShoppingCart className="w-5 h-5" /> {canProceed ? 'Add to Cart' : 'Select Options First'}</>
                    )}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={!canProceed || isBuyingNow}
                    className={`w-full py-4 rounded-2xl font-bold text-base border-2 transition-all ${
                      !canProceed || isBuyingNow
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-[#D4A574] text-[#5D4E37] hover:bg-[#FFF8DC] hover:-translate-y-0.5 hover:shadow-md'
                    }`}
                  >
                    {isBuyingNow ? 'Processing...' : canProceed ? 'Buy Now' : 'Select Options First'}
                  </button>
                </>
              )}
            </div>

            {/* ── Trust Badges ── */}
            <div className={`grid gap-3 pt-2 ${trustBadges.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
              {trustBadges.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 p-3 bg-white border border-gray-100 rounded-xl text-center shadow-sm hover:border-[#D4A574]/30 transition-colors">
                  <span className="text-[#D4A574]">{item.icon}</span>
                  <span className="text-[10px] font-bold text-[#5D4E37] leading-tight">{item.label}</span>
                  <span className="text-[9px] text-gray-400 leading-tight">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Description / Benefits Tabs ── */}
      <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6">
        <Tab.Group>
          <Tab.List className="flex rounded-2xl bg-white border border-[#D4A574]/20 shadow-sm p-1 gap-1">
            {['Description', 'Benefits'].map((label) => (
              <Tab
                key={label}
                className={({ selected }) =>
                  `flex-1 py-3 px-4 text-sm font-bold rounded-xl outline-none transition-all ${
                    selected
                      ? 'bg-[#D4A574] text-white shadow-md'
                      : 'text-gray-500 hover:text-[#5D4E37] hover:bg-[#FFF8DC]'
                  }`
                }
              >
                {label}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            <Tab.Panel>
              <div className="bg-white border border-[#D4A574]/15 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div
                  className="prose prose-sm sm:prose max-w-none text-[#5D4E37] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.description || '' }}
                />
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="bg-white border border-[#D4A574]/15 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-xl font-bold text-[#5D4E37] mb-6">
                  {isFruitBox ? 'Freshness & Consumption' : '🌿 Health Benefits'}
                </h3>
                {!isFruitBox && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: 'Rich in Nutrients', desc: 'Packed with essential vitamins and minerals' },
                      { title: 'Natural Energy Boost', desc: 'Fuel your day without artificial additives' },
                      { title: 'Heart Healthy', desc: 'Supports cardiovascular health with good fats' },
                      { title: 'Immunity Support', desc: 'Strengthens immune system naturally' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 border border-[#D4A574]/20 rounded-xl hover:bg-[#FFFDF7] transition-colors">
                        <div className="w-8 h-8 bg-[#FFF8DC] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-[#D4A574]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#5D4E37] mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6">
        <ProductFAQ productSlug={slug} productName={product.name} />
      </div>

      {/* ── Reviews ── */}
      <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6">
        <ProductReviews productId={product.id} productName={product.name} />
      </div>

      {/* ── Related Products ── */}
      <RelatedProducts currentProduct={product} allProducts={products || []} />

      {/* ── Mobile Sticky CTA ── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#D4A574]/20 z-50 px-4 py-3 shadow-2xl">
        <div className="max-w-lg mx-auto">
          {isFruitBox ? (
            <button
              onClick={handleEnquire}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-base shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Enquire on WhatsApp
            </button>
          ) : (
            <>
              {!canProceed && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-2 text-center">
                  <p className="text-xs font-bold text-amber-700">⚠️ Scroll up and select options to continue</p>
                </div>
              )}
              <div className="flex items-center gap-3 mb-2.5">
                <div className="flex-1">
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Total</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#3D2F1F]">₹{Math.round(totalPrice).toLocaleString()}</span>
                    {(hasSale || firstOrderDiscount > 0) && (
                      <span className="text-sm line-through text-gray-400">₹{totalRegularPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center bg-white border-2 border-[#D4A574]/40 rounded-xl overflow-hidden">
                  <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="px-3 py-2.5 hover:bg-[#FFF8DC] disabled:opacity-30">
                    <Minus className="w-4 h-4 text-[#5D4E37]" />
                  </button>
                  <span className="px-4 py-2.5 font-extrabold text-[#3D2F1F] border-x-2 border-[#D4A574]/30 text-base min-w-[40px] text-center">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} className="px-3 py-2.5 hover:bg-[#FFF8DC]">
                    <Plus className="w-4 h-4 text-[#5D4E37]" />
                  </button>
                </div>
              </div>
              <div className="flex gap-2.5">
                <button
                  onClick={handleAddToCart}
                  disabled={!canProceed || isAddingToCart}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 rounded-2xl font-bold text-sm text-white transition-all ${
                    !canProceed || isAddingToCart
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#D4A574] to-[#C19A6B] shadow-lg'
                  }`}
                >
                  {isAddingToCart ? <><CheckCircle className="w-4 h-4 animate-spin" /> Adding</> : <><ShoppingCart className="w-4 h-4" /> Add to Cart</>}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!canProceed || isBuyingNow}
                  className={`flex-1 py-3.5 rounded-2xl font-bold text-sm border-2 transition-all ${
                    !canProceed || isBuyingNow
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-[#D4A574] text-[#5D4E37] hover:bg-[#FFF8DC]'
                  }`}
                >
                  {isBuyingNow ? 'Processing...' : 'Buy Now'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
