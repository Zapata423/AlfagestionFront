<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
// Se asume un componente de navegación diferente para el docente
import docenteNavbar from "./docenteNavbar.vue" 
// Se asumen las nuevas funciones de servicio
import { getDocentePerfil, updateDocentePerfil } from "../services/perfilDocente.js" 

const router = useRouter()
const BASE_URL = "http://localhost:8000"

const isEditing = ref(false)
const originalData = ref({})

const docenteData = ref({
  nombre: "", // Cambiado de nombres
  apellido: "", // Cambiado de apellidos
  email: "",
  telefono: "",
  fecha_nacimiento: "",
  cargo: "", // Campo específico de Usuario para Docente
  estado: "Cargando...",
  foto_url: null, // Si el docente tiene foto, se mantiene. Si no, se puede eliminar
  newPhotoFile: null
})

// --- Lógica de Carga de Datos ---
async function fetchDocenteData() {
  try {
    const data = await getDocentePerfil()
    
    // El campo de la foto podría ser diferente o no existir en Docente.
    // Lo mantengo como 'docente.foto' por si lo agregaste al serializador.
    let fotoUrlAbsoluta = data.docente.foto 
    if (fotoUrlAbsoluta && fotoUrlAbsoluta.startsWith("/")) {
      fotoUrlAbsoluta = `${BASE_URL}${fotoUrlAbsoluta}`
    }

    // Mapeo de datos del Serializador UsuarioPerfilDocenteSerializer
    const mappedData = {
      nombre: data.docente.nombre || "",
      apellido: data.docente.apellido || "",
      telefono: data.docente.telefono || "",
      fecha_nacimiento: data.docente.fecha_nacimiento || "",
      foto_url: fotoUrlAbsoluta || null,
      email: data.email,
      cargo: data.cargo || "", // Mapeamos el campo 'cargo' del Usuario
      estado: "Activo"
    }
    docenteData.value = mappedData
    originalData.value = { ...mappedData }
  } catch (error) {
    console.error("Error al cargar el perfil del docente:", error)
    docenteData.value.estado = "Error de Carga"
  }
}

onMounted(() => {
  fetchDocenteData()
})

function editProfile() {
  isEditing.value = true
}

// --- Lógica de Guardado de Datos ---
async function saveProfile() {
  let payload
  
  // 1. Si hay una nueva foto, usamos FormData
  if (docenteData.value.newPhotoFile) {
    const formData = new FormData()
    // Notar el cambio de 'estudiante.campo' a 'docente.campo'
    formData.append("docente.nombre", docenteData.value.nombre)
    formData.append("docente.apellido", docenteData.value.apellido)
    formData.append("docente.telefono", docenteData.value.telefono)
    formData.append("docente.fecha_nacimiento", docenteData.value.fecha_nacimiento)
    // Campo del Usuario
    formData.append("cargo", docenteData.value.cargo) 
    
    // Si manejas la foto en el serializador de docente (que es lo usual)
    formData.append("docente.foto", docenteData.value.newPhotoFile)
    
    payload = formData
  } else {
    // 2. Si no hay foto nueva, usamos JSON
    payload = {
      // Datos del Docente
      docente: {
        nombre: docenteData.value.nombre,
        apellido: docenteData.value.apellido,
        telefono: docenteData.value.telefono,
        fecha_nacimiento: docenteData.value.fecha_nacimiento
      },
      // Datos del Usuario
      cargo: docenteData.value.cargo 
    }
  }

  try {
    // Usamos la nueva función de actualización
    await updateDocentePerfil(payload) 
    alert("¡Perfil actualizado con éxito! 🎉")
    await fetchDocenteData()
    docenteData.value.newPhotoFile = null
    isEditing.value = false
  } catch (error) {
    console.error("Error al guardar el perfil:", error.response?.data || error)
    alert("Error al actualizar el perfil. Revisa los datos.")
  }
}

function cancelEdit() {
  docenteData.value = { ...originalData.value }
  docenteData.value.newPhotoFile = null
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
    docenteData.value.newPhotoFile = file
    docenteData.value.foto_url = URL.createObjectURL(file)
  } else {
    docenteData.value.newPhotoFile = null
  }
}

function goHome() {
  router.push("/ini_docentes") 
}
</script>

<template>
  <div class="app-container">
    <docenteNavbar /> 
    <main class="main-content">
      <aside class="sidebar">
        <div class="profile-header">
          <div class="profile-avatar-wrapper" @click="handlePhotoClick">
            <div 
              class="profile-avatar"
              :class="{ 'placeholder-bg': !docenteData.foto_url }"
            >
              <img
                v-if="docenteData.foto_url"
                :src="docenteData.foto_url"
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
          <h3>{{ docenteData.nombre }} {{ docenteData.apellido }}</h3>
          <p>{{ docenteData.cargo }}</p> 
        </div>



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
        <h2>Información del Docente</h2> 
        <div class="data-grid">
          <div class="data-item full-width">
            <label>Nombre</label>
            <input v-if="isEditing" type="text" v-model="docenteData.nombre" />
            <p v-else>{{ docenteData.nombre }}</p>
          </div>

          <div class="data-item full-width">
            <label>Apellido</label>
            <input v-if="isEditing" type="text" v-model="docenteData.apellido" />
            <p v-else>{{ docenteData.apellido }}</p>
          </div>

          <div class="data-item two-thirds">
            <label>Correo Electrónico</label>
            <p>{{ docenteData.email }}</p>
          </div>

          <div class="data-item one-third">
            <label>Teléfono</label>
            <input v-if="isEditing" type="text" v-model="docenteData.telefono" />
            <p v-else>{{ docenteData.telefono }}</p>
          </div>

          <div class="data-item">
            <label>Cargo</label>
            <input v-if="isEditing" type="text" v-model="docenteData.cargo" />
            <p v-else>{{ docenteData.cargo }}</p>
          </div>

          <div class="data-item">
            <label>Fecha de Nacimiento</label>
            <input v-if="isEditing" type="date" v-model="docenteData.fecha_nacimiento" />
            <p v-else>{{ docenteData.fecha_nacimiento }}</p>
          </div>
          
          <div class="data-item">
            <label>Estado</label>
            <p :class="{ 'active-status': docenteData.estado === 'Activo' }">
              {{ docenteData.estado }}
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
  background-image: url("../assets/img/juegos.png");
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
