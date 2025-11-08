import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Eximius</Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            {/* This is the link we are fixing */}
            <Link to="/new-exception">New Exception</Link>
          </li>
          <li>
            <Link to="/risk-register">Risk Register</Link>
          </li>
          <li>
            <Link to="/controls">Controls</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

