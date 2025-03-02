// import React from "react";
// import { createRoot } from "react-dom/client";
// import { AuthProvider } from "./Context/AuthContext.tsx";

// import './index.css'
// import App from './App.tsx'

// const container = document.getElementById("root");
// const root = createRoot(container!);
// root.render(
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// );



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
