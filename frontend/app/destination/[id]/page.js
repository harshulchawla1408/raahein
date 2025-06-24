'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon, MapPinIcon, StarIcon, SunIcon, SparklesIcon, InformationCircleIcon, FireIcon, TicketIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data - in a real app, this would come from an API
const mockDestinations = {
  '60d5ec49e3a7f834c8a4b8b8': {
    _id: '60d5ec49e3a7f834c8a4b8b8',
    name: 'Goa',
    description: 'A paradise for beach lovers with golden sands, vibrant nightlife, and Portuguese heritage.',
    location: 'Goa, India',
    weather: 'Tropical, 25-30°C',
    images: ['/images/goa1.jpg', '/images/goa2.jpg', '/images/goa.jpg'],
    whyToVisit: 'Goa is not just about beaches; it\'s a melting pot of cultures. The state\'s unique blend of Indian and Portuguese influences is visible in its architecture, cuisine, and lifestyle. From the bustling markets of Anjuna to the serene beaches of the south, Goa offers a diverse range of experiences for every traveler.',
    hotels: [
        { id: 1, name: 'Taj Fort Aguada Resort & Spa', price: '15,000', rating: 4.8, description: 'Luxury resort with stunning sea views.', image: '/images/hotel1.jpg' },
        { id: 2, name: 'The Leela Goa', price: '20,000', rating: 4.9, description: 'Elegant property with a private beach and golf course.', image: '/images/hotel2.jpg' },
        { id: 3, name: 'W Goa', price: '18,000', rating: 4.7, description: 'Chic and modern hotel with vibrant party scenes.', image: '/images/hotel3.jpg' },
    ],
    activities: ['Scuba Diving at Grande Island', 'Visit Dudhsagar Falls', 'Explore Old Goa Churches'],
    travelTip: 'Rent a scooter to explore the beautiful coastline and hidden gems at your own pace.'
  },
  // Add more mock destinations as needed
};

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

const PageHeader = ({ name, location, weather, image }) => (
    <header className="relative text-center mb-12 py-24 rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
        <div className="absolute inset-0">
            <Image src={image} alt={name} fill className="object-cover blur-lg scale-125"/>
            <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative px-4">
            <motion.h1 
                variants={itemVariants}
                className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-lg"
            >
                {name}
            </motion.h1>
            <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center gap-6 text-white/90 mt-5"
            >
                <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
                    <MapPinIcon className="w-6 h-6" />
                    <span className="text-lg font-medium">{location}</span>
                </div>
                <div className="flex items-center gap-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
                    <SunIcon className="w-6 h-6" />
                    <span className="text-lg font-medium">{weather}</span>
                </div>
            </motion.div>
        </div>
    </header>
);

const ImageGallery = ({ images, name }) => (
    <motion.section variants={staggerContainer}>
        <div className="grid grid-cols-2 gap-4">
            <motion.div variants={itemVariants} className="col-span-2 rounded-2xl overflow-hidden h-[500px] relative shadow-xl">
                <Image src={images[0]} alt={name} fill className="object-cover"/>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden h-64 relative shadow-lg">
                <Image src={images[1]} alt={name} fill className="object-cover"/>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden h-64 relative shadow-lg">
                <Image src={images[2]} alt={name} fill className="object-cover"/>
            </motion.div>
        </div>
    </motion.section>
);

const WhyToVisit = ({ name, text }) => (
    <motion.section variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-5 flex items-center gap-3">
            <SparklesIcon className="w-10 h-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400"/>
            Why Visit {name}?
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{text}</p>
    </motion.section>
);

const Sidebar = ({ activities, travelTip }) => (
    <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24">
        <motion.div variants={itemVariants}>
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-3 text-lg">
                <TicketIcon className="w-7 h-7"/>
                Book This Trip
            </button>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                <FireIcon className="w-7 h-7 text-red-500"/>
                Top Activities
            </h2>
            <motion.ul variants={staggerContainer} className="space-y-3">
                {activities.map((activity, index) => (
                    <motion.li key={index} variants={itemVariants} className="flex items-center justify-between text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 text-green-600 rounded-full p-2">
                                <StarIcon className="w-5 h-5"/>
                            </div>
                            <span className="font-medium">{activity}</span>
                        </div>
                        <ChevronRightIcon className="w-5 h-5 text-gray-400"/>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-5 rounded-r-lg shadow-md">
             <div className="flex">
                <div className="py-1"><InformationCircleIcon className="w-6 h-6 text-blue-400 mr-4"/></div>
                <div>
                    <h3 className="font-bold text-lg mb-1">Travel Tip</h3>
                    <p className="text-sm">{travelTip}</p>
                </div>
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 text-lg px-2">Location on Map</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden relative group">
                 <Image src="/images/world-map.png" alt="Map" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <MapPinIcon className="w-12 h-12 text-white drop-shadow-lg transform transition-transform duration-500 group-hover:scale-110" />
                 </div>
            </div>
        </motion.div>
    </div>
);

const HotelSection = ({ hotels }) => (
    <motion.section variants={itemVariants} className="mt-20">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Where to Stay</h2>
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
        </motion.div>
    </motion.section>
);

const HotelCard = ({ hotel }) => (
    <motion.div 
      variants={itemVariants}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group border border-gray-100"
      whileHover={{ scale: 1.02 }}
    >
        <div className="relative h-60">
            <Image src={hotel.image} alt={hotel.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-300" />
                <span>{hotel.rating}</span>
            </div>
        </div>
        <div className="p-5">
             <h3 className="text-xl font-bold text-gray-800 truncate">{hotel.name}</h3>
             <p className="text-gray-500 text-sm mt-1 mb-3">{hotel.description}</p>
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-xl font-bold text-gray-900">₹{hotel.price}</span>
                    <span className="text-sm text-gray-500">/night</span>
                </div>
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105">
                    View Deal
                </button>
            </div>
        </div>
    </motion.div>
);

export default function DestinationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect can be simplified for mock data
    if (id) {
      setLoading(true);
      setTimeout(() => { // Simulate network delay
        const data = mockDestinations[id] || Object.values(mockDestinations)[0];
        setDestination(data);
        setLoading(false);
      }, 500);
    } else {
        setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-50">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
    );
  }

  if (!destination) {
    return <div className="flex justify-center items-center min-h-screen bg-red-50 text-red-700">Destination not found.</div>;
  }

  return (
    <AnimatePresence>
        <motion.div 
          key={id} // Ensure re-animation when id changes
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen font-sans"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div variants={itemVariants} className="mb-8">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-semibold transition-colors">
                  <ArrowLeftIcon className="w-5 h-5" />
                  Back to Explore
                </button>
            </motion.div>

            <motion.div variants={staggerContainer}>
                <PageHeader name={destination.name} location={destination.location} weather={destination.weather} image={destination.images[0]} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <motion.div variants={staggerContainer} className="lg:col-span-2 space-y-10">
                        <ImageGallery images={destination.images} name={destination.name} />
                        <WhyToVisit name={destination.name} text={destination.whyToVisit} />
                    </motion.div>
                    
                    <Sidebar activities={destination.activities} travelTip={destination.travelTip} />
                </div>

                <HotelSection hotels={destination.hotels} />
            </motion.div>
          </div>
        </motion.div>
    </AnimatePresence>
  );
} 