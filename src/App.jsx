import { useState } from 'react';
import * as API from './services/data';
import imagen from './assets/login.png'; // Asegúrate de que esta ruta sea correcta
import { Registro } from './Registro'; // Importa el nuevo componente de registro
import './App.css'; // Tus estilos CSS

export function App() {
  console.log("Componente App renderizando");
  // Estado para determinar qué componente mostrar: 'login' o 'registro'
  const [mostrarComponente, setMostrarComponente] = useState('login');

  const [credenciales, setCredenciales] = useState({ usuario: "", contrasena: "" }); 
  
  async function manejarEnvioLogin(evento) { // Renombrado para claridad
    evento.preventDefault(); 
    const respuestaLogin = await API.iniciarSesion(credenciales.usuario, credenciales.contrasena);
    
    console.log("Respuesta de inicio de sesión:", respuestaLogin); 

    if (respuestaLogin) { 
      alert("¡Inicio de sesión exitoso!"); 
      // Aquí podrías redirigir al usuario a un panel, etc.
    } else {
      alert("Inicio de sesión fallido. Por favor, verifica tus credenciales."); 
    }
  }

  return (
    <div className="contenedor-principal"> {/* Un contenedor general si centras todo */}
      {mostrarComponente === 'login' ? (
        // Contenido del formulario de Login
        <div className="contenedor-login"> 
          <img src={imagen} width="120" height="120" alt="Imagen de Login" />
          <h1>Iniciar Sesión</h1>
          <form onSubmit={manejarEnvioLogin}> 
            <label htmlFor="inputUsuario">Usuario:</label> 
            <input 
              id="inputUsuario" 
              type="text" 
              onChange={(e) => setCredenciales({ ...credenciales, usuario: e.target.value })} 
              value={credenciales.usuario} 
            />
            
            <label htmlFor="inputContrasena">Contraseña:</label> 
            <input 
              id="inputContrasena" 
              type="password" 
              onChange={(e) => setCredenciales({ ...credenciales, contrasena: e.target.value })} 
              value={credenciales.contrasena} 
            />
            
            <input type="submit" value="Enviar" /> 
          </form>
          {/* Botón para cambiar al formulario de registro */}
          <p>¿No tienes cuenta? <button className="boton-alternar" onClick={() => setMostrarComponente('registro')}>Regístrate aquí</button></p>
        </div>
      ) : (
        // Contenido del formulario de Registro
        <>
          <Registro />
          {/* Botón para volver al formulario de login */}
          <p className="texto-alternar">¿Ya tienes cuenta? <button className="boton-alternar" onClick={() => setMostrarComponente('login')}>Inicia Sesión</button></p>
        </>
      )}
    </div>
  );
}