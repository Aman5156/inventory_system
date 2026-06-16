import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const cards = [
    {
      title: 'Products',
      description: 'Manage inventory items, stock levels, and product information.',
      path: '/products',
      icon: '📦',
      color: '#4F46E5',
    },
    {
      title: 'Customers',
      description: 'View and manage customer records and contact details.',
      path: '/customers',
      icon: '👥',
      color: '#10B981',
    },
    {
      title: 'Orders',
      description: 'Create orders and monitor order processing status.',
      path: '/orders',
      icon: '🛒',
      color: '#F59E0B',
    },
    {
      title: 'API Status',
      description: 'Connected to FastAPI backend and PostgreSQL database.',
      path: '/',
      icon: '⚡',
      color: '#EF4444',
    },
  ];

  return (
    <div style={{ padding: '10px' }}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          color: '#fff',
          padding: '40px',
          borderRadius: '20px',
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '36px',
            fontWeight: '700',
          }}
        >
          Inventory Management System
        </h1>

        <p
          style={{
            marginTop: '12px',
            fontSize: '16px',
            opacity: 0.9,
            maxWidth: '700px',
          }}
        >
          Manage products, customers, orders, and inventory tracking from one
          centralized dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h6 className="text-muted">Total Products</h6>
            <h2>120</h2>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h6 className="text-muted">Customers</h6>
            <h2>58</h2>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h6 className="text-muted">Orders</h6>
            <h2>340</h2>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h6 className="text-muted">Inventory Value</h6>
            <h2>₹2.5L</h2>
          </div>
        </div>
      </div>

      {/* Modules */}
      <h3 style={{ marginBottom: '20px' }}>Quick Access</h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              borderRadius: '18px',
              padding: '24px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
              transition: '0.3s',
              borderTop: `5px solid ${card.color}`,
            }}
          >
            <div
              style={{
                fontSize: '40px',
                marginBottom: '10px',
              }}
            >
              {card.icon}
            </div>

            <h4
              style={{
                marginBottom: '10px',
                fontWeight: '600',
              }}
            >
              {card.title}
            </h4>

            <p
              style={{
                color: '#6B7280',
                minHeight: '60px',
              }}
            >
              {card.description}
            </p>

            {card.path !== '/' && (
              <Link
                to={card.path}
                style={{
                  textDecoration: 'none',
                  color: '#4F46E5',
                  fontWeight: '600',
                }}
              >
                Open →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}