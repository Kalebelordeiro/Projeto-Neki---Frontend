
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; //  roteador
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* comunicação app com o roteador */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);