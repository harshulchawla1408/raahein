import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import DestinationCard from "./DestinationCard";

export default function InterestCarousel({ interest, destinations }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const carouselRef = useRef(null);
  const cardWidth = 300; // Width of each card + gap
  const visibleCards = 3; // Number of cards to show at once
  
  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  };

  const next = () => {
    if (currentIndex < Math.ceil(destinations.length / visibleCards) - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  if (!destinations || destinations.length === 0) return null;

  return (
    <motion.div 
      className="relative group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{interest.label}</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-[#FF7A3D] to-[#FFB347] rounded-full mt-1"></div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={prev}
            className={`p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentIndex === 0}
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
          </button>
          <button 
            onClick={next}
            className={`p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors ${currentIndex >= Math.ceil(destinations.length / visibleCards) - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentIndex >= Math.ceil(destinations.length / visibleCards) - 1}
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="relative">
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth pb-6 -mx-4 px-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <AnimatePresence>
            {destinations.map((dest, index) => (
              <motion.div 
                key={dest._id} 
                className="flex-shrink-0 w-[280px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <DestinationCard dest={dest} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Gradient fade effect on the sides */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F6E7D8] to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F6E7D8] to-transparent pointer-events-none"></div>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(destinations.length / visibleCards) }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === index ? 'bg-[#1A6FA3] w-6' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}