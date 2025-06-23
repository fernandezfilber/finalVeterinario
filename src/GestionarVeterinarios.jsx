import React, { useState, useEffect } from 'react';
import * as API from './services/data'; // Asegúrate de que la ruta sea correcta

export function GestionVeterinarios({ onVolverAlDashboard }) {
  const [veterinarios, setVeterinarios] = useState([]);
  const [cargandoVeterinarios, setCargandoVeterinarios] = useState(true);
  const [mensajeOperacion, setMensajeOperacion] = useState('');

  // Función para obtener la lista real de veterinarios del backend
  const obtenerListaVeterinarios = async () => {
    setCargandoVeterinarios(true);
    setMensajeOperacion('');
    try {
      const data = await API.getTodosLosVeterinarios(); // Usamos la función de la API para obtener los veterinarios
      setVeterinarios(data);
      console.log("Lista de veterinarios cargada del backend:", data);
    } catch (error) {
      console.error("Error al cargar veterinarios:", error);
      setMensajeOperacion({ texto: "Error al cargar la lista de veterinarios.", tipo: "danger" });
    } finally {
      setCargandoVeterinarios(false);
    }
  };

  useEffect(() => {
    obtenerListaVeterinarios();
  }, []);

  const manejarEliminarVeterinario = async (id) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar al veterinario con ID: ${id}?`)) {
      setMensajeOperacion('');
      try {
        const resultado = await API.eliminarVeterinario(id); //
        if (resultado.exito) {
          setMensajeOperacion({ texto: resultado.mensaje, tipo: "success" });
          obtenerListaVeterinarios(); 
        } else {
          setMensajeOperacion({ texto: resultado.mensaje, tipo: "danger" });
        }
      } catch (error) {
        console.error("Error al eliminar veterinario:", error);
        setMensajeOperacion({ texto: "Error desconocido al intentar eliminar el veterinario.", tipo: "danger" });
      }
    }
  };

  // NUEVA FUNCIÓN: Manejar clic en Actualizar
  const manejarActualizarVeterinario = (vet) => {
  
    alert(`Funcionalidad de Actualizar para el veterinario: ${vet.nombre} (ID: ${vet.id}). ¡Próximamente un formulario aquí!`);
   
  };


  if (cargandoVeterinarios) {
    return <div className="text-center mt-5">Cargando veterinarios...</div>;
  }

 

  return (
    <div className="card shadow-sm p-4">
      <h3 className="card-title text-center mb-4">Gestionar Veterinarios</h3>

      {mensajeOperacion.texto && (
        <div className={`alert alert-${mensajeOperacion.tipo} alert-dismissible fade show`} role="alert">
          {mensajeOperacion.texto}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {veterinarios.length > 0 ? (
       
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
          {veterinarios.map((vet) => (
            <div className="col" key={vet.idVeterinario}>
              <div className="card h-100 shadow-sm"> {/* Card para cada veterinario */}
                <div className="card-body">
                  <h5 className="card-title text-primary">{vet.nombre}</h5> {/* Título principal */}
                  <h6 className="card-subtitle mb-2 text-muted">ID: {vet.idVeterinario}</h6> {/* Subtítulo */}
                  <p className="card-text">
                    <strong>Usuario:</strong> {vet.usuario} <br />
                    <strong>Teléfono:</strong> {vet.telefono} <br />
                    <strong>Correo:</strong> {vet.correo} <br />
                    <strong>Activo:</strong> {vet.activo ? 'Sí' : 'No'}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-end gap-2"> {/* Footer para los botones */}
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => manejarActualizarVeterinario(vet)}
                  >
                    <i className="bi bi-pencil-square"></i> Actualizar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => manejarEliminarVeterinario(vet.idVeterinario)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No hay veterinarios registrados.</p>
      )}

      <div className="d-grid gap-2">
        <button type="button" className="btn btn-secondary" onClick={onVolverAlDashboard}>
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
}