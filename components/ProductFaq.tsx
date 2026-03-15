'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { HelpCircle, MessageCircle, Mail } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  productSlug: string;
  productName: string;
}

const faqData: Record<string, FAQ[]> = {
  default: [
    {
      question: "What makes Vyadhihar Foods different from other brands?",
      answer: "Vyadhihar Foods specializes in premium, 100% natural dry fruits and healthy snacks. Our products are lab-tested, handpicked for quality, and contain no preservatives or artificial additives. We source from trusted suppliers and maintain rigorous quality standards at every step.",
    },
    {
      question: "Are your products 100% natural?",
      answer: "Yes! All our dry fruits and snacks are completely natural with:\n• No preservatives or artificial colors\n• No added chemicals\n• Lab-tested for purity\n• Carefully sourced and handpicked\n• Packaged to maintain freshness and quality",
    },
    {
      question: "How should I store dry fruits for maximum freshness?",
      answer: "For best results:\n• Store in a cool, dry place away from direct sunlight\n• Keep in airtight containers after opening\n• Avoid exposure to moisture\n• Refrigeration can extend shelf life\n• Most dry fruits last 6-12 months when stored properly",
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns and exchanges only if the product packaging is damaged or the seal is broken upon delivery. Please contact us immediately with photos of the damaged product. Due to food safety and hygiene standards, we cannot accept returns on opened or used products. Exchanges will be processed within 3-5 business days.",
    },
    {
      question: "How long does delivery take?",
      answer: "We deliver across India with:\n• 3-5 working days for most locations\n• Free shipping on orders above ₹999\n• Secure, hygienic packaging\n• Real-time tracking information\n• Special rates for bulk orders",
    },
    {
      question: "Are these products suitable for dietary restrictions?",
      answer: "Our dry fruits are naturally:\n• Vegan-friendly\n• Gluten-free\n• No added sugar (natural sweetness only)\n• Rich in protein and healthy fats\n\nAlways check individual product labels for specific allergen information, especially if you have nut allergies.",
    },
    {
      question: "What are the health benefits of your products?",
      answer: "Our premium dry fruits offer:\n• Rich source of vitamins and minerals\n• Natural energy boost\n• Heart-healthy fats\n• Support for immunity\n• Helps in weight management\n• Improves digestion\n• Natural antioxidants",
    },
  ],
};

const ProductFAQ: React.FC<ProductFAQProps> = ({ productSlug, productName }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getFAQs = (): FAQ[] => {
    if (faqData[productSlug]) return faqData[productSlug];
    const slugKey = Object.keys(faqData).find(
      (key) => productSlug.includes(key) || key.includes(productSlug.split('-')[0])
    );
    return slugKey ? faqData[slugKey] : faqData['default'];
  };

  const faqs = getFAQs();

  return (
    <div className="bg-white rounded-3xl border border-[#D4A574]/20 shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="px-6 sm:px-10 pt-10 pb-8 border-b border-[#D4A574]/15">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-[#FFF8DC] rounded-lg flex items-center justify-center">
            <HelpCircle className="w-4 h-4 text-[#D4A574]" />
          </div>
          <span className="text-xs font-bold text-[#D4A574] uppercase tracking-widest">FAQs</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D2F1F] tracking-tight mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-gray-500">
          Everything you need to know about {productName}
        </p>
      </div>

      {/* ── FAQ Items ── */}
      <div className="px-4 sm:px-8 py-6 space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-[#D4A574]/40 bg-[#FFFDF7] shadow-sm'
                  : 'border-gray-100 bg-white hover:border-[#D4A574]/25 hover:bg-[#FFFDF7]'
              }`}
            >
              {/* Question Button */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4 text-left focus:outline-none"
              >
                <span className={`font-semibold text-sm sm:text-base leading-snug flex-1 transition-colors ${
                  isOpen ? 'text-[#D4A574]' : 'text-[#3D2F1F]'
                }`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 mt-0.5 ${
                  isOpen
                    ? 'bg-[#D4A574] border-[#D4A574] rotate-180'
                    : 'bg-white border-[#D4A574]/40'
                }`}>
                  <ChevronDownIcon className={`w-4 h-4 transition-colors ${isOpen ? 'text-white' : 'text-[#D4A574]'}`} />
                </div>
              </button>

              {/* Answer */}
              <div className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}>
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                  <div className="border-l-2 border-[#D4A574]/50 pl-4">
                    <p className="text-[#5D4E37] text-sm leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer CTA ── */}
      <div className="mx-4 sm:mx-8 mb-8 mt-2 bg-gradient-to-br from-[#FFF8DC] to-[#FFF3CD]/60 border border-[#D4A574]/20 rounded-2xl px-6 py-7 text-center">
        <div className="w-10 h-10 bg-white border border-[#D4A574]/20 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
          <MessageCircle className="w-5 h-5 text-[#D4A574]" />
        </div>
        <h3 className="text-base font-bold text-[#3D2F1F] mb-1">Still have questions?</h3>
        <p className="text-xs text-gray-500 mb-5">Our team is happy to help you out</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:care@vyadhiharfoods.com"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-[#5D4E37] border-2 border-[#D4A574]/40 hover:border-[#D4A574] hover:bg-white rounded-xl transition-all"
          >
            <Mail className="w-4 h-4" />
            Email Support
          </a>
          <a
            href="https://wa.me/917428408825"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#25D366] hover:bg-[#20BA5A] rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductFAQ;
