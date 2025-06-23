import React, { useState } from 'react';
import * as API from './services/data'; 
import './App.css'; 

export function Registro() {
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
    console.log("Enviando datos de registro:", datosRegistro);

    const resultado = await API.registrarVeterinario(datosRegistro);

    if (resultado && !resultado.error) {
      alert("¡Veterinario registrado con éxito! Mensaje: " + resultado.mensaje);
      // Opcional: limpiar el formulario o redirigir al login
      setDatosRegistro({
        usuario: '',
        contrasena: '',
        nombre: '',
        telefono: '',
        correo: '',
        activo: true
      });
    } else {
      alert("Error al registrar veterinario: " + (resultado.error || "Error desconocido."));
    }
  };
//esto es html , para formularios=>
  return (
    <div className="contenedor-login"> {/* Reutilizamos la clase de estilo */}
      <img src={API.imagen} width="120" height="120" alt="Imagen de Registro" /> {/* */}
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
          type="tel" // Tipo 'tel' para teléfonos
          name="telefono"
          value={datosRegistro.telefono}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="regCorreo">Correo Electrónico:</label>
        <input 
          id="regCorreo"
          type="email" // Tipo 'email' para correos
          name="correo"
          value={datosRegistro.correo}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="regActivo">
          <input 
            id="regActivo"
            type="checkbox"
            name="activo"
            checked={datosRegistro.activo} // 'checked' para checkboxes
            onChange={manejarCambio}
          />
          Activo
        </label>

        <input type="submit" value="Registrar" />
      </form>
    </div>
  );
}