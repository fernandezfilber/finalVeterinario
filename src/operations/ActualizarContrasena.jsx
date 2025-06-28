import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../services/data';
import './ActualizarContrasena.css'; // Usa el mismo estilo que login/registro

export function ActualizarContrasena() {
  const [usuario, setUsuario] = useState('');
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState('');
  const [mensajeEstado, setMensajeEstado] = useState('');
  const navigate = useNavigate();

  const manejarEnvioActualizacion = async (e) => {
    e.preventDefault();
    setMensajeEstado('');

    if (!usuario) {
      setMensajeEstado('Debes ingresar tu nombre de usuario.');
      return;
    }

    if (nuevaContrasena !== confirmarNuevaContrasena) {
      setMensajeEstado('Las nuevas contraseñas no coinciden.');
      return;
    }

    const resultado = await API.actualizarContrasena(usuario, contrasenaActual, nuevaContrasena);

    if (resultado.exito) {
      setMensajeEstado('Contraseña actualizada con éxito.');

      // Limpiar campos
      setUsuario('');
      setContrasenaActual('');
      setNuevaContrasena('');
      setConfirmarNuevaContrasena('');

      // Redirigir después de 1 segundo
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      setMensajeEstado(`Error: ${resultado.mensaje}`);
    }
  };

  return (
    <div className="contenedor-login">
      <h3>Actualizar Contraseña</h3>
      <form onSubmit={manejarEnvioActualizacion}>
        <label htmlFor="usuario">Usuario:</label>
        <input
          type="text"
          id="usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <label htmlFor="contrasenaActual">Contraseña Actual:</label>
        <input
          type="password"
          id="contrasenaActual"
          value={contrasenaActual}
          onChange={(e) => setContrasenaActual(e.target.value)}
          required
        />

        <label htmlFor="nuevaContrasena">Nueva Contraseña:</label>
        <input
          type="password"
          id="nuevaContrasena"
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
          required
        />

        <label htmlFor="confirmarNuevaContrasena">Confirmar Nueva Contraseña:</label>
        <input
          type="password"
          id="confirmarNuevaContrasena"
          value={confirmarNuevaContrasena}
          onChange={(e) => setConfirmarNuevaContrasena(e.target.value)}
          required
        />

        {mensajeEstado && (
          <div className={`alert ${mensajeEstado.startsWith('Error') ? 'alert-danger' : 'alert-success'}`}>
            {mensajeEstado}
          </div>
        )}

        <button type="submit">Actualizar Contraseña</button>
        <button type="button" onClick={() => navigate('/login')}>Cancelar</button>
      </form>
    </div>
  );
}

