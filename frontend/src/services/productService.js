import api from './api';

export async function fetchProducts() {
  const res = await api.get('/products');
  return res.data;
}

export async function createProduct(payload) {
  const res = await api.post('/products', payload);
  return res.data;
}

