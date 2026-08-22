import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center border p-4">
              <span>{item.name}</span>
              <span>${item.price}</span>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
            </div>
          ))}
          <div className="text-xl font-bold mt-4">Total: ${total}</div>
          <a href="/checkout" className="bg-brand-charcoal text-white px-6 py-2 rounded">Checkout</a>
        </div>
      )}
    </div>
  );
}
