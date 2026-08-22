import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-ivory shadow-2xl z-[70] p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif text-espresso uppercase tracking-widest">Your Bag</h2>
              <button onClick={onClose}><X className="w-6 h-6" /></button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20 text-muted-gray">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Your bag is currently empty.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-espresso">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-champagne">PKR {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs underline text-gray-400">Remove</button>
                  </div>
                ))}
                <div className="border-t pt-6 mt-6">
                  <div className="flex justify-between text-lg font-bold text-espresso mb-6">
                    <span>Subtotal</span>
                    <span>PKR {total.toLocaleString()}</span>
                  </div>
                  <a href="/checkout" className="block text-center w-full bg-espresso text-white py-4 uppercase tracking-widest hover:bg-champagne transition-colors">
                    Checkout
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
