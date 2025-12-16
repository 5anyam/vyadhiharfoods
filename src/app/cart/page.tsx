'use client';
import Link from "next/link";
import { useCart } from "../../../lib/cart";
import { Trash2, Minus, Plus, Package, Star } from "lucide-react";

// Define proper types for cart items
interface CartItemImage {
  src: string;
  alt?: string;
}

interface CartItem {
  id: number;
  variation_id?: number;
  name: string;
  price: string;
  regular_price?: string;
  quantity: number;
  images?: CartItemImage[];
  selectedAttributes?: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  increment: (id: number) => void;
  decrement: (id: number) => void;
  removeFromCart: (id: number) => void;
}

export default function CartPage() {
  const { items, increment, decrement, removeFromCart } = useCart() as CartContextType;
  
  // Debug: Console mein items print karo
  console.log('Cart Items:', items);
  
  const total = items.reduce((sum: number, i: CartItem) => sum + parseFloat(i.price) * i.quantity, 0);
  const totalItems = items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0);

  const mrpTotal = items.reduce((sum: number, item: CartItem) => {
    const regularPrice = item.regular_price;
    const originalPrice = regularPrice ? parseFloat(regularPrice) : parseFloat(item.price);
    return sum + originalPrice * item.quantity;
  }, 0);

  const discountAmount = mrpTotal - total;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-8 font-light">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">Shopping Cart</span>
        </div>

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-gray-200">
          <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-2 tracking-wide">
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-sm font-light">
            {items.length === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-20 border border-gray-200 bg-gray-50">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 border border-gray-300 rounded-full mx-auto mb-8 flex items-center justify-center">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-light text-gray-900 mb-3">Your cart is empty</h2>
              <p className="text-gray-600 text-sm mb-8 font-light">
                Start shopping to add items to your cart
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 text-xs text-white bg-black hover:bg-gray-800 transition-colors tracking-widest uppercase font-light"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="border border-gray-200">
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-base font-light text-gray-900 tracking-wide uppercase text-xs">
                    Items
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {items.map((item: CartItem) => {
                    // Use unique key - variation_id if exists, else id
                    const itemKey = item.variation_id || item.id;
                    const itemRegularPrice = item.regular_price;
                    const hasDiscount = itemRegularPrice && parseFloat(itemRegularPrice) > parseFloat(item.price);
                    
                    return (
                      <div key={itemKey} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex gap-6">
                          {/* Image */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-gray-50 border border-gray-200">
                              <img
                                src={item.images?.[0]?.src || '/placeholder.png'}
                                alt={item.name}
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 className="text-sm font-light text-gray-900 line-clamp-2">
                                {item.name}
                              </h3>
                              
                              {/* Show variation attributes if exists */}
                              {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                                <div className="mt-1">
                                  {Object.entries(item.selectedAttributes).map(([key, value]: [string, string]) => (
                                    <span key={key} className="text-xs text-gray-500 mr-2">
                                      {key}: {value}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              <div className="flex items-center gap-1 mt-2">
                                {[...Array(5)].map((_: undefined, i: number) => (
                                  <Star key={i} className="w-3 h-3 text-gray-900 fill-gray-900" />
                                ))}
                                <span className="text-xs text-gray-500 ml-1 font-light">4.8</span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              {/* Price */}
                              <div className="flex flex-col">
                                <div className="text-base font-light text-gray-900">
                                  ₹{parseFloat(item.price).toLocaleString()}
                                </div>
                                {hasDiscount && itemRegularPrice && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 line-through font-light">
                                      ₹{parseFloat(itemRegularPrice).toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Quantity */}
                              <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300">
                                  <button
                                    onClick={() => {
                                      console.log('Decrementing:', itemKey);
                                      decrement(itemKey);
                                    }}
                                    className="p-2 hover:bg-gray-50 transition-colors"
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="h-3 w-3 text-gray-600" />
                                  </button>
                                  <span className="w-12 text-center font-light !text-black text-sm">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => {
                                      console.log('Incrementing:', itemKey);
                                      increment(itemKey);
                                    }}
                                    className="p-2 hover:bg-gray-50 transition-colors"
                                  >
                                    <Plus className="h-3 w-3 text-gray-600" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => {
                                    console.log('Removing:', itemKey);
                                    removeFromCart(itemKey);
                                  }}
                                  className="p-2 text-gray-400 hover:text-black transition-colors"
                                  title="Remove"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <div className="pt-3 border-t border-gray-100">
                              <div className="flex justify-between">
                                <span className="text-xs text-gray-600 font-light uppercase tracking-widest">Subtotal</span>
                                <span className="text-base font-light text-gray-900">
                                  ₹{(parseFloat(item.price) * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 sticky top-8">
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-base font-light text-gray-900 tracking-wide uppercase text-xs">
                    Summary
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-gray-600 font-light">
                        <span>MRP Total</span>
                        <span>₹{mrpTotal.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm text-gray-600 font-light">
                      <span>Subtotal</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-gray-600 font-light">
                        <span>Discount</span>
                        <span>-₹{discountAmount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm text-gray-600 font-light">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-8">
                    <span className="text-sm font-light text-gray-900 uppercase tracking-widest">Total</span>
                    <span className="text-lg font-light text-gray-900">₹{total.toLocaleString()}</span>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/checkout"
                      className="w-full bg-black text-white font-light py-3 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors text-center block"
                    >
                      Checkout
                    </Link>

                    <Link
                      href="/"
                      className="w-full border border-gray-300 text-black font-light py-3 text-xs tracking-widest uppercase hover:bg-gray-50 transition-colors text-center block"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Trust Info */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="space-y-3 text-xs text-gray-600 font-light">
                      <p>• Authentic products</p>
                      <p>• Free shipping</p>
                      <p>• Secure checkout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
