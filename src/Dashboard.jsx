import './Dashboard.css';
import logo from './assets/logo.png'; // Import the image as a module

export function Dashboard({ usuario, onCerrarSesion, setMostrarComponente }) {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-logo">
          <img src={logo} alt="Veterinary Logo" width="50" height="50" /> {/* Use the imported image */}
          <h1>Veterinaria Patitas Felices</h1>
        </div>
        <nav className="dashboard-nav">
          <ul>
            <li><a href="#home" onClick={() => setMostrarComponente('dashboard')} aria-current="page">Inicio</a></li>
            <li><a href="#appointments" onClick={() => setMostrarComponente('mascotas')}>Citas</a></li>
            <li><a href="#pets" onClick={() => setMostrarComponente('mascotas')}>Mascotas</a></li>
            <li><a href="#profile">Perfil</a></li>
            <li><button onClick={onCerrarSesion} className="logout-button">Cerrar Sesión</button></li>
          </ul>
        </nav>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>¡Bienvenido, {usuario}!</h2>
          <p>Gestiona las citas y el cuidado de las mascotas con facilidad.</p>
        </section>
        <section className="dashboard-cards">
          <div className="card">
            <h3>Agendar Cita</h3>
            <p>Programa una nueva cita para tus mascotas.</p>
            <button className="card-button" onClick={() => setMostrarComponente('mascotas')}>Agendar Ahora</button>
          </div>
          <div className="card">
            <h3>Mis Mascotas</h3>
            <p>Consulta el historial y detalles de tus mascotas.</p>
            <button className="card-button" onClick={() => setMostrarComponente('mascotas')}>Ver Mascotas</button>
          </div>
          <div className="card">
            <h3>Actividad Reciente</h3>
            <p>Revisa las últimas actualizaciones y citas.</p>
            <button className="card-button">Ver Actividad</button>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} Veterinaria Patitas Felices. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="mailto:contacto@patitasfelices.com">Contacto</a>
          <a href="https://facebook.com/patitasfelices">Facebook</a>
          <a href="https://instagram.com/patitasfelices">Instagram</a>
        </div>
      </footer>
    </div>
  );
}