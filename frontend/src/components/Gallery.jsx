import React, { useState } from 'react';
import { X } from 'lucide-react';
import { productImages } from '../data/mock';

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Crochet Flowers', 'Crochet Bouquets', 'Resin Art', 'Accessories'];

  const filteredImages = activeFilter === 'All' 
    ? productImages 
    : productImages.filter(img => img.category === activeFilter);

  return (
    <section id="gallery" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">
            Our Creations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Every piece is handcrafted with love and attention to detail.
            Browse our collection of crochet flowers, bouquets, resin art, and accessories.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-rose-400 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-rose-50 hover:text-rose-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-xl mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Order CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-pink-50 to-green-50 rounded-3xl p-12">
          <h3 className="font-serif text-3xl text-gray-800 mb-4">
            Want something special?
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            We create custom pieces tailored to your vision. From color choices to design details,
            every creation is uniquely yours.
          </p>
          <button
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="bg-rose-400 text-white px-8 py-3 rounded-full hover:bg-rose-500 transition-all duration-300 hover:shadow-lg inline-flex items-center gap-2"
          >
            Request Custom Order
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-rose-300 transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="mt-4 text-white text-center">
              <h3 className="font-serif text-2xl mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
