'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase/config';
import axios from "@/lib/axios";
import Image from 'next/image';
import { Country, State, City } from 'country-state-city';
import { signOut } from "firebase/auth";

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
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Set basic user info from Firebase auth
        setUser({
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
        
        // Set form with basic info
        setForm(prev => ({
          ...prev,
          name: currentUser.displayName || '',
          email: currentUser.email || '',
        }));

        const token = await currentUser.getIdToken();
        try {
          const response = await axios.get(`/api/v1/user/${currentUser.uid}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Update user with additional data from backend
          setUser(prev => ({
            ...prev,
            ...response.data
          }));
          // Update form with additional data
          setForm(prev => ({
            ...prev,
            ...response.data,
          }));
        } catch (err) {
          if (err.response?.status === 404) {
            // Backend endpoint not found, show a warning but continue
            console.warn('User profile API endpoint not found. Using Firebase data only.');
          } else {
            console.error('Error fetching user data:', err);
          }
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

  if (type === 'checkbox' && name === 'travelPreferences') {
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
    if (!currentUser) {
      alert('No user is logged in');
      return;
    }
    
    try {
      const token = await currentUser.getIdToken();
      console.log('Submitting form data:', form); // Debug log
      
      // Using the correct endpoint with v1 prefix
      const response = await axios.put(`/api/v1/user-profile`, form);
      
      console.log('Update response:', response.data); // Debug log
      alert('Profile updated successfully!');
      router.push('/'); // Redirect to home page after save
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
      if (err.response?.status === 404) {
        alert('Backend server not found. Please make sure your backend server is running on http://localhost:8000');
      } else {
        alert(`Failed to update profile: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push('/');
    // Redirect to login page or show a message
  } catch (error) {
    console.error("Error signing out:", error);
  }
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
  const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setPhotoPreview(URL.createObjectURL(file));
        setPhotoFile(file);
      }
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
       <div
  className="w-32 h-32 rounded-full overflow-hidden mb-4 relative group"
  onMouseEnter={() => setIsPhotoHovered(true)}
  onMouseLeave={() => setIsPhotoHovered(false)}
>
  <Image
    src={photoPreview || user?.photoURL || '/default-avatar.png'}
    alt="Profile"
    width={128}
    height={128}
    className="object-cover w-full h-full"
  />
  {/* Pencil Icon Overlay */}
  <label
    htmlFor="profile-photo-upload"
    className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer transition-opacity duration-200 ${
      isPhotoHovered ? 'opacity-100' : 'opacity-0'
    }`}
    style={{ pointerEvents: isPhotoHovered ? 'auto' : 'none' }}
  >
    {/* Pencil SVG */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3a2 2 0 01.586-1.414z"
      />
    </svg>
    <input
      id="profile-photo-upload"
      type="file"
      accept="image/*"
      onChange={handlePhotoChange}
      className="hidden"
    />
  </label>
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