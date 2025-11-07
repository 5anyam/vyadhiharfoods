import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-[#F4F4F0] text-gray-900 border-t-2 border-[#6B8E23]/20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <img className="h-20" src="/logo.PNG" alt="Vyadhihar Foods" />
            </div>
            <p className="text-sm leading-relaxed text-gray-700 font-light mb-6">
              Premium quality dry fruits, makhana snacks, and mixed fresh fruits delivered with care. 100% natural and healthy.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <Link 
                target="_blank"
                href="https://www.facebook.com/vyadhiharfoods" 
                className="p-2.5 bg-[#6B8E23]/10 border border-[#6B8E23]/30 hover:bg-[#6B8E23] hover:text-white transition-all duration-300 rounded"
              >
                <FaFacebookF className="text-sm" />
              </Link>
              <Link 
                target="_blank"
                href="https://x.com/vyadhiharfoods" 
                className="p-2.5 bg-[#6B8E23]/10 border border-[#6B8E23]/30 hover:bg-[#6B8E23] hover:text-white transition-all duration-300 rounded"
              >
                <FaTwitter className="text-sm" />
              </Link>
              <Link 
                target="_blank"
                href="https://www.instagram.com/vyadhiharfoods" 
                className="p-2.5 bg-[#6B8E23]/10 border border-[#6B8E23]/30 hover:bg-[#6B8E23] hover:text-white transition-all duration-300 rounded"
              >
                <FaInstagram className="text-sm" />
              </Link>
              <Link 
                target="_blank"
                href="https://www.linkedin.com/company/vyadhiharfoods" 
                className="p-2.5 bg-[#6B8E23]/10 border border-[#6B8E23]/30 hover:bg-[#6B8E23] hover:text-white transition-all duration-300 rounded"
              >
                <FaLinkedinIn className="text-sm" />
              </Link>
              <Link 
                target="_blank"
                href="https://wa.me/919876543210" 
                className="p-2.5 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-all duration-300 rounded"
              >
                <FaWhatsapp className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-[#556B2F] mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> Home
                </Link>
              </li>
              <li>
                <Link href="/dry-fruits" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> Dry Fruits
                </Link>
              </li>
              <li>
                <Link href="/makhana-snacks" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> Makhana Snacks
                </Link>
              </li>
              <li>
                <Link href="/mixed-fresh-fruits" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> Mixed Fresh Fruits
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> Corporate Gifting
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-[#556B2F] mb-6 uppercase tracking-wider">
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns-and-refunds-policy" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-sm text-gray-700 hover:text-[#6B8E23] transition-colors font-light flex items-center gap-2">
                  <span className="text-[#F4A460]">›</span> Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-[#556B2F] mb-6 uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#6B8E23] mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:care@vyadhiharfoods.com" 
                  className="text-sm text-gray-700 hover:text-[#6B8E23] font-light transition-colors"
                >
                  care@vyadhiharfoods.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#6B8E23] mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+919876543210" 
                  className="text-sm text-gray-700 hover:text-[#6B8E23] font-light transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp className="w-5 h-5 text-[#25D366] mt-0.5 flex-shrink-0" />
                <a 
                  href="https://wa.me/919876543210?text=Hi,%20I%20want%20to%20enquire%20about%20bulk%20orders" 
                  target="_blank"
                  className="text-sm text-gray-700 hover:text-[#6B8E23] font-light transition-colors"
                >
                  WhatsApp for Bulk Orders
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#6B8E23] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700 font-light leading-relaxed">
                  123 Health Street, Organic Market, New Delhi - 110001, India
                </span>
              </li>
            </ul>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-[#6B8E23]/20">
              <p className="text-xs text-gray-600 mb-3 font-medium">We Accept:</p>
              <div className="flex items-center gap-2">
                <img className="h-8 opacity-80" src="/badges.png" alt="Payment methods" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#6B8E23]/5 border-t border-[#6B8E23]/20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-[#556B2F] mb-2">
                🌿 Stay Healthy with Us
              </h3>
              <p className="text-sm text-gray-600 font-light">
                Subscribe to get special offers, free giveaways, and health tips.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 text-sm border-2 border-[#6B8E23]/30 rounded-lg focus:border-[#6B8E23] focus:outline-none bg-white min-w-[250px]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#6B8E23] text-white text-sm font-medium rounded-lg hover:bg-[#556B2F] transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t-2 border-[#6B8E23]/20 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-700 font-light">
            <div className="text-center sm:text-left">
              © {new Date().getFullYear()} Vyadhihar Foods. All rights reserved. | Developed by{" "}
              <Link href="https://www.proshala.com" className="text-[#6B8E23] hover:text-[#556B2F] font-medium transition-colors">
                Proshala Tech
              </Link>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-gray-500">🌿 100% Natural</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">✓ Premium Quality</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">🚚 Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
