import axios from 'axios'

const API_URL = "http://localhost:8000/api"

export async function loginEstudiante(email, password) {
  try {
    const response = await axios.post(`${API_URL}/loginEstudiantes/`, {
      email,
      password,
    })
    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    } else {
      throw { detail: "Error de conexión con el servidor" }
    }
  }
}


export async function logoutEstudiante() {
  try {
    const refresh = localStorage.getItem('refresh')
    if (!refresh) {
      throw { detail: "No hay refresh token guardado" }
    }

    const response = await axios.post(`${API_URL}/logout/`, { refresh })

    // Limpiar todo el storage local
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('user')

    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    } else {
      throw { detail: "Error de conexión con el servidor" }
    }
  }
}