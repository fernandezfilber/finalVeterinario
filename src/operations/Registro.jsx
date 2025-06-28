import React, { useState } from 'react';
import * as API from '../services/data';
import imagen from "../assets/login.png";
import './Registro.css';
import { useNavigate } from 'react-router-dom';

export function Registro() {
  const navigate = useNavigate();

  const [datosRegistro, setDatosRegistro] = useState({
    usuario: '',
    contrasena: '',
    nombre: '',
    telefono: '',
    correo: '',
    activo: true
  });

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosRegistro(prevDatos => ({
      ...prevDatos,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const manejarEnvioRegistro = async (e) => {
    e.preventDefault();
    try {
      const resultado = await API.registrarVeterinario(datosRegistro);

      if (resultado && !resultado.error) {
        alert("¡Veterinario registrado con éxito!");
        setDatosRegistro({
          usuario: '',
          contrasena: '',
          nombre: '',
          telefono: '',
          correo: '',
          activo: true
        });
      } else {
        alert("Error al registrar veterinario.");
      }
    } catch (error) {
      alert("Error de red o del servidor: " + error.message);
    }
  };

  return (
    <div className="contenedor-login">
      <img src={imagen} alt="Logo Veterinaria" className="login-logo" />
      <h1>Registro de Veterinario</h1>
      <form onSubmit={manejarEnvioRegistro}>
        <label htmlFor="regUsuario">Usuario:</label>
        <input
          id="regUsuario"
          type="text"
          name="usuario"
          value={datosRegistro.usuario}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="regContrasena">Contraseña:</label>
        <input
          id="regContrasena"
          type="password"
          name="contrasena"
          value={datosRegistro.contrasena}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="regNombre">Nombre Completo:</label>
        <input
          id="regNombre"
          type="text"
          name="nombre"
          value={datosRegistro.nombre}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="regTelefono">Teléfono:</label>
        <input
          id="regTelefono"
          type="tel"
          name="telefono"
          value={datosRegistro.telefono}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="regCorreo">Correo Electrónico:</label>
        <input
          id="regCorreo"
          type="email"
          name="correo"
          value={datosRegistro.correo}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="regActivo" className="checkbox-label">
          <input
            id="regActivo"
            type="checkbox"
            name="activo"
            checked={datosRegistro.activo}
            onChange={manejarCambio}
          />
          Activo
        </label>

        <input type="submit" value="Registrar" />
      </form>

      <div className="login-prompt">
        <span>¿Ya tienes cuenta?</span>
        <button type="button" className="login-button" onClick={() => navigate('/login')}>
          Inicia Sesión
        </button>
      </div>
    </div>
  );
}
