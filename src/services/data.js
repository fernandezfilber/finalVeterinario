const URL_BASE_API = "https://localhost:7159/api/"; // URL base de tu API, ajustada al puerto 7159

export function iniciarSesion(nombreUsuario, contrasena) {
  let datosEnvio = {
    usuario: nombreUsuario,   // Envía el nombre de usuario
    contrasena: contrasena    // Envía la contraseña (clave 'contrasena' para el backend)
  };

  return fetch(URL_BASE_API + 'autenticacion', { // Endpoint: /api/autenticacion
    method: 'POST',
    body: JSON.stringify(datosEnvio), // Convierte el objeto a JSON para el cuerpo de la solicitud
    headers: {
      'Content-Type': 'application/json', // Indica que el contenido es JSON
    },
  })
    .then(respuesta => {
      // Verifica si la respuesta HTTP fue exitosa (códigos 2xx)
      if (!respuesta.ok) {
        // Si no fue exitosa, lanza un error que será capturado por el .catch
        throw new Error('La respuesta de la red no fue exitosa');
      }
      // Parsea la respuesta como JSON
      return respuesta.json();
    })
    .then(datosRecibidos => {
      // Si la autenticación es exitosa, tu servidor devuelve un objeto con la propiedad 'vet'.
      // Esta línea devuelve el valor de 'datosRecibidos.vet' o 'null' si no existe o es falsy.
      // Esto es lo que determinará si el login fue exitoso en el frontend.
      return datosRecibidos.vet || null;
    })
    .catch(error => {
      // Captura cualquier error que ocurra durante la solicitud (ej. problemas de red, errores de servidor)
      console.error('Error en la solicitud de inicio de sesión:', error);
      // Retorna null para indicar que el login falló debido a un error.
      return null;
    });
}
export async function registrarVeterinario(datosVeterinario) {
  try {
    const respuesta = await fetch(URL_BASE_API + 'RegistroVeterinario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosVeterinario), // Envía todos los datos del veterinario
    });

    if (!respuesta.ok) {
      // Si la respuesta no es 2xx, intentamos leer el mensaje de error del servidor
      const errorData = await respuesta.json();
      throw new Error(errorData.mensaje || 'Error en el registro del veterinario');
    }

    const datosConfirmacion = await respuesta.json();
    console.log("Respuesta de registro:", datosConfirmacion);
    return datosConfirmacion; // Devuelve el mensaje de confirmación (ej. {"mensaje": "Veterinario Registrado"})

  } catch (error) {
    console.error('Error al registrar veterinario:', error.message);
    // Puedes devolver null o un objeto de error para manejarlo en el frontend
    return { error: error.message || "Error desconocido al registrar" };
  }
}