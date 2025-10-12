
import api from "./api"


export function getEstudiantePerfil() {
  return api.get(`/perfil/estudiante/`)
    .then(res => res.data)
}


export function updateEstudiantePerfil(updatedData) {
    return api.patch(`/perfil/estudiante/`, updatedData)
        .then(res => res.data)
}