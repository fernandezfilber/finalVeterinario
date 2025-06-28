const URL = "https://localhost:7159/api/";

// 🔐 LOGIN
export function Login(usuario, contrasena) {
  const datos = {
    usuario: usuario,
    contrasena: contrasena
  };

  return fetch(URL + 'autenticacion', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (res) => {
    const texto = await res.text();
    if (!res.ok) throw new Error(texto);
    return true;
  });
}

// 📝 REGISTRO DE VETERINARIO
export function registrarVeterinario(datos) {
  return fetch(URL + 'RegistroVeterinario', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (res) => {
      const texto = await res.text();
      if (!res.ok) return { error: texto };
      return { mensaje: texto };
    })
    .catch((error) => {
      return { error: "Error al conectar con el backend: " + error.message };
    });
}

// 🔄 ACTUALIZAR CONTRASEÑA
export function actualizarContrasena(usuario, pass, newpass) {
  const datos = {
    usuario: usuario,
    pass: pass,
    newpass: newpass
  };

  return fetch(URL + 'ActualizarPass', {
    method: 'PATCH',
    body: JSON.stringify(datos),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (res) => {
      const texto = await res.text();
      if (!res.ok) return { exito: false, mensaje: texto };
      return { exito: true, mensaje: texto };
    })
    .catch((error) => {
      return { exito: false, mensaje: "Error de conexión: " + error.message };
    });
}

// 📊 TOTAL DE DUEÑOS REGISTRADOS
export async function obtenerTotalDuenos() {
  const res = await fetch(URL + 'dueños');
  if (!res.ok) throw new Error("Error al obtener la lista de dueños");
  const data = await res.json();
  return Array.isArray(data) ? data.length : 0;
}

// 📥 OBTENER TODOS LOS DUEÑOS
export async function obtenerDuenos() {
  const res = await fetch(URL + 'dueños');
  if (!res.ok) throw new Error("Error al obtener los dueños");
  return await res.json();
}

// ➕ INSERTAR NUEVO DUEÑO
export async function insertarDueno(dueno) {
  const res = await fetch(URL + 'dueños', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dueno)
  });
  if (!res.ok) {
    const texto = await res.text();
    throw new Error(texto);
  }
}

// ✏️ ACTUALIZAR DUEÑO
export async function actualizarDueno(id, dueno) {
  const res = await fetch(URL + 'dueños/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dueno)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Error al actualizar dueño");
  }

  return true;
}

// ❌ ELIMINAR DUEÑO
export async function eliminarDueno(id) {
  const res = await fetch(URL + 'dueños/' + id, { method: 'DELETE' });
  if (!res.ok) throw new Error("Error al eliminar dueño");
  return await res.text();
}

// 🔍 BUSCAR DUEÑO POR ID
export async function buscarDuenoPorId(id) {
  const res = await fetch(URL + 'dueños/' + id);
  if (!res.ok) throw new Error("Dueño no encontrado");
  return await res.json();
}

// 🐶 BUSCAR DUEÑOS POR NOMBRE DE MASCOTA
export async function buscarDuenoPorNombreMascota(nombreMascota) {
  const url = `${URL}dueños/por-nombre-mascota?nombreMascota=${encodeURIComponent(nombreMascota)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const texto = await res.text();
    throw new Error(texto || "Error al buscar dueños por nombre de mascota");
  }
  return await res.json();
}

// ❌ ELIMINAR VETERINARIO
export async function eliminarVeterinario(idVeterinario) {
  try {
    const respuesta = await fetch(`${URL}Veterinario/${idVeterinario}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (respuesta.ok) {
      const resultado = await respuesta.json();

      if (resultado.exito) {
        return {
          exito: true,
          mensaje: `Veterinario con ID ${idVeterinario} eliminado con éxito.`
        };
      } else {
        return {
          exito: false,
          mensaje: `No se pudo eliminar el veterinario con ID ${idVeterinario}. Es posible que no exista.`
        };
      }

    } else {
      throw new Error(`Error al eliminar veterinario: ${respuesta.status} ${respuesta.statusText}`);
    }

  } catch (error) {
    console.error('Error en eliminarVeterinario:', error.message);
    return {
      exito: false,
      mensaje: error.message || "Error desconocido al eliminar el veterinario."
    };
  }
}

// 🔄 ACTUALIZAR VETERINARIO
export async function actualizarVeterinario(idVeterinario, datosVeterinario) {
  try {
    const url = `${URL}Veterinario/${idVeterinario}`;
    console.log(`[API] Intentando actualizar veterinario con PUT a: ${url}`);
    console.log("[API] Datos a enviar:", datosVeterinario);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(datosVeterinario)
    });

    if (!response.ok) {
      let errorData = null;
      try {
        errorData = await response.json();
      } catch (error) {
        errorData = await response.text();
      }

      console.error(`[API] Error HTTP al actualizar veterinario: ${response.status} ${response.statusText}`, errorData);
      throw new Error(errorData.mensaje || `Error al actualizar veterinario: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log("[API] Respuesta de actualización exitosa:", result);

    return {
      exito: true,
      mensaje: result.mensaje || "Veterinario actualizado correctamente."
    };

  } catch (error) {
    console.error('[API] Error en actualizarVeterinario (catch block):', error.message);
    return {
      exito: false,
      mensaje: error.message || "Error desconocido al intentar actualizar el veterinario."
    };
  }
}

