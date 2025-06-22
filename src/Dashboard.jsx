import './Dashboard.css';
import logo from './assets/logo.png';
import odontologia from './assets/odontologia.jpg';
import medicinaFelina from './assets/medicina-felina.jpg';
import ecoografias from './assets/ecoografias.jpg';
import cirugias from './assets/cirugias.jpg';
import examenes from './assets/examenes.jpg';
import vacunacion from './assets/vacunacion.jpg';
import vet from './assets/vet.jpg';
import lab from './assets/lab.jpg';

export function Dashboard({ usuario, onCerrarSesion, setMostrarComponente }) {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-logo">
          <img src={logo} alt="Veterinary Logo" />
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
          <p>
            Somos un equipo de profesionales dedicados a ofrecer servicios médicos veterinarios, un excelente trato personalizado, seguimiento de las necesidades de su mascota para prevenir enfermedades y mejorar su calidad de vida. <a href="#more">Leer más</a>
          </p>
        </section>

        <form className="subscription-form">
          <input type="text" placeholder="Nombre completo" />
          <input type="text" placeholder="Teléfonos" />
          <input type="email" placeholder="Correo Electrónico" />
          <input type="submit" value="Suscríbete" />
        </form>

        <section className="dashboard-cards">
          <div className="card">
            <img src={odontologia} alt="Odontología" />
            <h3>Odontología</h3>
            <p>Oferencemos paquetes odontológicos con expertos para cada caso en particular.</p>
          </div>
          <div className="card">
            <img src={medicinaFelina} alt="Medicina Felina" />
            <h3>Medicina Felina</h3>
            <p>Atención especializada con doctores y cuidados personalizados.</p>
          </div>
          <div className="card">
            <img src={ecoografias} alt="Ecoografías" />
            <h3>Ecoografías</h3>
            <p>Contamos con tecnología avanzada, diagnósticos precisos y sin necesidad de sedación.</p>
          </div>
          <div className="card">
            <img src={cirugias} alt="Cirugías" />
            <h3>Cirugías</h3>
            <p>Procedimientos avanzados con equipo especializado.</p>
          </div>
          <div className="card">
            <img src={examenes} alt="Exámenes" />
            <h3>Exámenes</h3>
            <p>Chequeos detallados para el bienestar de tus mascotas.</p>
          </div>
          <div className="card">
            <img src={vacunacion} alt="Vacunación" />
            <h3>Vacunación</h3>
            <p>Protege a tu mascota con vacunas actualizadas.</p>
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

      <div className="whatsapp-chat">
        <div className="contact">
          <img src={vet} alt="Veterinaria" />
          <span>Veterinaria</span>
          <span className="status">offline</span>
        </div>
        <div className="contact">
          <img src={lab} alt="Laboratorio" />
          <span>Especializado Laboratorio</span>
          <span className="status">online</span>
        </div>
        <button onClick={() => window.open('https://wa.me/1234567890', '_blank')}>
          Agenda tu cita por WhatsApp
        </button>
      </div>
    </div>
  );
}