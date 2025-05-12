'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, loginWithGoogle } from '../../firebase/auth'; // function to create user in Firebase
import { auth } from '../../firebase/config';
import axios from '../../lib/axios';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      // 1. Create user in Firebase Auth
      await register(form.email, form.password);
      const user = auth.currentUser;
      const token = await user.getIdToken();
      // 2. Send user info to backend to store in MongoDB
      await axios.post('/user', {
        name: form.name,
        email: form.email,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/dashboard');
    } catch (err) {
      alert('Registration failed');
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
      // Send user info to backend
      await axios.post('/user', {
        name: user.displayName,
        email: user.email,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/dashboard');
    } catch (err) {
      alert('Google sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px #eee', marginTop: 64 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Register</h1>
      <button
        onClick={handleGoogleRegister}
        style={{ width: '100%', background: '#fff', color: '#333', border: '1px solid #ddd', padding: 12, borderRadius: 6, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        disabled={loading}
      >
        <img src="/google.svg" alt="Google" width={20} height={20} /> Continue with Google
      </button>
      <div style={{ textAlign: 'center', margin: '16px 0', color: '#888' }}>or</div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ddd' }}
        required
        disabled={loading}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ddd' }}
        required
        disabled={loading}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        style={{ width: '100%', padding: 10, marginBottom: 20, borderRadius: 6, border: '1px solid #ddd' }}
        required
        disabled={loading}
      />
      <button
        onClick={handleRegister}
        style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 'bold' }}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        Already have an account? <a href="/login" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Login</a>
      </div>
    </div>
  );
}