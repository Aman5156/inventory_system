import api from './api';

export async function fetchCustomers() {
  const res = await api.get('/customers');
  return res.data;
}

export async function createCustomer(payload) {
  const res = await api.post('/customers', payload);
  return res.data;
}

