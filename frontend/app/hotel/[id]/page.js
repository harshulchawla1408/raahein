'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchHotel, fetchHotelsByDestination } from '../../../lib/api';
import HotelCard from '../../../components/HotelCard';
import { motion, AnimatePresence } from 'framer-motion';
import MapSection from '../../../components/MapSection';
import { StarIcon, MapPinIcon, CurrencyRupeeIcon, CalendarIcon, GlobeAltIcon } from '@heroicons/react/24/solid';

export default function HotelDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [hotel, setHotel] = useState(null);
  const [otherHotels, setOtherHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const hotelData = await fetchHotel(id);
        setHotel(hotelData);
        if (hotelData.destination) {
          const hotels = await fetchHotelsByDestination(hotelData.destination);
          setOtherHotels(hotels.filter(h => h._id !== id));
        }
      } catch (err) {
        setError(err.message || 'Failed to load hotel');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!hotel) return <div className="p-10 text-center">Hotel not found</div>;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 flex flex-col md:flex-row gap-10">
          {/* Hotel Image */}
          <div className="md:w-1/2 w-full flex flex-col items-center justify-center">
            <img
              src={hotel.photo || '/images/noimage.jpg'}
              alt={hotel.name}
              className="rounded-2xl shadow-lg w-full h-80 object-cover mb-6"
            />
            <div className="flex gap-4 text-gray-500 text-sm mb-2">
              <span className="flex items-center gap-1"><CalendarIcon className="w-5 h-5" /> Added: {hotel.createdAt ? new Date(hotel.createdAt).toLocaleDateString() : 'N/A'}</span>
              <span className="flex items-center gap-1"><GlobeAltIcon className="w-5 h-5" /> ID: {hotel._id}</span>
            </div>
          </div>
          {/* Hotel Details */}
          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">{hotel.name}</h1>
            <div className="flex items-center gap-2 text-lg text-gray-700 mb-2">
              <MapPinIcon className="w-6 h-6" />
              <span>{hotel.address || 'No address provided'}</span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="flex items-center gap-1 text-yellow-500"><StarIcon className="w-5 h-5" /> {hotel.rating || 'N/A'}</span>
              <span className="flex items-center gap-1 text-green-700"><CurrencyRupeeIcon className="w-5 h-5" /> {hotel.price ? `₹${hotel.price} / night` : 'Price N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <GlobeAltIcon className="w-5 h-5" />
              <span>Destination ID: {hotel.destination || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPinIcon className="w-5 h-5" />
              <span>Coordinates: {hotel.coordinates?.lat}, {hotel.coordinates?.lng}</span>
            </div>
            <div className="mb-4">
              <MapSection lat={hotel.coordinates?.lat} lng={hotel.coordinates?.lng} name={hotel.name} />
            </div>
          </div>
        </div>
        {otherHotels.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Other Hotels in this Destination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherHotels.map(h => (
                <div key={h._id} onClick={() => router.push(`/hotel/${h._id}`)} className="cursor-pointer">
                  <HotelCard hotel={h} />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
