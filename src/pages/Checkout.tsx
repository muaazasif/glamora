import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  console.log("Cart in Checkout:", cart); // Debugging
  const shippingFee = 200;
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
  const total = subtotal + shippingFee;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = {
        customer_name: formData.name,
        customer_email: formData.email,
        total_amount: total,
        items: cart,
        status: 'Pending'
    };

    const { error } = await supabase.from('orders').insert([orderData]);

    if (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
    } else {
        alert('Order placed successfully! Thank you for choosing Aurelia Beauté. (Cash on Delivery)');
        clearCart(); // Clear the cart
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl fade-in">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-espresso uppercase tracking-widest font-serif">Secure Checkout</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 border border-gray-100 shadow-sm">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-serif text-espresso uppercase tracking-widest mb-2">Shipping Information</h2>
          <input type="text" name="name" placeholder="Full Name" className="border-b p-3 outline-none focus:border-champagne" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" className="border-b p-3 outline-none focus:border-champagne" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" className="border-b p-3 outline-none focus:border-champagne" onChange={handleChange} required />
          <input type="text" name="address" placeholder="Shipping Address" className="border-b p-3 outline-none focus:border-champagne" onChange={handleChange} required />
          <input type="text" name="postalCode" placeholder="Postal Code" className="border-b p-3 outline-none focus:border-champagne" onChange={handleChange} required />
        </div>
        
        <div className="bg-ivory p-6">
          <h2 className="text-xl font-serif text-espresso uppercase tracking-widest mb-6">Order Summary</h2>
          <div className="flex flex-col gap-4 mb-6">
            {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity} x {item.name}</span>
                    <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
            ))}
          </div>
          <div className="flex justify-between text-sm pt-4 border-t border-gray-300">
            <span>Subtotal</span>
            <span>PKR {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>PKR {shippingFee.toLocaleString()}</span>
          </div>
          <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-bold text-espresso mt-2">
            <span>Total</span>
            <span>PKR {total.toLocaleString()}</span>
          </div>
          <div className="mt-8">
            <p className="text-xs text-gray-500 mb-4">Payment Method: Cash on Delivery (COD)</p>
            <button type="submit" className="w-full bg-espresso text-white py-4 uppercase tracking-widest hover:bg-champagne transition-colors">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
