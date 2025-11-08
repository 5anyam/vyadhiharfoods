'use client';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import CartIcon from "./CartIcon";
import React, { useState, useRef, useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { BiChevronDown } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { Sparkles } from "lucide-react";

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
    name: "About", 
    to: "/about",
  },
  { 
    name: "Contact", 
    to: "/contact",
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
    const phoneNumber = "917428408825";
    const message = "Hi, I'd like to enquire about corporate gifting and bulk orders.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      {/* Top Bar with Golden Gradient */}
      <div className="bg-gradient-to-r from-[#5D4E37] via-[#8B7355] to-[#5D4E37] text-white py-2.5 border-b border-[#D4A574]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-4">
              <span className="hidden sm:flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A574]" />
                <span>100% Natural & Premium Quality</span>
              </span>
              <span className="sm:hidden flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A574]" />
                Premium Quality
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href="tel:+917428408825" className="hover:text-[#D4A574] transition-colors font-medium">
                📞 +91 74284 08825
              </a>
              <button
                onClick={handleCorporateEnquiry}
                className="hidden sm:flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full hover:bg-white/20 transition-all duration-300 font-medium border border-white/20"
              >
                <IoLogoWhatsapp className="text-base" />
                <span>Bulk Orders</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header with Golden Theme */}
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b-2 border-[#D4A574]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="group">
                <img 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 transition-all duration-300 group-hover:scale-110 drop-shadow-md" 
                  src="/logo.PNG" 
                  alt='Vyadhihar Foods' 
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center" ref={menuRef}>
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => handleSubmenuMouseEnter(item.name)}
                      onMouseLeave={handleSubmenuMouseLeave}
                    >
                      <button
                        className={`text-base font-semibold transition-all duration-200 py-2 flex items-center gap-1 whitespace-nowrap ${
                          location.startsWith(item.to) 
                            ? "text-[#D4A574]" 
                            : "text-[#5D4E37] hover:text-[#D4A574]"
                        }`}
                      >
                        {item.name}
                        <BiChevronDown className={`transition-transform duration-200 ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown Menu with Golden Theme */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white shadow-2xl border-2 border-[#D4A574]/40 rounded-2xl min-w-[260px] overflow-hidden transition-all duration-300 ${
                        activeSubmenu === item.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}>
                        <div className="py-2 bg-gradient-to-b from-[#FFF8DC] to-white">
                          {item.submenu.map((subItem, idx) => (
                            <Link
                              key={subItem.name}
                              href={subItem.to}
                              className={`block px-6 py-3 text-sm transition-all duration-200 ${
                                location === subItem.to 
                                  ? 'text-[#D4A574] bg-gradient-to-r from-[#D4A574]/20 to-transparent font-semibold' 
                                  : 'text-[#5D4E37] hover:text-[#D4A574] hover:bg-[#FFF8DC] font-medium'
                              } ${idx !== 0 ? 'border-t border-[#D4A574]/10' : ''}`}
                            >
                              <span>{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t-2 border-[#D4A574]/30 px-6 py-3 bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30">
                          <Link 
                            href={item.to}
                            className="text-sm text-[#D4A574] hover:text-[#C19A6B] transition-colors font-bold flex items-center gap-1"
                          >
                            View All <span className="text-xs">→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.to}
                      className={`text-base font-semibold transition-colors duration-200 py-2 whitespace-nowrap ${
                        location === item.to 
                          ? "text-[#D4A574]" 
                          : "text-[#5D4E37] hover:text-[#D4A574]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 lg:gap-4 justify-end">
              {/* Buy Now Button - Golden Gradient */}
              <Link
                href="/shop"
                className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-5 py-2.5 rounded-full hover:from-[#C19A6B] hover:to-[#8B7355] transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105"
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
                className="lg:hidden text-[#D4A574] hover:text-[#C19A6B] transition-colors p-2"
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
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu with Golden Theme */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transition-transform duration-300 lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Mobile Menu Header - Golden Gradient */}
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#D4A574] via-[#C19A6B] to-[#8B7355]">
          <img className="h-14 drop-shadow-lg" src="/logo.PNG" alt='Vyadhihar Foods' />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#FFF8DC] p-1 transition-colors"
          >
            <HiOutlineX className="text-2xl" />
          </button>
        </div>

        {/* Mobile CTA Buttons */}
        <div className="px-5 py-4 space-y-3 bg-gradient-to-b from-[#FFF8DC] to-white border-b-2 border-[#D4A574]/20">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C19A6B] text-white px-4 py-3.5 rounded-xl hover:from-[#C19A6B] hover:to-[#8B7355] transition-all duration-300 font-bold shadow-lg hover:shadow-xl w-full"
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
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-4 py-3.5 rounded-xl hover:bg-[#20BA5A] transition-all duration-300 font-bold shadow-lg hover:shadow-xl w-full"
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
                    className={`w-full text-left px-4 py-3.5 text-base font-bold transition-all duration-200 flex items-center justify-between rounded-xl ${
                      location.startsWith(item.to) 
                        ? "text-[#D4A574] bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30" 
                        : "text-[#5D4E37] hover:text-[#D4A574] hover:bg-[#FFF8DC]"
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
                        className={`block px-4 py-3 text-sm transition-all duration-200 rounded-lg ${
                          location === subItem.to 
                            ? 'text-[#D4A574] bg-[#FFF8DC] font-bold border-l-4 border-[#D4A574]' 
                            : 'text-[#5D4E37] hover:text-[#D4A574] hover:bg-[#FFF8DC] font-medium'
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
                  className={`block px-4 py-3.5 text-base font-bold transition-all duration-200 rounded-xl ${
                    location === item.to 
                      ? "text-[#D4A574] bg-gradient-to-r from-[#FFF8DC] to-[#F5DEB3]/30" 
                      : "text-[#5D4E37] hover:text-[#D4A574] hover:bg-[#FFF8DC]"
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
