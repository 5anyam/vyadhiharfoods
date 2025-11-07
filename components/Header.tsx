'use client';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import CartIcon from "./CartIcon";

import React, { useState, useRef, useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";

const navItems = [
  { name: "Home", to: "/" },
  { 
    name: "Dry Fruits", 
    to: "/dry-fruits",
    submenu: [
      { name: "Premium Almonds", to: "/product/premium-almonds" },
      { name: "Cashew Nuts", to: "/product/cashew-nuts" },
      { name: "Walnuts", to: "/product/walnuts" },
      { name: "Pistachios", to: "/product/pistachios" },
      { name: "Raisins", to: "/product/raisins" },
      { name: "Dates", to: "/product/dates" }
    ]
  },
  { 
    name: "Makhana Snacks", 
    to: "/makhana-snacks",
    submenu: [
      { name: "Roasted Makhana", to: "/product/roasted-makhana" },
      { name: "Flavored Makhana", to: "/product/flavored-makhana" },
      { name: "Masala Makhana", to: "/product/masala-makhana" },
      { name: "Chocolate Makhana", to: "/product/chocolate-makhana" }
    ]
  },
  { 
    name: "Mixed Fresh Fruits", 
    to: "/mixed-fresh-fruits",
  },
  { 
    name: "Corporate Gifting", 
    to: "/corporate"
  }
];

export default function Header() {
  const location = usePathname();
  
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  
  const handleSubmenuMouseEnter = (menuName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveSubmenu(menuName);
  };

  const handleSubmenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
  };

  const handleCorporateEnquiry = () => {
    const phoneNumber = "919876543210"; // Replace with actual WhatsApp number
    const message = "Hi, I'd like to enquire about corporate gifting and bulk orders.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Top Bar with Contact Info */}
      <div className="bg-gradient-to-r from-[#6B8E23] to-[#556B2F] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-4">
              <span className="hidden sm:block">🌿 100% Natural & Premium Quality</span>
              <span className="sm:hidden">🌿 Premium Quality</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href="tel:+919876543210" className="hover:text-[#F4A460] transition-colors">
                📞 +91 98765 43210
              </a>
              <button
                onClick={handleCorporateEnquiry}
                className="hidden sm:flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
              >
                <IoLogoWhatsapp className="text-base" />
                <span>Bulk Orders</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md border-b-2 border-[#6B8E23]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Only - Responsive Sizing */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="group">
                <img 
                  className="h-8 sm:h-10 md:h-12 lg:h-14 transition-transform duration-300 group-hover:scale-105" 
                  src="/logo.PNG" 
                  alt='Vyadhihar Foods' 
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center" ref={menuRef}>
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => handleSubmenuMouseEnter(item.name)}
                      onMouseLeave={handleSubmenuMouseLeave}
                    >
                      <button
                        className={`text-base font-medium transition-all duration-200 py-2 flex items-center gap-1 whitespace-nowrap ${
                          location.startsWith(item.to) 
                            ? "text-[#6B8E23]" 
                            : "text-gray-700 hover:text-[#6B8E23]"
                        }`}
                      >
                        {item.name}
                        <BiChevronDown className={`transition-transform duration-200 ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white shadow-xl border-2 border-[#6B8E23]/20 rounded-lg min-w-[240px] overflow-hidden transition-all duration-200 ${
                        activeSubmenu === item.name ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}>
                        <div className="py-2">
                          {item.submenu.map((subItem, idx) => (
                            <Link
                              key={subItem.name}
                              href={subItem.to}
                              className={`block px-5 py-3 text-sm transition-colors duration-200 ${
                                location === subItem.to 
                                  ? 'text-[#6B8E23] bg-[#F4A460]/10' 
                                  : 'text-gray-700 hover:text-[#6B8E23] hover:bg-[#F4A460]/10'
                              } ${idx !== 0 ? 'border-t border-gray-100' : ''}`}
                            >
                              <span className="font-medium">{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t-2 border-[#6B8E23]/20 px-5 py-3 bg-[#F4A460]/5">
                          <Link 
                            href={item.to}
                            className="text-sm text-[#6B8E23] hover:text-[#556B2F] transition-colors font-medium"
                          >
                            View All →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.to}
                      className={`text-base font-medium transition-colors duration-200 py-2 whitespace-nowrap ${
                        location === item.to 
                          ? "text-[#6B8E23]" 
                          : "text-gray-700 hover:text-[#6B8E23]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-end">
              
              

             

              {/* Buy Now Button - Desktop */}
              <Link
                href="/shop"
                className="hidden lg:flex items-center gap-2 bg-[#6B8E23] text-white px-4 xl:px-5 py-2 xl:py-2.5 rounded-full hover:bg-[#556B2F] transition-all duration-300 font-medium shadow-lg hover:shadow-xl text-sm xl:text-base"
              >
                <FiShoppingBag className="text-lg" />
                <span>Buy Now</span>
              </Link>

              {/* Cart Icon */}
              <div className="flex items-center">
                <CartIcon />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-[#6B8E23] hover:text-[#556B2F] transition-colors p-2"
              >
                {mobileMenuOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenuAlt3 className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transition-transform duration-300 lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#6B8E23] to-[#556B2F]">
          <img className="h-12" src="/logo.PNG" alt='Vyadhihar Foods' />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#F4A460] p-1 transition-colors"
          >
            <HiOutlineX className="text-2xl" />
          </button>
        </div>

        {/* Mobile CTA Buttons */}
        <div className="px-5 py-4 space-y-3 bg-[#F4A460]/5 border-b-2 border-[#6B8E23]/10">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 bg-[#6B8E23] text-white px-4 py-3 rounded-lg hover:bg-[#556B2F] transition-all duration-300 font-medium shadow-md w-full"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiShoppingBag className="text-lg" />
            <span>Buy Now</span>
          </Link>
          
          <button
            onClick={() => {
              handleCorporateEnquiry();
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#20BA5A] transition-all duration-300 font-medium shadow-md w-full"
          >
            <IoLogoWhatsapp className="text-xl" />
            <span>Corporate Enquiry</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col p-5 space-y-1 h-full overflow-y-auto pb-24">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div>
                  <button
                    className={`w-full text-left px-4 py-3 text-base font-medium transition-colors flex items-center justify-between rounded-lg ${
                      location.startsWith(item.to) 
                        ? "text-[#6B8E23] bg-[#F4A460]/10" 
                        : "text-gray-700 hover:text-[#6B8E23] hover:bg-[#F4A460]/5"
                    }`}
                    onClick={() => setMobileActiveSubmenu(mobileActiveSubmenu === item.name ? null : item.name)}
                  >
                    {item.name}
                    <BiChevronDown className={`transition-transform duration-200 ${mobileActiveSubmenu === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`ml-4 transition-all duration-300 overflow-hidden ${
                    mobileActiveSubmenu === item.name ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.to}
                        className={`block px-4 py-2.5 text-sm transition-colors rounded-lg ${
                          location === subItem.to 
                            ? 'text-[#6B8E23] bg-[#F4A460]/10 font-medium' 
                            : 'text-gray-600 hover:text-[#6B8E23] hover:bg-[#F4A460]/5'
                        }`}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileActiveSubmenu(null);
                        }}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.to}
                  className={`block px-4 py-3 text-base font-medium transition-colors rounded-lg ${
                    location === item.to 
                      ? "text-[#6B8E23] bg-[#F4A460]/10" 
                      : "text-gray-700 hover:text-[#6B8E23] hover:bg-[#F4A460]/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
