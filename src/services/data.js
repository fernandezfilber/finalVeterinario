// <DOCUMENT filename="services/data.js">
const URL_BASE_API = "https://localhost:7159/api/";

export function iniciarSesion(nombreUsuario, contrasena) {
  let datosEnvio = { usuario: nombreUsuario, contrasena };
  return fetch(URL_BASE_API + 'autenticacion', {
    method: 'POST',
    body: JSON.stringify(datosEnvio),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(respuesta => respuesta.ok ? respuesta.json().then(d => d.vet || null) : Promise.reject(new Error('Error en autenticación')))
    .catch(error => {
      console.error('Error en la solicitud de inicio de sesión:', error); // Depuración: 04:18 PM -05 de domingo, 22 de junio de 2025
      return null;
    });
}

export async function registrarVeterinario(datosVeterinario) {
  try {
    const respuesta = await fetch(URL_BASE_API + 'RegistroVeterinario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosVeterinario),
    });
    if (!respuesta.ok) throw new Error((await respuesta.json()).mensaje || 'Error en registro');
    return await respuesta.json();
  } catch (error) {
    console.error('Error al registrar veterinario:', error.message); // Depuración: 04:18 PM -05 de domingo, 22 de junio de 2025
    return { error: error.message || "Error desconocido" };
  }
}

export async function getDueños() {
  const response = await fetch(URL_BASE_API + 'dueños');
  return response.json();
}

export async function agregarDueño(dueño) {
  await fetch(URL_BASE_API + 'dueños', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dueño)
  });
}

export async function getMascotas() {
  const response = await fetch(URL_BASE_API + 'mascotas');
  return response.json();
}

export async function agregarMascota(mascota) {
  await fetch(URL_BASE_API + 'mascotas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mascota)
  });
}

// Obtener la cantidad de dueños registrados
export async function getDuenosRegistrados() {// Descripción: Obtiene el número total de dueños registrados en el sistema.
  const response = await fetch(URL_BASE_API + 'DuenosRegistrados');
  return response.ok ? (await response.json()).cantidad : 0;
}

// Obtener la cantidad de mascotas registradas
export async function getMascotasRegistradas() {
  // Descripción: Obtiene el número total de mascotas registradas en el sistema.
  const response = await fetch(URL_BASE_API + 'MascotasRegistradas'); return response.ok ? (await response.json()).cantidad : 0;
}

// Obtener la cantidad de veterinarios activos
export async function getVeterinariosActivos() {
  // Descripción: Obtiene el número de veterinarios que están activos en el sistema.
  const response = await fetch(URL_BASE_API + 'VeterinariosActivos');
  return response.ok ? (await response.json()).cantidad : 0;
}

// Obtener la cantidad de consultas realizadas
export async function getConsultasRealizadas() { // Descripción: Obtiene el número total de consultas realizadas en el sistema.
  const response = await fetch(URL_BASE_API + 'ConsultasRealizadas'); return response.ok ? (await response.json()).cantidad : 0;
}

// Obtener la cantidad de vacunas aplicadas
export async function getVacunasAplicadas() { // Descripción: Obtiene el número total de vacunas aplicadas a las mascotas.
  const response = await fetch(URL_BASE_API + 'VacunasAplicadas');
  return response.ok ? (await response.json()).cantidad : 0;
}

// Obtener la cantidad de enfermedades comunes
export async function getEnfermedadesComunes() {
  // Descripción: Obtiene el número total de enfermedades comunes registradas en el sistema.
  const response = await fetch(URL_BASE_API + 'EnfermedadesComunes');
  return response.ok ? (await response.json()).cantidad : 0;
}

// Obtener las estadísticas para el gráfico de barras
export async function getChartStatistics() {
  // Descripción: Obtiene las estadísticas agregadas para el gráfico de barras.
  const response = await fetch(URL_BASE_API + 'estadisticas');
  return response.ok ? await response.json() : [];
}

// NUEVA FUNCIÓN: Actualizar Contraseña
/**
 * Actualiza la contraseña de un usuario existente.
 * @param {string} usuario - El nombre de usuario.
 * @param {string} pass - La contraseña actual del usuario.
 * @param {string} newpass - La nueva contraseña del usuario.
 * @returns {Promise<Object>} Un objeto con un mensaje de éxito o un mensaje de error.
 */
export async function actualizarContrasena(usuario, pass, newpass) {
  try {
    const respuesta = await fetch(URL_BASE_API + 'ActualizarPass', {
      method: 'PATCH', // Usamos PATCH como indica tu Swagger/OpenAPI
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, pass, newpass }), // Los datos que espera la API
    });

    // Si la respuesta no es OK (ej. 400, 401, 500), lanzamos un error
    if (!respuesta.ok) {
      const errorData = await respuesta.json(); // Intentamos obtener el mensaje de error del cuerpo
      throw new Error(errorData.mensaje || `Error al actualizar la contraseña: ${respuesta.status} ${respuesta.statusText}`);
    }

    // Si la respuesta es OK (200), asumimos que la operación fue exitosa
    // Puedes verificar el cuerpo de la respuesta si tu API devuelve algo específico en caso de éxito.
    return { exito: true, mensaje: "Contraseña actualizada con éxito." };

  } catch (error) {
    console.error('Error al actualizar contraseña:', error.message);
    return { exito: false, mensaje: error.message || "Error desconocido al actualizar la contraseña." };
  }
}

// NUEVA FUNCIÓN: Eliminar Veterinario
/**
 * Elimina un veterinario del sistema por su ID.
 * @param {number} idVeterinario - El ID del veterinario a eliminar.
 * @returns {Promise<Object>} Un objeto con 'exito' (booleano) y un 'mensaje' (string).
 */
export async function eliminarVeterinario(idVeterinario) {
  try {
    // Construimos la URL con el ID como parámetro de consulta
    const respuesta = await fetch(`${URL_BASE_API}Veterinario?id=${idVeterinario}`, {
      method: 'DELETE', // El método HTTP para eliminar
    });

    // La API devuelve 'true' o 'false' en texto plano y un estado 200 OK
    if (respuesta.ok) {
      const resultadoTexto = await respuesta.text(); // Leemos la respuesta como texto
      const exito = resultadoTexto.toLowerCase() === 'true'; // Convertimos 'true'/'false' a booleano

      if (exito) {
        return { exito: true, mensaje: `Veterinario con ID ${idVeterinario} eliminado con éxito.` };
      } else {
        // Si la respuesta.ok es true pero el cuerpo es 'false', significa que no se pudo eliminar
        return { exito: false, mensaje: `No se pudo eliminar el veterinario con ID ${idVeterinario}. Es posible que no exista.` };
      }
    } else {
      // Si la respuesta no es OK (ej. 404, 500), la API podría no devolver un cuerpo JSON o un mensaje específico.
      // Aquí manejamos un error general basado en el estado HTTP.
      throw new Error(`Error al eliminar veterinario: ${respuesta.status} ${respuesta.statusText}`);
    }
  } catch (error) {
    console.error('Error en eliminarVeterinario:', error.message);
    return { exito: false, mensaje: error.message || "Error desconocido al eliminar el veterinario." };
  }
}
// NUEVA FUNCIÓN: Obtener todos los veterinarios
/**
 * Obtiene la lista completa de todos los veterinarios registrados en el sistema.
 * @returns {Promise<Array<Object>>} Una promesa que resuelve con un array de objetos de veterinarios.
 */
export async function getTodosLosVeterinarios() {
  try {
    const response = await fetch(URL_BASE_API + 'Lista'); // Llama al endpoint GET que devuelve la lista de veterinarios
    if (!response.ok) {
      throw new Error(`Error al obtener veterinarios: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getTodosLosVeterinarios:', error.message);
    return []; // Retorna un array vacío en caso de error
  }
}
// </DOCUMENT>