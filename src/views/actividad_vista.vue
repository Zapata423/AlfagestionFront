<script setup>
import { ref, onMounted } from "vue"
import { getMisActividades, deleteActividad } from "../services/actividades"
import estudianteNavbar from "./estudianteNavbar.vue"

const actividades = ref([])
const errorMsg = ref("")


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


async function cargarActividades() {
  try {
    actividades.value = await getMisActividades()
  } catch (error) {
    console.error("Error cargando actividades:", error)
    errorMsg.value = error.response?.data?.detail || "No se pudieron cargar las actividades"
  }
}


async function deleteActividadById(idToDelete) {
  if (!confirm("¿Seguro que quieres eliminar esta actividad?")) return
  try {
    await deleteActividad(idToDelete)
    actividades.value = actividades.value.filter(act => act.id !== idToDelete)
  } catch (error) {
    console.error("Error eliminando actividad:", error)
    errorMsg.value = error.response?.data?.detail || "No se pudo eliminar la actividad"
  }
}


function verEvidencia(url) {
  if (url) window.open(url, "_blank")
  else alert("No hay evidencia disponible.")
}

onMounted(() => {
  cargarActividades()
})
</script>

<template>
  <div class="app-container">
    <estudianteNavbar />

    <a href="/ini_estudiante" class="back-button">←</a>
    <main class="main-content">
      <div class="content-header">
        <a class="add-button" href="/actividad_registro">Agregar actividad</a>
      </div>
      <section class="list-card">
        <h2>Actividades Registradas</h2>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Horas</th>
                <th>Institución</th>
                <th>Encargado</th>
                <th>Fecha</th>
                <th>Archivo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="actividades.length === 0 && !errorMsg">
                <td colspan="7" class="empty-row">No tienes actividades registradas.</td>
              </tr>
              <tr v-for="act in actividades" :key="act.id">
                <td>{{ act.titulo }}</td> 
                <td>{{ act.horas }}</td>
                <td>{{ act.institucion_nombre }}</td>
                <td>{{ act.encargado_nombre }}</td>
                <td>{{ formatFecha(act.fecha_subida) }}</td>
                <td class="action-cell">
                  <button class="view-file-button" @click="verEvidencia(act.archivo)">
                    Ver Archivo
                  </button>
                </td>
                <td class="action-cell">
                  <button class="delete-button" @click="deleteActividadById(act.id)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: url('../assets/img/juegos.png') no-repeat center center fixed;
  background-size: cover;
  position: relative;
}
.main-content {
  flex-grow: 1;
  padding: 30px 60px;
}
.content-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 25px;
}
.add-button {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}
.add-button:hover { transform: scale(1.05); }
.list-card {
  background: white;
  border-radius: 20px;
  padding: 25px 35px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.list-card h2 { margin: 0 0 20px; font-size: 1.5rem; color: #333; }
.table-container { overflow-x: auto; }
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  min-width: 1000px;
}
.data-table th {
  text-align: left;
  padding: 10px 15px;
  font-weight: 600;

}
.data-table td {
  padding: 15px 15px;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
  color: #333;
  font-size: 0.95rem;
}
.data-table tbody tr:hover td { background-color: #f3f3f3; }
.data-table tbody tr td:first-child {
  border-left: 5px solid #ff0000;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  font-weight: 500;
}
.data-table tbody tr td:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.action-cell { text-align: center; width: 100px; }
.empty-row {
  text-align: center;
  padding: 20px !important;
  font-style: italic;
  color: #777;
  background-color: white !important;
  border-left: none !important;
}
.delete-button { 
  background-color: #ff3b30; 
  color: white; 
  border: none; 
  padding: 8px 15px; 
  border-radius: 6px; 
  font-weight: bold; 
  cursor: pointer; 
  transition: background-color 0.2s; 
}
.delete-button:hover { background-color: #e02b21; }
.view-file-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}
.view-file-button:hover { background-color: #0056b3; }
.back-button {
  position: fixed;
  top: 80px;
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
