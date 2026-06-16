import { Link, NavLink } from 'react-router-dom';
import React from 'react';
export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    marginRight: 12,
    textDecoration: 'none',
    color: isActive ? '#2563eb' : '#111',
    fontWeight: isActive ? 700 : 500,
  });

  return (
    <header
      style={{
        borderBottom: '1px solid #eee',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: '#111', fontWeight: 800 }}>
        Inventory
      </Link>
      <nav style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <NavLink to="/products" style={linkStyle}>
          Products
        </NavLink>
        <NavLink to="/customers" style={linkStyle}>
          Customers
        </NavLink>
        <NavLink to="/orders" style={linkStyle}>
          Orders
        </NavLink>
      </nav>
    </header>
  );
}

