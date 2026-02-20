import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCart } from '../lib/api';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      loadCartCount();
    }
  }, []);

  const loadCartCount = async () => {
    try {
      const res = await getCart();
      setCartCount(res.data.count);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            Магазин
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-8">
            <input
              type="search"
              placeholder="Поиск товаров..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link href="/catalog" className="hover:text-primary">
              Каталог
            </Link>

            {isLoggedIn ? (
              <>
                <Link href="/profile" className="hover:text-primary">
                  Профиль
                </Link>
                <Link href="/cart" className="relative hover:text-primary">
                  🛒 Корзина
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-teal-600">
                Войти
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
