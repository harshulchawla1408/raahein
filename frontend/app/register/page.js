'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../../firebase/auth'; // function to create user in Firebase
import { auth } from '../../firebase/config';
import axios from '../../lib/axios';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    try {
      setLoading(true);

      // 1. Create user in Firebase Auth
      await register(form.email, form.password);

      const user = auth.currentUser;
      const token = await user.getIdToken();

      // 2. Send user info to backend to store in MongoDB
      await axios.post('/auth/register', {
        name: form.name,
        email: form.email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 3. Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      /><br />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      /><br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      /><br />
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </div>
  );
}