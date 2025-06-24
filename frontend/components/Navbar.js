'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { auth } from '../firebase/config';
import Image from 'next/image';

export default function Navbar({ scrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAvatarClick = () => {
    router.push('/dashboard');
    setIsMobileMenuOpen(false);
  };

  const Avatar = () => (
    <button
      onClick={handleAvatarClick}
      className="ml-4 focus:outline-none"
      aria-label="Go to dashboard"
    >
      <span className="inline-block w-10 h-10 rounded-full overflow-hidden border-2 border-primary bg-white">
        <img
          src={user?.photoURL || '/default-avatar.png'}
          alt={user?.displayName || 'User'}
          className="object-cover w-full h-full"
        />
      </span>
    </button>
  );

  // Animation variants for sticky background
  const bgVariants = {
    top: {
      backgroundColor: 'rgba(255,255,255,0)',
      boxShadow: '0 0 0 0 rgba(0,0,0,0)',
      backdropFilter: 'blur(0px)',
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
    sticky: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)',
      backdropFilter: 'blur(8px)',
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  return (
    <motion.header
      initial="top"
      animate={isScrolled ? 'sticky' : 'top'}
      variants={bgVariants}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`}
      style={{ willChange: 'background, box-shadow, backdrop-filter' }}
    >
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo Text */}
          <div className="flex items-center   cursor-pointer select-none">
            <span className="logo-text ">Raahein</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="nav-link drop-shadow-sm">About Us</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link drop-shadow-sm">Get in Touch</button>
            {!user ? (
              <>
                <Link href="/login" className="btn-secondary drop-shadow-sm">Login</Link>
                <Link href="/register" className="btn-secondary drop-shadow-sm">Signup</Link>
              </>
            ) : (
              <Avatar />
            )}
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
                <button onClick={() => { scrollToSection('about'); setIsMobileMenuOpen(false); }} className="nav-link text-left drop-shadow-sm">About Us</button>
                <button onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }} className="nav-link text-left drop-shadow-sm">Get in Touch</button>
                {!user ? (
                  <>
                    <Link href="/login" className="btn-secondary w-full text-center drop-shadow-sm">Login</Link>
                    <Link href="/register" className="btn-secondary w-full text-center drop-shadow-sm">Signup</Link>
                  </>
                ) : (
                  <div className="flex justify-end">
                    <Avatar />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
