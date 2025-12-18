"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Package, Truck, Calendar, Home, Phone } from "lucide-react";

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const orderId = searchParams.get("orderId");
  const wcOrderId = searchParams.get("wcOrderId");
  const method = searchParams.get("method");

  useEffect(() => {
    if (!orderId) {
      router.push("/");
    }
  }, [orderId, router]);

  // Calculate estimated delivery date (3-5 business days from today)
  const today = new Date();
  const minDeliveryDate = new Date(today);
  minDeliveryDate.setDate(today.getDate() + 3);
  
  const maxDeliveryDate = new Date(today);
  maxDeliveryDate.setDate(today.getDate() + 5);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] via-white to-[#F5DEB3]/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Success Icon & Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-2xl mb-6 animate-bounce">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-green-600 bg-clip-text text-transparent mb-3">
            Order Confirmed!
          </h1>
          
          <p className="text-gray-600 text-lg">
            Thank you for your order. We will send you updates via WhatsApp & Email.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-8 shadow-xl mb-6">
          
          {/* Order ID */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-gray-100">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order ID</p>
              <p className="text-2xl font-bold text-[#5D4E37]">#{wcOrderId || orderId}</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#D4A574]/10 to-[#C19A6B]/10 px-4 py-2 rounded-full">
              <p className="text-sm font-semibold text-[#5D4E37]">
                {method === "cod" ? "Cash on Delivery" : "Paid Online"}
              </p>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Estimated Delivery</h3>
                <p className="text-2xl font-bold text-blue-600 mb-1">
                  {formatDate(minDeliveryDate)} - {formatDate(maxDeliveryDate)}
                </p>
                <p className="text-sm text-gray-600">
                  Your order will be delivered within 3-5 business days
                </p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#5D4E37] mb-4">Order Status</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-[#D4A574] to-gray-300"></div>
              
              {/* Step 1: Order Placed */}
              <div className="relative flex items-start gap-4 pb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-semibold text-gray-900">Order Placed</p>
                  <p className="text-sm text-gray-500">{new Date().toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Step 2: Processing */}
              <div className="relative flex items-start gap-4 pb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-[#D4A574] rounded-full flex items-center justify-center shadow-lg z-10">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-semibold text-gray-900">Processing Order</p>
                  <p className="text-sm text-gray-500">We are preparing your items</p>
                </div>
              </div>

              {/* Step 3: Out for Delivery */}
              <div className="relative flex items-start gap-4 pb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center shadow-lg z-10">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-semibold text-gray-500">Out for Delivery</p>
                  <p className="text-sm text-gray-400">Coming soon</p>
                </div>
              </div>

              {/* Step 4: Delivered */}
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center shadow-lg z-10">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-semibold text-gray-500">Delivered</p>
                  <p className="text-sm text-gray-400">Expected by {formatDate(maxDeliveryDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gradient-to-r from-[#D4A574]/10 to-[#C19A6B]/10 border-2 border-[#D4A574]/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Phone className="w-6 h-6 text-[#D4A574]" />
            <h3 className="text-lg font-bold text-[#5D4E37]">Need Help?</h3>
          </div>
          <p className="text-gray-600 text-sm mb-3">
            If you have any questions about your order, feel free to contact us:
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-gray-700">
              <span className="font-semibold">WhatsApp:</span>{" "}
              <a href="https://wa.me/919217207717" className="text-[#D4A574] hover:underline">
                +91 92172 07717
              </a>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              <a href="mailto:support@vyadhiharfoods.com" className="text-[#D4A574] hover:underline">
                support@vyadhiharfoods.com
              </a>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl"
          >
            Continue Shopping
          </button>
          
          <button
            onClick={() => window.print()}
            className="w-full bg-white border-2 border-[#D4A574] text-[#5D4E37] py-4 rounded-xl font-bold text-lg transition-all hover:bg-[#D4A574]/10"
          >
            Print Order Details
          </button>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Thank you for choosing <span className="font-bold text-[#5D4E37]">Vyadhihar Foods</span>! 
            We are committed to delivering quality products.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmation() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8DC] to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A574]"></div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
