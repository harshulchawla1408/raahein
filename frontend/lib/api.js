import axios from './axios';

// Fetch destination by ID
export const fetchDestination = async (id) => {
  try {
    const response = await axios.get(`/api/v1/destinations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destination:', error);
    if (error.response?.status === 404) {
      throw new Error('Destination not found');
    }
    throw new Error('Failed to fetch destination');
  }
};

// Fetch hotels by destination ID
export const fetchHotelsByDestination = async (destinationId) => {
  try {
    const response = await axios.get(`/api/v1/hotels/by-destination/${destinationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw new Error('Failed to fetch hotels');
  }
};

// Fetch restaurants by destination ID
export const fetchRestaurantsByDestination = async (destinationId) => {
  try {
    const response = await axios.get(`/api/v1/restaurants/by-destination/${destinationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw new Error('Failed to fetch restaurants');
  }
};

// Fetch all destinations
export const fetchAllDestinations = async () => {
  try {
    const response = await axios.get('/api/v1/destinations');
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw new Error('Failed to fetch destinations');
  }
};

// Fetch hotel by ID
export const fetchHotel = async (hotelId) => {
  try {
    const response = await axios.get(`/api/v1/hotels/${hotelId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hotel:', error);
    throw new Error('Failed to fetch hotel');
  }
};

// Fetch restaurant by ID
export const fetchRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(`/api/v1/restaurants/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    throw new Error('Failed to fetch restaurant');
  }
}; 