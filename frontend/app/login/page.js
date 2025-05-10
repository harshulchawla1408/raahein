'use client';

import { login } from '../../firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
