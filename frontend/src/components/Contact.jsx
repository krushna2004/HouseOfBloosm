import React, { useState } from 'react';
import { Instagram, Phone, Send, Heart } from 'lucide-react';
import { brandInfo } from '../data/mock';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store in localStorage for demo
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    inquiries.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    
    toast.success('Thank you! We\'ll reach out to you soon via WhatsApp or Instagram!');
    setFormData({ name: '', email: '', product: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openWhatsApp = (number) => {
    const message = encodeURIComponent(`Hi! I'm interested in ordering from House of Blooms`);
    window.open(`https://wa.me/91${number}?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-4">
            Let's Create Together
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to order your custom piece? Reach out to us on Instagram or WhatsApp,
            or fill out the form below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8">
              <h3 className="font-serif text-2xl text-gray-800 mb-6">Get in Touch</h3>

              {/* Instagram */}
              <a
                href={brandInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 mb-4 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="text-white" size={24} />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Instagram</div>
                  <div className="text-sm text-gray-600">@{brandInfo.instagram}</div>
                </div>
              </a>

              {/* WhatsApp 1 */}
              <button
                onClick={() => openWhatsApp(brandInfo.whatsapp1)}
                className="w-full flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 mb-4 group"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">WhatsApp</div>
                  <div className="text-sm text-gray-600">+91 {brandInfo.whatsapp1}</div>
                </div>
              </button>

              {/* WhatsApp 2 */}
              <button
                onClick={() => openWhatsApp(brandInfo.whatsapp2)}
                className="w-full flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-800">WhatsApp</div>
                  <div className="text-sm text-gray-600">+91 {brandInfo.whatsapp2}</div>
                </div>
              </button>
            </div>

            <div className="bg-sage-50 rounded-2xl p-6 text-center">
              <Heart className="text-rose-400 mx-auto mb-3" size={32} />
              <p className="text-gray-700 italic">
                "We typically respond within 24 hours. We can't wait to create something special for you!"
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-cream-50 to-green-50 rounded-2xl p-8">
            <h3 className="font-serif text-2xl text-gray-800 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Email or Phone *
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                  placeholder="Your email or phone number"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Interested In
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all outline-none"
                >
                  <option value="">Select a product type</option>
                  <option value="crochet-flowers">Crochet Flowers</option>
                  <option value="bouquets">Flower Bouquets</option>
                  <option value="resin-art">Resin Art</option>
                  <option value="polaroid">Polaroid Keepsakes</option>
                  <option value="sarees">Hand-painted Sarees</option>
                  <option value="custom">Custom Order</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm font-medium">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all outline-none resize-none"
                  placeholder="Tell us about your custom order..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-400 text-white px-6 py-3 rounded-lg hover:bg-rose-500 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Send Message</span>
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
