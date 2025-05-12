'use client';

import { login, loginWithGoogle } from '../../firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from '../../lib/axios';
import { auth } from '../../firebase/config';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      const user = auth.currentUser;
      const token = await user.getIdToken();
      // Sync user to backend
      await axios.post('/user', {}, {
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push('/dashboard');
    } catch (err) {
      alert('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px #eee', marginTop: 64 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h1>
      <button
        onClick={handleGoogleLogin}
        style={{ width: '100%', background: '#fff', color: '#333', border: '1px solid #ddd', padding: 12, borderRadius: 6, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        disabled={loading}
      >
        <img src="/google.svg" alt="Google" width={20} height={20} /> Continue with Google
      </button>
      <div style={{ textAlign: 'center', margin: '16px 0', color: '#888' }}>or</div>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        style={{ width: '100%', padding: 10, marginBottom: 12, borderRadius: 6, border: '1px solid #ddd' }}
        disabled={loading}
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        style={{ width: '100%', padding: 10, marginBottom: 20, borderRadius: 6, border: '1px solid #ddd' }}
        disabled={loading}
      />
      <button
        onClick={handleLogin}
        style={{ width: '100%', background: '#3b82f6', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 'bold' }}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        Don't have an account? <a href="/register" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Register</a>
      </div>
    </div>
  );
}

