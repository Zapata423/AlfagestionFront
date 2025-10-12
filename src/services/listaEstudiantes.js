
import api from "./api"


export async function getEstudiantes(grado = null, grupo = null) {
  try {
    const params = {}
    if (grado) params.grado = grado
    if (grupo) params.grupo = grupo

    const response = await api.get("/estudiantes/", { params })
    return response.data
  } catch (error) {
    console.error("Error cargando estudiantes:", error)
    throw error
  }
}


export async function getActividadesPorEstudiante(estudianteId) {
  try {
    const response = await api.get(`/estudiante/${estudianteId}/actividades/`)
    return response.data
  } catch (error) {
    console.error(`Error cargando actividades del estudiante ${estudianteId}:`, error)
    throw error
  }
}