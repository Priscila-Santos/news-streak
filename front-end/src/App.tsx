// import { useState } from 'react'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './page/Home/Home';
import Subscribe from './page/Subscribe/Subscribe';
import Article from './page/Article/Article';
import './index.css';
//import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/articles/:articleId" element={<Article />} />
      </Routes>
    </Router>
  );
}

export default App;
