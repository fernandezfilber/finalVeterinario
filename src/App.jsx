// src/App.jsx
import { useState } from 'react';
import * as API from './services/data';
import imagen from './assets/login.png';
import { Registro } from './Registro';
import { Dashboard } from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import './App.css';

export function App() {
  console.log("Componente App renderizando"); // Depuración: 11:13 AM -05 on Sunday, June 22, 2025
  // Estado para determinar qué componente mostrar: 'login', 'registro', o 'dashboard'
  const [mostrarComponente, setMostrarComponente] = useState('login');

  const [credenciales, setCredenciales] = useState({ usuario: "", contrasena: "" });
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  async function manejarEnvioLogin(evento) {
    evento.preventDefault();
    const respuestaLogin = await API.iniciarSesion(credenciales.usuario, credenciales.contrasena);
    console.log("Respuesta de inicio de sesión:", respuestaLogin); // Depuración: 11:13 AM -05 on Sunday, June 22, 2025

    if (respuestaLogin) {
      setUsuarioLogueado(respuestaLogin.nombre || credenciales.usuario); // Usa el nombre del veterinario si está en la respuesta
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
    <div className="container mt-5">
      {mostrarComponente === 'login' ? (
        <div className="card shadow-sm">
          <div className="card-header text-center">
            <img src={imagen} className="rounded-circle" width="120" height="120" alt="Imagen de Login" />
            <h1 className="mt-3">Iniciar Sesión</h1>
          </div>
          <div className="card-body">
            <form onSubmit={manejarEnvioLogin}>
              <div className="mb-3">
                <label htmlFor="inputUsuario" className="form-label">Usuario:</label>
                <input
                  id="inputUsuario"
                  type="text"
                  className="form-control"
                  onChange={(e) => setCredenciales({ ...credenciales, usuario: e.target.value })}
                  value={credenciales.usuario}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputContrasena" className="form-label">Contraseña:</label>
                <input
                  id="inputContrasena"
                  type="password"
                  className="form-control"
                  onChange={(e) => setCredenciales({ ...credenciales, contrasena: e.target.value })}
                  value={credenciales.contrasena}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
            <p className="mt-3 text-center">
              ¿No tienes cuenta? <button className="btn btn-link" onClick={() => setMostrarComponente('registro')}>Regístrate aquí</button>
            </p>
          </div>
        </div>
      ) : mostrarComponente === 'registro' ? (
        <>
          <Registro setMostrarComponente={setMostrarComponente} />
          <p className="text-center mt-3">
            ¿Ya tienes cuenta? <button className="btn btn-link" onClick={() => setMostrarComponente('login')}>Inicia Sesión</button>
          </p>
        </>
      ) : mostrarComponente === 'dashboard' ? (
        <Dashboard usuario={usuarioLogueado} onCerrarSesion={manejarCerrarSesion} setMostrarComponente={setMostrarComponente} />
      ) : null}
    </div>
  );
}