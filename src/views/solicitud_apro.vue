<script setup>
import { ref, onMounted, watch } from "vue"
import { useRouter } from "vue-router"
import { getEstudiantes, } from "../services/listaEstudiantes"

const router = useRouter()

const sections = ["10", "11"]
const selectedSection = ref("10")
const groups = ["A", "B", "C", "D", "E"]
const selectedGroup = ref("A")
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
    const data = await getEstudiantes(selectedSection.value, selectedGroup.value)
    estudiantes.value = data
  } catch (err) {
    console.error("Error cargando estudiantes:", err)
    error.value = true
  } finally {
    cargando.value = false
  }
}

// Función para ver actividades y navegar a actividades_ver con la id del estudiante
function verActividades(estudiante) {
  router.push({
    name: "actividades_ver", // nombre de la ruta
    params: { idEstudiante: estudiante.id } // pasamos el id del estudiante
  })
}

onMounted(cargarEstudiantes)
watch([selectedSection, selectedGroup], () => {
  cargarEstudiantes()
})
</script>

<template>
  <div class="main-container">
    <header class="header">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s"
        class="logo"
      />
      <nav>
        <a href="/ini_docentes">Inicio</a>
        <a href="#">Mi perfil</a>
      </nav>
      <input class="search" placeholder="Buscar" />
      <div class="avatar"></div>
    </header>

    <div class="content">
      <aside class="sidebar">
        <div class="section-select">
          <div style="display: flex; gap: 10px;">
            <select v-model="selectedSection">
              <option v-for="section in sections" :key="section" :value="section">{{ section }}</option>
            </select>
            <select v-model="selectedGroup">
              <option v-for="group in groups" :key="group" :value="group">{{ group }}</option>
            </select>
          </div>
          <div class="section-label">
            Section {{ selectedSection }} - Grupo {{ selectedGroup }}
          </div>
        </div>
        <ul class="menu">
          <li :class="{ active: false }">
            <a href="/ini_docentes" style="color: inherit; text-decoration: none;">🏠 Inicio</a>
          </li>
          <li :class="{ active: true }">
            <a href="/solicitud_apro" style="color: inherit; text-decoration: none;">📄 Solicitudes</a>
          </li>
        </ul>
      </aside>

      <main class="main-content">
        <div class="section-header">
          <span class="section-title">
            Section {{ selectedSection }} - Grupo {{ selectedGroup }}
          </span>
        </div>

        <div v-if="cargando">⏳ Cargando estudiantes...</div>
        <div v-else-if="error">⚠️ Error cargando datos</div>
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
.main-container { background: #f3f5f7; min-height: 100vh; font-family: 'Segoe UI', Arial, sans-serif; }
.header { display: flex; align-items: center; background: #d90000; padding: 0 2rem; height: 80px; }
.logo { height: 60px; margin-right: 1rem; background: #fff; padding: 0.2rem 0.5rem; border-radius: 4px; }
.header nav { flex: 1; }
.header nav a { color: #000; font-weight: bold; margin: 0 1rem; text-decoration: none; }
.search { border-radius: 20px; border: none; padding: 0.5rem 1rem; margin-right: 1rem; background: #fff; width: 180px; }
.avatar { width: 40px; height: 40px; background: #1ec900; border-radius: 50%; margin-left: 1rem; }
.content { display: flex; margin-top: 1rem; }
.sidebar { width: 220px; background: #fff; border-radius: 0 0 24px 24px; margin-left: 1rem; margin-top: 0.5rem; padding: 1.5rem 1rem 1rem 1rem; box-shadow: 0 2px 8px #0001; display: flex; flex-direction: column; align-items: flex-start; min-height: 500px; }
.section-select { width: 100%; margin-bottom: 1.5rem; }
.section-select select { width: 100px; padding: 0.3rem 0.5rem; border-radius: 8px; border: 1px solid #ccc; margin-bottom: 0.5rem; font-size: 1rem; }
.section-label { background: #eee; border-radius: 8px; padding: 0.2rem 0.7rem; font-size: 1rem; color: #222; font-weight: 600; text-align: center; }
.menu { list-style: none; padding: 0; margin: 1rem 0 2rem 0; width: 100%; }
.menu li { padding: 0.7rem 1rem; border-radius: 8px; margin-bottom: 0.5rem; cursor: pointer; font-weight: 600; color: #222; display: flex; align-items: center; gap: 0.7em; transition: background 0.2s; }
.menu li.active, .menu li:hover { background: #ffd6d6; color: #d90000; }
.main-content { flex: 1; padding: 1.5rem 2rem; }
.section-header { margin-bottom: 1rem; }
.section-title { background: #fff; border-radius: 8px; padding: 0.3rem 1.2rem; font-size: 1.1rem; color: #444; font-weight: 600; box-shadow: 0 2px 8px #0001; }
.tabla-estudiantes { background: #fff; border-radius: 24px; padding: 2rem; margin: 0 auto; max-width: 900px; box-shadow: 0 2px 8px #0001; }
table { width: 100%; border-collapse: separate; border-spacing: 0 0.7em; }
th.th-espaciado { text-align: left; font-size: 1.1em; color: #222; padding-bottom: 0.5em; padding-left: 32px; padding-right: 32px; font-weight: bold; }
td { font-size: 1em; padding: 0.5em 0.7em; }
.estudiante { background: #bdbdbd; color: #fff; border-radius: 10px 0 0 10px; font-weight: 600; }
.btn-evidencia { background: #ff3c3c; color: #fff; border: none; border-radius: 8px; padding: 0.3em 1.2em; font-weight: 600; cursor: pointer; font-size: 1em; }
@media (max-width: 900px) {
  .main-content { padding: 1rem 0.5rem; }
  .tabla-estudiantes { padding: 1rem; }
}
</style>
