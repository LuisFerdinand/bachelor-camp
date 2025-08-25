'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isBookMenuOpen, setIsBookMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleBookMenu = () => setIsBookMenuOpen(!isBookMenuOpen);
  
  // Close menus when clicking outside
  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsBookMenuOpen(false);
  };

  // Add scroll effect with debounce
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/camp', label: 'Camp' },
    { href: '/special-program', label: 'Programs' },
    { href: '/about-us', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact-us', label: 'Contact' },
  ];

  // Determine if header should have solid styling (scrolled OR mobile menu open)
  const shouldUseSolidStyling = isScrolled || isMenuOpen;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out py-4 ${
      shouldUseSolidStyling 
        ? 'bg-white backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-brand-500 to-accent-500"></div>
            <span className={`text-xl font-bold transition-all duration-500 ease-in-out ${
              shouldUseSolidStyling ? 'text-gray-900' : 'text-white'
            }`}>
              EduCamp
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`font-medium transition-all duration-500 ease-in-out ${
                  pathname === link.href 
                    ? (shouldUseSolidStyling ? 'text-brand-600' : 'text-accent-300') 
                    : (shouldUseSolidStyling ? 'text-gray-700 hover:text-brand-600' : 'text-white/90 hover:text-white')
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Book Menu & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {/* Book Menu - Desktop */}
            <div className="hidden lg:block relative">
              <button 
                onClick={toggleBookMenu}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-500 ease-in-out ${
                  shouldUseSolidStyling 
                    ? 'bg-brand-600 text-white hover:bg-brand-700' 
                    : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                }`}
              >
                <span className="font-medium">Book Now</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 transition-transform duration-200 ${isBookMenuOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Book Dropdown */}
              {isBookMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-60">
                  <div className="py-2">
                    <Link 
                      href="/booking" 
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Book a Program</span>
                      </div>
                    </Link>
                    <Link 
                      href="/booking" 
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Book Accommodation</span>
                      </div>
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    <Link 
                      href="/login" 
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign In</span>
                      </div>
                    </Link>
                    <Link 
                      href="/register" 
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span>Sign Up</span>
                      </div>
                    </Link>
                    <Link 
                      href="/profile" 
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-brand-600 transition-colors duration-200"
                      onClick={closeMenus}
                    >
                      <div className="flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>My Profile</span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button 
              className={`lg:hidden p-2 rounded-lg transition-all duration-500 ease-in-out ${
                shouldUseSolidStyling ? 'text-gray-700' : 'text-white'
              }`}
              onClick={toggleMenu}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`lg:hidden bg-white/95 backdrop-blur-md overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-4">
          <nav className={`flex flex-col space-y-1 transition-all duration-500 ease-in-out delay-150 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            {navLinks.map((link, index) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`px-4 py-3 rounded-lg transition-all duration-300 ease-in-out ${
                  pathname === link.href 
                    ? 'text-brand-600 bg-brand-50' 
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                } ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                style={{
                  transitionDelay: isMenuOpen ? `${200 + (index * 50)}ms` : '0ms'
                }}
                onClick={closeMenus}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Book Section */}
            <div className={`border-t border-gray-200 mt-4 pt-4 transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} style={{ transitionDelay: isMenuOpen ? '500ms' : '0ms' }}>
              <div className="space-y-1">
                <Link 
                  href="/booking" 
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                  style={{ transitionDelay: isMenuOpen ? '550ms' : '0ms' }}
                  onClick={closeMenus}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Book a Program</span>
                </Link>
                <Link 
                  href="/booking" 
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                  style={{ transitionDelay: isMenuOpen ? '600ms' : '0ms' }}
                  onClick={closeMenus}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Book Accommodation</span>
                </Link>
                <div className="border-t border-gray-200 my-2"></div>
                <Link 
                  href="/login" 
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                  style={{ transitionDelay: isMenuOpen ? '650ms' : '0ms' }}
                  onClick={closeMenus}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign In</span>
                </Link>
                <Link 
                  href="/register" 
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                  style={{ transitionDelay: isMenuOpen ? '700ms' : '0ms' }}
                  onClick={closeMenus}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Sign Up</span>
                </Link>
                <Link 
                  href="/profile" 
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-brand-600 hover:bg-gray-50 rounded-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                  style={{ transitionDelay: isMenuOpen ? '750ms' : '0ms' }}
                  onClick={closeMenus}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>My Profile</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;