import api from "./api" 


export async function validarActividad(actividadId, data) {
  const res = await api.post(`/actividades/${actividadId}/validar/`, data)
  return res.data
}


export async function obtenerValidacionActividad(actividadId) {
  const res = await api.get(`/actividades/${actividadId}/validacion/`) 
  return res.data || null
}


export async function editarValidacionActividad(actividadId, data) { 
  const res = await api.put(`/actividades/${actividadId}/validacion/editar/`, data)
  return res.data
}