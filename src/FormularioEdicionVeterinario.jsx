// src/components/FormularioEdicionVeterinario.jsx
import React, { useState, useEffect } from 'react';

export function FormularioEdicionVeterinario({ veterinario, onGuardar, onCancelar }) {
  // Estado local para los datos del formulario, inicializado con el veterinario prop
  const [datosFormulario, setDatosFormulario] = useState({
    usuario: '',
    nombre: '',
    telefono: '',
    correo: '',
    activo: true, // Por defecto activo
    contrasena: '', // Campo para la nueva contraseña (opcional)
  });

  // useEffect para actualizar el formulario si el 'veterinario' prop cambia
  useEffect(() => {
    if (veterinario) {
      setDatosFormulario({
        usuario: veterinario.usuario || '',
        nombre: veterinario.nombre || '',
        telefono: veterinario.telefono || '',
        correo: veterinario.correo || '',
        activo: veterinario.activo, // Asegúrate de que este es un booleano
        contrasena: '', // La contraseña no se precarga por seguridad
      });
    }
  }, [veterinario]);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosFormulario({
      ...datosFormulario,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    // Limpiar la contraseña si está vacía para no enviarla al backend
    const datosAEnviar = { ...datosFormulario };
    if (datosAEnviar.contrasena === '') {
      delete datosAEnviar.contrasena; // Elimina la propiedad si no se modificó
    }
    onGuardar(datosAEnviar);
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">Editar Veterinario: {veterinario.nombre}</h4>
      </div>
      <div className="card-body">
        <form onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              name="usuario"
              value={datosFormulario.usuario}
              onChange={manejarCambio}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={datosFormulario.nombre}
              onChange={manejarCambio}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input
              type="tel"
              className="form-control"
              id="telefono"
              name="telefono"
              value={datosFormulario.telefono}
              onChange={manejarCambio}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              id="correo"
              name="correo"
              value={datosFormulario.correo}
              onChange={manejarCambio}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Nueva Contraseña (dejar en blanco para no cambiar)</label>
            <input
              type="password"
              className="form-control"
              id="contrasena"
              name="contrasena"
              value={datosFormulario.contrasena}
              onChange={manejarCambio}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="activo"
              name="activo"
              checked={datosFormulario.activo}
              onChange={manejarCambio}
            />
            <label className="form-check-label" htmlFor="activo">Activo</label>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="submit" className="btn btn-success">Guardar Cambios</button>
            <button type="button" className="btn btn-danger" onClick={onCancelar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}