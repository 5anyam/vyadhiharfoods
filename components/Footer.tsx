import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white via-[#FFF8DC] to-[#F5DEB3]/30 text-gray-900 border-t-2 border-[#D4A574]/30">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <img className="h-24 drop-shadow-lg" src="/vyadhihar-logo.png" alt="Vyadhihar Foods" />
            </div>
            <p className="text-sm leading-relaxed text-[#5D4E37] font-light mb-6">
              Premium quality superfood mixtures, roasted makhana snacks, and fresh fruit boxes delivered daily. 100% natural and healthy.
            </p>
            
            {/* Social Media Icons - Golden Theme */}
            <div className="flex gap-3">
              <Link 
                target="_blank"
                href="https://www.facebook.com/vyadhiharfoods" 
                className="p-3 bg-gradient-to-br from-[#D4A574]/10 to-[#C19A6B]/10 border-2 border-[#D4A574]/30 hover:bg-gradient-to-br hover:from-[#D4A574] hover:to-[#C19A6B] hover:text-white hover:border-[#D4A574] transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:scale-110"
              >
                <FaFacebookF className="text-sm" />
              </Link>
              <Link 
                target="_blank"
                href="https://x.com/vyadhiharfoods" 
                className="p-3 bg-gradient-to-br from-[#D4A574]/10 to-[#C19A6B]/10 border-2 border-[#D4A574]/30 hover:bg-gradient-to-br hover:from-[#D4A574] hover:to-[#C19A6B] hover:text-white hover:border-[#D4A574] transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:scale-110"
              >
                <FaTwitter className="text-sm" />
              </Link>
              <Link 
                target="_blank"
                href="https://www.instagram.com/vyadhiharfoods" 
                className="p-3 bg-gradient-to-br from-[#D4A574]/10 to-[#C19A6B]/10 border-2 border-[#D4A574]/30 hover:bg-gradient-to-br hover:from-[#D4A574] hover:to-[#C19A6B] hover:text-white hover:border-[#D4A574] transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:scale-110"
              >
                <FaInstagram className="text-sm" />
              </Link>
              <Link 
                target="_blank"
                href="https://www.linkedin.com/company/vyadhiharfoods" 
                className="p-3 bg-gradient-to-br from-[#D4A574]/10 to-[#C19A6B]/10 border-2 border-[#D4A574]/30 hover:bg-gradient-to-br hover:from-[#D4A574] hover:to-[#C19A6B] hover:text-white hover:border-[#D4A574] transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:scale-110"
              >
                <FaLinkedinIn className="text-sm" />
              </Link>
              <Link 
                target="_blank"
                href="https://wa.me/917428408825" 
                className="p-3 bg-[#25D366]/10 border-2 border-[#25D366]/30 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 rounded-lg shadow-sm hover:shadow-md hover:scale-110"
              >
                <FaWhatsapp className="text-sm" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-bold text-[#5D4E37] mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-[#D4A574] to-[#C19A6B] rounded-full"></span>
              Our Products
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> All Products
                </Link>
              </li>
              <li>
                <Link href="/product/superfood-fusion" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> Superfood Fusion Mix
                </Link>
              </li>
              <li>
                <Link href="/product/foxnut-makhana" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> Roasted Makhana
                </Link>
              </li>
              <li>
                <Link href="/product/fruit-box" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#25D366] group-hover:translate-x-1 transition-transform">›</span> Fresh Fruit Boxes
                </Link>
              </li>
              <li>
                <Link href="/founder-story" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-bold text-[#5D4E37] mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-[#D4A574] to-[#C19A6B] rounded-full"></span>
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns-and-refunds-policy" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-[#5D4E37] hover:text-[#D4A574] transition-colors font-medium flex items-center gap-2 group">
                  <span className="text-[#D4A574] group-hover:translate-x-1 transition-transform">›</span> Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-bold text-[#5D4E37] mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-[#D4A574] to-[#C19A6B] rounded-full"></span>
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-[#D4A574] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a 
                  href="mailto:support@vyadhiharfoods.com" 
                  className="text-sm text-[#5D4E37] hover:text-[#D4A574] font-medium transition-colors break-all"
                >
                  support@vyadhiharfoods.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-[#D4A574] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a 
                  href="tel:+917428408825" 
                  className="text-sm text-[#5D4E37] hover:text-[#D4A574] font-medium transition-colors"
                >
                  +91 742 840 8825
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <FaWhatsapp className="w-5 h-5 text-[#25D366] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a 
                  href="https://wa.me/917428408825?text=Hi,%20I%20want%20to%20enquire%20about%20your%20products" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#5D4E37] hover:text-[#D4A574] font-medium transition-colors"
                >
                  WhatsApp for Enquiries
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-[#D4A574] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-[#5D4E37] font-light leading-relaxed">
                  Delhi NCR, India
                </span>
              </li>
            </ul>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t-2 border-[#D4A574]/20">
              <p className="text-xs text-[#5D4E37] mb-3 font-bold uppercase tracking-wide">We Accept:</p>
              <div className="flex items-center gap-2">
                <img className="h-8 opacity-90 hover:opacity-100 transition-opacity" src="/badges.png" alt="Payment methods" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section - Golden Gradient */}
      <div className="bg-gradient-to-r from-[#D4A574]/10 via-[#FFF8DC] to-[#D4A574]/10 border-t-2 border-[#D4A574]/30">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-[#5D4E37] mb-2 flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="w-5 h-5 text-[#D4A574]" />
                Stay Healthy with Us
              </h3>
              <p className="text-sm text-[#5D4E37] font-light">
                Subscribe to get special offers, free giveaways, and health tips.
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 text-sm border-2 border-[#D4A574]/40 rounded-xl focus:border-[#D4A574] focus:outline-none bg-white min-w-[250px] shadow-sm focus:shadow-md transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white text-sm font-bold rounded-xl hover:from-[#C19A6B] hover:to-[#8B7355] transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Premium Design */}
      <div className="border-t-2 border-[#D4A574]/30 bg-gradient-to-r from-white via-[#FFF8DC] to-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#5D4E37] font-medium">
            <div className="text-center sm:text-left">
              © {new Date().getFullYear()} Vyadhihar Foods. All rights reserved. | Developed by{" "}
              <Link href="https://www.proshala.com" className="text-[#D4A574] hover:text-[#C19A6B] font-bold transition-colors">
                Proshala Tech
              </Link>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-[#5D4E37] font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A574]" /> 100% Natural
              </span>
              <span className="text-[#D4A574]">- </span>
              <span className="flex items-center gap-1 text-[#5D4E37] font-semibold">
                ✓ Premium Quality
              </span>
              <span className="text-[#D4A574]">- </span>
              <span className="flex items-center gap-1 text-[#5D4E37] font-semibold">
                🚚 Fast Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
