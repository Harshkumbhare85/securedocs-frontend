import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import SharedFilePage from './components/SharedFilePage'; // or use SharedDocument if needed

function App() {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      {/* Redirect to dashboard or login based on token */}
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Dashboard */}
      <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />

      {/* Public Shared File Viewer */}
      <Route path="/shared/:token" element={<SharedFilePage />} />
    </Routes>
  );
}

export default App;
