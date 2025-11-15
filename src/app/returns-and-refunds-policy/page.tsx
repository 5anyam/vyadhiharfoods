'use client';

import React from 'react';
import { RotateCcw, CreditCard, XCircle, CheckCircle, Package, AlertTriangle, Clock, Mail, Shield, Heart } from 'lucide-react';

export default function ReturnsRefundPolicy() {
  return (
    <div className="bg-gradient-to-br from-white via-[#FFF8DC] to-white py-16 px-4 sm:px-8 md:px-20 lg:px-40">
      <div className="max-w-5xl mx-auto bg-white p-8 lg:p-12 shadow-2xl rounded-2xl border-2 border-[#D4A574]/30">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <RotateCcw className="w-4 h-4" />
            Quality Assurance Policy
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4A574] via-[#C19A6B] to-[#8B7355] mb-4">
            Returns & Refunds Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
            Your satisfaction with our premium natural products is our priority
          </p>
          <p className="text-sm text-[#D4A574] font-medium">Please read carefully before making your purchase</p>
        </div>

        <section className="space-y-8 text-base leading-7 text-gray-800">
          
          {/* Introduction */}
          <div className="bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30 p-6 rounded-xl border-2 border-[#D4A574]/30">
            <p className="text-gray-700">
              At <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A574] to-[#C19A6B]">Vyadhihar Foods</strong>, we take great care in packaging and shipping your premium dry fruits, makhana, and fresh fruit boxes. Each product is carefully inspected and securely packaged to ensure it reaches you in perfect condition. However, we understand that sometimes issues may arise, and we are here to help.
            </p>
          </div>

          {/* Returns Section */}
          <div className="border-l-4 border-[#D4A574] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Package className="w-6 h-6 text-[#D4A574]" />
              Returns Policy
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg mb-4 border border-[#D4A574]/20">
              <p className="text-gray-700">
                All Vyadhihar Foods shipments undergo rigorous quality checks before dispatch. If you receive a product in any compromised condition, please notify us within <strong className="text-[#D4A574]">7 days</strong> of delivery for the fastest resolution.
              </p>
            </div>
          </div>

          {/* Acceptable Returns */}
          <div className="border-l-4 border-[#25D366] pl-6">
            <h3 className="text-xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#25D366]" />
              7-Day Return Policy: Acceptable Reasons
            </h3>
            <div className="bg-gradient-to-r from-[#25D366]/10 to-[#20BA5A]/5 p-4 rounded-lg border-2 border-[#25D366]/30">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Damaged Packaging:</strong> Broken, leaking, or tampered product packaging upon delivery</li>
                <li><strong>Seal Broken:</strong> Products with broken or opened safety seals</li>
                <li><strong>Wrong Product:</strong> Received a different product than what you ordered</li>
                <li><strong>Manufacturing Defects:</strong> Quality issues or production defects in the product</li>
                <li><strong>Incomplete Order:</strong> Missing products from your order</li>
                <li><strong>Shipping Damage:</strong> Products damaged during transit despite our secure packaging</li>
                <li><strong>Expired Products:</strong> Products past their expiry date (which should never happen!)</li>
              </ul>
            </div>
          </div>

          {/* Fresh Fruit Box Policy */}
          <div className="border-l-4 border-[#25D366] pl-6">
            <h3 className="text-xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#25D366]" />
              Fresh Fruit Box Special Policy
            </h3>
            <div className="bg-gradient-to-r from-[#25D366]/10 to-[#20BA5A]/5 p-4 rounded-lg border-2 border-[#25D366]/30">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Immediate Inspection:</strong> Please inspect fruit boxes immediately upon delivery</li>
                <li><strong>Same-Day Reporting:</strong> Report any quality issues within 2 hours of delivery</li>
                <li><strong>Photo Evidence:</strong> Clear photos must be provided for faster resolution</li>
                <li><strong>Perishable Nature:</strong> Due to the fresh nature, returns are only accepted for damaged or spoiled fruits</li>
                <li><strong>Refrigeration Required:</strong> Products must be stored properly after delivery</li>
              </ul>
            </div>
          </div>

          {/* Unacceptable Returns */}
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Non-Returnable Items
            </h3>
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Opened Products:</strong> Used, opened, or consumed products</li>
                <li><strong>Missing Packaging:</strong> Items without original Vyadhihar Foods packaging or labels</li>
                <li><strong>Late Requests:</strong> Return requests made after 7 days of delivery</li>
                <li><strong>Personal Preferences:</strong> Taste preferences, allergic reactions, or quality expectations</li>
                <li><strong>Altered Products:</strong> Products that have been modified or tampered with</li>
                <li><strong>Hygiene Reasons:</strong> Due to the food nature, opened products cannot be resold</li>
                <li><strong>Improper Storage:</strong> Products damaged due to improper storage by customer</li>
              </ul>
            </div>
          </div>

          {/* Return Process */}
          <div className="border-l-4 border-[#C19A6B] pl-6">
            <h3 className="text-xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#C19A6B]" />
              Return Process for Acceptable Cases
            </h3>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Contact us immediately via WhatsApp at <strong className="text-[#D4A574]">+91 742 840 8825</strong> or email <strong className="text-[#D4A574]">support@vyadhiharfoods.com</strong></li>
                <li>Provide clear photos of the damaged product, packaging, and seal</li>
                <li>Include your order number, delivery details, and description of the issue</li>
                <li>Our customer care team will review your request within 24 hours</li>
                <li>If confirmed as a valid claim, we will arrange for exchange or replacement</li>
                <li>Replacement products will be dispatched within 3-5 business days</li>
                <li>Original damaged product may need to be returned for verification</li>
              </ol>
            </div>
          </div>

          {/* Refunds Section */}
          <div className="border-l-4 border-[#8B7355] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-[#8B7355]" />
              Refunds Policy
            </h2>
          </div>

          {/* No Refunds */}
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Refunds Will Not Be Issued For
            </h3>
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Products that have been opened, tasted, or used</li>
                <li>Orders with incorrect shipping addresses provided by the customer</li>
                <li>Personal taste preferences or product expectations</li>
                <li>Allergic reactions or health sensitivities (we recommend checking ingredients)</li>
                <li>Claims that do not comply with our return policy guidelines</li>
                <li>Products returned without original packaging or after the 7-day window</li>
                <li>Fresh fruit boxes not reported within 2 hours of delivery</li>
              </ul>
            </div>
          </div>

          {/* Refund Eligible */}
          <div className="border-l-4 border-[#25D366] pl-6">
            <h3 className="text-xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#25D366]" />
              Refunds May Be Issued For
            </h3>
            <div className="bg-gradient-to-r from-[#25D366]/10 to-[#20BA5A]/5 p-4 rounded-lg border-2 border-[#25D366]/30">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Out of stock products that cannot be fulfilled</li>
                <li>Undeliverable addresses where shipping is not available</li>
                <li>Valid return policy conditions met within the 7-day timeframe</li>
                <li>Duplicate payments made for the same order</li>
                <li>Manufacturing defects confirmed by our quality team</li>
                <li>Orders cancelled before dispatch (subject to processing status)</li>
                <li>Severe quality issues verified with photo evidence</li>
              </ul>
            </div>
          </div>

          {/* Cancellation */}
          <div className="border-l-4 border-orange-500 pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              Order Cancellation & Refunds
            </h2>
            <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You can cancel your order before dispatch by contacting us via WhatsApp or email</li>
                <li>Once products are dispatched, cancellations are not possible</li>
                <li>Fresh fruit box subscriptions can be paused or cancelled with 24-hour notice</li>
                <li>Refunds for cancelled orders will be processed within 5-7 business days</li>
                <li>Refunds will be credited to the same payment method used for purchase</li>
              </ul>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-l-4 border-[#C19A6B] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#C19A6B]" />
              Additional Refund Information
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>No processing fees are charged for valid returns or exchanges</li>
                <li>If exchanging for a higher-priced product, you will pay the difference</li>
                <li>Prepaid order refunds are credited to the original payment source</li>
                <li>COD order refunds require your bank account details</li>
                <li>All refunds are processed within 5-7 business days after verification</li>
                <li>Replacement products are shipped within 3-5 business days after approval</li>
                <li>We cover return shipping costs for valid quality-related returns</li>
                <li>Corporate gifting and bulk orders have separate return policies - please enquire</li>
              </ul>
            </div>
          </div>

          {/* Quality Commitment */}
          <div className="border-l-4 border-[#D4A574] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#D4A574]" />
              Our Quality Commitment
            </h2>
            <div className="bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30 p-4 rounded-lg border-2 border-[#D4A574]/30">
              <p className="text-gray-700 mb-3">
                We understand that choosing premium natural products for your health is an important decision. While we cannot accept returns on opened products due to hygiene reasons, we are committed to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Providing accurate product descriptions and nutritional information</li>
                <li>Ensuring secure packaging that protects products during shipping</li>
                <li>Lab-tested, 100% natural products without preservatives</li>
                <li>Standing behind the quality and freshness of every Vyadhihar product</li>
                <li>Daily fresh fruit boxes cut and delivered same day</li>
                <li>Premium selection of dry fruits and makhana</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-l-4 border-[#8B7355] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Mail className="w-6 h-6 text-[#8B7355]" />
              Need Help?
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <p className="text-gray-700 mb-3">
                Our customer care team is here to assist with any concerns about your order:
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>WhatsApp:</strong> <a href="https://wa.me/919217207717" className="text-[#D4A574] hover:text-[#C19A6B]">+91 742 840 8825</a>
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> <a href="mailto:support@vyadhiharfoods.com" className="text-[#D4A574] hover:text-[#C19A6B]">support@vyadhiharfoods.com</a>
                </p>
                <p className="text-gray-700">
                  <strong>Response Time:</strong> Within 24 hours
                </p>
                <p className="text-gray-700">
                  <strong>Available:</strong> Monday to Saturday, 9 AM - 7 PM IST
                </p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="bg-gradient-to-r from-[#5D4E37] via-[#8B7355] to-[#5D4E37] p-8 rounded-2xl text-center text-white shadow-xl">
            <Heart className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold mb-2">Your Satisfaction is Our Priority</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              We are committed to ensuring your experience with Vyadhihar Foods is as premium as our products. Your trust in our natural food brand means everything to us.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

