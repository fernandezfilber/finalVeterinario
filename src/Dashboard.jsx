// src/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  getDuenosRegistrados,
  getMascotasRegistradas,
  getVeterinariosActivos,
  getConsultasRealizadas,
  getVacunasAplicadas,
  getEnfermedadesComunes,
  getChartStatistics
} from './services/data.js';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Importa los nuevos componentes
import { ActualizarContrasena } from './ActualizarContrasena';
import { GestionVeterinarios } from './GestionarVeterinarios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Dashboard({ usuario, onCerrarSesion }) {
  const [datosEstadisticos, setDatosEstadisticos] = useState({
    dueños: 0,
    mascotas: 0,
    veterinarios: 0,
    consultas: 0,
    vacunas: 0,
    enfermedades: 0,
  });

  const [datosGrafico, setDatosGrafico] = useState({ labels: [], datasets: [] });
  const [cargando, setCargando] = useState(true);
  const [vistaActual, setVistaActual] = useState('inicio');

  useEffect(() => {
    if (vistaActual === 'inicio') {
      const obtenerDatos = async () => {
        setCargando(true);
        try {
          const [dueños, mascotas, veterinarios, consultas, vacunas, enfermedades] = await Promise.all([
            getDuenosRegistrados(),
            getMascotasRegistradas(),
            getVeterinariosActivos(),
            getConsultasRealizadas(),
            getVacunasAplicadas(),
            getEnfermedadesComunes(),
          ]);
          setDatosEstadisticos({
            dueños,
            mascotas,
            veterinarios,
            consultas,
            vacunas,
            enfermedades,
          });
          console.log('Estadísticas de Tarjetas:', { dueños, mascotas, veterinarios, consultas, vacunas, enfermedades });

          const estadisticasCrudas = await getChartStatistics();
          console.log('Estadísticas Crudas para Gráfico:', estadisticasCrudas);

          const etiquetas = estadisticasCrudas.map(stat => stat.label);
          const valores = estadisticasCrudas.map(stat => stat.value);

          console.log('Etiquetas Procesadas:', etiquetas, 'Valores Procesados:', valores);
          setDatosGrafico({
            labels: etiquetas,
            datasets: [{
              label: 'Estadísticas',
              data: valores,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          });
        } catch (error) {
          console.error('Error al cargar los datos del panel:', error);
        } finally {
          setCargando(false);
        }
      };

      obtenerDatos();
    }
  }, [vistaActual]);

  useEffect(() => {
    console.log('Estado Final del Gráfico:', datosGrafico);
  }, [datosGrafico]);

  const configuracionTarjetas = [
    { titulo: 'Dueños Registrados', valor: datosEstadisticos.dueños, color: 'primary', icono: 'person-fill' },
    { titulo: 'Mascotas Registradas', valor: datosEstadisticos.mascotas, color: 'info', icono: 'paw-fill' },
    { titulo: 'Veterinarios Activos', valor: datosEstadisticos.veterinarios, color: 'success', icono: 'clipboard-heart-fill' },
    { titulo: 'Consultas Realizadas', valor: datosEstadisticos.consultas, color: 'warning', icono: 'file-medical-fill' },
    { titulo: 'Vacunas Aplicadas', valor: datosEstadisticos.vacunas, color: 'danger', icono: 'bandaid-fill' },
    { titulo: 'Enfermedades Comunes', valor: datosEstadisticos.enfermedades, color: 'secondary', icono: 'bug-fill' },
  ];

  const manejarClickTarjeta = (funcionalidad) => {
    alert(`Gestionar ${funcionalidad}. ¡Próximamente disponible!`);
  };

  const opcionesGrafico = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Estadísticas Generales' },
    },
  };

  const manejarContrasenaActualizada = () => {
    alert('Contraseña actualizada con éxito. Por favor, inicia sesión de nuevo.');
    onCerrarSesion();
  };

  if (cargando && vistaActual === 'inicio') return <div>Cargando...</div>;

  return (
    <div className="d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <nav className="bg-dark sidebar vh-100 d-flex flex-column p-3 flex-shrink-0" style={{ width: '250px', minWidth: '250px' }}>
        <h5 className="text-white text-center py-2">Veterinaria Patitas Felices</h5>
        <button className="btn btn-light d-md-none mb-3" onClick={() => document.querySelector('.sidebar').classList.toggle('collapsed')}>
          <i className="bi bi-list"></i>
        </button>
        <ul className="nav flex-column flex-grow-1">
          <li className="nav-item">
            <a className="nav-link text-white" href="#home" onClick={() => setVistaActual('inicio')}>
              <i className="bi bi-house"></i> Inicio
            </a>
          </li>
          <li className="nav-item"><a className="nav-link text-white" href="#dueños" onClick={() => manejarClickTarjeta('Dueños')}><i className="bi bi-people"></i> Dueños</a></li>
          <li className="nav-item"><a className="nav-link text-white" href="#mascotas" onClick={() => manejarClickTarjeta('Mascotas')}><i className="bi bi-paw"></i> Mascotas</a></li>
          <li className="nav-item"><a className="nav-link text-white" href="#veterinarios" onClick={() => manejarClickTarjeta('Veterinarios')}><i className="bi bi-heart-pulse"></i> Veterinarios</a></li>
          <li className="nav-item"><a className="nav-link text-white" href="#citas" onClick={() => manejarClickTarjeta('Citas')}><i className="bi bi-calendar"></i> Citas</a></li>
          <li className="nav-item"><a className="nav-link text-white" href="#vacunas" onClick={() => manejarClickTarjeta('Vacunas')}><i className="bi bi-syringe"></i> Vacunas</a></li>
          <li className="nav-item"><a className="nav-link text-white" href="#consultas" onClick={() => manejarClickTarjeta('Consultas')}><i className="bi bi-file-medical"></i> Consultas</a></li>
          <li className="nav-item"><a className="nav-link text-white" href="#historial" onClick={() => manejarClickTarjeta('Historial')}><i className="bi bi-clock-history"></i> Historial</a></li>

          <li className="nav-item">
            <a className="nav-link text-white" href="#actualizar-pass" onClick={() => setVistaActual('actualizarContrasena')}>
              <i className="bi bi-key-fill"></i> Actualizar Contraseña
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-white" href="#gestion-veterinarios" onClick={() => setVistaActual('gestionVeterinarios')}>
              <i className="bi bi-person-badge-fill"></i> Gestionar Veterinarios
            </a>
          </li>

          <li className="nav-item mt-auto"><a className="nav-link text-white" href="#logout" onClick={onCerrarSesion}><i className="bi bi-box-arrow-left"></i> Cerrar Sesión</a></li>
        </ul>
      </nav>
      <main className="flex-grow-1 p-4" style={{ overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          {/* Renderizado condicional del contenido principal */}
          {vistaActual === 'inicio' ? (
            <>
              <div className="row">
                <div className="col-12 mb-4">
                  <div className="card shadow-sm border-0">
                    <div className="card-body text-center">
                      <h2 className="card-title">¡BIENVENIDO, Dr. {usuario || 'roy'}!</h2>
                      <p className="card-text">Este es tu panel de control. Gestiona tus servicios veterinarios y perfiles desde aquí.</p>
                    </div>
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="row row-cols-1 row-cols-md-4 g-3">
                    {configuracionTarjetas.map((stat, index) => (
                      <div className="col" key={index}>
                        <div className={`card text-white shadow-sm h-100 bg-${stat.color}`} style={{ cursor: 'pointer' }} onClick={() => manejarClickTarjeta(stat.titulo.split(' ')[0])}>
                          <div className="card-body d-flex flex-column align-items-center justify-content-center p-3">
                            <i className={`bi bi-${stat.icono} display-4 mb-2`}></i>
                            <h5 className="card-title text-center mb-1">{stat.titulo}</h5>
                            <p className="card-text display-5 fw-bold">{stat.valor}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-12 mb-4">
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <h5 className="card-title text-center">COMPARATIVA DE ESTADÍSTICAS</h5>
                      {datosGrafico.labels.length > 0 ? (
                        <Bar data={datosGrafico} options={opcionesGrafico} />
                      ) : (
                        <p className="text-muted">No hay datos para mostrar en el gráfico.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : vistaActual === 'actualizarContrasena' ? (
            <ActualizarContrasena
              usuario={usuario}
              onActualizacionExitosa={manejarContrasenaActualizada}
              onCancelar={() => setVistaActual('inicio')}
            />
          ) : vistaActual === 'gestionVeterinarios' ? (
            <GestionVeterinarios
              onVolverAlDashboard={() => setVistaActual('inicio')}
            />
          ) : null} {/* . */}
        </div>
      </main>
    </div>
  );
}