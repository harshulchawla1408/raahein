'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase/config';
import axios from '../../lib/axios';
import Image from 'next/image';
import { Country, State, City } from 'country-state-city';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    maritalStatus: '',
    country: '',
    state: '',
    city: '',
    travelPreferences: [],
    travelGoal: '',
    mobile: '',
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        try {
          const response = await axios.get(`/api/user/${currentUser.uid}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setForm((prev) => ({
            ...prev,
            ...response.data,
          }));
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (form.country) {
      const countryStates = State.getStatesOfCountry(form.country);
      setStates(countryStates);
    }
  }, [form.country]);

  useEffect(() => {
    if (form.state && form.country) {
      const allCities = City.getCitiesOfState(form.country, form.state);
      setCities(allCities);
      setForm((prev) => ({ ...prev, city: '' }));
    }
  }, [form.state, form.country]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        travelPreferences: checked
          ? [...prev.travelPreferences, value]
          : prev.travelPreferences.filter((item) => item !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const token = await currentUser.getIdToken();
    try {
      await axios.put(`/api/user/${currentUser.uid}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    setForm((prev) => ({
      ...prev,
      country: selectedCountryCode,
      state: '',
      city: '',
    }));
    const countryStates = State.getStatesOfCountry(selectedCountryCode);
    setStates(countryStates);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      state: value,
      city: '',
    }));
    const selectedCities = City.getCitiesOfState(form.country, value);
    setCities(selectedCities);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">Loading...</div>
    );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 to-teal-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image
            src={user?.photoURL || '/default-avatar.png'}
            alt="Profile"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
        <h2 className="text-xl font-bold mb-2">Hey, {user?.displayName || 'User'}!</h2>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold mb-6">Personal Info Dashboard</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                disabled
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Marital Status</label>
              <select
                name="maritalStatus"
                value={form.maritalStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Country</label>
              <select
                name="country"
                value={form.country}
                onChange={handleCountryChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">State</label>
              <select
                name="state"
                value={form.state}
                onChange={handleStateChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                disabled={!form.country}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                disabled={!form.state}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Travel Preferences</label>
              <div className="space-y-2">
                {['mountains', 'beaches', 'cities'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      name="travelPreferences"
                      value={type}
                      checked={form.travelPreferences.includes(type)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Travel Goal for the Year</label>
              <input
                type="text"
                name="travelGoal"
                value={form.travelGoal}
                onChange={handleChange}
                placeholder="e.g., Go to Ladakh!"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="e.g., 9876543210"
                pattern="[0-9]{10}"
                maxLength={10}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Last Updated On: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
