<script setup> </script>
<script>
export default {
  data() {
    return {
      sections: ['10', '11'],
      selectedSection: '10',
      groups: ['A', 'B', 'C', 'D', 'E'],
      selectedGroup: 'A',
      activeMenu: 'Solicitudes',
      estudiantes: [
        { nombre: "Alejandro", actividad: "-", horas: 55, estado: "Pendiente" },
        { nombre: "Beatriz", actividad: "-", horas: 50, estado: "Aprobado" },
        { nombre: "Camila", actividad: "-", horas: 22, estado: "Pendiente" },
        { nombre: "Daniel", actividad: "-", horas: 45, estado: "Pendiente" },
        { nombre: "Elena", actividad: "-", horas: 15, estado: "Aprobado" },
        { nombre: "Fernando", actividad: "-", horas: 54, estado: "Pendiente" },
        { nombre: "Gabriela", actividad: "-", horas: 20, estado: "Pendiente" },
        { nombre: "Hugo", actividad: "-", horas: 12, estado: "Aprobado" },
        { nombre: "Isabel", actividad: "-", horas: 10, estado: "Pendiente" },
        { nombre: "Juan", actividad: "-", horas: 48, estado: "Pendiente" }
      ]
    }
  },
  methods: {
    aprobar(est) {
      if (est.estado === "Pendiente") est.estado = "Aprobado";
    }
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
          <li :class="{ active: activeMenu === 'Inicio' }" @click="activeMenu = 'Inicio'">
            <a href="/ini_docentes" style="color: inherit; text-decoration: none;">🏠 Inicio</a>
          </li>
          <li :class="{ active: activeMenu === 'Solicitudes' }" @click="activeMenu = 'Solicitudes'">
            <a href="/solicitud_apro" style="color: inherit; text-decoration: none;">📄 Solicitudes</a>
          </li>
        </ul>
        <button class="btn-subir">Subir</button>
      </aside>
      <main class="main-content">
        <div class="section-header">
          <span class="section-title">Section {{ selectedSection }} - Grupo {{ selectedGroup }}</span>
        </div>
        <div class="tabla-estudiantes">
          <table>
            <thead>
              <tr>
                <th class="th-espaciado">Estudiante</th>
                <th class="th-espaciado">Horas</th>
                <th class="th-espaciado">H. verificadas</th>
                <th class="th-espaciado">Ultima carga</th>
                <th class="th-espaciado">.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(est, i) in estudiantes" :key="i">
                <td class="estudiante">{{ est.nombre }}</td>
                <td>{{ est.actividad }}</td>
                <td>{{ est.horas }}</td>
                <th class="th-espaciado">05/07/2025</th>
                <td><a class="btn-evidencia" href="/actividades_ver">Ver Actividades</a></td>
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
.btn-subir { background: #d90000; color: #fff; border: none; border-radius: 12px; padding: 0.7em 2em; font-size: 1.1em; font-weight: bold; margin-top: auto; cursor: pointer; width: 100%; }
.main-content { flex: 1; padding: 1.5rem 2rem; }
.section-header { margin-bottom: 1rem; }
.section-title { background: #fff; border-radius: 8px; padding: 0.3rem 1.2rem; font-size: 1.1rem; color: #444; font-weight: 600; box-shadow: 0 2px 8px #0001; }
.tabla-estudiantes { background: #fff; border-radius: 24px; padding: 2rem; margin: 0 auto; max-width: 900px; box-shadow: 0 2px 8px #0001; }
table { width: 100%; border-collapse: separate; border-spacing: 0 0.7em; }
th.th-espaciado { text-align: left; font-size: 1.1em; color: #222; padding-bottom: 0.5em; padding-left: 32px; padding-right: 32px; font-weight: bold; }
td { font-size: 1em; padding: 0.5em 0.7em; }
.estudiante { background: #bdbdbd; color: #fff; border-radius: 10px 0 0 10px; font-weight: 600; }
.btn-evidencia { background: #ff3c3c; color: #fff; border: none; border-radius: 8px; padding: 0.3em 1.2em; font-weight: 600; cursor: pointer; font-size: 1em; }
.estado { border-radius: 8px; padding: 0.2em 1em; font-weight: 600; color: #fff; display: inline-block; }
.estado.pendiente { background: #bdbdbd; color: #222; }
.estado.aprobado { background: #222; color: #fff; }
.btn-aprobar { background: #ff3c3c; color: #fff; border: none; border-radius: 12px; padding: 0.3em 1.2em; font-weight: 600; cursor: pointer; font-size: 1em; display: flex; align-items: center; gap: 0.5em; transition: background 0.2s; }
.btn-aprobar.aprobado { background: #222; }
.arrow { font-size: 0.9em; }
@media (max-width: 900px) {
  .main-content { padding: 1rem 0.5rem; }
  .tabla-estudiantes { padding: 1rem; }
}
</style>