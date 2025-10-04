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

export async function getComentariosPorActividad(actividadId) {
  try {
    const url = `/comentarios/${actividadId}/`
    
    const response = await api.get(url)
    return response.data
  } catch (error) {
    console.error(`Error cargando comentarios para la actividad ${actividadId}:`, error)
    throw error
  }
}




