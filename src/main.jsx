import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Importar BrowserRouter
import { App } from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>       {/* ✅ Envolver con BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
