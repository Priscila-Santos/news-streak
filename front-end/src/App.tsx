import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './page/Home/Home';
import Subscribe from './page/Subscribe/Subscribe';
import Login from './components/Login/Login';
import Article from './page/Article/Article';
import Dashboard from './page/Dashboard/Dashboard'; 
import AdminDashboard from './page/AdminDashboard/AdminDashboard'; 
import './index.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // 🔹 Pegamos a role do localStorage

    setIsAuthenticated(!!token);
    setIsAdmin(role === 'admin'); // 🔹 Verifica se a role é 'admin'

    console.log("Token:", token);
    console.log("Role:", role);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/login" element={<Login onClose={() => {}} onLoginSuccess={() => window.location.reload()} />} />
        <Route path="/articles/:articleId" element={<Article />} />

        {/* 🔹 Redireciona admin para AdminDashboard automaticamente */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (isAdmin ? <Navigate to="/admin-dashboard" /> : <Dashboard />) 
            : <Navigate to="/login" />
          } 
        />

        {/* 🔹 Página do AdminDashboard apenas para administradores */}
        <Route 
          path="/admin-dashboard" 
          element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
