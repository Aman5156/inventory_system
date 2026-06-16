import api from './api';

export async function createOrder(payload) {
  // payload: { customer_email: string, items: [{ sku: string, quantity: number }] }
  const res = await api.post('/orders', payload);
  return res.data;
}

export async function fetchOrder(orderId) {
  const res = await api.get(`/orders/${orderId}`);
  return res.data;
}

