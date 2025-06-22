import './App.css';

export function Mascotas() {
  return (
    <div className="mascotas-container">
      <h2>Mis Mascotas</h2>
      <p>Aquí puedes ver y gestionar las mascotas registradas.</p>
      {/*.... */}
      <button onClick={() => alert("Función de agregar mascota en desarrollo")}>
        Agregar Mascota
      </button>
    </div>
  );
}