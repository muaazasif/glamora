import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import CartDrawer from './storefront/CartDrawer';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-ivory/80 backdrop-blur-md border-b border-soft-nude' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <img src={logo} alt="Aurelia Beauté" className="h-8 md:h-12 w-auto object-contain" />
          </a>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-espresso font-medium">
            <li><a href="/shop" className="hover:text-champagne transition">Shop</a></li>
            <li><a href="#" className="hover:text-champagne transition">New</a></li>
            <li><a href="#" className="hover:text-champagne transition">Best Sellers</a></li>
            <li><a href="#" className="hover:text-champagne transition">Skincare</a></li>
            <li><a href="#" className="hover:text-champagne transition">Makeup</a></li>
          </ul>

          <div className="flex gap-4 md:gap-6 text-espresso">
              <Search className="w-5 h-5 cursor-pointer hover:text-champagne transition" />
              <User className="w-5 h-5 cursor-pointer hover:text-champagne transition" />
              <Heart className="hidden md:block w-5 h-5 cursor-pointer hover:text-champagne transition" />
              <div className='relative cursor-pointer' onClick={() => setIsCartOpen(true)}>
                  <ShoppingBag className="w-5 h-5 hover:text-champagne transition" />
                  {totalItems > 0 && (
                    <span className='absolute -top-2 -right-2 bg-espresso text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center'>
                      {totalItems}
                    </span>
                  )}
              </div>
              <Menu className="md:hidden w-5 h-5 cursor-pointer hover:text-champagne transition" />
          </div>
        </div>
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
