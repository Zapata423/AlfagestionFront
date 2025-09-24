<script setup>
import { ref, computed, onMounted } from "vue"
import { getActividadesConEstado } from "../services/progreso"

// Lista de actividades
const actividades = ref([])

// Totales
const totalHoras = ref(80) // Fijo en 80 horas
const totalCompletadas = ref(0)

// Estado de carga y error
const cargando = ref(false)
const error = ref(false)

// Formatear fecha legible
function formatFecha(fechaIso) {
  if (!fechaIso) return ""
  const fecha = new Date(fechaIso)
  return fecha.toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

// Calcular porcentaje dinámico
const porcentaje = computed(() => {
  if (totalHoras.value === 0) return 0
  return Math.min(100, Math.round((totalCompletadas.value / totalHoras.value) * 100))
})

// Cargar actividades
async function cargarActividades() {
  cargando.value = true
  error.value = false
  try {
    const data = await getActividadesConEstado()
    actividades.value = data

    // Calcular solo horas aprobadas
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
  <div class="horas-container">
    <header class="header">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s"
        class="logo"
      />
      <nav>
        <a href="/ini_estudiante">Inicio</a>
        <a href="#">Mi perfil</a>
      </nav>
      <input class="search" placeholder="Buscar" />
      <div class="avatar"></div>
    </header>

    <main>
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
      <div
        v-if="error"
        style="text-align:center; margin: 2rem; color:red;"
      >
        Error cargando actividades
      </div>

      <div
        v-if="!cargando && actividades.length > 0"
        class="tabla-actividades"
      >
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Horas</th>
              <th style="padding-left: 20px;">Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(actividad, i) in actividades" :key="i">
              <td class="actividad">{{ actividad.titulo }}</td>
              <td>{{ actividad.horas }}</td>
              <td style="padding-left: 20px;">
                <span
                  class="fecha"
                  :class="{
                    rojo: actividad.estado === 'Pendiente',
                    verde: actividad.estado === 'Aprobada' || actividad.estado === 'Aprobado'
                  }"
                >
                  {{ formatFecha(actividad.fecha_subida) }}
                </span>
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
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="!cargando && actividades.length === 0"
        style="text-align:center; margin: 2rem;"
      >
        No hay actividades registradas.
      </div>
    </main>
  </div>
</template>

<style scoped>
.horas-container {
  background: #f3f5f7;
  min-height: 100vh;
  font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif;
}
.header {
  display: flex;
  align-items: center;
  background: #d90000;
  padding: 0 2rem;
  height: 80px;
}
.logo {
  height: 60px;
  margin-right: 1rem;
  background: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}
.header nav {
  flex: 1;
}
.header nav a {
  color: #000;
  font-weight: bold;
  margin: 0 1rem;
  text-decoration: none;
}
.search {
  border-radius: 20px;
  border: none;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  background: #fff;
  width: 180px;
}
.avatar {
  width: 40px;
  height: 40px;
  background: #1ec900;
  border-radius: 50%;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
main {
  padding: 2rem 0;
  max-width: 900px;
  margin: 0 auto;
}
.titulo {
  text-align: center;
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
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
.section-label {
  margin: 1.5rem 0 0.5rem 2.5rem;
  font-size: 1rem;
  background: #fff;
  border-radius: 8px;
  padding: 0.2rem 1rem;
  display: inline-block;
  color: #444;
  font-weight: 600;
  box-shadow: 0 2px 8px #0001;
}
.tabla-actividades {
  background: #fff;
  border-radius: 24px;
  padding: 2rem;
  margin: 0 auto;
  max-width: 800px;
  box-shadow: 0 2px 8px #0001;
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.7em;
}
th {
  text-align: left;
  font-size: 1.2em;
  color: #222;
  padding-bottom: 0.5em;
}
td {
  font-size: 1.1em;
  padding: 0.5em 0.7em;
}
.actividad {
  background: #bdbdbd;
  color: #fff;
  border-radius: 10px 0 0 10px;
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
tr {
  background: #bdbdbd;
  border-radius: 12px;
}
tr td:last-child {
  border-radius: 0 10px 10px 0;
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
</style>
