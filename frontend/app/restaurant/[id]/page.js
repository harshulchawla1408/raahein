'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchRestaurant, fetchRestaurantsByDestination } from '../../../lib/api';
import RestaurantCard from '../../../components/RestaurantCard';
import { motion, AnimatePresence } from 'framer-motion';
import MapSection from '../../../components/MapSection';
import { StarIcon, MapPinIcon, CurrencyRupeeIcon, CalendarIcon, GlobeAltIcon, CakeIcon } from '@heroicons/react/24/solid';

export default function RestaurantDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [restaurant, setRestaurant] = useState(null);
  const [otherRestaurants, setOtherRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const restaurantData = await fetchRestaurant(id);
        setRestaurant(restaurantData);
        if (restaurantData.destination) {
          const restaurants = await fetchRestaurantsByDestination(restaurantData.destination);
          setOtherRestaurants(restaurants.filter(r => r._id !== id));
        }
      } catch (err) {
        setError(err.message || 'Failed to load restaurant');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!restaurant) return <div className="p-10 text-center">Restaurant not found</div>;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 flex flex-col md:flex-row gap-10">
          {/* Restaurant Image */}
          <div className="md:w-1/2 w-full flex flex-col items-center justify-center">
            <img
              src={restaurant.photo || '/images/noimage.jpg'}
              alt={restaurant.name}
              className="rounded-2xl shadow-lg w-full h-80 object-cover mb-6"
            />
            <div className="flex gap-4 text-gray-500 text-sm mb-2">
              <span className="flex items-center gap-1"><CalendarIcon className="w-5 h-5" /> Added: {restaurant.createdAt ? new Date(restaurant.createdAt).toLocaleDateString() : 'N/A'}</span>
              <span className="flex items-center gap-1"><GlobeAltIcon className="w-5 h-5" /> ID: {restaurant._id}</span>
            </div>
          </div>
          {/* Restaurant Details */}
          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">{restaurant.name}</h1>
            <div className="flex items-center gap-2 text-lg text-gray-700 mb-2">
              <MapPinIcon className="w-6 h-6" />
              <span>{restaurant.address || 'No address provided'}</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="flex items-center gap-1 text-yellow-500"><StarIcon className="w-5 h-5" /> {restaurant.rating || 'N/A'}</span>
              <span className="flex items-center gap-1 text-orange-700"><CurrencyRupeeIcon className="w-5 h-5" /> Price Level: {restaurant.priceLevel || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <CakeIcon className="w-5 h-5" />
              <span>Cuisine: {Array.isArray(restaurant.cuisine) ? restaurant.cuisine.join(', ') : restaurant.cuisine || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <GlobeAltIcon className="w-5 h-5" />
              <span>Destination ID: {restaurant.destination || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPinIcon className="w-5 h-5" />
              <span>Coordinates: {restaurant.coordinates?.lat}, {restaurant.coordinates?.lng}</span>
            </div>
            <div className="mb-4">
              <MapSection lat={restaurant.coordinates?.lat} lng={restaurant.coordinates?.lng} name={restaurant.name} />
            </div>
          </div>
        </div>
        {otherRestaurants.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Other Restaurants in this Destination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherRestaurants.map(r => (
                <div key={r._id} onClick={() => router.push(`/restaurant/${r._id}`)} className="cursor-pointer">
                  <RestaurantCard restaurant={r} />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
