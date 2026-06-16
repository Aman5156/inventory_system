import { useState } from 'react';
import { createCustomer } from '../services/customerService';
import React from 'react';
export default function CustomerForm({
  mode = 'create',
  onCreated,
  setError,
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError?.('');
      const payload = {
        email: email.trim(),
        name: name.trim(),
      };

      if (!payload.email || !payload.name) {
        setError?.('Provide valid Email and Name');
        return;
      }

      await createCustomer(payload);
      setEmail('');
      setName('');
      onCreated?.();
    } catch (err) {
      setError?.(err?.response?.data?.detail?.toString?.() || err?.message || 'Failed to create customer');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 12, border: '1px solid #eaeaea', borderRadius: 10, marginTop: 8 }}>
      <h2 style={{ fontSize: 16, margin: '0 0 12px' }}>Create customer</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
      </div>
      <button style={{ marginTop: 12 }} type="submit">
        Create
      </button>
    </form>
  );
}

