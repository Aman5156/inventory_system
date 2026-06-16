import { useEffect, useState } from 'react';
import { fetchCustomers } from '../services/customerService';
import CustomerForm from '../components/CustomerForm';
import React from 'react';
export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  const loadCustomers = async () => {
    try {
      setError('');
      const data = await fetchCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.response?.data?.detail?.toString?.() || e?.message || 'Failed to load customers');
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <section>
      <h1 style={{ marginTop: 0 }}>Customers</h1>
      <CustomerForm
        mode="create"
        onCreated={async () => {
          await loadCustomers();
        }}
        setError={setError}
      />

      {error ? <div style={{ color: 'crimson', marginTop: 12 }}>{error}</div> : null}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Email</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Name</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>{c.email}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>{c.name}</td>
            </tr>
          ))}
          {!customers.length ? (
            <tr>
              <td colSpan={2} style={{ padding: 12, color: '#666' }}>
                No customers yet.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </section>
  );
}

