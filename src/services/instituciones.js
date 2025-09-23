
import api from "./api"


export const getMisInstituciones = async () => {
  const response = await api.get("/instituciones/mias/")
  return response.data
}


export const createInstitucion = async (data) => {
  const response = await api.post("/upload-institucion/", data)
  return response.data
}


export const deleteInstitucion = async (id) => {
  const response = await api.delete(`/instituciones/${id}/delete/`)
  return response.data
}