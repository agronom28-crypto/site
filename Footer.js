export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">О магазине</h3>
            <p className="text-gray-400">
              Интернет-магазин качественных товаров с доставкой по всей России
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Покупателям</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Доставка</a></li>
              <li><a href="#" className="hover:text-white">Оплата</a></li>
              <li><a href="#" className="hover:text-white">Гарантия</a></li>
              <li><a href="#" className="hover:text-white">Возврат</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +7 (XXX) XXX-XX-XX</li>
              <li>✉️ info@shop.ru</li>
              <li>📍 Москва, ул. Примерная, д. 1</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Соцсети</h3>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-primary">📱</a>
              <a href="#" className="hover:text-primary">📘</a>
              <a href="#" className="hover:text-primary">📷</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Интернет-магазин. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
