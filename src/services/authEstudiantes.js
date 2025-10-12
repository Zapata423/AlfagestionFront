
import api from "./api"


export async function loginEstudiante(email, password) {
  try {
    const response = await api.post("/loginEstudiantes/", {
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
    const refresh = localStorage.getItem("refresh")
    if (!refresh) {
      throw { detail: "No hay refresh token guardado" }
    }

    const response = await api.post("/logout/", { refresh })


    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("user")

    return response.data
  } catch (error) {
    if (error.response) {
      throw error.response.data
    } else {
      throw { detail: "Error de conexión con el servidor" }
    }
  }
}
