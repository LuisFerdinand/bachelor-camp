'use client'

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 bg-background-primary shadow-soft">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          YourLogo
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-text-primary hover:text-primary-600 transition-colors">Home</Link>
          <Link href="/camp" className="text-text-primary hover:text-primary-600 transition-colors">Camp</Link>
          <Link href="/special-program" className="text-text-primary hover:text-primary-600 transition-colors">Programs</Link>
          <Link href="/about-us" className="text-text-primary hover:text-primary-600 transition-colors">About</Link>
          <Link href="/blog" className="text-text-primary hover:text-primary-600 transition-colors">Blog</Link>
          <Link href="/contact-us" className="text-text-primary hover:text-primary-600 transition-colors">Contact</Link>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background-secondary py-4 px-4 shadow-inner">
          <nav className="flex flex-col space-y-3">
            <Link href="/" className="text-text-primary hover:text-primary-600 transition-colors">Home</Link>
            <Link href="/camp" className="text-text-primary hover:text-primary-600 transition-colors">Camp</Link>
            <Link href="/special-program" className="text-text-primary hover:text-primary-600 transition-colors">Programs</Link>
            <Link href="/about-us" className="text-text-primary hover:text-primary-600 transition-colors">About</Link>
            <Link href="/blog" className="text-text-primary hover:text-primary-600 transition-colors">Blog</Link>
            <Link href="/contact-us" className="text-text-primary hover:text-primary-600 transition-colors">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;