import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewException from './pages/NewException';
import RiskRegister from './pages/RiskRegister';
import Controls from './pages/Controls';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  // --- Test Server Connection ---
  const [serverStatus, setServerStatus] = useState('Connecting to server...');

  useEffect(() => {
    // Use a try-catch block to handle potential errors
    const checkServerHealth = async () => {
      try {
        // 'axios.get' will automatically use the "proxy" in package.json
        // So this call goes to http://localhost:5000/api/health
        const response = await axios.get('/api/health');
        if (response.data.status === 'ok') {
          setServerStatus(Server Status: );
        } else {
          setServerStatus('Server responded, but not OK.');
        }
      } catch (error) {
        console.error('Error connecting to server:', error);
        setServerStatus('Failed to connect to server. (Is it running?)');
      }
    };

    checkServerHealth();
  }, []); // Empty array means this runs once on component mount
  // --- End Test Server Connection ---

  return (
    <BrowserRouter>
      {/* Display server status on all pages (for testing) */}
      <div style={{ backgroundColor: '#282c34', color: 'white', padding: '5px', textAlign: 'center', fontSize: '0.8rem' }}>
        {serverStatus}
      </div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="new" element={<NewException />} />
          <Route path="risk-register" element={<RiskRegister />} />
          <Route path="controls" element={<Controls />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
