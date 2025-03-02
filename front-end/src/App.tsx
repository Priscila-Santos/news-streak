import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './page/Home/Home';
import Subscribe from './page/Subscribe/Subscribe';
import Login from './components/Login/Login';
import Article from './page/Article/Article';
import './index.css';
import Dashboard from './page/Dashboard/Dashboard'; 

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
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
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// import Home from './page/Home/Home';
// import Subscribe from './page/Subscribe/Subscribe';
// import Login from './components/Login/Login';
// import Article from './page/Article/Article';
// import './index.css';


// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/subscribe" element={<Subscribe />} />
//         <Route path="/login" element={<Login onClose={() => {}} onLoginSuccess={handleLoginSuccess} />} />
//         <Route 
//           path="/articles/:articleId"  element={<Article/>}
//           // element={isAuthenticated ? <Article /> : <Navigate to="/login" />} 
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
