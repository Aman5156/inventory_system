import { useState } from 'react';
import { createProduct } from '../services/productService';
import React from 'react';
export default function ProductForm({
  mode = 'create',
  onCreated,
  setError,
}) {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError?.('');
      const payload = {
        sku: sku.trim(),
        name: name.trim(),
        price: Number(price),
        stock: Number(stock),
      };

      if (!payload.sku || !payload.name || Number.isNaN(payload.price) || Number.isNaN(payload.stock)) {
        setError?.('Provide valid SKU, Name, Price and Stock');
        return;
      }

      await createProduct(payload);
      setSku('');
      setName('');
      setPrice('');
      setStock('');
      onCreated?.();
    } catch (err) {
      setError?.(err?.response?.data?.detail?.toString?.() || err?.message || 'Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 12, border: '1px solid #eaeaea', borderRadius: 10, marginTop: 8 }}>
      <h2 style={{ fontSize: 16, margin: '0 0 12px' }}>Create product</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          SKU
          <input value={sku} onChange={(e) => setSku(e.target.value)} required />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Price
          <input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" required />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Stock
          <input value={stock} onChange={(e) => setStock(e.target.value)} inputMode="numeric" required />
        </label>
      </div>
      <button style={{ marginTop: 12 }} type="submit">
        Create
      </button>
    </form>
  );
}

