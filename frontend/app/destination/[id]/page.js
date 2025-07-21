'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon, MapPinIcon, StarIcon, SunIcon, SparklesIcon, InformationCircleIcon, FireIcon, TicketIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Import components
import DestinationHeader from '../../../components/DestinationHeader';
import HotelCard from '../../../components/HotelCard';
import RestaurantCard from '../../../components/RestaurantCard';
import DestinationSkeleton from '../../../components/DestinationSkeleton';
import ErrorState from '../../../components/ErrorState';
import MapSection from '../../../components/MapSection';

// Import API utilities
import { fetchDestination, fetchHotelsByDestination, fetchRestaurantsByDestination } from '../../../lib/api';

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const ImageGallery = ({ images, name }) => (
  <motion.section variants={staggerContainer}>
    <div className="grid grid-cols-2 gap-4">
      <motion.div variants={itemVariants} className="col-span-2 rounded-2xl overflow-hidden h-[500px] relative shadow-xl">
        <Image 
          src={images?.[0] || '/images/noimage.jpg'} 
          alt={name} 
          fill 
          className="object-cover"
        />
      </motion.div>
      <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden h-64 relative shadow-lg">
        <Image 
          src={images?.[1] || '/images/noimage.jpg'} 
          alt={name} 
          fill 
          className="object-cover"
        />
      </motion.div>
      <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden h-64 relative shadow-lg">
        <Image 
          src={images?.[2] || '/images/noimage.jpg'} 
          alt={name} 
          fill 
          className="object-cover"
        />
      </motion.div>
    </div>
  </motion.section>
);

const WhyToVisit = ({ name, description, highlights }) => (
  <motion.section variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-5 flex items-center gap-3">
      <SparklesIcon className="w-10 h-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400"/>
      Why Visit {name}?
    </h2>
    <p className="text-gray-700 leading-relaxed text-lg mb-6">{description}</p>
    
    {highlights && highlights.length > 0 && (
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Highlights</h3>
        <ul className="space-y-2">
          {highlights.map((highlight, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-700">
              <div className="bg-green-100 text-green-600 rounded-full p-1">
                <StarIcon className="w-4 h-4"/>
              </div>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </motion.section>
);

const Sidebar = ({ destination }) => (
  <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24">
    <motion.div variants={itemVariants}>
      <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-3 text-lg">
        <TicketIcon className="w-7 h-7"/>
        Book This Trip
      </button>
    </motion.div>

    {destination.bestSeason && destination.bestSeason.length > 0 && (
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-3">
          <CalendarIcon className="w-7 h-7 text-blue-500"/>
          Best Time to Visit
        </h2>
        <div className="space-y-2">
          {destination.bestSeason.map((season, index) => (
            <div key={index} className="flex items-center justify-between text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <span className="font-medium">{season}</span>
              <ChevronRightIcon className="w-5 h-5 text-gray-400"/>
            </div>
          ))}
        </div>
      </motion.div>
    )}

    {destination.budget && (
      <motion.div variants={itemVariants} className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-5 rounded-r-lg shadow-md">
        <div className="flex">
          <div className="py-1"><InformationCircleIcon className="w-6 h-6 text-blue-400 mr-4"/></div>
          <div>
            <h3 className="font-bold text-lg mb-1">Budget</h3>
            <p className="text-sm">{destination.budget}</p>
          </div>
        </div>
      </motion.div>
    )}

    <motion.div variants={itemVariants} className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-3 text-lg px-2">Location on Map</h3>
      <MapSection lat={destination.coordinates?.lat} lng={destination.coordinates?.lng} name={destination.name} />
    </motion.div>
  </div>
);

const HotelSection = ({ hotels }) => {
  if (!hotels || hotels.length === 0) return null;
  const router = useRouter();
  return (
    <motion.section variants={itemVariants} className="mt-20">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Where to Stay</h2>
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map(hotel => (
          <div key={hotel._id} onClick={() => router.push(`/hotel/${hotel._id}`)} className="cursor-pointer">
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
};

const RestaurantSection = ({ restaurants }) => {
  if (!restaurants || restaurants.length === 0) return null;
  const router = useRouter();
  return (
    <motion.section variants={itemVariants} className="mt-20">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Where to Eat</h2>
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants.map(restaurant => (
          <div key={restaurant._id} onClick={() => router.push(`/restaurant/${restaurant._id}`)} className="cursor-pointer">
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default function DestinationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [destination, setDestination] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('No destination ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch destination data
        const destinationData = await fetchDestination(id);
        setDestination(destinationData);

        // Fetch hotels and restaurants in parallel
        const [hotelsData, restaurantsData] = await Promise.all([
          fetchHotelsByDestination(id).catch(() => []),
          fetchRestaurantsByDestination(id).catch(() => [])
        ]);

        setHotels(hotelsData);
        setRestaurants(restaurantsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load destination');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // The useEffect will handle the retry
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return <DestinationSkeleton />;
  }

  if (error) {
    return (
      <ErrorState 
        message={error} 
        onRetry={handleRetry}
        onBack={handleBack}
      />
    );
  }

  if (!destination) {
    return (
      <ErrorState 
        message="Destination not found" 
        onBack={handleBack}
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div 
        key={id}
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen font-sans"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div variants={itemVariants} className="mb-8">
            <button 
              onClick={handleBack} 
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-semibold transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Explore
            </button>
          </motion.div>

          <motion.div variants={staggerContainer}>
            <DestinationHeader destination={destination} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <motion.div variants={staggerContainer} className="lg:col-span-2 space-y-10">
                <ImageGallery images={destination.images} name={destination.name} />
                <WhyToVisit 
                  name={destination.name} 
                  description={destination.description}
                  highlights={destination.highlights}
                />
              </motion.div>
              
              <Sidebar destination={destination} />
            </div>

            <HotelSection hotels={hotels} />
            <RestaurantSection restaurants={restaurants} />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 