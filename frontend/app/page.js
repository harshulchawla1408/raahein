'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaArrowDown, FaBars, FaTimes, FaMoneyBillWave, FaMapMarkedAlt, FaCalendarAlt, FaRobot, FaPlay } from 'react-icons/fa';
import PopularDestinations from '../components/PopularDestinations';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="smooth-scroll">
      {/* Header/Navbar */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">TravelMate</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('about')} className="nav-link">About Us</button>
              <button onClick={() => scrollToSection('contact')} className="nav-link">Get in Touch</button>
              <Link href="/login" className="btn-primary">Login</Link>
              <Link href="/register" className="btn-secondary">Signup</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-text"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4"
              >
                <div className="flex flex-col space-y-4">
                  <button onClick={() => scrollToSection('about')} className="nav-link text-left">About Us</button>
                  <button onClick={() => scrollToSection('contact')} className="nav-link text-left">Get in Touch</button>
                  <Link href="/login" className="btn-primary w-full text-center">Login</Link>
                  <Link href="/register" className="btn-secondary w-full text-center">Signup</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/ocean.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 hero-overlay"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Your Adventure Starts Here
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto"
          >
            Find the best places based on your budget, travel duration, and preferences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/explore" className="btn-primary">Start Exploring</Link>
            <button onClick={() => scrollToSection('about')} className="btn-secondary">
              Learn More
            </button>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <button onClick={() => scrollToSection('about')} className="text-white">
            <FaArrowDown className="w-6 h-6" />
          </button>
        </motion.div>
      </section>

      {/* Popular Destinations Section */}
      <PopularDestinations />

      {/* Plan Your Trip Section */}
      <section className="relative py-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/travel-planning-bg.jpg"
            alt="Travel Planning Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Plan Your Trip</h2>
            <p className="text-xl text-white/90">Your journey starts here – follow 4 simple steps!</p>
          </motion.div>

          {/* Glassmorphic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: <FaMoneyBillWave className="w-8 h-8" />,
                title: "Set Your Budget",
                description: "Choose a budget that suits you.",
                color: "from-blue-500/20 to-blue-600/20"
              },
              {
                icon: <FaMapMarkedAlt className="w-8 h-8" />,
                title: "Choose Destination",
                description: "Pick a dream place from curated options.",
                color: "from-purple-500/20 to-purple-600/20"
              },
              {
                icon: <FaCalendarAlt className="w-8 h-8" />,
                title: "Pick Dates",
                description: "Select your preferred travel dates.",
                color: "from-pink-500/20 to-pink-600/20"
              },
              {
                icon: <FaRobot className="w-8 h-8" />,
                title: "Get Suggestions",
                description: "Receive AI-generated travel plans.",
                color: "from-green-500/20 to-green-600/20"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="text-white mb-6">{step.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/80">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/plan-trip"
              className="inline-block bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Planning Your Trip
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Pattern and Gradient */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

          {/* Additional decorative elements */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-3000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold tracking-wider uppercase text-sm mb-4">
              You'll Love It
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience travel planning like never before with our innovative features and personalized service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    number: "01",
                    title: "Personalized Travel Plans",
                    description: "Tailor-made itineraries to fit your interests, budget, and time."
                  },
                  {
                    number: "02",
                    title: "Verified Reviews",
                    description: "Read real reviews by travelers who've been there."
                  },
                  {
                    number: "03",
                    title: "Explore Like a Local",
                    description: "Discover hidden gems and authentic local experiences."
                  },
                  {
                    number: "04",
                    title: "Affordable Packages",
                    description: "Best price plans without compromising on quality."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/20 hover:border-white/40 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors duration-300">
                        {feature.number}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-12 grid grid-cols-3 gap-6 text-center"
              >
                {[
                  { number: "10K+", label: "Happy Travelers" },
                  { number: "500+", label: "Destinations" },
                  { number: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Video Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
                {/* Video Player */}
                <div className="aspect-w-16 aspect-h-9">
                  <video
                    className="w-full h-full object-cover"
                    poster="/images/video-thumbnail.jpg"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source src="/videos/why-choose-us.mp4" type="video/mp4" />
                    <source src="/videos/why-choose-us.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-lg font-medium">Watch our story</p>
                  <p className="text-white/80 text-sm">See how we make travel planning effortless</p>
                </div>
              </div>

              {/* Video Caption */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center mt-6 text-gray-600 text-lg"
              >
                Watch how Raahein makes your journey unforgettable
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-sky-50 via-blue-50 to-teal-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          {/* Animated waves */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/20 to-transparent"></div>
          
          {/* Floating elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-sky-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="waves" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0 10 Q 5 5, 10 10 T 20 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#waves)" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-sky-100 text-sky-600 font-semibold tracking-wider uppercase text-sm mb-4">
              Travel Stories
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Travelers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from our satisfied customers who have explored the world with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Honeymoon Traveler",
                image: "/images/testimonial-1.jpg",
                rating: 5,
                review: "Travel Mate made planning our honeymoon to Bali absolutely seamless. The personalized recommendations were spot on!",
                location: "Bali, Indonesia"
              },
              {
                name: "Michael Chen",
                role: "Adventure Seeker",
                image: "/images/testimonial-2.jpg",
                rating: 5,
                review: "The real-time assistance feature saved us during our trip to Tokyo. Amazing service and support!",
                location: "Tokyo, Japan"
              },
              {
                name: "Emma Davis",
                role: "Solo Traveler",
                image: "/images/testimonial-3.jpg",
                rating: 5,
                review: "I've used many travel platforms, but Travel Mate's custom itineraries are truly exceptional. Highly recommended!",
                location: "Paris, France"
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:border-sky-200/50 hover:-translate-y-1"
              >
                {/* Rating Stars */}
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-gray-600 mb-6 relative">
                  <svg className="absolute -top-2 -left-2 w-8 h-8 text-sky-200" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-lg leading-relaxed">{testimonial.review}</p>
                </blockquote>

                {/* User Info */}
                <div className="flex items-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-teal-400 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <svg className="w-4 h-4 mr-1 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WAPI Trip Planner Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Main Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100"></div>
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="travel-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0 10 Q 5 5, 10 10 T 20 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  <circle cx="10" cy="10" r="1" fill="currentColor"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#travel-pattern)" />
            </svg>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0">
            {/* Floating Plane */}
            <motion.div
              animate={{
                x: ["-100%", "100%"],
                y: ["0%", "20%", "0%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/4 w-16 h-16"
            >
              <svg className="w-full h-full text-primary/20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </motion.div>

            {/* Floating Elements */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`
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
                  i % 2 === 0 ? 'bg-primary/10' : 'bg-blue-500/10'
                }`}>
                  <span className="text-2xl">
                    {['✈', '🌍', '🗺', '🎒', '🏖', '🏔', '🗽', '🎡'][i]}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Animated Circles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`circle-${i}`}
                className="absolute rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20"
                style={{
                  width: `${(i + 1) * 200}px`,
                  height: `${(i + 1) * 200}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 2,
                }}
              />
            ))}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-white/80"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary font-semibold tracking-wider uppercase text-sm mb-4">
              AI-Powered Travel Planning
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Not Sure Where to Go?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                WAPI's Got You!
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Torn between the mountains or beaches? Don't know your budget or what to pack? 
              Let our AI travel genie – WAPI – design the perfect trip for you!
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Can't decide the destination?",
                description: "Let WAPI analyze your preferences and suggest the perfect destination for your next adventure."
              },
              {
                title: "Confused about the budget?",
                description: "Get personalized budget recommendations based on your travel style and preferences."
              },
              {
                title: "Need a full travel plan?",
                description: "From flights to activities, WAPI creates a complete itinerary tailored just for you."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/50 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                  "0 0 0 10px rgba(59, 130, 246, 0.1)",
                  "0 0 0 0 rgba(59, 130, 246, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Link
                href="/planner"
                className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white rounded-full overflow-hidden"
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary group-hover:from-blue-500 group-hover:via-primary group-hover:to-blue-500 transition-all duration-500"></div>
                
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                
                {/* Button Content */}
                <span className="relative flex items-center">
                  Let WAPI Build My Trip
                </span>

                {/* Button Border Glow */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"></div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/footer-bg.jpg"
            alt="Footer Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/60"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Raahein</h3>
              <p className="text-gray-300 leading-relaxed">
                Your ultimate travel companion for unforgettable adventures around the world. We make travel planning effortless and enjoyable.
              </p>
              {/* Social Media Links */}
              <div className="flex space-x-4">
                {[
                  {
                    name: "Facebook",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                    ),
                    url: "#"
                  },
                  {
                    name: "Instagram",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                      </svg>
                    ),
                    url: "#"
                  },
                  {
                    name: "Twitter",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                      </svg>
                    ),
                    url: "#"
                  },
                  {
                    name: "LinkedIn",
                    icon: (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    ),
                    url: "#"
                  }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="group relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-full blur-sm group-hover:bg-white/20 transition-all duration-300"></div>
                    <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                      <span className="text-white group-hover:text-primary transition-colors duration-300">
                        {social.icon}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-6">Explore</h4>
                <ul className="space-y-4">
                  {[
                    { name: "Destinations", url: "/destinations" },
                    { name: "Travel Guides", url: "/guides" },
                    { name: "Travel Tips", url: "/tips" },
                    { name: "Best Time to Visit", url: "/best-time" }
                  ].map((link, index) => (
                    <li key={index}>
                      <Link href={link.url} className="text-gray-300 hover:text-white transition-colors duration-300">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-6">Company</h4>
                <ul className="space-y-4">
                  {[
                    { name: "About Us", url: "/about" },
                    { name: "Contact", url: "/contact" },
                    { name: "Careers", url: "/careers" },
                    { name: "Blog", url: "/blog" }
                  ].map((link, index) => (
                    <li key={index}>
                      <Link href={link.url} className="text-gray-300 hover:text-white transition-colors duration-300">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Address</h5>
                    <p className="text-gray-300">123 Travel Street, Adventure City, AC 12345</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Email</h5>
                    <p className="text-gray-300">hello@raahein.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Phone</h5>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Raahein. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      
     
    </div>
  );
}