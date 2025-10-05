<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import estudianteNavbar from "./estudianteNavbar.vue"
import { getEstudiantePerfil, updateEstudiantePerfil } from "../services/perfilEstudiante.js"

const router = useRouter()
const BASE_URL = "http://localhost:8000"

const isEditing = ref(false)
const originalData = ref({})

const estudianteData = ref({
  nombres: "",
  apellidos: "",
  email: "",
  grado: "",
  telefono: "",
  fecha_nacimiento: "",
  grupo: "",
  estado: "Cargando...",
  foto_url: null,
  newPhotoFile: null
})

async function fetchEstudianteData() {
  try {
    const data = await getEstudiantePerfil()
    let fotoUrlAbsoluta = data.estudiante.foto
    if (fotoUrlAbsoluta && fotoUrlAbsoluta.startsWith("/")) {
      fotoUrlAbsoluta = `${BASE_URL}${fotoUrlAbsoluta}`
    }

    const mappedData = {
      nombres: data.estudiante.nombres || "",
      apellidos: data.estudiante.apellidos || "",
      telefono: data.estudiante.telefono || "",
      fecha_nacimiento: data.estudiante.fecha_nacimiento || "",
      foto_url: fotoUrlAbsoluta || null,
      email: data.email,
      grado: data.grado,
      grupo: data.grupo,
      estado: "Activo"
    }
    estudianteData.value = mappedData
    originalData.value = { ...mappedData }
  } catch (error) {
    console.error("Error al cargar el perfil del estudiante:", error)
    estudianteData.value.estado = "Error de Carga"
  }
}

onMounted(() => {
  fetchEstudianteData()
})

function editProfile() {
  isEditing.value = true
}

async function saveProfile() {
  let payload
  if (estudianteData.value.newPhotoFile) {
    const formData = new FormData()
    formData.append("estudiante.nombres", estudianteData.value.nombres)
    formData.append("estudiante.apellidos", estudianteData.value.apellidos)
    formData.append("estudiante.telefono", estudianteData.value.telefono)
    formData.append("estudiante.fecha_nacimiento", estudianteData.value.fecha_nacimiento)
    formData.append("estudiante.foto", estudianteData.value.newPhotoFile)
    payload = formData
  } else {
    payload = {
      estudiante: {
        nombres: estudianteData.value.nombres,
        apellidos: estudianteData.value.apellidos,
        telefono: estudianteData.value.telefono,
        fecha_nacimiento: estudianteData.value.fecha_nacimiento
      }
    }
  }

  try {
    await updateEstudiantePerfil(payload)
    alert("¡Perfil actualizado con éxito! 🎉")
    await fetchEstudianteData()
    estudianteData.value.newPhotoFile = null
    isEditing.value = false
  } catch (error) {
    console.error("Error al guardar el perfil:", error.response?.data || error)
    alert("Error al actualizar el perfil. Revisa los datos.")
  }
}

function cancelEdit() {
  estudianteData.value = { ...originalData.value }
  estudianteData.value.newPhotoFile = null
  isEditing.value = false
}

function handlePhotoClick() {
  if (isEditing.value) {
    document.getElementById("photoInput").click()
  }
}

function handlePhotoChange(event) {
  const file = event.target.files[0]
  if (file) {
    estudianteData.value.newPhotoFile = file
    estudianteData.value.foto_url = URL.createObjectURL(file)
  } else {
    estudianteData.value.newPhotoFile = null
  }
}

function goHome() {
  router.push("/ini_estudiante")
}
</script>

<template>
  <div class="app-container">
    <estudianteNavbar />
    <main class="main-content">
      <aside class="sidebar">
        <div class="profile-header">
          <div class="profile-avatar-wrapper" @click="handlePhotoClick">
            <div 
              class="profile-avatar"
              :class="{ 'placeholder-bg': !estudianteData.foto_url }"
            >
              <img
                v-if="estudianteData.foto_url"
                :src="estudianteData.foto_url"
                alt="Foto de Perfil"
                class="profile-img"
              />
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a7.5 7.5 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>

            <button 
              v-if="isEditing" 
              class="edit-photo-button" 
              @click.stop="handlePhotoClick"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14.25v4.5m-2.25-2.25h4.5"
                />
              </svg>
            </button>

            <input 
              id="photoInput" 
              type="file" 
              ref="photoInput" 
              @change="handlePhotoChange" 
              style="display: none;" 
              accept="image/*"
            />
          </div>
          <h3>{{ estudianteData.nombres }} {{ estudianteData.apellidos }}</h3>
          <p>{{ estudianteData.grado }}{{ estudianteData.grupo }}</p>
        </div>

        <ul class="sidebar-nav-list">
          <li class="active">
            <a href="#" style="color: inherit; text-decoration: none; display: block;">Mi Perfil</a>
          </li>
        </ul>

        <div class="sidebar-action action-margin" v-if="!isEditing">
          <button class="submit-button" @click="editProfile">Editar Perfil</button>
        </div>

        <template v-else>
          <div class="sidebar-action action-margin">
            <button class="submit-button" @click="saveProfile">Guardar Cambios</button>
          </div>
          <div class="sidebar-action">
            <button class="cancel-button" @click="cancelEdit">Cancelar Edición</button>
          </div>
        </template>

        <div class="sidebar-action" v-if="!isEditing">
          <button class="cancel-button" @click="goHome">Volver</button>
        </div>
      </aside>

      <section class="content-view">
        <h2>Información del Estudiante</h2>
        <div class="data-grid">
          <div class="data-item full-width">
            <label>Nombres</label>
            <input v-if="isEditing" type="text" v-model="estudianteData.nombres" />
            <p v-else>{{ estudianteData.nombres }}</p>
          </div>

          <div class="data-item full-width">
            <label>Apellidos</label>
            <input v-if="isEditing" type="text" v-model="estudianteData.apellidos" />
            <p v-else>{{ estudianteData.apellidos }}</p>
          </div>

          <div class="data-item two-thirds">
            <label>Correo Electrónico</label>
            <p>{{ estudianteData.email }}</p>
          </div>

          <div class="data-item one-third">
            <label>Teléfono</label>
            <input v-if="isEditing" type="text" v-model="estudianteData.telefono" />
            <p v-else>{{ estudianteData.telefono }}</p>
          </div>

          <div class="data-item">
            <label>Grado</label>
            <p>{{ estudianteData.grado }}</p>
          </div>

          <div class="data-item">
            <label>Grupo</label>
            <p>{{ estudianteData.grupo }}</p>
          </div>

          <div class="data-item">
            <label>Fecha de Nacimiento</label>
            <input v-if="isEditing" type="date" v-model="estudianteData.fecha_nacimiento" />
            <p v-else>{{ estudianteData.fecha_nacimiento }}</p>
          </div>

          <div class="data-item">
            <label>Estado</label>
            <p :class="{ 'active-status': estudianteData.estado === 'Activo' }">
              {{ estudianteData.estado }}
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.data-item input[type="text"],
.data-item input[type="date"] {
  width: 100%;
  padding: 5px 0;
  border: none;
  border-bottom: 2px solid #ff0000;
  background: none;
  font-size: 16px;
  color: #333;
  font-weight: 500;
  transition: border-color 0.2s;
}
.data-item input[type="text"]:focus,
.data-item input[type="date"]:focus {
  outline: none;
  border-bottom-color: #d60000;
}

.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url("/img/fondo 1.jpeg");
  background-size: cover;
  background-position: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex-grow: 1;
  display: flex;
  padding: 30px;
  gap: 30px;
}

.sidebar,
.content-view {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

.sidebar {
  width: 250px;
  padding: 20px;
  color: #333;
  display: flex;
  flex-direction: column;
}

.sidebar-nav-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 10px;
}
.sidebar-nav-list li {
  padding: 15px 20px;
  font-weight: 500;
  border-radius: 8px;
  margin-bottom: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sidebar-nav-list li.active {
  background-color: #ff0000;
  color: white;
  font-weight: bold;
}

.sidebar-action {
  padding-top: 5px;
}
.action-margin {
  margin-top: auto;
  padding-top: 20px !important;
}

.submit-button {
  background-color: #28a745;
  color: white;
  border: none;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 10px;
}
.submit-button:hover {
  background-color: #218838;
}

.cancel-button {
  background-color: #ff0000;
  color: white;
  border: none;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.cancel-button:hover {
  background-color: #d60000;
}

.profile-header {
  text-align: center;
  padding: 10px 0;
}

.profile-avatar-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 10px;
}
.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.profile-avatar svg {
  width: 70px;
  height: 70px;
  stroke: #ff0000;
}
.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.edit-photo-button {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s;
}
.edit-photo-button:hover {
  background-color: #d60000;
}
.edit-photo-button svg {
  width: 18px;
  height: 18px;
  stroke: white;
}
.profile-header h3 {
  margin: 5px 0 0;
  color: #ff0000;
  font-size: 18px;
}
.profile-header p {
  margin: 0;
  color: #555;
  font-size: 14px;
}

.content-view {
  flex-grow: 1;
  padding: 25px 35px;
}
.content-view h2 {
  color: #333;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 24px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.data-item {
  padding: 10px 15px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.data-item label {
  display: block;
  font-size: 12px;
  color: #ff0000;
  font-weight: bold;
  margin-bottom: 2px;
  text-transform: uppercase;
}
.data-item p {
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.data-item.full-width {
  grid-column: 1 / -1;
}
.data-item.two-thirds {
  grid-column: span 2;
}
.data-item.one-third {
  grid-column: span 1;
}

.active-status {
  color: #28a745 !important;
  font-weight: bold !important;
}
</style>
