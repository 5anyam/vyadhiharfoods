'use client';

import React, { useState } from 'react';
import { X, Leaf, Heart, Zap, Award } from 'lucide-react';

// Modal Component
function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Add your form submission logic here (e.g., send to email service)
      console.log('Form submitted:', formData);
      setIsOpen(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block px-8 py-3 text-sm font-medium text-white bg-[#6B8E23] hover:bg-[#556B2F] transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl tracking-wide uppercase"
      >
        Get in Touch
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border-2 border-[#6B8E23]/20">
            <div className="flex justify-between items-center p-6 border-b-2 border-[#6B8E23]/20">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[#6B8E23]" />
                <h3 className="text-xl font-semibold text-[#556B2F] tracking-wide">Contact Us</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-[#6B8E23] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#6B8E23]/20 focus:border-[#6B8E23] rounded-lg focus:outline-none transition-colors text-sm font-light"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#6B8E23]/20 focus:border-[#6B8E23] rounded-lg focus:outline-none transition-colors text-sm font-light"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#6B8E23]/20 focus:border-[#6B8E23] rounded-lg focus:outline-none transition-colors text-sm font-light"
                required
              />
              <textarea
                placeholder="Your Message or Inquiry..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border-2 border-[#6B8E23]/20 focus:border-[#6B8E23] rounded-lg focus:outline-none transition-colors text-sm font-light resize-none"
                required
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6B8E23] text-white py-3 text-sm font-medium rounded-lg hover:bg-[#556B2F] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-20 space-y-20">
        {/* Hero Section */}
        <section className="text-center border-b-2 border-[#6B8E23]/20 pb-20">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#556B2F] tracking-wide">
            About Vyadhihar Foods
          </h1>
          <div className="w-20 h-1 bg-[#F4A460] mx-auto mb-8 rounded-full"></div>
          <p className="text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
            Bringing nature's finest dry fruits, makhana snacks, and healthy products to your doorstep with a commitment to quality, purity, and wellness
          </p>
        </section>
        
        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-gradient-to-b from-[#F4F4F0] to-[#6B8E23]/10 rounded-2xl flex items-center justify-center border-2 border-[#6B8E23]/20">
            <div className="text-center p-8">
              <Leaf className="w-16 h-16 text-[#6B8E23] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[#556B2F] tracking-wide">Our Vision</h3>
              <p className="text-sm text-gray-600 mt-3 font-light">Pure Nature, Perfect Health</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#556B2F] tracking-wide">
              100% Natural & Premium Quality
            </h2>
            <p className="text-base text-gray-700 mb-6 leading-relaxed font-light">
              At Vyadhihar Foods, we believe that nutrition should be natural, pure, and accessible to everyone. We are committed to providing the finest quality dry fruits and healthy snacks without any compromises on quality or authenticity.
            </p>
            <p className="text-base text-gray-700 leading-relaxed font-light">
              Every product is handpicked, lab-tested, and carefully processed to maintain its nutritional value and fresh taste.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="border-t-2 border-b-2 border-[#6B8E23]/20 py-20">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-[#556B2F] tracking-wide">
            Our Core Values
          </h2>
          <div className="w-20 h-1 bg-[#F4A460] mx-auto mb-16 rounded-full"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Natural Purity', desc: '100% natural products with zero preservatives', icon: Leaf },
              { title: 'Quality First', desc: 'Lab-tested and handpicked selections', icon: Award },
              { title: 'Health Focus', desc: 'Nutrition-rich products for wellness', icon: Heart },
              { title: 'Customer Care', desc: 'Dedicated support and satisfaction guarantee', icon: Zap }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center p-6 bg-[#F4F4F0] rounded-lg border-2 border-[#6B8E23]/20 hover:border-[#6B8E23] hover:shadow-lg transition-all duration-300">
                  <Icon className="w-8 h-8 text-[#6B8E23] mx-auto mb-4" />
                  <h3 className="font-semibold text-base mb-3 text-[#556B2F] tracking-wide uppercase text-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Philosophy */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#556B2F] tracking-wide">
              Our Philosophy
            </h2>
            <p className="text-base text-gray-700 mb-6 leading-relaxed font-light">
              We source from trusted suppliers, maintain rigorous quality standards, and deliver fresh products directly to your home. Every purchase represents our dedication to your health and wellness.
            </p>
            <div className="bg-[#F4F4F0] p-6 border-l-4 border-[#6B8E23] rounded-lg">
              <h3 className="font-semibold text-sm text-[#556B2F] mb-2 uppercase tracking-widest">
                Our Promise
              </h3>
              <p className="text-gray-700 text-sm font-light">
                Fresh, pure, and nutritious dry fruits that support your healthy lifestyle. No shortcuts, no compromises – just nature's best delivered to your doorstep.
              </p>
            </div>
          </div>
          <div className="aspect-square bg-gradient-to-b from-[#6B8E23]/10 to-[#F4F4F0] rounded-2xl flex items-center justify-center border-2 border-[#6B8E23]/20">
            <div className="text-center p-8">
              <Heart className="w-16 h-16 text-[#6B8E23] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[#556B2F] tracking-wide">Wellness First</h3>
              <p className="text-sm text-gray-600 mt-3 font-light">Your Health, Our Priority</p>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="border-t-2 border-[#6B8E23]/20 pt-20">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center text-[#556B2F] tracking-wide">
            The Vyadhihar Experience
          </h2>
          <div className="w-20 h-1 bg-[#F4A460] mx-auto mb-16 rounded-full"></div>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Browse", desc: "Explore premium dry fruits" },
              { step: "02", title: "Select", desc: "Choose your favorites" },
              { step: "03", title: "Order", desc: "Quick & easy checkout" },
              { step: "04", title: "Receive", desc: "Fresh delivery to home" },
              { step: "05", title: "Enjoy", desc: "Taste pure nutrition" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 border-2 border-[#6B8E23] flex items-center justify-center mx-auto mb-4 text-[#6B8E23] font-semibold text-sm rounded-full group-hover:bg-[#6B8E23] group-hover:text-white transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="font-semibold text-sm mb-2 text-[#556B2F] tracking-wide">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Difference */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-gradient-to-b from-[#F4F4F0] to-[#6B8E23]/10 rounded-2xl flex items-center justify-center border-2 border-[#6B8E23]/20">
            <div className="text-center p-8">
              <Award className="w-16 h-16 text-[#6B8E23] mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[#556B2F] tracking-wide">Premium Standards</h3>
              <p className="text-sm text-gray-600 mt-3 font-light">Quality Assured</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#556B2F] tracking-wide">
              Why Choose Vyadhihar?
            </h2>
            <p className="text-base text-gray-700 mb-6 leading-relaxed font-light">
              In a market full of options, Vyadhihar Foods stands out for its unwavering commitment to quality, transparency, and customer satisfaction.
            </p>
            <div className="space-y-4">
              {[
                "100% natural products with no preservatives",
                "Lab-tested for purity and nutritional value",
                "Handpicked from premium suppliers",
                "Nationwide fast delivery within 3-5 days",
                "Corporate gifting solutions available",
                "30-day money-back guarantee"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start border-l-4 border-[#6B8E23] pl-4 hover:border-[#F4A460] transition-colors">
                  <p className="text-gray-700 text-sm font-light">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center border-t-2 border-[#6B8E23]/20 pt-20 pb-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[#556B2F] tracking-wide">
            Join Thousands of Happy Customers
          </h2>
          <div className="w-20 h-1 bg-[#F4A460] mx-auto mb-8 rounded-full"></div>
          <p className="text-base mb-8 text-gray-700 max-w-2xl mx-auto font-light">
            Discover the Vyadhihar difference. Premium quality, pure nutrition, and exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-[#6B8E23] hover:bg-[#556B2F] transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              Shop Now
            </a>
            <ConsultationModal />
          </div>
        </section>
      </div>
    </main>
  );
}
