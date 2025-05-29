'use client';

import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCompass, FaGlobe, FaPaperPlane, FaChevronDown, FaChevronUp, FaHeart, FaRegHeart, FaSun, FaUmbrellaBeach, FaWater, FaMountain, FaSpinner } from 'react-icons/fa';

// Components
const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      {[...Array(totalSteps)].map((_, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            index + 1 <= currentStep 
              ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white' 
              : 'bg-sky-100 text-sky-400'
          }`}>
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-24 h-1 ${
              index + 1 < currentStep 
                ? 'bg-gradient-to-r from-sky-400 to-blue-500' 
                : 'bg-sky-100'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

const TravelGroupToggle = ({ value, onChange }) => {
  const options = [
    { value: 'solo', label: 'Solo Traveler', icon: <FaCompass className="w-6 h-6" /> },
    { value: 'couple', label: 'Couple', icon: <FaHeart className="w-6 h-6" /> },
    { value: 'family', label: 'Family', icon: <FaGlobe className="w-6 h-6" /> },
    { value: 'friends', label: 'Friends', icon: <FaPaperPlane className="w-6 h-6" /> }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            value === option.value
              ? 'border-sky-400 bg-gradient-to-r from-sky-50 to-blue-50 shadow-lg'
              : 'border-sky-100 hover:border-sky-200'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className={`${value === option.value ? 'text-sky-500' : 'text-sky-400'}`}>
              {option.icon}
            </span>
            <span className={`font-medium ${value === option.value ? 'text-sky-600' : 'text-sky-500'}`}>
              {option.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

const InterestToggle = ({ value, onChange }) => {
  const options = [
    { value: 'beach', label: 'Beach', icon: <FaUmbrellaBeach className="w-6 h-6" /> },
    { value: 'mountain', label: 'Mountain', icon: <FaMountain className="w-6 h-6" /> },
    { value: 'city', label: 'City', icon: <FaGlobe className="w-6 h-6" /> },
    { value: 'nature', label: 'Nature', icon: <FaWater className="w-6 h-6" /> }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            const newValue = value.includes(option.value)
              ? value.filter(v => v !== option.value)
              : [...value, option.value];
            onChange(newValue);
          }}
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            value.includes(option.value)
              ? 'border-sky-400 bg-gradient-to-r from-sky-50 to-blue-50 shadow-lg'
              : 'border-sky-100 hover:border-sky-200'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className={`${value.includes(option.value) ? 'text-sky-500' : 'text-sky-400'}`}>
              {option.icon}
            </span>
            <span className={`font-medium ${value.includes(option.value) ? 'text-sky-600' : 'text-sky-500'}`}>
              {option.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

const BudgetSlider = ({ min, max, value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sky-600">Budget Range (per person)</span>
        <span className="text-sky-600 font-semibold">
          ${value.min.toLocaleString()} - ${value.max.toLocaleString()}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step="500"
            value={value.max}
            onChange={(e) => {
              const newMax = parseInt(e.target.value);
              onChange({
                min: Math.min(value.min, newMax - 500),
                max: newMax
              });
            }}
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer"
          />
          <div 
            className="absolute top-0 h-2 bg-sky-400 rounded-l-lg"
            style={{
              left: '0%',
              width: `${((value.min - min) / (max - min)) * 100}%`,
              backgroundColor: '#7dd3fc'
            }}
          />
          <div 
            className="absolute top-0 h-2 bg-sky-600 rounded-r-lg"
            style={{
              left: `${((value.min - min) / (max - min)) * 100}%`,
              width: `${((value.max - value.min) / (max - min)) * 100}%`
            }}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-sky-700 mb-1">Min</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-sky-500">$</span>
              <input
                type="number"
                min={min}
                max={value.max - 500}
                value={value.min}
                onChange={(e) => {
                  const newMin = parseInt(e.target.value) || 0;
                  onChange({
                    min: Math.min(newMin, value.max - 500),
                    max: value.max
                  });
                }}
                className="w-full pl-8 pr-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-sky-700 mb-1">Max</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-sky-500">$</span>
              <input
                type="number"
                min={value.min + 500}
                max={max}
                value={value.max}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value) || 0;
                  onChange({
                    min: value.min,
                    max: Math.max(newMax, value.min + 500)
                  });
                }}
                className="w-full pl-8 pr-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DurationSelector = ({ value, onChange }) => {
  const options = [3, 5, 7, 10, 14];

  return (
    <div className="grid grid-cols-5 gap-4">
      {options.map((days) => (
        <button
          key={days}
          onClick={() => onChange(days)}
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            value === days
              ? 'border-sky-400 bg-gradient-to-r from-sky-50 to-blue-50 shadow-lg'
              : 'border-sky-100 hover:border-sky-200'
          }`}
        >
          <div className="flex flex-col items-center gap-1">
            <span className={`text-2xl font-bold ${value === days ? 'text-sky-600' : 'text-sky-400'}`}>
              {days}
            </span>
            <span className={`text-sm ${value === days ? 'text-sky-600' : 'text-sky-500'}`}>
              {days === 1 ? 'Day' : 'Days'}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

const LocationPreference = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[
        { value: 'domestic', label: 'Domestic' },
        { value: 'international', label: 'International' }
      ].map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            value === option.value
              ? 'border-sky-400 bg-gradient-to-r from-sky-50 to-blue-50 shadow-lg'
              : 'border-sky-100 hover:border-sky-200'
          }`}
        >
          <span className={`text-lg font-medium ${value === option.value ? 'text-sky-600' : 'text-sky-500'}`}>
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};

const SuggestionCard = ({ suggestion }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img
          src={suggestion.image}
          alt={suggestion.destination}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300"
        >
          {isLiked ? (
            <FaHeart className="w-5 h-5 text-sky-500" />
          ) : (
            <FaRegHeart className="w-5 h-5 text-sky-400" />
          )}
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-sky-900 mb-2">{suggestion.destination}</h3>
        <p className="text-sky-600 mb-4">{suggestion.reason}</p>
        <div className="flex justify-between items-center">
          <span className="text-sky-600 font-semibold">{suggestion.cost}</span>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white font-medium hover:from-sky-500 hover:to-blue-600 transition-all duration-300">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function PlanWithAI() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: 25,
    groupType: '',
    interests: [],
    budget: { min: 1000, max: 5000 },
    duration: 7,
    season: 'summer',
    locationPreference: 'domestic'
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.interests.length === 0) {
      setError('Please select at least one interest');
      return;
    }
    
    if (!formData.groupType) {
      setError('Please select a travel group type');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/ai/suggest-destinations', {
        age: formData.age,
        groupType: formData.groupType,
        interests: formData.interests,
        budget: formData.budget,
        duration: formData.duration,
        season: formData.season,
        locationPreference: formData.locationPreference
      });
      
      setSuggestions(response.data);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError(err.response?.data?.message || 'Failed to get travel suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1 && !formData.groupType) {
      setError('Please select a travel group');
      return;
    }
    if (currentStep === 2 && formData.interests.length === 0) {
      setError('Please select at least one interest');
      return;
    }
    
    setError(null);
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setError(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleBudgetChange = (min, max) => {
    setFormData(prev => ({
      ...prev,
      budget: { min, max }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating waves */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="waves" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q 5 5, 10 10 T 20 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#waves)" />
          </svg>
        </div>

        {/* Floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              i % 2 === 0 ? 'bg-teal-200/20' : 'bg-cyan-200/20'
            }`}>
              <span className="text-2xl">
                {['🌊', '🏖', '🌴', '🌅', '🐚', '🌺', '🦀', '🌞'][i]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Travel Background"
            className="w-full h-full object-"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-900/60 via-cyan-800/40 to-sky-700/30"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-200">
                Plan Your Dream
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-sky-200">
                Beach Getaway
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Let our AI craft your perfect beach vacation, tailored to your style and preferences
            </motion.p>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <FaChevronDown className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 via-cyan-100/50 to-sky-100/50 rounded-3xl blur-3xl -z-10"></div>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <StepIndicator currentStep={currentStep} totalSteps={5} />
          
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 mb-6">
                    Who's Traveling?
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-sky-700 mb-2">Age</label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                        className="w-full p-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        placeholder="Enter your age"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sky-700 mb-2">Travel Group</label>
                      <TravelGroupToggle
                        value={formData.groupType}
                        onChange={(value) => handleInputChange('groupType', value)}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 mb-6">
                    What are your interests?
                  </h2>
                  <InterestToggle
                    value={formData.interests}
                    onChange={(value) => setFormData({ ...formData, interests: value })}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 mb-6">
                    What's your budget?
                  </h2>
                  <div className="space-y-6">
                    <BudgetSlider
                      min={1000}
                      max={10000}
                      value={formData.budget}
                      onChange={handleBudgetChange}
                    />
                    <div>
                      <label className="block text-sm font-medium text-sky-700 mb-2">Season</label>
                      <select
                        value={formData.season}
                        onChange={(e) => handleInputChange('season', e.target.value)}
                        className="w-full p-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      >
                        <option value="summer">Summer</option>
                        <option value="winter">Winter</option>
                        <option value="spring">Spring</option>
                        <option value="autumn">Autumn</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 mb-6">
                    How long do you want to travel?
                  </h2>
                  <DurationSelector
                    value={formData.duration}
                    onChange={(value) => setFormData({ ...formData, duration: value })}
                  />
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 mb-6">
                    Where would you like to go?
                  </h2>
                  <LocationPreference
                    value={formData.locationPreference}
                    onChange={(value) => setFormData({ ...formData, locationPreference: value })}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-600 hover:from-teal-200 hover:to-cyan-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Previous
                </button>
              )}
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? 'Finding Destinations...' : 'Get Suggestions'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-5xl text-teal-500 mb-4" />
            <p className="text-teal-600 text-xl">Finding your perfect destinations...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : suggestions.length > 0 ? (
          <>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 mb-12 text-center">
              Your Perfect Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {suggestions.map((suggestion) => (
                <SuggestionCard key={suggestion.id || suggestion.destination} suggestion={suggestion} />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {/* Celebration Effect */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-400/20 to-cyan-500/20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-6xl font-bold text-teal-500"
            >
              🎉
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}