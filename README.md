# 🛒 E-commerce Shop

Полнофункциональный интернет-магазин на FastAPI + Next.js

## Возможности

- ✅ Каталог товаров с фильтрацией и сортировкой
- ✅ Иерархические категории
- ✅ Корзина покупок
- ✅ Оформление заказов
- ✅ Личный кабинет
- ✅ История заказов
- ✅ Отзывы на товары
- ✅ Система скидок и промокодов
- ✅ Email-уведомления
- ✅ Админ-панель
- ✅ REST API

## Технологии

**Backend:**
- FastAPI
- PostgreSQL
- Redis
- Celery
- SQLAlchemy

**Frontend:**
- Next.js
- React
- TailwindCSS

## Быстрый старт

### 1. Клонируйте репозиторий

```bash
git clone <repo-url>
cd ecommerce-shop
```

### 2. Настройте переменные окружения

```bash
cd backend
cp .env.example .env
# Отредактируйте .env файл
```

### 3. Запустите через Docker

```bash
docker-compose up -d
```

### 4. Примените миграции

```bash
docker-compose exec backend alembic upgrade head
```

### 5. Создайте суперпользователя

```bash
docker-compose exec backend python -m app.db.init_db
```

### 6. Откройте в браузере

- API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Frontend: http://localhost:3000

## API Endpoints

### Товары
- `GET /api/v1/products` - список товаров
- `GET /api/v1/products/{id}` - товар по ID
- `POST /api/v1/products` - создать товар (admin)

### Категории
- `GET /api/v1/categories` - список категорий
- `GET /api/v1/categories/{id}/products` - товары категории

### Корзина
- `GET /api/v1/cart` - получить корзину
- `POST /api/v1/cart/add/{product_id}` - добавить товар
- `DELETE /api/v1/cart/clear` - очистить корзину

### Заказы
- `POST /api/v1/orders/create` - создать заказ
- `GET /api/v1/orders` - мои заказы
- `POST /api/v1/orders/{id}/repeat` - повторить заказ

### Авторизация
- `POST /api/v1/auth/register` - регистрация
- `POST /api/v1/auth/login` - вход
- `GET /api/v1/auth/me` - текущий пользователь

## Разработка

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # или venv\Scripts\activate на Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Структура проекта

```
ecommerce-shop/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── docker-compose.yml
│   └── requirements.txt
├── frontend/
│   ├── pages/
│   ├── components/
│   └── package.json
└── nginx/
```

## Лицензия

MIT
