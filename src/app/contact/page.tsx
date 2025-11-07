'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, User, CheckCircle, Leaf, ShoppingCart } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Handle form submission logic here (send to email service)
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <main className="max-w-7xl mt-24 lg:mt-0 mx-auto px-4 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <div className="inline-flex items-center bg-[#6B8E23]/10 text-[#6B8E23] px-6 py-2 rounded-full text-sm font-medium mb-6 border border-[#6B8E23]/20">
          <MessageCircle className="w-4 h-4 mr-2" />
          We&apos;re Here to Help
        </div>
        <h1 className="text-5xl font-bold mb-6 text-[#556B2F]">Get in Touch</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Have questions about our premium dry fruits and healthy snacks? We&apos;d love to hear from you. 
          Reach out to us and discover the Vyadhihar difference.
        </p>
      </section>

      {/* Contact Information Cards */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#6B8E23]/20 hover:border-[#6B8E23]">
          <div className="w-16 h-16 bg-[#6B8E23]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#6B8E23]" />
          </div>
          <h3 className="text-xl font-semibold text-[#556B2F] mb-4 text-center">Email Us</h3>
          <p className="text-gray-600 text-center mb-4 text-sm">Send us an email and we&apos;ll respond within 24 hours</p>
          <div className="text-center">
            <a href="mailto:care@vyadhiharfoods.com" className="text-[#6B8E23] hover:text-[#556B2F] font-semibold text-lg transition-colors">
              care@vyadhiharfoods.com
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#F4A460]/20 hover:border-[#F4A460]">
          <div className="w-16 h-16 bg-[#F4A460]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-[#F4A460]" />
          </div>
          <h3 className="text-xl font-semibold text-[#556B2F] mb-4 text-center">Call Us</h3>
          <p className="text-gray-600 text-center mb-4 text-sm">Speak directly with our customer care team</p>
          <div className="text-center">
            <a href="tel:+919876543210" className="text-[#F4A460] hover:text-[#D4863D] font-semibold text-lg transition-colors">
              +91 98765 43210
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#6B8E23]/20 hover:border-[#6B8E23]">
          <div className="w-16 h-16 bg-[#6B8E23]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-[#6B8E23]" />
          </div>
          <h3 className="text-xl font-semibold text-[#556B2F] mb-4 text-center">Visit Us</h3>
          <p className="text-gray-600 text-center mb-4 text-sm">Come visit our office for personal consultation</p>
          <div className="text-center">
            <address className="text-[#6B8E23] not-italic font-medium text-sm leading-relaxed">
              123 Health Street,<br />
              Organic Market, New Delhi - 110001
            </address>
          </div>
        </div>
      </section>

      {/* Contact Form and Information Section */}
      <section className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-gradient-to-br from-[#F4F4F0] to-[#6B8E23]/5 p-8 rounded-2xl border-2 border-[#6B8E23]/20">
          <h2 className="text-3xl font-bold mb-6 text-[#556B2F]">Send us a Message</h2>
          <p className="text-gray-700 mb-8">
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#556B2F] mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#6B8E23]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E23] focus:border-[#6B8E23] transition-colors text-sm"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#556B2F] mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#6B8E23]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E23] focus:border-[#6B8E23] transition-colors text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#556B2F] mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#6B8E23]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E23] focus:border-[#6B8E23] transition-colors text-sm"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#556B2F] mb-2">
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#6B8E23]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E23] focus:border-[#6B8E23] transition-colors text-sm"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="products">Product Information</option>
                  <option value="bulk">Bulk/Corporate Orders</option>
                  <option value="support">Customer Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#556B2F] mb-2">
                <Send className="w-4 h-4 inline mr-2" />
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 border-2 border-[#6B8E23]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E23] focus:border-[#6B8E23] transition-colors text-sm resize-none"
                placeholder="Tell us about your inquiry, product preferences, or bulk order requirements..."
                required
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#6B8E23] hover:bg-[#556B2F] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Message Sent Successfully!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>

        {/* Office Information */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#6B8E23]/20">
            <h3 className="text-2xl font-bold mb-6 text-[#556B2F]">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#6B8E23]/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#6B8E23]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#556B2F] mb-2">Address</h4>
                  <address className="text-gray-700 not-italic leading-relaxed text-sm">
                    123 Health Street,<br />
                    Organic Market,<br />
                    New Delhi - 110001, India
                  </address>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#F4A460]/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#F4A460]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#556B2F] mb-2">Business Hours</h4>
                  <div className="text-gray-700 space-y-1 text-sm">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#6B8E23]/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <ShoppingCart className="w-6 h-6 text-[#6B8E23]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#556B2F] mb-2">Bulk Orders</h4>
                  <div className="text-gray-700 space-y-1 text-sm">
                    <p>Corporate & Wholesale inquiries welcome</p>
                    <p>Special rates for bulk purchases</p>
                    <p><a href="https://wa.me/919876543210" className="text-[#6B8E23] font-semibold hover:text-[#556B2F]">WhatsApp for bulk orders →</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gradient-to-br from-[#6B8E23]/10 to-[#F4A460]/10 h-64 rounded-2xl flex items-center justify-center border-2 border-[#6B8E23]/20">
            <div className="text-center">
              <Leaf className="w-16 h-16 text-[#6B8E23] mx-auto mb-4" />
              <h4 className="text-xl font-bold text-[#556B2F] mb-2">Find Us Here</h4>
              <p className="text-gray-600">New Delhi, India</p>
              <p className="text-sm text-gray-500 mt-2">Fast Delivery Across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-r from-[#F4F4F0] to-[#6B8E23]/5 p-10 rounded-2xl border-2 border-[#6B8E23]/20">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#556B2F]">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#6B8E23]">
              <h3 className="font-semibold text-base mb-2 text-[#556B2F]">How quickly will I receive a response?</h3>
              <p className="text-gray-700 text-sm">We typically respond to emails within 24 hours. Phone calls are answered during business hours.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#6B8E23]">
              <h3 className="font-semibold text-base mb-2 text-[#556B2F]">Do you offer corporate gifting?</h3>
              <p className="text-gray-700 text-sm">Yes! We specialize in premium corporate gifting hampers. Contact us for bulk orders and special pricing.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#F4A460]">
              <h3 className="font-semibold text-base mb-2 text-[#556B2F]">What&apos;s your return policy?</h3>
              <p className="text-gray-700 text-sm">We offer a 30-day money-back guarantee on all products. Your satisfaction is our priority.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#F4A460]">
              <h3 className="font-semibold text-base mb-2 text-[#556B2F]">Do you deliver nationwide?</h3>
              <p className="text-gray-700 text-sm">Yes, we deliver across India within 3-5 working days. Free shipping on orders above ₹999.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-[#6B8E23] to-[#556B2F] p-12 rounded-2xl text-white shadow-2xl">
        <Leaf className="w-12 h-12 mx-auto mb-4 opacity-80" />
        <h2 className="text-4xl font-bold mb-4">Ready to Experience Premium Dry Fruits?</h2>
        <p className="text-xl mb-8 text-white/90">
          Contact us today and discover why 10,000+ customers trust Vyadhihar Foods for quality and freshness.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+919876543210"
            className="bg-white text-[#6B8E23] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            📞 Call Now
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            💬 WhatsApp Us
          </a>
          <a
            href="mailto:care@vyadhiharfoods.com"
            className="bg-[#F4A460] hover:bg-[#D4863D] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ✉️ Email Us
          </a>
        </div>
      </section>
    </main>
  );
}
