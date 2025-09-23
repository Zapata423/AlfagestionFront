// api.js
import axios from "axios"

const API_URL = "http://localhost:8000/api"

// Instancia de axios con configuración
const api = axios.create({
  baseURL: API_URL,
})

// Interceptor para añadir token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api