import React from "react";
import { motion } from "framer-motion";
import { MapPinIcon, StarIcon } from "@heroicons/react/24/outline";

export default function SeasonalCard({ destination, badge }) {
  return (
    <motion.div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg h-full flex flex-col transform transition-all duration-500 hover:shadow-xl"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="text-white">
            <div className="flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{destination.region}</span>
            </div>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#FF7A3D] to-[#FFB347] text-white shadow-lg">
            {badge}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h4 className="text-lg font-bold text-gray-800 mb-1">{destination.name}</h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {destination.description || 'Experience the best of this seasonal destination'}
        </p>
        
        <div className="mt-auto pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="ml-1 text-xs text-gray-500">(24)</span>
            </div>
            <div className="text-sm font-semibold text-[#1A6FA3]">
              ₹{destination.budget?.split('-')[0]?.replace('₹', '') || '5,000'}
              <span className="text-xs font-normal text-gray-500"> /person</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 bg-[#FF7A3D]/10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 -ml-8 mb-2 bg-[#1A6FA3]/10 rounded-full"></div>
    </motion.div>
  );
}