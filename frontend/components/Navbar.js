'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { auth } from '../firebase/config';

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

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Updated Logo */}
          <div className="text-3xl font-extrabold text-indigo-600 tracking-wide italic cursor-pointer select-none">
            Raahein<span className="text-sm font-light text-gray-600 ml-1">— your travel guide</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="nav-link">About Us</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Get in Touch</button>
            {!user ? (
              <>
                <Link href="/login" className="btn-secondary">Login</Link>
                <Link href="/register" className="btn-secondary">Signup</Link>
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
                <button onClick={() => { scrollToSection('about'); setIsMobileMenuOpen(false); }} className="nav-link text-left">About Us</button>
                <button onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }} className="nav-link text-left">Get in Touch</button>
                {!user ? (
                  <>
                    <Link href="/login" className="btn-secondary w-full text-center">Login</Link>
                    <Link href="/register" className="btn-secondary w-full text-center">Signup</Link>
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
    </header>
  );
}
