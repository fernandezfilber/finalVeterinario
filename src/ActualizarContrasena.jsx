import React, { useState } from 'react';
import * as API from './services/data'; // Asegúrate de que la ruta sea correcta

export function ActualizarContrasena({ usuario, onActualizacionExitosa, onCancelar }) {
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState('');
  const [mensajeEstado, setMensajeEstado] = useState(''); // Para mostrar mensajes al usuario

  const manejarEnvioActualizacion = async (e) => {
    e.preventDefault();
    setMensajeEstado(''); // Limpia mensajes previos

    if (nuevaContrasena !== confirmarNuevaContrasena) {
      setMensajeEstado('Las nuevas contraseñas no coinciden.');
      return;
    }

    if (!usuario) {
      setMensajeEstado('No se pudo obtener el usuario para actualizar la contraseña.');
      return;
    }

    // Llama a la nueva función del servicio
    const resultado = await API.actualizarContrasena(usuario, contrasenaActual, nuevaContrasena);

    if (resultado.exito) {
      setMensajeEstado('Contraseña actualizada con éxito.');
      setContrasenaActual('');
      setNuevaContrasena('');
      setConfirmarNuevaContrasena('');
      // Si hay una función para manejar la actualización exitosa (ej. navegar a otro lado)
      if (onActualizacionExitosa) {
        onActualizacionExitosa();
      }
    } else {
      setMensajeEstado(`Error: ${resultado.mensaje}`);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h3 className="card-title text-center mb-4">Actualizar Contraseña</h3>
      <form onSubmit={manejarEnvioActualizacion}>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">Contraseña Actual:</label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            value={contrasenaActual}
            onChange={(e) => setContrasenaActual(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">Nueva Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmNewPassword" className="form-label">Confirmar Nueva Contraseña:</label>
          <input
            type="password"
            className="form-control"
            id="confirmNewPassword"
            value={confirmarNuevaContrasena}
            onChange={(e) => setConfirmarNuevaContrasena(e.target.value)}
            required
          />
        </div>
        {mensajeEstado && (
          <div className={`alert ${mensajeEstado.startsWith('Error') ? 'alert-danger' : 'alert-success'}`} role="alert">
            {mensajeEstado}
          </div>
        )}
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">Actualizar Contraseña</button>
          <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}