
import api from "./api"


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




