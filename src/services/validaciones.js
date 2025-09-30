import api from "./api" 

export async function validarActividad(actividadId, data) {
  const res = await api.post(`/actividades/${actividadId}/validar/`, data)
  return res.data
}