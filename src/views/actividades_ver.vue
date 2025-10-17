<script>
import { getActividadesPorEstudiante } from "../services/listaEstudiantes"
import docenteNavbar from "./docenteNavbar.vue"

export default {
  components: { docenteNavbar },
  props: ["idEstudiante"],
  data() {
    return {
      actividades: [],
      cargando: false,
      error: false,
    }
  },
  methods: {
    async cargarActividades() {
      this.cargando = true
      this.error = false
      try {
        const data = await getActividadesPorEstudiante(this.idEstudiante)
        this.actividades = data.map(act => ({
          ...act,
          fecha_subida: this.formatearFecha(act.fecha_subida)
        }))
      } catch (err) {
        console.error("Error cargando actividades:", err)
        this.error = true
      } finally {
        this.cargando = false
      }
    },
    formatearFecha(fechaIso) {
      const fecha = new Date(fechaIso)
      return fecha.toLocaleString("es-CO", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    }
  },
  mounted() {
    this.cargarActividades()
  }
}
</script>

<template>
  <div class="main-container">
    <docenteNavbar/>
    <main class="main-content">
      <a href="../solicitud_apro" class="back-button">←</a>
      <div class="title-with-arrow"> 
        <h1 class="user-title">Actividades del Estudiante</h1>
      </div>

      <div v-if="cargando"> Cargando actividades...</div>
      <div v-else-if="error"> Error cargando actividades</div>
      <div v-else class="tabla-estudiantes">
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Horas</th>
              <th>Fecha subida</th>
              <th>Estado</th>
              <th>Evidencia</th>
              <th>Verificar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="act in actividades" :key="act.id">
              <td class="estudiante">{{ act.titulo }}</td>
              <td>{{ act.horas }}</td>
              <td>{{ act.fecha_subida }}</td>
              <td>
                <span class="estado" :class="act.estado.trim().toLowerCase()">
                  {{ act.estado }}
                </span>
              </td>
              <td>
                <router-link
                  class="btn-evidencia"
                  :to="{ name: 'actividades_registro', params: { actividadId: act.id } }"
                >
                  Evidencias
                </router-link>
              </td>
              <td>
                <router-link
                  class="btn-verificar"
                  :to="act.tiene_validacion 
                      ? { name: 'editar_verificacion', params: { idEstudiante, actividadId: act.id, verificacionId: act.validacion_id } } 
                      : { name: 'verificar_actividad', params: { actividadId: act.id } }"
                >
                  {{ act.tiene_validacion ? 'Editar' : 'Verificar' }}
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<style scoped>
.main-container {
  min-height: 100vh;
  background-image: url("../assets/img/patio.png"); 
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.main-content {
  flex: 1;
  padding: 1.5rem 2rem;
  background-color: rgba(255,255,255,0.85);
  border-radius: 24px;
  margin: 1rem auto;
  max-width: 1000px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.title-with-arrow {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.back-button {
  background-color: #e53935;
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem 0.8rem;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  text-decoration: none;
  margin-right: 1rem;
}
.back-button:hover {
  background-color: #c62828;
  transform: scale(1.1);
}
.user-title {
  color: #d90000;
  font-size: 2em;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
}
.tabla-estudiantes {
  background: #fff;
  border-radius: 24px;
  padding: 2rem;
  margin: 0 auto;
  max-width: 900px;
  box-shadow: 0 2px 8px #0001;
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.7em;
}
td, th {
  text-align: center;
  font-size: 1em;
  padding: 0.5em 0.7em;
}
.btn-evidencia {
  background: #ff3c3c;
  color: #fff;
  border-radius: 8px;
  padding: 0.6em 2em;
  font-weight: 600;
}
.btn-verificar {
  background: #099e1d;
  color: #fff;
  border-radius: 8px;
  padding: 0.6em 2em;
  font-weight: 600;
}
.estado {
  border-radius: 8px;
  padding: 0.2em 1em;
  font-weight: 600;
  display: inline-block;
}
.estado.pendiente { background: #ffee00; color: #000; }
.estado.aprobada { background: #03ff20; color: #fff; }
.estado.rechazada { background: #d90000; color: #fff; }
@media (max-width: 900px) {
  .main-content { padding: 1rem 0.5rem; }
  .tabla-estudiantes { padding: 1rem; }
}
</style>
