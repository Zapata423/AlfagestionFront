// services/listaEstudiantes.js
import api from "./api"

// ✅ Obtener estudiantes filtrados por grado y grupo
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