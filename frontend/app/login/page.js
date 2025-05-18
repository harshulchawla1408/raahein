'use client';

import { login, loginWithGoogle } from '../../firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from '../../lib/axios';
import { auth } from '../../firebase/config';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      const user = auth.currentUser;
      const token = await user.getIdToken();
      await axios.post('/user', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/dashboard');
    } catch (err) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      const user = auth.currentUser;
      const token = await user.getIdToken();
      await axios.post('/user', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/dashboard');
    } catch (err) {
      alert('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Blurred background image */}
      <Image
        src="/images/login.jpg"
        alt="Background"
        fill
        className="object-cover blur-sm"
        priority
      />

      {/* Semi-transparent white overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left side - Login form */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="flex items-center gap-2 mb-12">
            <h1 className="text-2xl font-bold text-gray-800">RAAHEIN</h1>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-800">Journey Begins</h2>
          <p className="text-gray-600 mb-6">Sign in with your account</p>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3 px-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors mb-6"
            disabled={loading}
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            Sign in with Google
          </button>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="bg-white px-4 text-gray-500 text-sm">or</span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                disabled={loading}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 block text-right">
              Forgot password?
            </Link>

            <button
              onClick={handleLogin}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Log In'}
            </button>
          </div>

          <p className="text-center mt-6 text-gray-600">
            New to Raahein?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
              Create an account
            </Link>
          </p>
        </div>

        {/* Right side - Hero section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 border-10 border-white rounded-r-2xl overflow-hidden">
            <Image
              src="/images/login.jpg"
              alt="Sunrise over mountains"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-white text-center px-12">
                <h1 className="text-4xl font-bold mb-4">Wander, Explore, Experience.</h1>
                <p className="text-xl">Escape the Ordinary, Embrace the Journey!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
