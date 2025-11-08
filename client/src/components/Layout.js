import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom'; // <-- IMPORT

const Layout = ({ apiStatus }) => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {/* Child routes (Dashboard, NewException, etc.) will be rendered here */}
        <Outlet /> {/* <-- COMPONENT */}
      </main>
      <footer className="footer">
        <p>{apiStatus}</p>
      </footer>
    </div>
  );
};

export default Layout;
