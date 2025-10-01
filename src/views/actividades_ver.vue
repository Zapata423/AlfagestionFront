<script>
import { getActividadesPorEstudiante } from "../services/listaEstudiantes"

export default {
  props: ["idEstudiante"],
  data() {
    return {
      userName: "Estudiante",
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
        // formatear fechas
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
    <header class="header">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s" class="logo" />
      <nav>
        <a href="/ini_docentes">Inicio</a>
        <a href="#">Mi perfil</a>
      </nav>
      <input class="search" placeholder="Buscar" />
      <div class="avatar"></div>
    </header>

    <main class="main-content">
      <h1 class="user-title">Actividades del estudiante {{ idEstudiante }}</h1>

      <div v-if="cargando">⏳ Cargando actividades...</div>
      <div v-else-if="error">⚠️ Error cargando actividades</div>
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
/* Mantiene el mismo CSS que ya tenías */
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
.btn-subir { background: #d90000; color: #fff; border: none; border-radius: 12px; padding: 0.7em 2em; font-size: 1.1em; font-weight: bold; margin-top: auto; cursor: pointer; width: 100%; }
.main-content { flex: 1; padding: 1.5rem 2rem; }
.section-header { margin-bottom: 1rem; }
.section-title { background: #fff; border-radius: 8px; padding: 0.3rem 1.2rem; font-size: 1.1rem; color: #444; font-weight: 600; box-shadow: 0 2px 8px #0001; }
.tabla-estudiantes { background: #fff; border-radius: 24px; padding: 2rem; margin: 0 auto; max-width: 900px; box-shadow: 0 2px 8px #0001; }
table { width: 100%; border-collapse: separate; border-spacing: 0 0.7em; }
th.th-espaciado { text-align: left; font-size: 1.1em; color: #222; padding-bottom: 0.5em; padding-left: 32px; padding-right: 32px; font-weight: bold; }
td { font-size: 1em; padding: 0.5em 0.7em; }
.estudiante { background: #bdbdbd; color: #fff; border-radius: 10px 0 0 10px; font-weight: 600; }
.btn-evidencia { background: #ff3c3c; color: #fff; border: none; border-radius: 8px; padding: 0.6em 2em; font-weight: 600; cursor: pointer; font-size: 1em; }
.btn-verificar { background: #099e1d; color: #fff; border: none; border-radius: 8px; padding: 0.6em 2em; font-weight: 600; cursor: pointer; font-size: 1em; }
.estado { border-radius: 8px; padding: 0.2em 1em; font-weight: 600; color: #000000; display: inline-block; }
.estado.pendiente { background: #ffee00; color: #ffffff; }
.estado.aprobada { background: #03ff20; color: #fff; }
.estado.rechazada { background: #d90000; color: #ffffff; }
.arrow { font-size: 0.9em; }
.user-title {
  color: #d90000;
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 1rem;
}
@media (max-width: 900px) {
  .main-content { padding: 1rem 0.5rem; }
  .tabla-estudiantes { padding: 1rem; }
}
</style>
