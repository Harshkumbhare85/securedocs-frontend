import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ✅ Import BrowserRouter from react-router-dom
import { BrowserRouter } from 'react-router-dom';

// ✅ Wrap <App /> inside <BrowserRouter>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
