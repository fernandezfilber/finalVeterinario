// src/App.jsx
// Importa React y el hook useState para manejar el estado del componente.
import { useState } from 'react';
// Importa todas las funciones de tu archivo de servicios de datos (API).
import * as API from './services/data';
// Importa la imagen de login que se usa en el formulario de inicio de sesión.
import imagen from './assets/login.png';
// Importa el componente de Registro, que permite a los usuarios crear una nueva cuenta.
import { Registro } from './Registro';
// Importa el componente Dashboard, que es el panel principal una vez que el usuario inicia sesión.
import { Dashboard } from './Dashboard';
// Importa los estilos CSS de Bootstrap para un diseño responsivo y moderno.
import 'bootstrap/dist/css/bootstrap.min.css';
// Importa tus estilos CSS personalizados para la aplicación.
import './App.css';

// Define el componente principal de tu aplicación, App.
export function App() {
  // Un console.log para depuración, útil para saber cuándo se renderiza el componente App.
  console.log("Componente App renderizando"); // Depuración: 11:13 AM -05 on Sunday, June 22, 2025

  // Estado que controla qué componente se muestra en la interfaz:
  // 'login': Muestra el formulario de inicio de sesión.
  // 'registro': Muestra el formulario de registro.
  // 'dashboard': Muestra el panel de control del usuario.
  const [mostrarComponente, setMostrarComponente] = useState('login');

  // Estado para almacenar las credenciales (usuario y contraseña) ingresadas en el formulario de login.
  const [credenciales, setCredenciales] = useState({ usuario: "", contrasena: "" });
  // Estado para almacenar la información del usuario una vez que ha iniciado sesión exitosamente.
  // Será 'null' si no hay ningún usuario logueado.
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  /**
   * Función asíncrona que se ejecuta cuando el usuario intenta iniciar sesión.
   * @param {Event} evento - El evento de envío del formulario.
   */
  async function manejarEnvioLogin(evento) {
    // Previene el comportamiento por defecto del formulario (recargar la página).
    evento.preventDefault();
    // Llama a la función 'iniciarSesion' de tu API con las credenciales ingresadas.
    const respuestaLogin = await API.iniciarSesion(credenciales.usuario, credenciales.contrasena);
    // Un console.log para depuración, muestra la respuesta de la API.
    console.log("Respuesta de inicio de sesión:", respuestaLogin); // Depuración: 11:13 AM -05 on Sunday, June 22, 2025

    // Verifica si el inicio de sesión fue exitoso (si la respuesta no es nula).
    if (respuestaLogin) {
      // Si fue exitoso, establece el nombre del usuario logueado.
      // Se prefiere 'respuestaLogin.nombre' si viene de la API, de lo contrario usa el 'credenciales.usuario'.
      setUsuarioLogueado(respuestaLogin.nombre || credenciales.usuario);
      // Cambia el estado para mostrar el componente 'dashboard'.
      setMostrarComponente('dashboard');
    } else {
      // Si el inicio de sesión falló, muestra una alerta al usuario.
      alert("Inicio de sesión fallido. Por favor, verifica tus credenciales.");
    }
  }

  /**
   * Función que se encarga de cerrar la sesión del usuario.
   */
  const manejarCerrarSesion = () => {
    // Restablece el usuario logueado a nulo.
    setUsuarioLogueado(null);
    // Limpia las credenciales guardadas.
    setCredenciales({ usuario: "", contrasena: "" });
    // Vuelve a mostrar el componente de 'login'.
    setMostrarComponente('login');
  };

  // El JSX que se renderizará en la interfaz de usuario.
  return (
    // Contenedor principal con clases de Bootstrap para centrado y margen.
    <div className="container mt-5">
      {/* Lógica condicional para mostrar diferentes componentes basado en el estado 'mostrarComponente' */}

      {/* Si 'mostrarComponente' es 'login', renderiza el formulario de inicio de sesión */}
      {mostrarComponente === 'login' ? (
        // Tarjeta de Bootstrap para agrupar los elementos del formulario.
        <div className="card shadow-sm">
          {/* Encabezado de la tarjeta con imagen y título. */}
          <div className="card-header text-center">
            <img src={imagen} className="rounded-circle" width="120" height="120" alt="Imagen de Login" />
            <h1 className="mt-3">Iniciar Sesión</h1>
          </div>
          {/* Cuerpo de la tarjeta que contiene el formulario. */}
          <div className="card-body">
            {/* Formulario de inicio de sesión. Al enviar, llama a 'manejarEnvioLogin'. */}
            <form onSubmit={manejarEnvioLogin}>
              {/* Campo de entrada para el usuario. */}
              <div className="mb-3">
                <label htmlFor="inputUsuario" className="form-label">Usuario:</label>
                <input
                  id="inputUsuario"
                  type="text"
                  className="form-control"
                  // Actualiza el estado 'credenciales.usuario' cada vez que el valor cambia.
                  onChange={(e) => setCredenciales({ ...credenciales, usuario: e.target.value })}
                  // El valor del input está controlado por el estado 'credenciales.usuario'.
                  value={credenciales.usuario}
                  required // Hace el campo obligatorio.
                />
              </div>
              {/* Campo de entrada para la contraseña. */}
              <div className="mb-3">
                <label htmlFor="inputContrasena" className="form-label">Contraseña:</label>
                <input
                  id="inputContrasena"
                  type="password"
                  className="form-control"
                  // Actualiza el estado 'credenciales.contrasena' cada vez que el valor cambia.
                  onChange={(e) => setCredenciales({ ...credenciales, contrasena: e.target.value })}
                  // El valor del input está controlado por el estado 'credenciales.contrasena'.
                  value={credenciales.contrasena}
                  required // Hace el campo obligatorio.
                />
              </div>
              {/* Botón para enviar el formulario. */}
              <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
            {/* Enlace para ir al formulario de registro. */}
            <p className="mt-3 text-center">
              ¿No tienes cuenta? <button className="btn btn-link" onClick={() => setMostrarComponente('registro')}>Regístrate aquí</button>
            </p>
          </div>
        </div>
      ) : /* Si 'mostrarComponente' es 'registro', renderiza el componente de Registro */
      mostrarComponente === 'registro' ? (
        <>
          {/* Pasa 'setMostrarComponente' al componente Registro para que pueda cambiar la vista. */}
          <Registro setMostrarComponente={setMostrarComponente} />
          {/* Enlace para volver al formulario de inicio de sesión. */}
          <p className="text-center mt-3">
            ¿Ya tienes cuenta? <button className="btn btn-link" onClick={() => setMostrarComponente('login')}>Inicia Sesión</button>
          </p>
        </>
      ) : /* Si 'mostrarComponente' es 'dashboard', renderiza el componente Dashboard */
      mostrarComponente === 'dashboard' ? (
        // Pasa el nombre del usuario logueado y la función para cerrar sesión al Dashboard.
        // También pasa 'setMostrarComponente' por si el dashboard necesita cambiar la vista (aunque en tu Dashboard.jsx no se usa directamente ahora).
        <Dashboard usuario={usuarioLogueado} onCerrarSesion={manejarCerrarSesion} setMostrarComponente={setMostrarComponente} />
      ) : /* Si el estado no coincide con ninguno, no renderiza nada (puede ser útil para estados intermedios) */
      null}
    </div>
  );
}