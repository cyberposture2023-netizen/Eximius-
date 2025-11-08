import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
const Layout = ({ apiStatus }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>{apiStatus}</p>
      </footer>
    </div>
  );
};
export default Layout;
