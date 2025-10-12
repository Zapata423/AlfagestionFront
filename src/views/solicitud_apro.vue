<script setup>
import { ref, onMounted, watch } from "vue"
import { useRouter } from "vue-router"
import { getEstudiantes } from "../services/listaEstudiantes"
import docenteNavbar from "./docenteNavbar.vue"

const router = useRouter()

const grados = ["10", "11"]
const gradoSeleccionado = ref("10")
const grupos = ["A", "B", "C", "D", "E"]
const grupoSeleccionado = ref("A")
const estudiantes = ref([])
const cargando = ref(false)
const error = ref(false)

function formatFecha(fechaIso) {
  if (!fechaIso) return "—"
  const fecha = new Date(fechaIso)
  return fecha.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

async function cargarEstudiantes() {
  cargando.value = true
  error.value = false
  try {
    const data = await getEstudiantes(gradoSeleccionado.value, grupoSeleccionado.value)
    estudiantes.value = data
  } catch (err) {
    console.error("Error cargando estudiantes:", err)
    error.value = true
  } finally {
    cargando.value = false
  }
}

function verActividades(estudiante) {
  router.push({
    name: "actividades_ver",
    params: { idEstudiante: estudiante.id },
  })
}

onMounted(cargarEstudiantes)
watch([gradoSeleccionado, grupoSeleccionado], () => {
  cargarEstudiantes()
})
</script>

<template>
  <div class="main-container">
    <docenteNavbar />

    <div class="content">
      <aside class="sidebar">
        <div class="grado-select">
          <div style="display: flex; gap: 10px;">
            <select v-model="gradoSeleccionado">
              <option v-for="grado in grados" :key="grado" :value="grado">{{ grado }}</option>
            </select>
            <select v-model="grupoSeleccionado">
              <option v-for="grupo in grupos" :key="grupo" :value="grupo">{{ grupo }}</option>
            </select>
          </div>
          <div class="grado-label">
            Grado {{ gradoSeleccionado }} - Grupo {{ grupoSeleccionado }}
          </div>
        </div>
        <ul class="menu">
          <li :class="{ active: true }">
            <a href="/solicitud_apro" style="color: inherit; text-decoration: none;"> Solicitudes</a>
          </li>
          <li>
            <a href="/ini_docentes" style="color: inherit; text-decoration: none;">Volver</a>
          </li>
        </ul>
      </aside>

      <main class="main-content">
        <div class="grado-header">
          <span class="grado-title">
            Grado {{ gradoSeleccionado }} - Grupo {{ grupoSeleccionado }}
          </span>
        </div>

        <div v-if="cargando"> Cargando estudiantes...</div>
        <div v-else-if="error"> Error cargando datos</div>
        <div v-else class="tabla-estudiantes">
          <table>
            <thead>
              <tr>
                <th class="th-espaciado">Estudiante</th>
                <th class="th-espaciado">Horas subidas</th>
                <th class="th-espaciado">Horas verificadas</th>
                <th class="th-espaciado">Última carga</th>
                <th class="th-espaciado">.</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="est in estudiantes" :key="est.id">
                <td class="estudiante">{{ est.nombre }}</td>
                <td>{{ est.horas_subidas }}</td>
                <td>{{ est.horas_verificadas }}</td>
                <td>{{ formatFecha(est.ultima_carga) }}</td>
                <td>
                  <button class="btn-evidencia" @click="verActividades(est)">
                    Ver Actividades
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: none;
  overflow: hidden;
}
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: none;
}
:deep(nav) {
  margin-top: 0;
  padding-top: 0;
}
.content {
  display: flex;
  flex: 1;
  margin-top: 0;
  background-image: url('../assets/img/patio.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.sidebar {
  width: 220px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0 0 24px 24px;
  margin-left: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 8px #0001;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: fit-content;
}
.tabla-estudiantes {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 2rem;
  margin: 0 auto;
  max-width: 900px;
  box-shadow: 0 2px 8px #0001;
}
.grado-select {
  width: 100%;
  margin-bottom: 1.5rem;
}
.grado-select select {
  width: 100px;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
.grado-label {
  background: #eee;
  border-radius: 8px;
  padding: 0.2rem 0.7rem;
  font-size: 1rem;
  color: #222;
  font-weight: 600;
  text-align: center;
}
.menu {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  width: 100%;
}
.menu li {
  padding: 0.7rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  color: #222;
  display: flex;
  align-items: center;
  gap: 0.7em;
  transition: background 0.2s;
}
.menu li.active,
.menu li:hover {
  background: #ffd6d6;
  color: #d90000;
}
.main-content {
  flex: 1;
  padding: 1.5rem 2rem;
}
.grado-header {
  margin-bottom: 1rem;
}
.grado-title {
  background: #fff;
  border-radius: 8px;
  padding: 0.3rem 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 2px 8px #0001;
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.7em;
}
th.th-espaciado {
  text-align: left;
  font-size: 1.1em;
  color: #222;
  padding-bottom: 0.5em;
  padding-left: 32px;
  padding-right: 32px;
  font-weight: bold;
}
td {
  font-size: 1em;
  padding: 0.5em 0.7em;
}
.estudiante {
  color: #fff;
  border-radius: 10px 0 0 10px;
  font-weight: 600;
   color: #222;
}
.btn-evidencia {
  background: #ff3c3c;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.3em 1.2em;
  font-weight: 600;
  cursor: pointer;
  font-size: 1em;
}
@media (max-width: 900px) {
  .main-content {
    padding: 1rem 0.5rem;
  }
  .tabla-estudiantes {
    padding: 1rem;
  }
}
</style>
