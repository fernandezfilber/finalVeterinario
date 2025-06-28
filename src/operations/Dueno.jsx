import React, { useEffect, useState } from 'react';
import {
  obtenerDuenos,
  insertarDueno,
  actualizarDueno,
  eliminarDueno,
  buscarDuenoPorId,
  buscarDuenoPorNombreMascota
} from '../services/data';

export function Dueno() {
  const [duenos, setDuenos] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    correo: ''
  });
  const [idActual, setIdActual] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [busquedaId, setBusquedaId] = useState('');
  const [busquedaMascota, setBusquedaMascota] = useState('');

  const cargarDuenos = async () => {
    try {
      const datos = await obtenerDuenos();
      setDuenos(datos);
    } catch (error) {
      console.error('Error al cargar dueños:', error);
    }
  };

  useEffect(() => {
    cargarDuenos();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: name === 'telefono' ? String(value) : value
    }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion && idActual != null) {
        const { nombre, direccion, telefono, correo } = formulario;
        await actualizarDueno(idActual, {
          nombre,
          direccion,
          telefono: String(telefono),
          correo
        });
        alert('Dueño actualizado correctamente.');
      } else {
        await insertarDueno({
          ...formulario,
          telefono: String(formulario.telefono)
        });
        alert('Dueño agregado exitosamente.');
      }
      setFormulario({ nombre: '', direccion: '', telefono: '', correo: '' });
      setIdActual(null);
      setModoEdicion(false);
      cargarDuenos();
    } catch (error) {
      alert('Error al guardar: ' + error.message);
    }
  };

  const manejarEditar = (dueno) => {
    setFormulario({
      nombre: dueno.nombre,
      direccion: dueno.direccion,
      telefono: String(dueno.telefono),
      correo: dueno.correo || ''
    });
    setIdActual(dueno.id);
    setModoEdicion(true);
  };

  const manejarEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este dueño?')) {
      try {
        await eliminarDueno(id);
        alert('Dueño eliminado.');
        cargarDuenos();
      } catch (error) {
        alert('Error al eliminar: ' + error.message);
      }
    }
  };

  const buscarPorId = async () => {
    if (!busquedaId) return alert("Ingresa un ID");
    try {
      const resultado = await buscarDuenoPorId(busquedaId);
      setDuenos([resultado]);
    } catch (err) {
      alert("No se encontró el dueño con ID: " + busquedaId);
    }
  };

  const buscarPorMascota = async () => {
    if (!busquedaMascota.trim()) return alert("Ingresa el nombre de la mascota");
    try {
      const resultados = await buscarDuenoPorNombreMascota(busquedaMascota);
      setDuenos(resultados);
    } catch (err) {
      alert("No se encontraron dueños para la mascota: " + busquedaMascota);
    }
  };

  const limpiarFiltros = () => {
    setBusquedaId('');
    setBusquedaMascota('');
    cargarDuenos();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="fas fa-paw me-2"></i>Veterinaria App
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard"><i className="fas fa-home me-1"></i>Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/duenos"><i className="fas fa-user-friends me-1"></i>Dueños</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mascotas"><i className="fas fa-dog me-1"></i>Mascotas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/veterinarios"><i className="fas fa-user-md me-1"></i>Veterinarios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/citas"><i className="fas fa-calendar-check me-1"></i>Citas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/vacunas"><i className="fas fa-syringe me-1"></i>Vacunas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/consulta"><i className="fas fa-notes-medical me-1"></i>Consulta</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/historial"><i className="fas fa-file-medical-alt me-1"></i>Historial</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <h2>{modoEdicion ? 'Editar Dueño' : 'Agregar Dueño'}</h2>
        <form onSubmit={manejarSubmit} className="mb-4">
          <input type="text" name="nombre" value={formulario.nombre} onChange={manejarCambio} placeholder="Nombre" required className="form-control mb-2" />
          <input type="text" name="direccion" value={formulario.direccion} onChange={manejarCambio} placeholder="Dirección" required className="form-control mb-2" />
          <input type="text" name="telefono" value={formulario.telefono} onChange={manejarCambio} placeholder="Teléfono" required className="form-control mb-2" />
          <input type="email" name="correo" value={formulario.correo} onChange={manejarCambio} placeholder="Correo electrónico" className="form-control mb-2" />
          <button type="submit" className="btn btn-primary me-2">
            {modoEdicion ? 'Actualizar' : 'Agregar'}
          </button>
        </form>

        <h3 className="mb-3">Buscar Dueños</h3>
        <div className="d-flex gap-2 mb-4 flex-wrap">
          <input type="number" placeholder="Buscar por ID" className="form-control" value={busquedaId} onChange={(e) => setBusquedaId(e.target.value)} />
          <button className="btn btn-outline-primary" onClick={buscarPorId}>Buscar ID</button>

          <input type="text" placeholder="Buscar por nombre de mascota" className="form-control" value={busquedaMascota} onChange={(e) => setBusquedaMascota(e.target.value)} />
          <button className="btn btn-outline-info" onClick={buscarPorMascota}>Buscar Mascota</button>

          <button className="btn btn-secondary" onClick={limpiarFiltros}>Limpiar</button>
          <button className="btn btn-success" onClick={cargarDuenos}>Listar todos</button>
        </div>

        <h3>Lista de Dueños</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {duenos.map((dueno) => (
              <tr key={dueno.id}>
                <td>{dueno.id}</td>
                <td>{dueno.nombre}</td>
                <td>{dueno.direccion}</td>
                <td>{dueno.telefono}</td>
                <td>{dueno.correo || '-'}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => manejarEditar(dueno)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => manejarEliminar(dueno.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
