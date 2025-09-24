// progreso.js
import api from "./api"

// Obtener actividades con su estado (última validación asociada)
export async function getActividadesConEstado() {
  try {
    const response = await api.get("/validaciones/mias/") 
    return response.data
  } catch (error) {
    console.error("Error cargando actividades:", error)
    throw error
  }
}
