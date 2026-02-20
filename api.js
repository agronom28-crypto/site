import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products
export const getProducts = (params) => api.get('/products', { params });
export const getProduct = (id) => api.get(`/products/${id}`);

// Categories
export const getCategories = (parentId = null) => 
  api.get('/categories', { params: { parent_id: parentId } });

// Cart
export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity = 1) => 
  api.post(`/cart/add/${productId}`, { quantity });
export const updateCartItem = (itemId, quantity) => 
  api.put(`/cart/update/${itemId}`, { quantity });
export const removeFromCart = (itemId) => api.delete(`/cart/remove/${itemId}`);
export const clearCart = () => api.delete('/cart/clear');

// Orders
export const createOrder = (orderData) => api.post('/orders/create', orderData);
export const getOrders = () => api.get('/orders');
export const getOrder = (id) => api.get(`/orders/${id}`);
export const repeatOrder = (id) => api.post(`/orders/${id}/repeat`);

// Auth
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials, {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
export const getMe = () => api.get('/auth/me');

// Reviews
export const getProductReviews = (productId) => 
  api.get(`/reviews/product/${productId}`);
export const createReview = (reviewData) => api.post('/reviews', reviewData);

export default api;
