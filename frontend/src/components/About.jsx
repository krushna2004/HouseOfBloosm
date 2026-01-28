import React from 'react';
import { Heart, Sparkles, Flower } from 'lucide-react';
import { brandInfo } from '../data/mock';

export const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-br from-cream-50 via-pink-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">
            Our Story
          </h2>
          <div className="flex items-center justify-center gap-3 text-rose-400">
            <Flower size={24} />
            <Heart size={24} />
            <Sparkles size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            {brandInfo.story.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 leading-relaxed mb-6 text-center text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-rose-400" size={28} />
              </div>
              <h3 className="font-serif text-xl text-gray-800 mb-2">Handcrafted</h3>
              <p className="text-gray-600 text-sm">
                Every piece is made by hand with love and care
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-sage-600" size={28} />
              </div>
              <h3 className="font-serif text-xl text-gray-800 mb-2">Custom Made</h3>
              <p className="text-gray-600 text-sm">
                Tailored to your preferences and vision
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flower className="text-yellow-500" size={28} />
              </div>
              <h3 className="font-serif text-xl text-gray-800 mb-2">Everlasting</h3>
              <p className="text-gray-600 text-sm">
                Flowers that never fade, memories that last
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
