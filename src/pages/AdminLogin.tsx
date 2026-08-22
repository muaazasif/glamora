import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else navigate('/admin/dashboard');
  };

  return (
    <div className="container mx-auto p-4 max-w-sm">
      <h1 className="text-3xl font-bold mb-8">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="border p-2" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="border p-2" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-brand-charcoal text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
