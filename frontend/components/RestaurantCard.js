'use client';

import React from 'react';
import Image from 'next/image';
import { StarIcon, MapPinIcon, CurrencyRupeeIcon, CakeIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const RestaurantCard = ({ restaurant }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const getPriceLevel = (priceLevel) => {
    if (!priceLevel) return 'N/A';
    return '₹'.repeat(priceLevel);
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group border border-gray-100"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative h-60">
        <Image 
          src={restaurant.photo || '/images/noimage.jpg'} 
          alt={restaurant.name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <StarIcon className="w-5 h-5 text-yellow-300" />
          <span>{restaurant.rating || 4.0}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 truncate">{restaurant.name}</h3>
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1 mb-2">
          <CakeIcon className="w-4 h-4" />
          <span className="truncate">{restaurant.cuisine || 'Various cuisines'}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPinIcon className="w-4 h-4" />
          <span className="truncate">{restaurant.address}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-gray-900">{getPriceLevel(restaurant.priceLevel)}</span>
            <span className="text-sm text-gray-500"> price level</span>
          </div>
          <button className="px-5 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors transform hover:scale-105">
            View Menu
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
