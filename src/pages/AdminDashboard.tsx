import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface Order {
  id: string;
  customer_name: string;
  total: number;
  status: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Product form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate]);

  async function fetchData() {
    const { data: productsData } = await supabase.from('products').select('*');
    setProducts(productsData || []);
    
    // Simulating fetching orders if table doesn't exist yet, 
    // in real scenario use: await supabase.from('orders').select('*')
    setOrders([
        { id: '1', customer_name: 'John Doe', total: 120, status: 'Pending' },
        { id: '2', customer_name: 'Jane Smith', total: 85, status: 'Completed' }
    ]);
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchData();
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return;

    const fileName = `${Math.random()}-${imageFile.name}`;
    await supabase.storage.from('products').upload(fileName, imageFile);
    const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);

    await supabase.from('products').insert([{ name, description, price: parseFloat(price), image_url: publicUrl }]);
    alert('Product added!');
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-espresso">Admin Portal</h1>
        <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/admin/login'); }} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
      </div>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setActiveTab('products')} className={`px-6 py-2 rounded-full ${activeTab === 'products' ? 'bg-espresso text-white' : 'bg-white border'}`}>Products</button>
        <button onClick={() => setActiveTab('orders')} className={`px-6 py-2 rounded-full ${activeTab === 'orders' ? 'bg-espresso text-white' : 'bg-white border'}`}>Orders</button>
      </div>

      {activeTab === 'products' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={addProduct} className="bg-white p-6 rounded-xl shadow border border-champagne">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <input className="w-full border p-2 mb-3 rounded" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
            <textarea className="w-full border p-2 mb-3 rounded" placeholder="Desc" onChange={(e) => setDescription(e.target.value)} />
            <input type="number" className="w-full border p-2 mb-3 rounded" placeholder="Price" onChange={(e) => setPrice(e.target.value)} required />
            <input type="file" className="w-full mb-4" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} required />
            <button className="w-full bg-espresso text-white py-2 rounded">Save Product</button>
          </form>

          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
            <table className="w-full">
              <thead><tr className="text-left border-b"><th>Product</th><th>Price</th><th>Action</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b">
                    <td className="py-3">{p.name}</td>
                    <td>${p.price}</td>
                    <td><button onClick={() => deleteProduct(p.id)} className="text-red-500">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow">
            <table className="w-full">
              <thead><tr className="text-left border-b"><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-b">
                    <td className="py-3">{o.id}</td>
                    <td>{o.customer_name}</td>
                    <td>${o.total}</td>
                    <td><span className={`px-2 py-1 rounded text-sm ${o.status === 'Completed' ? 'bg-green-100' : 'bg-yellow-100'}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      )}
    </div>
  );
}
