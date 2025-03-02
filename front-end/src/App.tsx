// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// import Home from './page/Home/Home';
// import Subscribe from './page/Subscribe/Subscribe';
// import Login from './components/Login/Login';
// import Article from './page/Article/Article';
// import Dashboard from './page/Dashboard/Dashboard'; 
// import './index.css';

// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     console.log('Token no localStorage:', token); 
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//     console.log('Login bem-sucedido, isAuthenticated:', true); 
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/subscribe" element={<Subscribe />} />
//         <Route path="/login" element={<Login onClose={() => {}} onLoginSuccess={handleLoginSuccess} />} />
//         <Route path="/articles/:articleId" element={<Article />} />
//         <Route 
//           path="/dashboard" 
//           element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// import Home from './page/Home/Home';
// import Subscribe from './page/Subscribe/Subscribe';
// import Login from './components/Login/Login';
// import Article from './page/Article/Article';
// import Dashboard from './page/Dashboard/Dashboard'; 
// import './index.css';

// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     console.log('Token no localStorage:', token); // Adicione este log
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//     console.log('Login bem-sucedido, isAuthenticated:', true); // Adicione este log
//   };

//   const checkAuth = () => {
//     const token = localStorage.getItem('token');
//     return token !== null;
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/subscribe" element={<Subscribe />} />
//         <Route path="/login" element={<Login onClose={() => {}} onLoginSuccess={handleLoginSuccess} />} />
//         <Route path="/articles/:articleId" element={<Article />} />
//         <Route 
//           path="/dashboard" 
//           element={checkAuth() ? <Dashboard /> : <Navigate to="/login" />} 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './page/Home/Home';
import Subscribe from './page/Subscribe/Subscribe';
import Login from './components/Login/Login';
import Article from './page/Article/Article';
import Dashboard from './page/Dashboard/Dashboard'; 
import './index.css';

const App: React.FC = () => {

  const handleLoginSuccess = () => {
    console.log('Login bem-sucedido'); // Adicione este log
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/login" element={<Login onClose={() => {}} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/articles/:articleId" element={<Article />} />
        <Route 
          path="/dashboard" 
          element={checkAuth() ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;

