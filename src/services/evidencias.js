import api from "./api"

export function getActividadDetalle(actividadId) {
  return api.get(`/actividad/${actividadId}/`)
    .then(res => res.data)
}