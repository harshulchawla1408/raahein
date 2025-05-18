'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, loginWithGoogle } from '../../firebase/auth';
import { auth } from '../../firebase/config';
import axios from '../../lib/axios';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.email, form.password);
      const user = auth.currentUser;
      const token = await user.getIdToken();
      await axios.post('/user', {
        name: form.name,
        email: form.email,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      alert(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      const user = auth.currentUser;
      const token = await user.getIdToken();
      await axios.post('/user', {
        name: user.displayName,
        email: user.email,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/dashboard');
    } catch (err) {
      console.error('Google sign-up error:', err);
      alert(err.response?.data?.error || 'Google sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden">
      
      {/* Background blurred image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/register.jpg"
          alt="Background"
          fill
          className="object-cover blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main content box */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="flex items-center gap-2 mb-12">
            {/* <Image src="/plane-icon.svg" alt="Raahein" width={24} height={24} /> */}
            <h1 className="text-2xl font-bold text-gray-800">RAAHEIN</h1>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Account</h2>
          <p className="text-gray-600 mb-6">Join us on this amazing journey</p>

          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3 px-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors mb-6"
            disabled={loading}
          >
            <Image src="/google.svg" alt="Google" width={20} height={20} />
            Sign up with Google
          </button>

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="bg-white px-4 text-gray-500 text-sm">or</span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              required
              disabled={loading}
              autoComplete="name"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              required
              disabled={loading}
              autoComplete="email"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all pr-12"
                required
                disabled={loading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign in
            </Link>
          </p>

          <p className="text-xs text-gray-500 text-center mt-4">
            By registering, you agree to Raahein's{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms & Conditions
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 border-10 border-white rounded-r-2xl overflow-hidden">
            <Image
              src="/images/register.jpg"
              alt="Travel destination"
              fill
              priority
              className="object-cover"
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
