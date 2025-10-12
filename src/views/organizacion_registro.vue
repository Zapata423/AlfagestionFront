<script setup>
import { reactive, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getInstitucionDetalle } from "../services/evidencias"
import docenteNavbar from "./docenteNavbar.vue"

const router = useRouter()
const route = useRoute()
const actividadIdRaw = route.params.actividadId ?? route.params.id ?? route.query.actividadId
const actividadId = actividadIdRaw ? Number(actividadIdRaw) : null
const idEstudiante = route.params.idEstudiante

const formData = reactive({
  nombre: '',
  telefono: '',
  poblacion_intervenida: '',
  email: '',
  direccion: '',
  barrio: '',
  ciudad: ''
})

onMounted(async () => {
  if (!actividadId) return
  try {
    const institucion = await getInstitucionDetalle(actividadId)
    formData.nombre = institucion.nombre ?? ''
    formData.telefono = institucion.telefono ?? ''
    formData.poblacion_intervenida = institucion.poblacion_intervenida ?? ''
    formData.email = institucion.email ?? ''
    formData.direccion = institucion.direccion ?? ''
    formData.barrio = institucion.barrio ?? ''
    formData.ciudad = institucion.ciudad ?? ''
  } catch (err) {
    console.error("Error cargando la institución:", err)
  }
})

function goBack() {
  if (idEstudiante) {
    router.push({ name: 'actividades_ver', params: { idEstudiante } })
  } else {
    router.back()
  }
}
</script>

<template>
  <div class="app-container">
    <docenteNavbar />

    <main class="main-content">
      <aside class="sidebar">
        <ul>
          <li>
            <router-link
              :to="{ name: 'actividades_registro', params: { actividadId } }"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Actividad
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'encargado_registro', params: { actividadId } }"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Encargado
            </router-link>
          </li>
          <li class="active">
            <router-link
              :to="{ name: 'organizacion_registro', params: { actividadId } }"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Institución
            </router-link>
          </li>
        </ul>
        <div class="sidebar-action action-margin">
          <button class="cancel-button" @click="goBack">Volver</button>
        </div>
      </aside>

      <section class="content-form">
        <h2>Institución de la Actividad</h2>
        <form>
          <div class="form-group full-width">
            <label>Nombre de la Institución</label>
            <input class="form-input full-width" type="text" v-model="formData.nombre" readonly />
          </div>

          <div class="form-group">
            <label>Teléfono</label>
            <input class="form-input" type="text" v-model="formData.telefono" readonly />
          </div>

          <div class="form-group">
            <label>Población Intervenida</label>
            <input class="form-input" type="text" v-model="formData.poblacion_intervenida" readonly />
          </div>

          <div class="form-group">
            <label>Correo Electrónico</label>
            <input class="form-input" type="email" v-model="formData.email" readonly />
          </div>

          <div class="form-group">
            <label>Dirección</label>
            <input class="form-input" type="text" v-model="formData.direccion" readonly />
          </div>

          <div class="form-group">
            <label>Barrio</label>
            <input class="form-input" type="text" v-model="formData.barrio" readonly />
          </div>

          <div class="form-group">
            <label>Ciudad</label>
            <input class="form-input" type="text" v-model="formData.ciudad" readonly />
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/img/patio.png');
  background-size: cover;
  background-position: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
.content-form {
  background: rgba(255, 255, 255, 0.6);
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
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
}
.sidebar li {
  padding: 15px 20px;
  font-weight: 500;
  border-radius: 8px;
  margin-bottom: 5px;
  cursor: pointer;
  position: relative;
}
.sidebar li.active {
  background-color: #ff0000;
  color: white;
  font-weight: bold;
}
.sidebar li.active::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid #ff0000;
}
.sidebar-action {
  padding-top: 5px;
}
.action-margin {
  margin-top: auto;
  padding-top: 20px !important;
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
.content-form {
  flex-grow: 1;
  padding: 25px 35px;
}
.content-form h2 {
  color: #333;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 24px;
}
form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-input {
  background-color: rgba(80, 80, 80, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 15px;
  color: white;
  outline: none;
  transition: background-color 0.3s;
}
.form-input.full-width {
  grid-column: 1 / -1;
}
.form-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.form-input:focus {
  background-color: rgba(80, 80, 80, 0.7);
}
</style>
