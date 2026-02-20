import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getProducts, getCategories } from '../lib/api';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts({ limit: 8 }),
        getCategories()
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Интернет-магазин</title>
        <meta name="description" content="Интернет-магазин товаров" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-teal-600 text-white rounded-lg p-12 mb-12">
          <h1 className="text-4xl font-bold mb-4">Добро пожаловать в наш магазин</h1>
          <p className="text-xl mb-6">Широкий ассортимент качественных товаров</p>
          <Link href="/catalog" className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block">
            Перейти в каталог
          </Link>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(category => (
              <Link
                key={category.id}
                href={`/catalog/${category.slug}`}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
              >
                <div className="text-4xl mb-2">📦</div>
                <h3 className="font-semibold">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Products */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Популярные товары</h2>
          {loading ? (
            <div className="text-center py-12">Загрузка...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
