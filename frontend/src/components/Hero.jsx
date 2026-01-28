import React from 'react';
import { Flower2, Sparkles } from 'lucide-react';
import { brandInfo } from '../data/mock';

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-6 bg-gradient-to-br from-pink-50 via-cream-50 to-green-50"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Flower2 className="text-rose-400 animate-pulse" size={40} />
            <Sparkles className="text-sage-500 animate-pulse" size={32} />
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-gray-800 mb-6 leading-tight">
            {brandInfo.name}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
            {brandInfo.tagline}
          </p>

          <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
            {brandInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToContact}
              className="bg-rose-400 text-white px-8 py-3 rounded-full hover:bg-rose-500 transition-all duration-300 hover:shadow-xl hover:scale-105 text-lg"
            >
              Send us Message
            </button>
            <button
              onClick={() => document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-sage-500 text-sage-700 px-8 py-3 rounded-full hover:bg-sage-50 transition-all duration-300 text-lg"
            >
              View Gallery
            </button>
          </div>
        </div>

        <div className="mt-16 animate-bounce">
          <div className="text-gray-400 text-sm">Scroll to explore</div>
          <div className="text-rose-300 text-2xl">↓</div>
        </div>
      </div>
    </section>
  );
};
