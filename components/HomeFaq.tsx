'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Leaf, Truck, AlertCircle, RotateCcw, DollarSign, Zap, Sparkles } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "Are your dry fruits 100% natural?",
      answer: "Yes, absolutely! All our dry fruits are 100% natural with no preservatives, additives, or artificial flavoring. We source from trusted suppliers and conduct regular lab tests to ensure purity and quality.",
      icon: <Leaf className="w-5 h-5 text-[#D4A574]" />
    },
    {
      question: "How are the products packaged for freshness?",
      answer: "We use air-tight, moisture-resistant packaging to maintain freshness and prevent contamination. Our packaging is hygienic and designed to preserve the natural taste and nutritional value of the products.",
      icon: <Zap className="w-5 h-5 text-[#D4A574]" />
    },
    {
      question: "Do you offer delivery across India?",
      answer: "Yes! We deliver across India with fast, secure packaging. Most orders arrive within 3-5 working days. We offer free shipping on orders above ₹999 and discounted rates for bulk corporate orders.",
      icon: <Truck className="w-5 h-5 text-[#D4A574]" />
    },
    {
      question: "What if I'm not satisfied with my purchase?",
      answer: "Your satisfaction is our priority. We offer a 30-day money-back guarantee on all products. If you're not satisfied for any reason, simply contact us with proof of purchase for a full refund or replacement.",
      icon: <RotateCcw className="w-5 h-5 text-[#D4A574]" />
    },
    {
      question: "Are these products suitable for dietary restrictions?",
      answer: "Our dry fruits are naturally vegan, gluten-free, and suitable for most dietary requirements. However, always check individual product labels for specific allergen information, especially for those with nut allergies.",
      icon: <AlertCircle className="w-5 h-5 text-[#D4A574]" />
    },
    {
      question: "Do you offer bulk orders for corporate gifting?",
      answer: "Absolutely! We specialize in premium corporate gifting hampers. We offer attractive bulk discounts and customization options. Contact us via WhatsApp or email to discuss your corporate gifting requirements.",
      icon: <DollarSign className="w-5 h-5 text-[#D4A574]" />
    },
    {
      question: "How should I store dry fruits for maximum freshness?",
      answer: "Store in a cool, dry place away from direct sunlight and moisture. Transfer to airtight containers after opening to maintain freshness. Most dry fruits have a shelf life of 6-12 months when stored properly.",
    },
    {
      question: "What makes Vyadhihar different from other brands?",
      answer: "We are committed to providing 100% natural, lab-tested products without any compromise on quality. Our handpicked selection, transparent sourcing, fast delivery, and exceptional customer service set us apart in the market.",
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white via-[#FFF8DC] to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C19A6B]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white border-2 border-[#D4A574]/30 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="px-6 sm:px-8 py-12 sm:py-16 text-center border-b-2 border-[#D4A574]/30 bg-gradient-to-b from-[#FFF8DC] to-white">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-6 py-2 rounded-full mb-6 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide">Got Questions?</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#8B7355] via-[#5D4E37] to-[#8B7355] bg-clip-text text-transparent mb-4 tracking-wide">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4A574] via-[#C19A6B] to-[#D4A574] mx-auto mb-4 rounded-full shadow-sm"></div>
            <p className="text-[#5D4E37] text-base font-light">
              Everything you need to know about our premium dry fruits and products
            </p>
          </div>

          {/* FAQ Items */}
          <div className="divide-y divide-[#D4A574]/10">
            {faqs.map((faq, index) => (
              <div key={index} className="hover:bg-gradient-to-r hover:from-[#FFF8DC] hover:to-white transition-colors">
                <button
                  className="w-full px-6 sm:px-8 py-6 text-left transition-colors focus:outline-none group"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {faq.icon && (
                        <div className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                          {faq.icon}
                        </div>
                      )}
                      <h3 className="font-bold text-[#5D4E37] text-sm sm:text-base pr-4 text-left group-hover:text-[#D4A574] transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      <ChevronDownIcon 
                        className={`h-5 w-5 text-[#D4A574] transition-transform duration-300 ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>
                
                {/* Answer */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 sm:px-8 pb-6">
                    <div className="bg-gradient-to-br from-[#FFF8DC] to-[#F5DEB3]/30 p-6 border-l-4 border-[#D4A574] rounded-xl shadow-sm">
                      <p className="text-[#5D4E37] text-sm sm:text-base leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-8 sm:py-12 text-center border-t-2 border-[#D4A574]/30 bg-gradient-to-b from-white to-[#FFF8DC]">
            <h3 className="text-lg sm:text-xl font-bold text-[#5D4E37] mb-3 tracking-wide">
              Still Have Questions?
            </h3>
            <p className="text-[#5D4E37] text-sm sm:text-base mb-8 font-light">
              Our customer service team is here to help
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919876543210?text=Hi,%20I%20have%20a%20question%20about%20Vyadhihar%20Foods"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-[#25D366] hover:bg-[#20BA5A] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Us
              </a>
              <Link 
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 bg-white border-2 border-[#D4A574]/30 rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#D4A574]" />
              <span className="text-sm font-semibold text-[#5D4E37]">100% Natural</span>
            </div>
            <span className="text-[#D4A574]">•</span>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#D4A574]" />
              <span className="text-sm font-semibold text-[#5D4E37]">Lab Tested</span>
            </div>
            <span className="text-[#D4A574]">•</span>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#D4A574]" />
              <span className="text-sm font-semibold text-[#5D4E37]">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
