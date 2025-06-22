import React from 'react';
import ReactDOM from 'react-dom/client';
// ¡CAMBIA ESTA LÍNEA!
import { App } from './App.jsx'; // <--- Añade las llaves aquí
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);