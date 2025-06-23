import React, { useState, useEffect } from 'react';
import * as API from './services/data'; // Asegúrate de que la ruta sea correcta
import { FormularioEdicionVeterinario } from './FormularioEdicionVeterinario'; // Importa el nuevo componente

export function GestionVeterinarios({ onVolverAlDashboard }) {
  const [veterinarios, setVeterinarios] = useState([]);
  const [cargandoVeterinarios, setCargandoVeterinarios] = useState(true);
  const [mensajeOperacion, setMensajeOperacion] = useState(null); // Cambiado a null para mejor manejo
  const [veterinarioAEditar, setVeterinarioAEditar] = useState(null); // Estado para el veterinario en edición

  // Función para obtener la lista real de veterinarios del backend
  const obtenerListaVeterinarios = async () => {
    setCargandoVeterinarios(true);
    setMensajeOperacion(null); // Limpiar mensaje al recargar
    try {
      const data = await API.getTodosLosVeterinarios();
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
      setMensajeOperacion(null);
      try {
        const resultado = await API.eliminarVeterinario(id);
        if (resultado.exito) {
          setMensajeOperacion({ texto: resultado.mensaje, tipo: "success" });
          obtenerListaVeterinarios(); // Recargar la lista
        } else {
          setMensajeOperacion({ texto: resultado.mensaje, tipo: "danger" });
        }
      } catch (error) {
        console.error("Error al eliminar veterinario:", error);
        setMensajeOperacion({ texto: "Error desconocido al intentar eliminar el veterinario.", tipo: "danger" });
      }
    }
  };

  // NUEVA FUNCIÓN: Manejar clic en Actualizar - Abre el formulario de edición
  const manejarActualizarVeterinario = (vet) => {
    setVeterinarioAEditar(vet); // Carga los datos del veterinario en el estado
  };

  // NUEVA FUNCIÓN: Manejar el envío del formulario de edición
  const manejarGuardarEdicion = async (datosActualizados) => {
    setMensajeOperacion(null); // Limpiar mensaje antes de la operación
    try {
      // Llamamos a la función de la API para actualizar
      const resultado = await API.actualizarVeterinario(veterinarioAEditar.idVeterinario, datosActualizados);

      if (resultado.exito) {
        setMensajeOperacion({ texto: resultado.mensaje, tipo: "success" });
        setVeterinarioAEditar(null); // Cerrar el formulario de edición
        obtenerListaVeterinarios(); // Recargar la lista de veterinarios
      } else {
        setMensajeOperacion({ texto: resultado.mensaje, tipo: "danger" });
      }
    } catch (error) {
      console.error("Error al guardar la edición del veterinario:", error);
      setMensajeOperacion({ texto: error.message || "Error desconocido al intentar guardar la actualización.", tipo: "danger" });
    }
  };

  // NUEVA FUNCIÓN: Manejar la cancelación del formulario de edición
  const manejarCancelarEdicion = () => {
    setVeterinarioAEditar(null); // Limpiar el estado para cerrar el formulario
    setMensajeOperacion(null); // Opcional: limpiar mensajes si había uno
  };


  if (cargandoVeterinarios) {
    return <div className="text-center mt-5">Cargando veterinarios...</div>;
  }

  return (
    <div className="card shadow-sm p-4">
      <h3 className="card-title text-center mb-4">Gestionar Veterinarios</h3>

      {/* Mensajes de operación */}
      {mensajeOperacion && (
        <div className={`alert alert-${mensajeOperacion.tipo} alert-dismissible fade show`} role="alert">
          {mensajeOperacion.texto}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {/* Renderizado condicional del formulario de edición */}
      {veterinarioAEditar ? (
        <FormularioEdicionVeterinario
          veterinario={veterinarioAEditar}
          onGuardar={manejarGuardarEdicion}
          onCancelar={manejarCancelarEdicion}
        />
      ) : (
        // Mostrar la lista de veterinarios solo si no estamos editando
        veterinarios.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
            {veterinarios.map((vet) => (
              <div className="col" key={vet.idVeterinario}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{vet.nombre}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">ID: {vet.idVeterinario}</h6>
                    <p className="card-text">
                      <strong>Usuario:</strong> {vet.usuario} <br />
                      <strong>Teléfono:</strong> {vet.telefono} <br />
                      <strong>Correo:</strong> {vet.correo} <br />
                      <strong>Activo:</strong> {vet.activo ? 'Sí' : 'No'}
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-end gap-2">
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
        )
      )}

      <div className="d-grid gap-2">
        <button type="button" className="btn btn-secondary" onClick={onVolverAlDashboard}>
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
}