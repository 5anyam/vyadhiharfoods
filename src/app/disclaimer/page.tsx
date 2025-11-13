'use client';

import React from 'react';

export default function disclaimer() {
  return (
    <div className='h-screen justify-center'>
         <h1 className="text-4xl md:text-5xl font-bold text-[#5D4E37] mb-4 tracking-wide">
        Disclaimer
      </h1>
      <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4A574] via-[#C19A6B] to-[#D4A574] mx-auto rounded-full shadow-sm"></div>


{/* Main Content */}
    <div className="bg-white border-2 border-[#D4A574]/30 rounded-2xl p-8 md:p-12 shadow-lg">
      
      {/* General Disclaimer */}
      <div className="mb-8">
        <div className="flex items-start gap-3 mb-4">
          
          <h2 className="text-2xl font-bold text-[#5D4E37]">General Disclaimer</h2>
        </div>
        <p className="text-base text-[#5D4E37] leading-relaxed">
          These statements have not been evaluated by the Food and Drug Administration (FDA) or FSSAI. 
          This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>

      {/* Product Information */}
      <div className="mb-8 bg-gradient-to-br from-[#FFF8DC] to-white p-6 rounded-xl border-2 border-[#D4A574]/20">
        <div className="flex items-start gap-3 mb-4">
         
          <h2 className="text-xl font-bold text-[#5D4E37]">Product Information</h2>
        </div>
        <p className="text-base text-[#5D4E37] leading-relaxed mb-4">
          All products sold by Vyadhihar Foods are natural food products and dietary supplements. 
          They are intended to support general health and wellness as part of a balanced diet and healthy lifestyle.
        </p>
        <p className="text-base text-[#5D4E37] leading-relaxed">
          Results may vary from person to person. Individual results are not guaranteed and may depend on various factors 
          including diet, lifestyle, and individual health conditions.
        </p>
      </div>

      {/* Medical Advice */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#5D4E37] mb-4">Medical Advice</h2>
        <p className="text-base text-[#5D4E37] leading-relaxed mb-4">
          The information provided on our website and product packaging is for educational and informational purposes only. 
          It is not intended as a substitute for professional medical advice, diagnosis, or treatment.
        </p>
        <p className="text-base text-[#5D4E37] leading-relaxed">
          Always seek the advice of your physician or other qualified health provider with any questions you may have 
          regarding a medical condition or before starting any new dietary supplement.
        </p>
      </div>

      {/* Allergen Warning */}
      <div className="mb-8 bg-gradient-to-r from-[#FFE4B5] to-[#FFF8DC] p-6 rounded-xl border-2 border-[#D4A574]/30">
        <h2 className="text-xl font-bold text-[#5D4E37] mb-4">Allergen Information</h2>
        <p className="text-base text-[#5D4E37] leading-relaxed">
          Our products contain nuts, seeds, and dried fruits. If you have any food allergies or sensitivities, 
          please check the product ingredients carefully before consumption. 
          Manufacturing facilities may process products containing common allergens.
        </p>
      </div>

      {/* Fresh Fruit Boxes */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#5D4E37] mb-4">Fresh Fruit Boxes</h2>
        <ul className="space-y-3 text-base text-[#5D4E37]">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#D4A574] rounded-full flex-shrink-0 mt-2"></span>
            <span>Fresh fruit boxes are prepared daily and should be consumed within 2 days of delivery for optimal freshness.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#D4A574] rounded-full flex-shrink-0 mt-2"></span>
            <span>Products must be stored in refrigerator immediately upon delivery.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#D4A574] rounded-full flex-shrink-0 mt-2"></span>
            <span>No preservatives are used. Product quality depends on proper storage conditions.</span>
          </li>
        </ul>
      </div>

      {/* Returns & Refunds */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#5D4E37] mb-4">Returns & Refunds</h2>
        <p className="text-base text-[#5D4E37] leading-relaxed">
          We accept returns and exchanges only if the product packaging is damaged or the seal is broken upon delivery. 
          Due to food safety and hygiene standards, we cannot accept returns on opened or used products. 
          Please contact us immediately with photos if you receive a damaged product.
        </p>
      </div>

      {/* Liability */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#5D4E37] mb-4">Limitation of Liability</h2>
        <p className="text-base text-[#5D4E37] leading-relaxed">
          Vyadhihar Foods shall not be held liable for any adverse reactions, allergic responses, or health issues 
          that may arise from the consumption of our products. By purchasing and consuming our products, 
          you acknowledge that you have read this disclaimer and agree to use the products at your own risk.
        </p>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-br from-[#5D4E37] to-[#8B7355] p-6 rounded-xl text-white">
        <h2 className="text-xl font-bold mb-4">Questions or Concerns?</h2>
        <p className="text-base leading-relaxed mb-4">
          If you have any questions about our products or this disclaimer, please contact us:
        </p>
        <div className="space-y-2 text-sm">
          <p>📧 Email: support@vyadhiharfoods.com</p>
          <p>📱 WhatsApp: +91 742 840 8825</p>
          <p>🌐 Website: www.vyadhiharfoods.com</p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-8 text-center text-sm text-gray-600">
        Last Updated: November 2025
      </div>
    </div>
    </div>
  )
}