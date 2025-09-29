import api from "./api"

export function getActividadDetalle(actividadId) {
  return api.get(`/actividad/${actividadId}/`)
    .then(res => res.data)
}

export function getEncargadoDetalle(actividadId) {
  return api.get(`/actividades/${actividadId}/encargado/`)
    .then(res => res.data);
}

export function getInstitucionDetalle(actividadId) {
  return api.get(`/actividades/${actividadId}/institucion/`)
    .then(res => res.data);
}

