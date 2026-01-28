import React from 'react';
import { Heart, Instagram } from 'lucide-react';
import { brandInfo } from '../data/mock';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-pink-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-gray-800 mb-3">
              {brandInfo.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Handcrafted creations made with love. Every piece tells a story.
            </p>
            <a
              href={brandInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-rose-400 hover:text-rose-500 transition-colors"
            >
              <Instagram size={20} />
              <span>@{brandInfo.instagram}</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-rose-400 transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-rose-400 transition-colors text-left"
              >
                Gallery
              </button>
              <button
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-rose-400 transition-colors text-left"
              >
                About Us
              </button>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-600 hover:text-rose-400 transition-colors text-left"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Our Products</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <div>Crochet Flowers</div>
              <div>Flower Bouquets</div>
              <div>Resin Art</div>
              <div>Polaroid Keepsakes</div>
              <div>Hand-painted Sarees</div>
              <div>Custom Orders</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
            Made with <Heart className="text-rose-400" size={16} fill="currentColor" /> by two girls
          </p>
          <p className="text-gray-500 text-xs mt-2">
            © 2025 {brandInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
