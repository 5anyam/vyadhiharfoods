'use client';

import React from 'react';
import { FileText, Shield, Phone, Bell, Gift, Scale, AlertTriangle, Mail, MapPin, Leaf } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="bg-gradient-to-br from-white via-[#FFF8DC] to-white py-16 px-4 sm:px-8 md:px-20 lg:px-40">
      <div className="max-w-5xl mx-auto bg-white p-8 lg:p-12 shadow-2xl rounded-2xl border-2 border-[#D4A574]/30">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <FileText className="w-4 h-4" />
            Legal Terms & Conditions
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4A574] via-[#C19A6B] to-[#8B7355] mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            By choosing Vyadhihar Foods, you agree to these terms that govern your premium natural products shopping experience.
          </p>
        </div>

        <section className="space-y-8 text-base leading-7 text-gray-800">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30 p-6 rounded-xl border-2 border-[#D4A574]/30">
            <p className="text-gray-700">
              This website is owned and managed by <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A574] to-[#C19A6B]">Vyadhihar Foods</strong> (we, us, or Company). By accessing or using our platform at{' '}
              <a href="https://www.vyadhiharfoods.com" className="text-[#D4A574] hover:text-[#C19A6B] font-semibold">
                www.vyadhiharfoods.com
              </a>, you agree to be legally bound by the terms and conditions described in this User Agreement.
            </p>
          </div>

          <p className="text-gray-700">
            By purchasing our premium dry fruits, makhana, fresh fruit boxes, or using our services, you confirm that you are at least 18 years of age and that you understand and agree to comply with these Terms. If you do not agree to any of the terms, we kindly ask that you discontinue use of our platform.
          </p>

          {/* Order Verification */}
          <div className="border-l-4 border-[#D4A574] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Phone className="w-6 h-6 text-[#D4A574]" />
              Order Verification & Authentication
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <p className="text-gray-700">
                To ensure the authenticity of your orders and prevent fraud, we may verify orders through phone calls, SMS, or WhatsApp messages. This verification process helps us confirm your purchase intent and delivery details, ensuring your premium products reach you securely. For fresh fruit box subscriptions, we may contact you for delivery preferences and timing.
              </p>
            </div>
          </div>

          {/* Terms Amendment */}
          <div className="border-l-4 border-[#C19A6B] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#C19A6B]" />
              Amendments to Terms
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <p className="text-gray-700">
                Vyadhihar Foods reserves the right to modify, update, or enhance these terms as we introduce new products, services, or features. We may update these terms without prior notice, and we encourage you to review this page periodically to stay informed about any changes to our service terms.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-l-4 border-[#8B7355] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Mail className="w-6 h-6 text-[#8B7355]" />
              Contact & Customer Support
            </h2>
            <div className="bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30 p-6 rounded-lg border-2 border-[#D4A574]/30">
              <p className="text-gray-700 mb-4">
                For any questions, feedback, or concerns related to these Terms, your orders, or our services, please contact our customer care team:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] rounded-lg">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#5D4E37]">Email:</p>
                    <a href="mailto:support@vyadhiharfoods.com" className="text-[#D4A574] hover:text-[#C19A6B]">
                      support@vyadhiharfoods.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] rounded-lg">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#5D4E37]">WhatsApp:</p>
                    <a href="https://wa.me/917428408825" className="text-[#D4A574] hover:text-[#C19A6B]">
                      +91 742 840 8825
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] rounded-lg">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#5D4E37]">Website:</p>
                    <a href="https://www.vyadhiharfoods.com" className="text-[#D4A574] hover:text-[#C19A6B]">
                      www.vyadhiharfoods.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DND Compliance */}
          <div className="border-l-4 border-[#D4A574] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Bell className="w-6 h-6 text-[#D4A574]" />
              Communication Consent & DND Override
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <p className="text-gray-700">
                By providing your phone number and placing orders with Vyadhihar Foods, you authorize us to override the Do-Not-Disturb (DND) registry. Even if your number is registered under the National Consumer Preference Register (NCPR/NDNC), you voluntarily consent to receive messages, calls, and notifications from us regarding:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
                <li>Order confirmations and delivery updates</li>
                <li>Fresh fruit box delivery schedules and subscriptions</li>
                <li>New product launches and exclusive offers</li>
                <li>Health tips and product recommendations</li>
                <li>Customer service and support communications</li>
              </ul>
            </div>
          </div>

          {/* Customer Satisfaction */}
          <div className="border-l-4 border-[#C19A6B] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Gift className="w-6 h-6 text-[#C19A6B]" />
              Satisfaction & Quality Assurance
            </h2>
            <div className="bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30 p-4 rounded-lg border-2 border-[#D4A574]/30">
              <p className="text-gray-700">
                At Vyadhihar Foods, we stand behind the quality and freshness of our premium products. If you receive damaged, defective, or compromised products, please contact our customer care team within 7 days of delivery. We are committed to ensuring your complete satisfaction with our natural products. Please refer to our Returns & Refunds Policy for detailed information.
              </p>
            </div>
          </div>

          {/* Jurisdiction */}
          <div className="border-l-4 border-[#8B7355] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#8B7355]" />
              Jurisdiction & Governing Law
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <p className="text-gray-700">
                These Terms and any separate agreements through which Vyadhihar Foods provides services shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from your use of our services or purchase of our products shall be subject to the exclusive jurisdiction of the competent courts in Delhi, India.
              </p>
            </div>
          </div>

          {/* Product Disclaimers */}
          <div className="border-l-4 border-[#D4A574] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-[#D4A574]" />
              Product Information & Disclaimers
            </h2>
            <div className="bg-gradient-to-r from-[#FFE4B5] to-[#FFF8DC] p-4 rounded-lg border-2 border-[#D4A574]/30">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Our products are natural food items intended for consumption as part of a balanced diet</li>
                <li>Individual results and health benefits may vary based on personal health conditions and lifestyle</li>
                <li>Fresh fruit boxes should be consumed within 2 days of delivery and stored in refrigerator</li>
                <li>Products contain nuts, seeds, and dried fruits - check for allergens before consumption</li>
                <li>Nutritional information is based on average values and may vary slightly</li>
                <li>These statements have not been evaluated by FDA/FSSAI and are not intended to diagnose, treat, cure, or prevent any disease</li>
                <li>Always consult with a healthcare professional for dietary advice</li>
              </ul>
            </div>
          </div>

          {/* Fresh Fruit Box Terms */}
          <div className="border-l-4 border-[#25D366] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Leaf className="w-6 h-6 text-[#25D366]" />
              Fresh Fruit Box Specific Terms
            </h2>
            <div className="bg-gradient-to-r from-[#25D366]/10 to-[#20BA5A]/5 p-4 rounded-lg border-2 border-[#25D366]/30">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Fresh fruit boxes are prepared daily and delivered same day</li>
                <li>Subscriptions can be paused, modified, or cancelled with 24-hour notice</li>
                <li>Delivery timing preferences should be communicated in advance</li>
                <li>Products must be inspected immediately upon delivery</li>
                <li>Any quality issues must be reported within 2 hours of delivery</li>
                <li>Fruit box pricing may vary based on seasonal availability</li>
                <li>We reserve the right to substitute fruits based on availability while maintaining similar nutritional value</li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="border-l-4 border-[#C19A6B] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#C19A6B]" />
              Intellectual Property & Brand Protection
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <p className="text-gray-700">
                All content on this website, including but not limited to product names, descriptions, images, branding, and marketing materials, are the exclusive property of Vyadhihar Foods. Unauthorized reproduction, distribution, or use of our intellectual property is strictly prohibited and may result in legal action.
              </p>
            </div>
          </div>

          {/* Privacy & Data */}
          <div className="border-l-4 border-[#8B7355] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#8B7355]" />
              Privacy & Data Protection
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <p className="text-gray-700">
                Your privacy is as important to us as the quality of our products. Please review our comprehensive{' '}
                <a href="/privacy-policy" className="text-[#D4A574] hover:text-[#C19A6B] font-semibold">
                  Privacy Policy
                </a>{' '}
                to understand how we collect, use, and protect your personal information in accordance with the highest standards of data security.
              </p>
            </div>
          </div>

          {/* Payment & Pricing */}
          <div className="border-l-4 border-[#D4A574] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Gift className="w-6 h-6 text-[#D4A574]" />
              Payment & Pricing
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All prices are in Indian Rupees (INR) and inclusive of applicable taxes</li>
                <li>We accept payments via credit/debit cards, UPI, net banking, and COD (where available)</li>
                <li>Prices are subject to change without prior notice</li>
                <li>Promotional offers and discounts are subject to terms and availability</li>
                <li>Fresh fruit box pricing is based on seasonal availability and may vary</li>
                <li>Corporate gifting and bulk orders may have different pricing - contact us for quotes</li>
              </ul>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="bg-gradient-to-r from-[#5D4E37] via-[#8B7355] to-[#5D4E37] p-8 rounded-2xl text-center text-white shadow-xl">
            <Leaf className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Quality Comes with Responsibility</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              These terms ensure that your experience with Vyadhihar Foods remains as premium and trustworthy as the natural products we provide. By agreeing to these terms, you join our community of health-conscious individuals who appreciate quality.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
