import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { brandInfo } from '../data/mock';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('home')}
            className="font-serif text-2xl md:text-3xl text-rose-400 hover:text-rose-500 transition-colors duration-300"
          >
            {brandInfo.name}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-rose-400 transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-gray-700 hover:text-rose-400 transition-colors duration-300"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-rose-400 transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}\n              className="bg-rose-400 text-white px-6 py-2 rounded-full hover:bg-rose-500 transition-all duration-300 hover:shadow-lg"
            >
              Send Message
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-rose-400 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg">
            <div className="flex flex-col gap-4 px-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-rose-400 transition-colors text-left py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-gray-700 hover:text-rose-400 transition-colors text-left py-2"
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-rose-400 transition-colors text-left py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-rose-400 text-white px-6 py-2 rounded-full hover:bg-rose-500 transition-all text-center"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
