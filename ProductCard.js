import Link from 'next/link';
import { addToCart } from '../lib/api';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      await addToCart(product.id, 1);
      alert('Товар добавлен в корзину');
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 h-full flex flex-col">
        {/* Image */}
        <div className="aspect-square bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
          {product.main_image ? (
            <img
              src={product.main_image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl">📦</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>

          {product.manufacturer && (
            <p className="text-sm text-gray-500 mb-2">
              {product.manufacturer}
            </p>
          )}

          <div className="mt-auto">
            {/* Price */}
            <div className="mb-3">
              {product.discount_price ? (
                <div>
                  <span className="text-2xl font-bold text-red-600">
                    {product.discount_price} ₽
                  </span>
                  <span className="text-gray-400 line-through ml-2">
                    {product.price} ₽
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">
                  {product.price} ₽
                </span>
              )}
            </div>

            {/* Stock status */}
            {product.stock > 0 ? (
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-teal-600 disabled:bg-gray-400 transition"
              >
                {adding ? 'Добавление...' : 'В корзину'}
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-600 py-2 rounded-lg cursor-not-allowed"
              >
                Нет в наличии
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
