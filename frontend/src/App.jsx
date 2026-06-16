import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';

export default function App({ children }) {
  // Keep compatibility with main.jsx (children includes <Routes/>)
  return (
    <div style={{ fontFamily: 'system-ui, Arial, sans-serif', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ padding: 16, maxWidth: 1100, margin: '0 auto' }}>
        {children ?? <Outlet />}
      </main>
    </div>
  );
}

