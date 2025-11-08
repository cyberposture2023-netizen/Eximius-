import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './index.css';

// Import Layout/Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute'; // <-- IMPORT NEW COMPONENT

// Import Pages
import Dashboard from './pages/Dashboard';
import NewException from './pages/NewException';
import RiskRegister from './pages/RiskRegister';
import Controls from './pages/Controls';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  const [health, setHealth] = useState('Checking API status...');

  useEffect(() => {
    // Check API health
    const checkApiHealth = async () => {
      try {
        const { data } = await axios.get('/api/health'); // Proxy handles this
        setHealth(`API Status: ${data.message} | Server Time: ${data.timestamp}`);
      } catch (error) {
        console.error('API health check failed:', error);
        setHealth('API Status: OFFLINE');
      }
    };

    checkApiHealth();
  }, []);

  return (
    <Router>
      <Routes>
        {/* === PUBLIC ROUTES === */}
        {/* These routes are accessible to everyone */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* === PROTECTED ROUTES === */}
        {/* Use the ProtectedRoute component as a wrapper */}
        <Route element={<ProtectedRoute />}>
          {/* All routes inside here will be protected */}
          <Route path="/" element={<Layout apiStatus={health} />}>
            {/* Outlet renders these nested routes */}
            <Route index element={<Dashboard />} />
            <Route path="new-exception" element={<NewException />} />
            <Route path="risk-register" element={<RiskRegister />} />
            <Route path="controls" element={<Controls />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
