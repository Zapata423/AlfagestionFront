
import api from "./api"


export const getMisEncargados = async () => {
  const response = await api.get("/encargados/mios/")
  return response.data
}

export const createEncargado = async (data) => {
  const response = await api.post("/upload-encargado/", data)
  return response.data
}

export const deleteEncargado = async (id) => {
  const response = await api.delete(`/encargados/${id}/delete/`)
  return response.data
}