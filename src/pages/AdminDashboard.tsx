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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin/login');
      return;
    }
    fetchProducts();
  }, [navigate]);

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*');
    setProducts(data || []);
  }

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
        alert('Please select an image');
        return;
    }

    // 1. Upload image to storage
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, imageFile);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    // 2. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(fileName);

    // 3. Insert product
    const { error } = await supabase.from('products').insert([
      { name, description, price: parseFloat(price), image_url: publicUrl }
    ]);
    
    if (error) alert(error.message);
    else {
      alert('Product added!');
      setName(''); setDescription(''); setPrice(''); setImageFile(null);
      fetchProducts();
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-espresso">CMS Portal</h1>
        <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/admin/login'); }} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={addProduct} className="bg-cream p-6 rounded-lg border border-champagne">
          <h2 className="text-2xl font-bold mb-4 text-espresso">Add New Product</h2>
          <input type="text" placeholder="Product Name" className="w-full border p-3 rounded mb-4" value={name} onChange={(e) => setName(e.target.value)} required />
          <textarea placeholder="Description" className="w-full border p-3 rounded mb-4" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="number" placeholder="Price" className="w-full border p-3 rounded mb-4" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <input type="file" accept="image/*" className="w-full border p-3 rounded mb-4" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} required />
          <button type="submit" className="w-full bg-espresso text-white py-3 rounded font-bold hover:bg-champagne transition">Add Product</button>
        </form>
        <div>
          <h2 className="text-2xl font-bold mb-4">Product Inventory</h2>
          <div className="space-y-4">
            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-4 border p-4 rounded">
                <img src={p.image_url} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-bold">{p.name}</p>
                  <p className="text-sm text-gray-500">${p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
