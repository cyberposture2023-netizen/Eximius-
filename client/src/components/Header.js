import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {
  const navigate = useNavigate();

  // Check if the user data exists in localStorage
  const user = JSON.parse(localStorage.getItem('eximiusUser'));

  const onLogout = () => {
    // Remove the user from storage
    localStorage.removeItem('eximiusUser');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Eximius</Link>
      </div>
      <nav className="nav">
        <ul>
          {/* Always-visible links */}
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          
          {/* Conditional links based on user login status */}
          {user ? (
            <>
              {/* === Show these links if USER IS LOGGED IN === */}
              <li>
                <Link to="/new-exception">New Exception</Link>
              </li>
              <li>
                <Link to="/risk-register">Risk Register</Link>
              </li>
              <li>
                <Link to="/controls">Controls</Link>
              </li>
              <li>
                <button onClick={onLogout} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* === Show these links if USER IS A GUEST === */}
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
