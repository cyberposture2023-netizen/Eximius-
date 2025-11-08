import React from 'react';
import { Link } from 'react-router-dom';

// Basic navigation bar. We will improve this later.
export default function Header() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Dashboard</Link>
      <Link to="/new" style={{ marginRight: '1rem' }}>New Exception</Link>
      <Link to="/risk-register" style={{ marginRight: '1rem' }}>Risk Register</Link>
      <Link to="/controls" style={{ marginRight: '1rem' }}>Controls</Link>
      <Link to="/login" style={{ float: 'right' }}>Login/Logout</Link>
    </nav>
  );
}
