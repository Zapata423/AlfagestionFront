import api from "./api" 

export async function validarActividad(actividadId, data) {
  const res = await api.post(`/actividades/${actividadId}/validar/`, data)
  return res.data
}

// Obtener la validación existente de una actividad
export async function obtenerValidacionActividad(actividadId) {
  const res = await api.get(`/actividades/${actividadId}/validacion/`) 
  return res.data || null
}

// Editar validación existente
export async function editarValidacionActividad(actividadId, data) { 
  const res = await api.put(`/actividades/${actividadId}/validacion/editar/`, data)
  return res.data
}