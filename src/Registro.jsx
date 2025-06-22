import React, { useState } from 'react';
import * as API from './services/data'; // Asegúrate de que la ruta sea correcta
import './App.css'; // Puedes reutilizar los estilos o crear uno nuevo para registro

export function Registro() {
  const [datosRegistro, setDatosRegistro] = useState({
    usuario: '',
    contrasena: '',
    nombre: '',
    telefono: '',
    correo: '',
    activo: true // Asumimos que por defecto un nuevo veterinario está activo
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

  return (
    <div className="contenedor-login"> {/* Reutilizamos la clase de estilo */}
      <img src={API.imagen} width="120" height="120" alt="Imagen de Registro" /> {/* Si imagen está exportada en data.js, sino importa imagen aqui directamente*/}
      <h1>Registro de Veterinario</h1>
      <form onSubmit={manejarEnvioRegistro}>
        <label htmlFor="regUsuario">Usuario:</label>
        <input 
          id="regUsuario"
          type="text"
          name="usuario" // Importante: el atributo 'name' debe coincidir con la clave en el estado
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