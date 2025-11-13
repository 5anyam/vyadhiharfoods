'use client';

import React from 'react';
import { Shield, Heart, Lock, Eye, UserCheck, FileText, Mail, MapPin, Phone } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gradient-to-br from-white via-[#FFF8DC] to-white py-16 px-4 sm:px-8 md:px-20 lg:px-40">
      <div className="max-w-5xl mx-auto bg-white p-8 lg:p-12 shadow-2xl rounded-2xl border-2 border-[#D4A574]/30">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <Shield className="w-4 h-4" />
            Your Privacy Matters
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#D4A574] via-[#C19A6B] to-[#8B7355] mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-2">Effective Date: November 2025</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Vyadhihar Foods, we understand that trust is essential. This policy outlines how we protect your personal information.
          </p>
        </div>

        <section className="space-y-8 text-base leading-7">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30 p-6 rounded-xl border-2 border-[#D4A574]/30">
            <p className="text-gray-700">
              Vyadhihar Foods (Company, we, our, or us) is committed to protecting your privacy as you explore our collection of premium dry fruits, makhana, and fresh fruit boxes. This Privacy Policy (Policy) outlines how we collect, use, disclose, and safeguard your Personal Information through our platform at{' '}
              <a href="https://www.vyadhiharfoods.com" className="text-[#D4A574] hover:text-[#C19A6B] font-semibold">
                www.vyadhiharfoods.com
              </a>{' '}
              (the Platform).
            </p>
          </div>

          <p className="text-gray-700">
            We at <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A574] to-[#C19A6B]">VYADHIHAR FOODS</strong> craft premium natural products for those who care about their health. As part of our commitment to your healthy lifestyle, we take your data privacy as seriously as we take the quality of our products.
          </p>

          <p className="text-gray-700">
            By accessing or using our Platform, purchasing our products, or engaging with our brand, you agree to the terms of this Privacy Policy and consent to the practices described herein.
          </p>

          {/* Section 1 */}
          <div className="border-l-4 border-[#D4A574] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-[#D4A574]" />
              1. Personal Information We Collect
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Name, contact details (email, phone), shipping & billing address</li>
                <li>Purchase history, product preferences, and dietary requirements</li>
                <li>Payment information (securely processed via trusted payment partners)</li>
                <li>Device information, IP address, cookies, browsing behavior</li>
                <li>Product preferences and health goals (if voluntarily provided)</li>
                <li>Reviews, testimonials, and social media interactions</li>
                <li>Fresh fruit box subscription details and delivery preferences</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="border-l-4 border-[#C19A6B] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Eye className="w-6 h-6 text-[#C19A6B]" />
              2. How We Collect Information
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>When you purchase our products or create an account</li>
                <li>Through newsletter signups, feedback surveys, or product consultations</li>
                <li>Via cookies and analytics tools to enhance your shopping experience</li>
                <li>From trusted partners like payment gateways and delivery services</li>
                <li>Social media platforms and customer reviews</li>
                <li>Customer service interactions and support requests</li>
                <li>Fresh fruit box enquiries via WhatsApp or contact forms</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="border-l-4 border-[#8B7355] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#8B7355]" />
              3. Purpose of Use
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Process and deliver your orders with secure packaging</li>
                <li>Provide personalized product recommendations based on your preferences</li>
                <li>Offer exceptional customer support and respond to your inquiries</li>
                <li>Send exclusive offers, new product launches, and health tips</li>
                <li>Improve our website performance and curate your shopping experience</li>
                <li>Prevent fraud and ensure secure shopping experiences</li>
                <li>Manage fresh fruit box subscriptions and daily deliveries</li>
                <li>Process corporate gifting and bulk orders</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="border-l-4 border-[#D4A574] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#D4A574]" />
              4. Sharing of Personal Information
            </h2>
            <div className="bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30 p-4 rounded-lg border-2 border-[#D4A574]/30">
              <p className="text-gray-700">
                We may share your data with trusted service providers, delivery partners, analytics providers, and legal authorities (if required by law). We <strong className="text-[#D4A574]">never sell</strong> your personal information to third parties. Your privacy is as important as the quality of our products.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="border-l-4 border-[#C19A6B] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#C19A6B]" />
              5. Cookies and Tracking Technologies
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <p className="text-gray-700">
                We use cookies to remember your product preferences, analyze shopping patterns, and enhance your shopping experience. You can manage cookies through your browser settings, though this may affect certain features of our platform.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="border-l-4 border-[#8B7355] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Lock className="w-6 h-6 text-[#8B7355]" />
              6. Data Security
            </h2>
            <div className="bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30 p-4 rounded-lg border-2 border-[#D4A574]/30">
              <p className="text-gray-700">
                We implement state-of-the-art encryption, secure firewalls, and protected servers to safeguard your personal information with the same care we put into our products. However, no online transmission is completely secure, and we continuously upgrade our security measures.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div className="border-l-4 border-[#D4A574] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-[#D4A574]" />
              7. Your Rights and Choices
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Request access to or correction of your personal data</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request deletion of your personal information</li>
                <li>Update your product preferences and dietary requirements</li>
                <li>Manage or cancel fresh fruit box subscriptions</li>
                <li>Opt-out of personalized recommendations</li>
              </ul>
            </div>
          </div>

          {/* Section 8 */}
          <div className="border-l-4 border-[#C19A6B] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#C19A6B]" />
              8. Age Restrictions
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <p className="text-gray-700">
                Our products and services are intended for individuals 18 years of age or older. We do not knowingly collect personal information from minors under 18.
              </p>
            </div>
          </div>

          {/* Section 9 */}
          <div className="border-l-4 border-[#8B7355] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#8B7355]" />
              9. Policy Updates
            </h2>
            <div className="bg-gradient-to-br from-[#FFF8DC] to-white p-4 rounded-lg border border-[#D4A574]/20">
              <p className="text-gray-700">
                We may update this Privacy Policy as we introduce new products, features, or services. Updates will be reflected with a revised effective date. We will notify you of significant changes through email or prominent notices on our platform.
              </p>
            </div>
          </div>

          {/* Section 10 */}
          <div className="border-l-4 border-[#D4A574] pl-6">
            <h2 className="text-2xl font-bold mb-4 text-[#5D4E37] flex items-center gap-2">
              <Mail className="w-6 h-6 text-[#D4A574]" />
              10. Contact & Customer Care
            </h2>
            <div className="bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30 p-6 rounded-lg border-2 border-[#D4A574]/30">
              <p className="text-gray-700 mb-4">
                For any privacy-related questions or concerns about your personal information, please contact our dedicated customer care team:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] rounded-lg">
                    <UserCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#5D4E37]">Privacy Officer:</p>
                    <p className="text-gray-600">Vyadhihar Foods Customer Care Team</p>
                  </div>
                </div>
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

          {/* Closing Statement */}
          <div className="bg-gradient-to-r from-[#5D4E37] via-[#8B7355] to-[#5D4E37] p-8 rounded-2xl text-center text-white shadow-xl">
            <Heart className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold mb-2">Your Trust, Our Promise</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Just as we carefully select each ingredient for quality and freshness, we meticulously protect your personal information with the highest standards of privacy and security.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

