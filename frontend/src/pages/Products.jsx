import { useEffect, useMemo, useState } from 'react';
import { fetchProducts, createProduct } from '../services/productService';
import ProductForm from '../components/ProductForm';
import React from 'react';
export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const loadProducts = async () => {
    try {
      setError('');
      const data = await fetchProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.response?.data?.detail?.toString?.() || e?.message || 'Failed to load products');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section>
      <h1 style={{ marginTop: 0 }}>Products</h1>
      <ProductForm
        mode="create"
        onCreated={async () => {
          await loadProducts();
        }}
        setError={setError}
      />

      {error ? <div style={{ color: 'crimson', marginTop: 12 }}>{error}</div> : null}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>SKU</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Name</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Price</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>{p.sku}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>{p.name}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>
                {p.price}
              </td>
              <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>
                {p.stock}
              </td>
            </tr>
          ))}
          {!products.length ? (
            <tr>
              <td colSpan={4} style={{ padding: 12, color: '#666' }}>
                No products yet.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </section>
  );
}

