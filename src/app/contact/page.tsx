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
        <div className="inline-flex items-center bg-[#D4A574]/10 text-[#D4A574] px-6 py-2 rounded-full text-sm font-medium mb-6 border-2 border-[#D4A574]/20">
          <MessageCircle className="w-4 h-4 mr-2" />
          We&apos;re Here to Help
        </div>
        <h1 className="text-5xl font-bold mb-6 text-[#5D4E37]">Get in Touch</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Have questions about our premium superfood mixes, roasted makhana, or fresh fruit boxes? We&apos;d love to hear from you.
        </p>
      </section>

      {/* Contact Information Cards */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#D4A574]/20 hover:border-[#D4A574]">
          <div className="w-16 h-16 bg-[#D4A574]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#D4A574]" />
          </div>
          <h3 className="text-xl font-semibold text-[#5D4E37] mb-4 text-center">Email Us</h3>
          <p className="text-gray-600 text-center mb-4 text-sm">Send us an email and we&apos;ll respond within 24 hours</p>
          <div className="text-center">
            <a href="mailto:support@vyadhiharfoods.com" className="text-[#D4A574] hover:text-[#C19A6B] font-semibold text-lg transition-colors">
              support@vyadhiharfoods.com
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#C19A6B]/20 hover:border-[#C19A6B]">
          <div className="w-16 h-16 bg-[#C19A6B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Phone className="w-8 h-8 text-[#C19A6B]" />
          </div>
          <h3 className="text-xl font-semibold text-[#5D4E37] mb-4 text-center">Call Us</h3>
          <p className="text-gray-600 text-center mb-4 text-sm">Speak directly with our customer care team</p>
          <div className="text-center">
            <a href="tel:+917428408825" className="text-[#C19A6B] hover:text-[#D4A574] font-semibold text-lg transition-colors">
              +91 742 840 8825
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-[#D4A574]/20 hover:border-[#D4A574]">
          <div className="w-16 h-16 bg-[#D4A574]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-8 h-8 text-[#D4A574]" />
          </div>
          <h3 className="text-xl font-semibold text-[#5D4E37] mb-4 text-center">Visit Us</h3>
          <p className="text-gray-600 text-center mb-4 text-sm">Online store serving all of India</p>
          <div className="text-center">
            <address className="text-[#D4A574] not-italic font-medium text-sm leading-relaxed">
              Delhi NCR, India<br />
              Nationwide Delivery
            </address>
          </div>
        </div>
      </section>

      {/* Contact Form and Information Section */}
      <section className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-gradient-to-br from-[#FFF8DC] to-[#F5DEB3]/30 p-8 rounded-2xl border-2 border-[#D4A574]/20">
          <h2 className="text-3xl font-bold mb-6 text-[#5D4E37]">Send us a Message</h2>
          <p className="text-gray-700 mb-8">
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5D4E37] mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#D4A574]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-colors text-sm"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5D4E37] mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#D4A574]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-colors text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#5D4E37] mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#D4A574]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-colors text-sm"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5D4E37] mb-2">
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-[#D4A574]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-colors text-sm"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="products">Product Information</option>
                  <option value="fruitbox">Fresh Fruit Box Enquiry</option>
                  <option value="bulk">Bulk Orders</option>
                  <option value="support">Customer Support</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5D4E37] mb-2">
                <Send className="w-4 h-4 inline mr-2" />
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 border-2 border-[#D4A574]/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A574] focus:border-[#D4A574] transition-colors text-sm resize-none"
                placeholder="Tell us about your inquiry, product preferences, or bulk order requirements..."
                required
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#D4A574] to-[#C19A6B] hover:from-[#C19A6B] hover:to-[#8B7355] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
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
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#D4A574]/20">
            <h3 className="text-2xl font-bold mb-6 text-[#5D4E37]">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#D4A574]/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#D4A574]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#5D4E37] mb-2">Service Area</h4>
                  <address className="text-gray-700 not-italic leading-relaxed text-sm">
                    Delhi NCR, India<br />
                    Nationwide Delivery Available<br />
                    Fast Shipping Across India
                  </address>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#C19A6B]/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#C19A6B]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#5D4E37] mb-2">Business Hours</h4>
                  <div className="text-gray-700 space-y-1 text-sm">
                    <p>Monday - Saturday: 9:00 AM - 7:00 PM IST</p>
                    <p>Sunday: 10:00 AM - 5:00 PM IST</p>
                    <p className="text-[#D4A574] font-semibold mt-2">WhatsApp available 24/7</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <ShoppingCart className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#5D4E37] mb-2">Fresh Fruit Boxes</h4>
                  <div className="text-gray-700 space-y-1 text-sm">
                    <p>Daily fresh deliveries available</p>
                    <p>Contact for subscription plans</p>
                    <p><a href="https://wa.me/917428408825" className="text-[#25D366] font-semibold hover:text-[#20BA5A]">WhatsApp for enquiries →</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gradient-to-br from-[#D4A574]/10 to-[#C19A6B]/10 h-64 rounded-2xl flex items-center justify-center border-2 border-[#D4A574]/20">
            <div className="text-center">
              <Leaf className="w-16 h-16 text-[#D4A574] mx-auto mb-4" />
              <h4 className="text-xl font-bold text-[#5D4E37] mb-2">Serving All of India</h4>
              <p className="text-gray-600">Delhi NCR Based</p>
              <p className="text-sm text-gray-500 mt-2">Fast Nationwide Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30 p-10 rounded-2xl border-2 border-[#D4A574]/20">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#5D4E37]">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#D4A574]">
              <h3 className="font-semibold text-base mb-2 text-[#5D4E37]">How quickly will I receive a response?</h3>
              <p className="text-gray-700 text-sm">We typically respond to emails within 24 hours. WhatsApp messages are answered within a few hours during business hours.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#D4A574]">
              <h3 className="font-semibold text-base mb-2 text-[#5D4E37]">Can I get fresh fruit boxes daily?</h3>
              <p className="text-gray-700 text-sm">Yes! Contact us via WhatsApp to set up a daily or weekly fresh fruit box subscription for your office or home.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#C19A6B]">
              <h3 className="font-semibold text-base mb-2 text-[#5D4E37]">What&apos;s your return policy?</h3>
              <p className="text-gray-700 text-sm">We accept returns only if packaging is damaged or seal is broken upon delivery. Fresh fruit boxes must be reported within 2 hours.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#C19A6B]">
              <h3 className="font-semibold text-base mb-2 text-[#5D4E37]">Do you deliver nationwide?</h3>
              <p className="text-gray-700 text-sm">Yes, we deliver across India. Standard products ship within 3-5 days. Fresh fruit boxes available in select cities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-[#5D4E37] via-[#8B7355] to-[#5D4E37] p-12 rounded-2xl text-white shadow-2xl">
        <Leaf className="w-12 h-12 mx-auto mb-4 opacity-80" />
        <h2 className="text-4xl font-bold mb-4">Ready to Experience Premium Quality?</h2>
        <p className="text-xl mb-8 text-white/90">
          Contact us today and discover why customers trust Vyadhihar Foods for quality and freshness.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+917428408825"
            className="bg-white text-[#5D4E37] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            📞 Call Now
          </a>
          <a
            href="https://wa.me/917428408825"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            💬 WhatsApp Us
          </a>
          <a
            href="mailto:support@vyadhiharfoods.com"
            className="bg-[#D4A574] hover:bg-[#C19A6B] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ✉️ Email Us
          </a>
        </div>
      </section>
    </main>
  );
}

