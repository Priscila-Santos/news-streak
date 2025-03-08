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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);  // 'null' para carregar
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
      const checkAuth = () => {
          const token = localStorage.getItem('token');
          const role = localStorage.getItem('role');

          console.log("🔍 Verificando autenticação...");
          console.log("Token encontrado:", token);
          console.log("Role encontrada:", role);

          setIsAuthenticated(!!token);
          setIsAdmin(role === 'admin');
      };

      checkAuth(); 
      
      window.addEventListener("storage", checkAuth);

      return () => {
          window.removeEventListener("storage", checkAuth);
      };
  }, []);

  if (isAuthenticated === null) {
      return <div>Carregando...</div>;  
  }

  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/subscribe" element={<Subscribe />} />
              <Route path="/login" element={<Login onClose={() => {}} onLoginSuccess={() => window.location.reload()} />} />
              <Route path="/articles/:articleId" element={<Article />} />
              <Route 
                  path="/dashboard" 
                  element={
                      !isAuthenticated ? <Navigate to="/login" /> :
                      isAdmin ? <Navigate to="/admin-dashboard" /> :
                      <Dashboard />
                  } 
              />
              <Route 
                  path="/admin-dashboard" 
                  element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
              />
          </Routes>
      </Router>
  );
};

export default App;
