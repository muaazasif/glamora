import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  slug: string;
}

export default function Shop() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*');
    setProducts(data || []);
  }

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const handleAddToCart = (product: { id: string; name: string; price: number }) => {
    const qty = quantities[product.id] || 1;
    for (let i = 0; i < qty; i++) {
        addToCart(product);
    }
  };

  return (
    <div className="container mx-auto p-8 fade-in">
      <h1 className="text-5xl font-extrabold mb-16 text-center text-espresso uppercase tracking-widest font-serif">Our Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product) => (
          <div key={product.id} className="group p-2 bg-white border border-gray-100 hover-lift flex flex-col">
            <Link to={`/product/${product.slug || product.id}`} className="block overflow-hidden flex-shrink-0">
                <img src={product.image_url} alt={product.name} className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105" />
            </Link>
            <div className="p-6 text-center flex flex-col flex-grow">
                <Link to={`/product/${product.slug || product.id}`} className="block mb-2">
                  <h2 className="text-xl font-medium tracking-wide uppercase font-serif hover:text-champagne transition">{product.name}</h2>
                </Link>
                <p className="text-sm text-gray-500 mb-4 tracking-tight font-light flex-grow">{product.description}</p>
                <p className="text-lg font-semibold mb-6 text-champagne tracking-widest">PKR {Number(product.price).toLocaleString()}</p>
                
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button onClick={() => handleQuantityChange(product.id, -1)} className="px-3 py-1 border">-</button>
                  <span className="font-bold">{quantities[product.id] || 1}</span>
                  <button onClick={() => handleQuantityChange(product.id, 1)} className="px-3 py-1 border">+</button>
                </div>

                <button 
                onClick={() => handleAddToCart({ id: product.id, name: product.name, price: Number(product.price) })}
                className="w-full border border-espresso text-espresso py-3 uppercase tracking-widest text-sm hover:bg-espresso hover:text-white transition-colors duration-300 mt-auto"
                >
                Add to Cart
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
