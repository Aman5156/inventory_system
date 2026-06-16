import { useState } from 'react';
import OrderForm from '../components/OrderForm';
import React from 'react';
export default function Orders() {
  const [error, setError] = useState('');
  const [createdOrderId, setCreatedOrderId] = useState(null);

  return (
    <section>
      <h1 style={{ marginTop: 0 }}>Orders</h1>
      <OrderForm
        onCreated={(order) => {
          setCreatedOrderId(order?.id ?? null);
        }}
        setError={setError}
      />

      {error ? <div style={{ color: 'crimson', marginTop: 12 }}>{error}</div> : null}

      {createdOrderId ? (
        <div style={{ marginTop: 12, padding: 12, background: '#f6f6ff', borderRadius: 8 }}>
          Order created. ID: <strong>{createdOrderId}</strong>
        </div>
      ) : null}
    </section>
  );
}

