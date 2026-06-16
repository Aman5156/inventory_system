import { useMemo, useState } from 'react';
import { createOrder } from '../services/orderService';
import React from 'react';
export default function OrderForm({ onCreated, setError }) {
  const [customerEmail, setCustomerEmail] = useState('');
  const [sku1, setSku1] = useState('');
  const [qty1, setQty1] = useState('');
  const [sku2, setSku2] = useState('');
  const [qty2, setQty2] = useState('');

  const items = useMemo(() => {
    const out = [];
    const skuQty = [
      { sku: sku1, quantity: qty1 },
      { sku: sku2, quantity: qty2 },
    ];

    for (const it of skuQty) {
      const trimmedSku = it.sku.trim();
      if (!trimmedSku) continue;
      const quantityNum = Number(it.quantity);
      out.push({ sku: trimmedSku, quantity: quantityNum });
    }
    return out;
  }, [sku1, qty1, sku2, qty2]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError?.('');

      if (!customerEmail.trim()) {
        setError?.('Customer email is required');
        return;
      }
      if (!items.length) {
        setError?.('Add at least one item (SKU + quantity)');
        return;
      }
      if (items.some((i) => !i.sku || Number.isNaN(i.quantity) || i.quantity <= 0)) {
        setError?.('Each item must have SKU and a valid quantity (> 0)');
        return;
      }

      const order = await createOrder({
        customer_email: customerEmail.trim(),
        items,
      });

      onCreated?.(order);

      setCustomerEmail('');
      setSku1('');
      setQty1('');
      setSku2('');
      setQty2('');
    } catch (err) {
      const detail = err?.response?.data?.detail;
      if (typeof detail === 'object' && detail?.error === 'insufficient_stock') {
        setError?.(
          `Insufficient stock for SKU ${detail.sku}. Available: ${detail.available}, Requested: ${detail.requested}`
        );
      } else {
        setError?.(detail?.toString?.() || err?.message || 'Failed to create order');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 12, border: '1px solid #eaeaea', borderRadius: 10, marginTop: 8 }}>
      <h2 style={{ fontSize: 16, margin: '0 0 12px' }}>Create order</h2>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
        Customer email
        <input value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Item 1 - SKU
          <input value={sku1} onChange={(e) => setSku1(e.target.value)} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Item 1 - Quantity
          <input value={qty1} onChange={(e) => setQty1(e.target.value)} inputMode="numeric" />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Item 2 - SKU
          <input value={sku2} onChange={(e) => setSku2(e.target.value)} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Item 2 - Quantity
          <input value={qty2} onChange={(e) => setQty2(e.target.value)} inputMode="numeric" />
        </label>
      </div>

      <button style={{ marginTop: 12 }} type="submit">
        Create order
      </button>
    </form>
  );
}

