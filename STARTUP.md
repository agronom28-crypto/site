# 🚀 ИНСТРУКЦИЯ ПО ЗАПУСКУ

## 📋 Предварительные требования

- Docker и Docker Compose установлены
- Git (опционально)

## 🔧 Шаг 1: Настройка окружения

```bash
cd ecommerce-shop/backend
cp .env.example .env
```

Отредактируйте `.env` файл:
- Смените `SECRET_KEY` на случайную строку (минимум 32 символа)
- Настройте SMTP для отправки email (или оставьте как есть для тестирования)
- При необходимости настройте платежную систему

## 🐳 Шаг 2: Запуск через Docker

```bash
cd ecommerce-shop
docker-compose up -d
```

Подождите пока все контейнеры запустятся (30-60 секунд).

## 🗄️ Шаг 3: Инициализация базы данных

### Создание миграций
```bash
docker-compose exec backend alembic revision --autogenerate -m "Initial migration"
```

### Применение миграций
```bash
docker-compose exec backend alembic upgrade head
```

### Создание суперпользователя
```bash
docker-compose exec backend python -m app.db.init_db
```

Будет создан админ:
- Email: admin@example.com
- Пароль: changethis123

## ✅ Шаг 4: Проверка

Откройте в браузере:
- **API Docs**: http://localhost:8000/docs
- **API**: http://localhost:8000/api/v1
- **Health Check**: http://localhost:8000/health

## 📦 Шаг 5: Добавление тестовых данных

### Через API Docs (http://localhost:8000/docs):

1. **Авторизуйтесь**:
   - Откройте `/api/v1/auth/login`
   - Нажмите "Try it out"
   - Введите:
     - username: admin@example.com
     - password: changethis123
   - Скопируйте `access_token`
   - Нажмите кнопку "Authorize" вверху страницы
   - Вставьте токен

2. **Создайте категорию**:
   - POST `/api/v1/categories`
   ```json
   {
     "name": "Электроника",
     "slug": "electronics",
     "description": "Электронные товары",
     "order": 1
   }
   ```

3. **Создайте товар**:
   - POST `/api/v1/products`
   ```json
   {
     "name": "Смартфон",
     "slug": "smartphone-1",
     "description": "Современный смартфон",
     "price": 25000,
     "stock": 10,
     "category_id": 1,
     "manufacturer": "TechBrand",
     "sku": "SMART001"
   }
   ```

## 🎨 Шаг 6: Запуск Frontend (опционально)

Если хотите использовать Next.js фронтенд:

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен на http://localhost:3000

## 📊 Полезные команды

### Просмотр логов
```bash
docker-compose logs -f backend
docker-compose logs -f celery_worker
```

### Остановка
```bash
docker-compose down
```

### Перезапуск
```bash
docker-compose restart backend
```

### Доступ к базе данных
```bash
docker-compose exec db psql -U ecommerce_user -d ecommerce_db
```

### Выполнение команд Python
```bash
docker-compose exec backend python -c "print('Hello')"
```

## 🔐 Тестирование API

### Регистрация пользователя
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "full_name": "Test User"
  }'
```

### Получение товаров
```bash
curl http://localhost:8000/api/v1/products
```

### Получение категорий
```bash
curl http://localhost:8000/api/v1/categories
```

## 🐛 Решение проблем

### База данных не запускается
```bash
docker-compose down -v
docker-compose up -d db
# Подождите 10 секунд
docker-compose up -d
```

### Ошибки миграций
```bash
docker-compose exec backend alembic downgrade base
docker-compose exec backend alembic upgrade head
```

### Порты заняты
Измените порты в `docker-compose.yml`:
```yaml
ports:
  - "8001:8000"  # Вместо 8000:8000
```

## 📱 Структура API

### Авторизация
- `POST /api/v1/auth/register` - Регистрация
- `POST /api/v1/auth/login` - Вход
- `GET /api/v1/auth/me` - Текущий пользователь

### Товары
- `GET /api/v1/products` - Список товаров (с фильтрами)
- `GET /api/v1/products/{id}` - Товар по ID
- `POST /api/v1/products` - Создать товар (admin)
- `PUT /api/v1/products/{id}` - Обновить (admin)
- `DELETE /api/v1/products/{id}` - Удалить (admin)

### Категории
- `GET /api/v1/categories` - Список категорий
- `GET /api/v1/categories/{id}` - Категория по ID
- `POST /api/v1/categories` - Создать (admin)

### Корзина
- `GET /api/v1/cart` - Моя корзина
- `POST /api/v1/cart/add/{product_id}` - Добавить товар
- `PUT /api/v1/cart/update/{item_id}` - Изменить количество
- `DELETE /api/v1/cart/remove/{item_id}` - Удалить товар
- `DELETE /api/v1/cart/clear` - Очистить корзину

### Заказы
- `POST /api/v1/orders/create` - Создать заказ
- `GET /api/v1/orders` - Мои заказы
- `GET /api/v1/orders/{id}` - Заказ по ID
- `POST /api/v1/orders/{id}/repeat` - Повторить заказ

### Отзывы
- `GET /api/v1/reviews/product/{id}` - Отзывы товара
- `POST /api/v1/reviews` - Создать отзыв
- `GET /api/v1/reviews/my` - Мои отзывы

## 🎯 Следующие шаги

1. ✅ Добавьте товары и категории через API
2. ✅ Протестируйте создание заказа
3. ✅ Настройте email-уведомления
4. ✅ Интегрируйте платежную систему
5. ✅ Разверните на сервере (VPS/Cloud)

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `docker-compose logs`
2. Убедитесь что все контейнеры запущены: `docker-compose ps`
3. Проверьте .env файл

Удачи! 🚀
