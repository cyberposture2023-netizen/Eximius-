import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NewException from './pages/NewException';
import RiskRegister from './pages/RiskRegister';
import Controls from './pages/Controls';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main application routes */}
          <Route index element={<Dashboard />} />
          <Route path="new" element={<NewException />} />
          <Route path="risk-register" element={<RiskRegister />} />
          <Route path="controls" element={<Controls />} />
          
          {/* Other routes */}
          <Route path="login" element={<Login />} />
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
