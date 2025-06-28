import './Login.css';
import { useState } from "react";
import * as API from "../services/data";
import imagen from "../assets/login.png";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [veterinario, setVeterinario] = useState({ usuario: "", contrasena: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await API.Login(veterinario.usuario, veterinario.contrasena);
      if (response) {
        // ✅ Guardar nombre en localStorage
        localStorage.setItem('nombreUsuario', veterinario.usuario);
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="contenedor-login">
      <img src={imagen} alt="Logo Veterinaria" width="120" height="120" />
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="usuario">Usuario:</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          value={veterinario.usuario}
          onChange={(e) => setVeterinario({ ...veterinario, usuario: e.target.value })}
          required
        />

        <label htmlFor="pass">Contraseña:</label>
        <input
          type="password"
          id="pass"
          name="contrasena"
          value={veterinario.contrasena}
          onChange={(e) => setVeterinario({ ...veterinario, contrasena: e.target.value })}
          required
        />

        <input type="submit" value="Enviar" />
      </form>

      <div className="login-prompt">
        <span>¿No tienes cuenta?</span>
        <button className="login-button" onClick={() => navigate('/registro')}>
          Regístrate aquí
        </button>
      </div>

      <div className="login-prompt">
        <button className="login-button" onClick={() => navigate('/actualizar')}>
          Actualizar contraseña
        </button>
      </div>
    </div>
  );
}




