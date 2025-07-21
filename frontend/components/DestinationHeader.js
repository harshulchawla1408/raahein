'use client';

import React from 'react';
import Image from 'next/image';
import { MapPinIcon, SunIcon, StarIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const DestinationHeader = ({ destination }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Helper to ensure image path is correct
  const getImageSrc = (img) => {
    if (!img) return '/images/noimage.jpg';
    if (img.startsWith('http') || img.startsWith('/')) return img;
    return `/images/${img}`;
  };

  return (
    <header className="relative text-center mb-12 py-24 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
      <div className="absolute inset-0">
        <Image 
          src={getImageSrc(destination.images?.[0] || destination.image)} 
          alt={destination.name} 
          fill 
          className="object-cover blur-lg scale-125"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative px-4">
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-lg"
        >
          {destination.name}
        </motion.h1>
        <motion.div 
          variants={itemVariants}
          className="flex items-center justify-center gap-6 text-white/90 mt-5 flex-wrap"
        >
          <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
            <MapPinIcon className="w-6 h-6" />
            <span className="text-lg font-medium">{destination.location}</span>
          </div>
          {destination.bestSeason && destination.bestSeason.length > 0 && (
            <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              <CalendarIcon className="w-6 h-6" />
              <span className="text-lg font-medium">Best: {destination.bestSeason.join(', ')}</span>
            </div>
          )}
          {destination.rating && (
            <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              <StarIcon className="w-6 h-6 text-yellow-300" />
              <span className="text-lg font-medium">{destination.rating}⭐</span>
            </div>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default DestinationHeader;
