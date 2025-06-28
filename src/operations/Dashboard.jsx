import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaPaw,
  FaUserMd,
  FaCalendarAlt,
  FaSyringe,
  FaStethoscope,
  FaHistory,
  FaSignOutAlt
} from 'react-icons/fa';
import { obtenerTotalDuenos } from '../services/data';

export function Dashboard({ nombre: propNombre }) {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState(propNombre || 'Usuario');
  const [totalDuenos, setTotalDuenos] = useState(0);

  useEffect(() => {
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    if (nombreGuardado) {
      setNombre(nombreGuardado);
    }

    obtenerTotalDuenos()
      .then(setTotalDuenos)
      .catch((err) => {
        console.error("Error al obtener total de dueños:", err.message);
        setTotalDuenos(0);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nombreUsuario');
    navigate('/login');
  };

  return (
    <div className="d-flex">
      {/* BARRA LATERAL */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: '230px' }}>
        <h5 className="mb-4">Veterinaria Patitas Felices</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/inicio" className="nav-link text-white">
              <FaHome className="me-2" />Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/duenos" className="nav-link text-white">
              <FaUser className="me-2" />Dueños
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/mascotas" className="nav-link text-white">
              <FaPaw className="me-2" />Mascotas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/veterinarios" className="nav-link text-white">
              <FaUserMd className="me-2" />Veterinarios
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/citas" className="nav-link text-white">
              <FaCalendarAlt className="me-2" />Citas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/vacunas" className="nav-link text-white">
              <FaSyringe className="me-2" />Vacunas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/consultas" className="nav-link text-white">
              <FaStethoscope className="me-2" />Consultas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/historial" className="nav-link text-white">
              <FaHistory className="me-2" />Historial
            </Link>
          </li>
        </ul>
        <hr className="border-secondary" />
        <button onClick={handleLogout} className="btn btn-outline-light w-100 mt-2">
          <FaSignOutAlt className="me-2" />
          Cerrar sesión
        </button>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container-fluid mt-4">
        <div className="text-center mb-4">
          <h4 className="fw-bold">¡Bienvenido/a, {nombre}!</h4>
          <p>Este es tu panel de control. Gestiona tus servicios veterinarios y perfiles desde aquí.</p>
        </div>

        <div className="row text-white text-center justify-content-center">
          {[
            { title: 'Dueños Registrados', value: totalDuenos, color: 'primary' },
            { title: 'Mascotas Registradas', value: 300, color: 'info' },
            { title: 'Veterinarios Activos', value: 5, color: 'success' },
            { title: 'Consultas Realizadas', value: 750, color: 'warning', textDark: true },
            { title: 'Vacunas Aplicadas', value: 600, color: 'danger' },
            { title: 'Enfermedades Comunes', value: 50, color: 'secondary' },
          ].map((card, i) => (
            <div className="col-md-2 mb-3" key={i}>
              <div
                className={`card bg-${card.color} ${card.textDark ? 'text-dark' : 'text-white'} shadow-sm d-flex align-items-center justify-content-center`}
                style={{ height: '120px' }}
              >
                <div className="card-body">
                  <h6 className="card-title">{card.title}</h6>
                  <h3 className="fw-bold">{card.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <h5 className="text-center fw-semibold">COMPARATIVA DE VENTAS Y COMPRAS</h5>
          <div className="border rounded bg-light text-muted text-center p-5 mt-3">
            Espacio para Gráfico (Ej: Barras, Líneas)
          </div>
        </div>
      </div>
    </div>
  );
}


