'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const destinations = [
  {
    id: 1,
    name: 'Manali',
    image: '/images/manali.jpg',
    locations: 18,
    category: 'hills'
  },
  {
    id: 2,
    name: 'Goa',
    image: '/images/goa.jpg',
    locations: 32,
    category: 'beaches'
  },
  {
    id: 3,
    name: 'Jaipur',
    image: '/images/jaipur.jpg',
    locations: 15,
    category: 'heritage'
  },
  {
    id: 4,
    name: 'Rishikesh',
    image: '/images/rishikesh.jpg',
    locations: 12,
    category: 'hills'
  },
  {
    id: 5,
    name: 'Ladakh',
    image: '/images/ladakh.jpg',
    locations: 20,
    category: 'hills'
  },
  {
    id: 6,
    name: 'Andaman',
    image: '/images/andaman.jpg',
    locations: 28,
    category: 'beaches'
  },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'beaches', name: 'Beaches' },
  { id: 'hills', name: 'Hills' },
  { id: 'heritage', name: 'Heritage' }
];

export default function PopularDestinations() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredDestinations = activeCategory === 'all'
    ? destinations
    : destinations.filter(dest => dest.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Abstract World Map Background */}
      <div className="absolute inset-0 opacity-5">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          <path
            d="M0,0 L1000,0 L1000,500 L0,500 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Add more path elements for a simple world map outline */}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-lg text-gray-600">Discover our most sought-after travel destinations</p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex justify-center gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                ${activeCategory === category.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                <p className="text-white/90 mb-4">{destination.locations} locations</p>
                <Link
                  href={`/explore/${destination.name.toLowerCase()}`}
                  className="inline-block bg-white text-primary px-6 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  Explore
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/explore"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            View All Destinations
          </Link>
        </motion.div>
      </div>
    </section>
  );
}