import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

// Main application layout
export default function Layout() {
  return (
    <div>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Outlet /> {/* Child pages will be rendered here */}
      </main>
    </div>
  );
}
