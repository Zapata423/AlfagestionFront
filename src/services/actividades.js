
import api from "./api"


export const getMisActividades = async () => {
  const response = await api.get("/actividades/mias/")
  return response.data
}


export const createActividad = async (data) => {
  const response = await api.post("/upload-actividad/", data)
  return response.data
}


export const deleteActividad = async (id) => {
  const response = await api.delete(`/actividad/${id}/delete/`)
  return response.data
}