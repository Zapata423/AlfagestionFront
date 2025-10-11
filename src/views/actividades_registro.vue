<script setup>
import { onMounted, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getActividadDetalle } from "../services/evidencias"
import docenteNavbar from "./docenteNavbar.vue"

const router = useRouter()
const route = useRoute()
const actividadIdRaw = route.params.actividadId ?? route.params.id ?? route.query.actividadId
const actividadId = actividadIdRaw ? Number(actividadIdRaw) : null
const idEstudiante = route.params.idEstudiante

const formData = reactive({
  nombreActividad: "",
  fecha: "",
  numeroHoras: "",
  institucion: "",
  encargado: "",
  descripcion: "",
  archivo_url: ""
})

function formatFecha(fechaIso) {
  if (!fechaIso) return ""
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
    formData.nombreActividad = actividad.titulo ?? ""
    formData.fecha = formatFecha(actividad.fecha_subida)
    formData.numeroHoras = actividad.horas ?? ""
    formData.institucion = actividad.institucion_nombre ?? ""
    formData.encargado = actividad.encargado_nombre ?? ""
    formData.descripcion = actividad.descripcion ?? ""
    formData.archivo_url = actividad.archivo_url ?? ""
  } catch (err) {
    console.error("Error cargando la actividad:", err)
  }
})

function verEvidencia() {
  if (formData.archivo_url) window.open(formData.archivo_url, "_blank")
  else alert("No hay evidencia disponible.")
}

function goBack() {
  if (idEstudiante) {
    router.push({ name: "actividades_ver", params: { idEstudiante } })
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
          <li class="active">
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
          <li>
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
        <h2>Evidencia Actividad</h2>
        <form>
          <div class="form-group full-width">
            <label>Nombre de la Actividad</label>
            <input class="form-input full-width" type="text" v-model="formData.nombreActividad" readonly />
          </div>

          <div class="form-group">
            <label>Fecha</label>
            <input class="form-input" type="text" v-model="formData.fecha" readonly />
          </div>

          <div class="form-group">
            <label>Número de Horas</label>
            <input class="form-input" type="text" v-model="formData.numeroHoras" readonly />
          </div>

          <div class="form-group">
            <label>Institución</label>
            <input class="form-input" type="text" v-model="formData.institucion" readonly />
          </div>

          <div class="form-group">
            <label>Encargado</label>
            <input class="form-input" type="text" v-model="formData.encargado" readonly />
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
                <button type="button" class="view-evidence-button" @click="verEvidencia">
                  Ver Evidencia
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
.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/img/patio.png");
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
.content-form {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

.sidebar {
  width: 321px;
  padding: 20px;
  color: #333;
  display: flex;
  flex-direction: column;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
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
  content: "";
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
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}

.form-group.half-width {
  grid-column: span 3;
}

.form-group.third-width {
  grid-column: span 2;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

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
  background-color: rgba(80, 80, 80, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 15px;
  color: white;
  outline: none;
  transition: background-color 0.3s;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.form-input:focus {
  background-color: rgba(80, 80, 80, 0.7);
}

textarea.form-input {
  height: 100px;
  resize: vertical;
}

.evidence-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 45px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.evidence-actions {
  display: flex;
  gap: 10px;
}

.view-evidence-button {
  background-color: #1ec900;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-evidence-button:hover {
  background-color: #189e00;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
    padding: 15px;
    gap: 15px;
  }
  .sidebar {
    width: 100%;
    order: 2;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .sidebar ul {
    width: 100%;
    margin-bottom: 10px;
  }
  .sidebar li {
    padding: 10px 15px;
  }
  .sidebar-action {
    width: 48%;
    padding-top: 0;
  }
  .action-margin {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
  .content-form {
    order: 1;
    padding: 20px;
  }
  form {
    grid-template-columns: 1fr;
  }
  .form-group.full-width,
  .form-group.half-width,
  .form-group.third-width {
    grid-column: 1 / -1;
  }
}
</style>
