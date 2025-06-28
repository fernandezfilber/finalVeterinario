import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './operations/Login';
import { Registro } from './operations/Registro';
import { Dashboard } from './operations/Dashboard';
import { ActualizarContrasena } from './operations/ActualizarContrasena';
import { Dueno } from './operations/Dueno'; // ✅ Importa el componente de Dueño

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/actualizar" element={<ActualizarContrasena />} />
      <Route path="/duenos" element={<Dueno />} /> {/* ✅ Nueva ruta para Dueños */}
    </Routes>
  );
}

