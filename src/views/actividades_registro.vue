<script setup>
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"
import { getActividadDetalle } from "../services/evidencias"
import docenteNavbar from "./docenteNavbar.vue"

// tomar el parámetro de la ruta
const route = useRoute()
const actividadIdRaw = route.params.actividadId ?? route.params.id ?? route.query.actividadId
const actividadId = actividadIdRaw ? Number(actividadIdRaw) : null

// estado reactivo
const formData = reactive({
  nombreActividad: '',
  fecha: '',
  numeroHoras: '',
  institucion: '',
  encargado: '',
  descripcion: '',
  archivo_url: ''
})

function formatFecha(fechaIso) {
  if (!fechaIso) return ''
  try {
    const fecha = new Date(fechaIso)
    return fecha.toLocaleString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  } catch (e) {
    return fechaIso
  }
}

onMounted(async () => {
  if (!actividadId) {
    console.warn("No se encontró actividadId en la ruta")
    return
  }
  try {
    const actividad = await getActividadDetalle(actividadId)
    formData.nombreActividad = actividad.titulo ?? ''
    formData.fecha = formatFecha(actividad.fecha_subida)
    formData.numeroHoras = actividad.horas ?? ''
    formData.institucion = actividad.institucion_nombre ?? ''
    formData.encargado = actividad.encargado_nombre ?? ''
    formData.descripcion = actividad.descripcion ?? ''
    formData.archivo_url = actividad.archivo_url ?? ''
  } catch (err) {
    console.error("Error cargando la actividad:", err)
  }
})

function verEvidencia() {
  if (formData.archivo_url) window.open(formData.archivo_url, "_blank")
  else alert("No hay evidencia disponible.")
}
</script>

<template>
  <div class="app-container">
    <docenteNavbar/>

    <main class="main-content">
      <!-- Sidebar -->
      <aside class="sidebar">
        <ul>
          <li class="active">
            <router-link
              :to="{ name: 'actividades_registro', params: { actividadId: actividadId } }"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Actividad
            </router-link>
          </li>
          
          <li>
            <router-link
              :to="{ name: 'encargado_registro', params: { actividadId: actividadId } }"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Encargado
            </router-link>
          </li> 
          <li>
            <router-link
              :to="{ name: 'organizacion_registro', params: { actividadId: actividadId } }"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Institucion
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'actividades_ver', params: { idEstudiante } }"
              style="color: inherit; text-decoration: none; display: block;"
            >
              Volver
            </router-link>
          </li>
        </ul>
      </aside>

      <!-- Formulario solo lectura -->
      <section class="content-form">
        <h2>Evidencia Actividad</h2>
        <form>
          <div class="form-group full-width">
            <label>Nombre de la Actividad</label>
            <input class="form-input full-width" type="text" v-model="formData.nombreActividad" readonly>
          </div>

          <div class="form-group">
            <label>Fecha</label>
            <input class="form-input" type="text" v-model="formData.fecha" readonly>
          </div>

          <div class="form-group">
            <label>Número de Horas</label>
            <input class="form-input" type="text" v-model="formData.numeroHoras" readonly>
          </div>

          <div class="form-group">
            <label>Institución</label>
            <input class="form-input" type="text" v-model="formData.institucion" readonly>
          </div>

          <div class="form-group">
            <label>Encargado</label>
            <input class="form-input" type="text" v-model="formData.encargado" readonly>
          </div>

          <div class="form-group full-width">
            <label>Descripción</label>
            <textarea class="form-input full-width description" v-model="formData.descripcion" readonly></textarea>
          </div>

          <div class="form-group full-width">
            <label>Evidencia</label>
            <div class="form-input evidence-field">
              <span v-if="!formData.archivo_url">No hay evidencia disponible</span>
              <div class="evidence-actions">
                <button type="button" class="icon-button" title="Ver documento" @click="verEvidencia">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 
                      0 00-3.375-3.375h-1.5A1.125 1.125 
                      0 0113.5 7.125v-1.5a3.375 3.375 
                      0 00-3.375-3.375H8.25m2.25 
                      0H5.625c-.621 0-1.125.504-1.125 
                      1.125v17.25c0 .621.504 1.125 1.125 
                      1.125h12.75c.621 0 1.125-.504 
                      1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Contenedor principal */
.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url('/img/fondo 1.jpeg');  
  background-size: cover;
  background-position: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Contenido Principal */
.main-content {
  flex-grow: 1;
  display: flex;
  padding: 30px;
  gap: 30px;
}
.sidebar, .content-form {
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.1);
}

/* Sidebar */
.sidebar {
  width: 321px;
  padding: 20px;
  color: #333;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
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

/* Formulario - Estilos del Código 1 */
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
  grid-template-columns: repeat(6, 1fr); /* 6 columnas para flexibilidad, copiado de Codigo 1 */
  gap: 20px;
}

/* Clases de ancho del Código 1 */
.form-group.half-width {
  grid-column: span 3;
}   /* ocupa la mitad (3/6) */
.form-group.third-width {
  grid-column: span 2;
}  /* ocupa un tercio (2/6) */
.form-group.full-width {
  grid-column: 1 / -1;
}   /* ocupa todo el ancho */

.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.form-input { 
  background-color: rgba(80,80,80,0.5); 
  border: 1px solid rgba(255,255,255,0.1); 
  border-radius: 8px; 
  padding: 12px 15px; 
  font-size: 15px; 
  color: white; 
  outline: none; 
  transition: background-color 0.3s; 
}
.form-input::placeholder {
  color: rgba(255,255,255,0.8);
}
.form-input:focus {
  background-color: rgba(80,80,80,0.7);
}
textarea.form-input {
  height: 100px;
  resize: vertical;
}

/* Estilos específicos para Evidencia */
.evidence-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}
.evidence-actions {
  display: flex;
  gap: 10px;
}
.icon-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  padding: 5px;
}
.icon-button svg {
  width: 24px;
  height: 24px;
}
</style>
