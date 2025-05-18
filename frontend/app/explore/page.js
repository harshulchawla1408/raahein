"use client";
import React, { useState, useEffect, useRef } from "react";
import FilterCategory from "@/components/FilterCategory";

const getIconForCategory = (category) => {
  switch (category.toLowerCase()) {
    case 'adventure':
      return '⛰️';
    case 'beach':
      return '🏖️';
    case 'culture':
      return '🏛️';
    case 'nature':
      return '🌳';
    case 'history':
      return '🏛️';
    case 'food':
      return '🍽️';
    case 'wildlife':
      return '🦜';
    case 'spiritual':
      return '🙏';
    case 'luxury':
      return '💎';
    default:
      return '📍';
  }
};
import axios from "@/lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import { MapPinIcon, StarIcon, FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DestinationCard from "@/components/DestinationCard";
import InterestCarousel from "@/components/InterestCarousel";
import SeasonalCard from "@/components/SeasonalCard";
import InterestCheckboxes from "@/components/InterestCheckboxes";

export default function ExploreDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    category: ""
  });

  const [categories, setCategories] = useState([]);
  const [season, setSeason] = useState("summer");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await axios.get("/destinations");
        const data = res.data.data || res.data;
        setDestinations(data);
        setFiltered(data);

        // Get unique categories
        const uniqueCategories = [...new Set(data.map(d => d.category))];
        
        // Sort categories and add icons
        const categorizedData = uniqueCategories.map(cat => {
          const destinations = data.filter(d => d.category === cat);
          const icon = getIconForCategory(cat);
          return {
            name: cat,
            icon,
            count: destinations.length
          };
        }).sort((a, b) => b.count - a.count); // Sort by popularity

        setCategories(categorizedData);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    }
    fetchDestinations();
  }, []);

  useEffect(() => {
    async function fetchFilteredDestinations() {
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        
        const res = await axios.get(`/destinations/filter?${params.toString()}`);
        setFiltered(res.data);
      } catch (e) {
        console.error("Filtering error:", e);
        setFiltered(destinations); // Fallback to all destinations on error
      }
    }
    fetchFilteredDestinations();
  }, [filters, destinations]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6F3FF] to-white font-[Poppins]">
       {/* Hero Section with Video Background */}
       <section className="relative h-[60vh] overflow-hidden">
         <video
           autoPlay
           loop
           muted
           className="absolute w-full h-full object-cover"
           poster="/images/pic4.jpg"
         >
           <source src="/videos/hero.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-b from-[#1A6FA3]/50 to-[#1A6FA3]/30 backdrop-blur-sm" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
               Explore Your Perfect Getaway
             </h1>
             <p className="text-xl text-white/90 mb-8">
               Discover unique destinations tailored to your travel preferences
             </p>
             <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="px-8 py-3 bg-[#1A6FA3] text-white rounded-full text-lg font-semibold shadow-lg hover:bg-[#15567D] transition-colors"
             >
               Start Your Journey
             </motion.button>
          </motion.div>
        </div>
      </section>

       {/* Filter Bar */}
       <section className="sticky top-0 z-20 bg-[#E6F3FF] backdrop-blur-md py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#1A6FA3] text-white rounded-lg"
            >
              <FunnelIcon className="w-5 h-5" />
              Filters
            </button>
            <div className="hidden lg:block">
              <div className="flex items-center gap-3 px-4 py-2 bg-[#E6F3FF] rounded-full">
                <span className="text-sm text-[#1A6FA3] font-medium">
                  {filters.category || 'All Destinations'}
                </span>
                <XMarkIcon 
                  onClick={() => handleFilterChange('category', '')}
                  className={`w-4 h-4 text-gray-400 cursor-pointer ${!filters.category && 'hidden'}`}
                />
              </div>
            </div>
            <div className="hidden lg:flex gap-6 overflow-x-auto pb-2">
              <FilterCategory
                name="All Destinations"
                icon="🌍"
                count={filtered.length}
                active={!filters.category}
                onClick={() => handleFilterChange("category", "")}
              />
              {categories.map(category => (
                <FilterCategory
                  key={category.name}
                  name={category.name}
                  icon={category.icon}
                  count={category.count}
                  active={filters.category === category.name}
                  onClick={() => handleFilterChange("category", category.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Sidebar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-30 lg:hidden"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <InterestCheckboxes />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Editor's Picks */}
        <section className="my-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-6 text-[#1A6FA3]"
          >
            Editor's Picks
          </motion.h2>
          <InterestCarousel />
        </section>

        {/* All Destinations */}
        <section className="my-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-6 text-[#FF7A3D]"
          >
            All Destinations
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.data?.map((dest) => (
                <motion.div
                  key={dest._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: filtered.data.indexOf(dest) * 0.1 }}
                >
                  <DestinationCard destination={dest} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Seasonal Picks */}
        <section className="my-12">
           <motion.h2
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             className="text-2xl font-bold text-gray-800 mb-6"
           >
             {season === "summer" ? "Cool escapes from summer" : "Seasonal Picks"}
           </motion.h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {destinations
               .sort((a, b) => {
                 // Sort by rating (descending), then by popularity
                 const ratingDiff = b.rating - a.rating;
                 if (ratingDiff !== 0) return ratingDiff;
                 return b.isPopular ? -1 : a.isPopular ? 1 : 0;
               })
               .slice(0, 3)
               .map((dest, idx) => (
                 <motion.div
                   key={dest._id}
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ delay: idx * 0.2 }}
                 >
                   <SeasonalCard destination={dest} />
                 </motion.div>
               ))}
           </div>
        </section>

        {/* Travel by Mood */}
        <section className="my-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-6 text-[#1A6FA3]"
          >
            Travel by Mood
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MoodCard mood="Wanna chill?" places={["Goa", "Pondicherry"]} />
            <MoodCard mood="Wanna hike?" places={["Manali", "Spiti"]} />
            <MoodCard mood="Feeling royal?" places={["Udaipur", "Jaipur"]} />
          </div>
        </section>

        {/* AI Suggestions CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="my-16 text-center bg-gradient-to-r from-[#FF7A3D] to-[#FF6B2B] rounded-2xl p-12 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Can't decide where to go?</h3>
          <p className="text-lg mb-6">Let our AI help you find your perfect destination</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-[#FF7A3D] rounded-full text-lg font-semibold shadow-lg hover:bg-gray-50 transition-colors"
          >
            Get AI Suggestions
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
}

function FilterBadge({ label, icon, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-4 py-2 bg-white rounded-full border text-sm shadow hover:bg-orange-100 whitespace-nowrap transition-colors"
    >
      {icon && <span className="mr-1">{icon}</span>}{label}
    </motion.button>
  );
}

function MoodCard({ mood, places }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all"
    >
      <h4 className="font-semibold text-[#FF7A3D] text-lg mb-2">{mood}</h4>
      <p className="text-gray-600">{places.join(", ")}</p>
    </motion.div>
  );
}