<script setup>
import { ref, computed, onMounted } from "vue"
import { getActividadesConEstado } from "../services/progreso"
import estudianteNavbar from "./estudianteNavbar.vue"

// Lista de actividades
const actividades = ref([])

// Funciones auxiliares
function formatFecha(fechaIso) {
  if (!fechaIso) return ""
  const fecha = new Date(fechaIso)
  return fecha.toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function getComentariosUrl(actividadId) {
  return `/ver_comentarios/${actividadId}`
}

const cargando = ref(false)
const error = ref(false)
const totalHoras = ref(80)
const totalCompletadas = ref(0)

const porcentaje = computed(() => {
  if (totalHoras.value === 0) return 0
  return Math.min(100, Math.round((totalCompletadas.value / totalHoras.value) * 100))
})

async function cargarActividades() {
  cargando.value = true
  error.value = false
  try {
    const data = await getActividadesConEstado()
    actividades.value = data
    totalCompletadas.value = data
      .filter(act => act.estado === "Aprobada" || act.estado === "Aprobado")
      .reduce((acc, act) => acc + act.horas, 0)
  } catch (err) {
    console.error("Error en Vue cargando actividades:", err)
    error.value = true
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  cargarActividades()
})
</script>

<template>
  <estudianteNavbar />

  <div class="horas-container">
    <div class="background-overlay"></div>
    <main>
      <a href="/ini_estudiante" class="back-button">←</a>
      <h1 class="titulo">
        Horas completadas: {{ totalCompletadas }}/{{ totalHoras }}
      </h1>

      <div class="progress-section">
        <div class="progress-bar-bg">
          <div class="progress-bar" :style="{ width: porcentaje + '%' }"></div>
          <div class="progress-dot" :style="{ left: porcentaje + '%' }"></div>
        </div>
        <div class="porcentaje-box">
          <span class="porcentaje">{{ porcentaje }}%</span>
        </div>
      </div>

      <div v-if="cargando" style="text-align:center; margin: 2rem;">
        Cargando actividades...
      </div>
      <div v-if="error" style="text-align:center; margin: 2rem; color:red;">
        Error cargando actividades
      </div>

      <div v-if="!cargando && actividades.length > 0" class="tabla-actividades">
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Horas</th>
              <th style="padding-left: 20px;">Fecha</th>
              <th>Estado</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(actividad, i) in actividades" :key="i">
              <td class="actividad">{{ actividad.titulo }}</td>
              <td>{{ actividad.horas }}</td>
              <td style="padding-left: 20px;">
                <span class="fecha">{{ formatFecha(actividad.fecha_subida) }}</span>
              </td>
              <td>
                <span
                  class="estado"
                  :class="{
                    pendiente: actividad.estado === 'Pendiente',
                    rechazado: actividad.estado === 'Rechazada' || actividad.estado === 'Rechazado',
                    aprobado: actividad.estado === 'Aprobada' || actividad.estado === 'Aprobado'
                  }"
                >
                  {{ actividad.estado }}
                </span>
              </td>
              <td>
                <a :href="getComentariosUrl(actividad.id)" class="comentarios-btn">
                  Ver Comentarios
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="!cargando && actividades.length === 0" style="text-align:center; margin: 2rem;">
        No hay actividades registradas.
      </div>
    </main>
  </div>
</template>

<style scoped>
.horas-container {
  background-image: url('../assets/img/prescolar.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: #333;
  min-height: 100vh;
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif;
  position: relative;
}
.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1;
}
main {
  padding: 2rem 0;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}
.titulo {
  text-align: center;
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #fff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
}
.progress-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}
.progress-bar-bg {
  position: relative;
  background: #d3d3d3;
  border-radius: 20px;
  height: 20px;
  width: 70%;
  min-width: 300px;
  max-width: 600px;
}
.progress-bar {
  background: #1ec900;
  height: 20px;
  border-radius: 20px 0 0 20px;
  position: absolute;
  left: 0;
  top: 0;
  transition: width 0.5s;
}
.progress-dot {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  background: #1ec900;
  border-radius: 50%;
  border: 4px solid #f3f5f7;
  left: 30%;
  transition: left 0.5s;
}
.porcentaje-box {
  background: #fff;
  border-radius: 16px;
  padding: 1.2rem 2.5rem;
  font-size: 2.5rem;
  font-weight: bold;
  color: #111;
  box-shadow: 0 2px 8px #0001;
}
.porcentaje {
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif;
}
.tabla-actividades {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  padding: 2rem;
  margin: 0 auto;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5em;
}
th {
  text-align: left;
  font-size: 1.2em;
  color: #333;
  padding-bottom: 0.5em;
  padding-left: 0.7em;
}
td {
  font-size: 1.1em;
  padding: 0.4em 0.7em;
}
tr {
  background: none;
  border-radius: 12px;
  transition: transform 0.1s;
}
tr:nth-child(odd) td {
  background-color: #f7f7f7;
}
tr:nth-child(even) td {
  background-color: #e3e3e3;
}
tr:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
tr td:first-child {
  border-radius: 10px 0 0 10px;
  padding-left: 1.5em;
}
tr td:last-child {
  border-radius: 0 10px 10px 0;
  text-align: center;
}
.actividad {
  color: #000000;
  font-weight: 600;
}
.estado {
  border-radius: 8px;
  padding: 0.2em 1em;
  font-weight: 600;
  color: #fff;
  display: inline-block;
}
.estado.pendiente {
  background: #ffd600;
  color: #444;
}
.estado.aprobado {
  background: #1ec900;
}
.estado.rechazado {
  background: #ff0000;
}
.comentarios-btn {
  display: inline-block;
  background-color: #5d5dff;
  color: white;
  padding: 0.2em 1em;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9em;
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;
}
.comentarios-btn:hover {
  background-color: #4a4aed;
}
@media (max-width: 700px) {
  .tabla-actividades {
    padding: 1rem;
  }
  .progress-bar-bg {
    min-width: 150px;
    width: 50vw;
  }
  .porcentaje-box {
    padding: 1rem 1.5rem;
    font-size: 1.5rem;
  }
}
.back-button {
  position: fixed;
  top: 75px;
  left: 20px;
  background-color: #e53935;
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  z-index: 1000;
  text-decoration: none;
}
.back-button:hover {
  background-color: #c62828;
  transform: scale(1.1);
}
</style>
