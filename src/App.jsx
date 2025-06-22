import { useState } from 'react';
import * as API from './services/data';
import imagen from './assets/login.png';
import { Registro } from './Registro';
import { Dashboard } from './Dashboard';
import { Mascotas } from './Mascotas'; // Import the new Mascotas component
import './App.css';

export function App() {
  console.log("Componente App renderizando");
  // Estado para determinar qué componente mostrar: 'login', 'registro', 'dashboard', o 'mascotas'
  const [mostrarComponente, setMostrarComponente] = useState('login');

  const [credenciales, setCredenciales] = useState({ usuario: "", contrasena: "" });
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  async function manejarEnvioLogin(evento) {
    evento.preventDefault();
    const respuestaLogin = await API.iniciarSesion(credenciales.usuario, credenciales.contrasena);

    console.log("Respuesta de inicio de sesión:", respuestaLogin);

    if (respuestaLogin) {
      setUsuarioLogueado(credenciales.usuario);
      setMostrarComponente('dashboard');
    } else {
      alert("Inicio de sesión fallido. Por favor, verifica tus credenciales.");
    }
  }

  const manejarCerrarSesion = () => {
    setUsuarioLogueado(null);
    setCredenciales({ usuario: "", contrasena: "" });
    setMostrarComponente('login');
  };

  return (
    <div className="contenedor-principal">
      {mostrarComponente === 'login' ? (
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
            <input type="submit" value="Iniciar Sesion" />
          </form>
          <p>¿No tienes cuenta? <button className="boton-alternar" onClick={() => setMostrarComponente('registro')}>Regístrate aquí</button></p>
        </div>
      ) : mostrarComponente === 'registro' ? (
        <>
          <Registro />
          <p className="texto-alternar">¿Ya tienes cuenta? <button className="boton-alternar" onClick={() => setMostrarComponente('login')}>Inicia Sesión</button></p>
        </>
      ) : mostrarComponente === 'dashboard' ? (
        <Dashboard usuario={usuarioLogueado} onCerrarSesion={manejarCerrarSesion} setMostrarComponente={setMostrarComponente} />
      ) : mostrarComponente === 'mascotas' ? (
        <Mascotas usuario={usuarioLogueado} onCerrarSesion={manejarCerrarSesion} />
      ) : null}
    </div>
  );
}