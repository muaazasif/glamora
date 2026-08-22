import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-sm mt-20">
      <h1 className="text-3xl font-serif font-bold mb-8">Admin Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="border p-2 rounded" onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" className="border p-2 rounded" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-espresso text-white p-2 rounded hover:bg-champagne transition">Login</button>
      </form>
    </div>
  );
}
