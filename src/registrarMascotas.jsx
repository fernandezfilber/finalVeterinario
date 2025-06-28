import React, { useState } from 'react';

export function RegistrarMascotas({ onVolver, onRegistrar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    dueno: '',
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos al backend
    console.log('Datos de la mascota:', formData);
    onRegistrar();
  };

  return (
    <div className="registrar-mascotas-container">
      <h2>Registrar Nueva Mascota</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={manejarSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={manejarCambio}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="especie" className="form-label">Especie</label>
              <input
                type="text"
                className="form-control"
                id="especie"
                name="especie"
                value={formData.especie}
                onChange={manejarCambio}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="raza" className="form-label">Raza</label>
              <input
                type="text"
                className="form-control"
                id="raza"
                name="raza"
                value={formData.raza}
                onChange={manejarCambio}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="edad" className="form-label">Edad</label>
              <input
                type="number"
                className="form-control"
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={manejarCambio}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dueno" className="form-label">Dueño</label>
              <input
                type="text"
                className="form-control"
                id="dueno"
                name="dueno"
                value={formData.dueno}
                onChange={manejarCambio}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">
                Registrar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onVolver}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}