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

  return true; // el backend solo devuelve 204 NoContent
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

// 🐶 BUSCAR DUEÑOS POR NOMBRE DE MASCOTA (con conexión real al backend)
export async function buscarDuenoPorNombreMascota(nombreMascota) {
  const url = `${URL}dueños/por-nombre-mascota?nombreMascota=${encodeURIComponent(nombreMascota)}`;

  const res = await fetch(url);

  if (!res.ok) {
    const texto = await res.text();
    throw new Error(texto || "Error al buscar dueños por nombre de mascota");
  }

  return await res.json(); // Devuelve un array de dueños
}


