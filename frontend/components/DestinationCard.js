import React from "react";
import { motion } from "framer-motion";
import { MapPinIcon, StarIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function DestinationCard({ destination }) {
  return (
    <motion.div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden h-48">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="text-white">
            <div className="flex items-center gap-1 mb-1">
              <MapPinIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{destination.region}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-sm ml-1">(24)</span>
            </div>
          </div>
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors">
          <HeartIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{destination.name}</h3>
          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
            {destination.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {destination.description || 'Experience the beauty and culture of this amazing destination.'}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">Starting from</span>
              <p className="text-xl font-bold text-[#FF7A3D]">
                ₹{destination.budget?.split('-')[0]?.replace('₹', '') || '5,000'}
                <span className="text-sm font-normal text-gray-500"> /person</span>
              </p>
            </div>
            <button className="px-4 py-2 bg-[#1A6FA3] text-white rounded-lg text-sm font-medium hover:bg-[#15567D] transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}