import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewException from './pages/NewException';
import RiskRegister from './pages/RiskRegister';
import Controls from './pages/Controls';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
function App() {
  const [health, setHealth] = useState('Checking API status...');
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const { data } = await axios.get('/api/health');
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
        <Route path="/" element={<Layout apiStatus={health} />}>
          <Route index element={<Dashboard />} />
          <Route path="new-exception" element={<NewException />} />
          <Route path="risk-register" element={<RiskRegister />} />
          <Route path="controls" element={<Controls />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;
