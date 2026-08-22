import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      // Try finding by slug first, then ID
      let { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
      if (error || !data) {
        let { data: dataById } = await supabase.from('products').select('*').eq('id', slug).single();
        data = dataById;
      }
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [slug]);

  if (loading) return <div className="container mx-auto p-20 text-center">Loading...</div>;
  if (!product) return <div className="container mx-auto p-20 text-center">Product not found.</div>;

  return (
    <div className="container mx-auto p-8 lg:p-16 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="bg-white p-2 border border-gray-100">
            <img src={product.image_url} alt={product.name} className="w-full h-auto" />
        </div>
        
        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-muted-gray uppercase tracking-widest text-sm mb-4">{product.category}</p>
          <h1 className="text-5xl font-serif text-espresso mb-6">{product.name}</h1>
          <p className="text-2xl font-semibold text-champagne mb-8">${Number(product.price).toFixed(2)}</p>
          <p className="text-gray-600 mb-8 leading-relaxed font-light">{product.description}</p>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center border border-espresso">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-4">-</button>
                <span className="font-bold px-6">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-6 py-4">+</button>
            </div>
            <button 
                onClick={() => {
                    for(let i=0; i<quantity; i++) addToCart({id: product.id, name: product.name, price: Number(product.price)});
                    alert('Added to cart!');
                }}
                className="flex-grow bg-espresso text-white py-4 uppercase tracking-widest hover:bg-champagne transition-colors"
            >
                Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
