
import api from "./api"

export function getDocentePerfil() {
  return api.get(`/perfil/docente/`)
    .then(res => res.data)
}

export function updateDocentePerfil(updatedData) {
    // Usamos PATCH para enviar solo los campos que cambiaron
    return api.patch(`/perfil/docente/`, updatedData)
        .then(res => res.data)
}