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
export async function getDuenosRegistrados() {
  // Descripción: Obtiene el número total de dueños registrados en el sistema.
  const response = await fetch(URL_BASE_API + 'DuenosRegistrados');
  return response.ok ? (await response.json()).cantidad : 0;
}

// Obtener la cantidad de mascotas registradas
export async function getMascotasRegistradas() {
  // Descripción: Obtiene el número total de mascotas registradas en el sistema.
  const response = await fetch(URL_BASE_API + 'MascotasRegistradas');
  return response.ok ? (await response.json()).cantidad : 0;
}

// Obtener la cantidad de veterinarios activos
export async function getVeterinariosActivos() {
  // Descripción: Obtiene el número de veterinarios que están activos en el sistema.
  const response = await fetch(URL_BASE_API + 'VeterinariosActivos');
  return response.ok ? (await response.json()).cantidad : 0;
}

// Obtener la cantidad de consultas realizadas
export async function getConsultasRealizadas() {
  // Descripción: Obtiene el número total de consultas realizadas en el sistema.
  const response = await fetch(URL_BASE_API + 'ConsultasRealizadas');
  return response.ok ? (await response.json()).cantidad : 0;
}

// Obtener la cantidad de vacunas aplicadas
export async function getVacunasAplicadas() {
  // Descripción: Obtiene el número total de vacunas aplicadas a las mascotas.
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
// </DOCUMENT>