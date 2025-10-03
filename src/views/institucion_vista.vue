<script setup>
import { ref, onMounted } from "vue"
import { getMisInstituciones, deleteInstitucion } from "../services/instituciones"

const institutions = ref([])
const errorMsg = ref("")

async function cargarInstituciones() {
  try {
    institutions.value = await getMisInstituciones()
  } catch (error) {
    console.error("Error cargando instituciones:", error)
    errorMsg.value = error.response?.data?.detail || "No se pudieron cargar las instituciones"
  }
}

async function deleteInstitution(idToDelete) {
  if (!confirm("¿Seguro que quieres eliminar esta institución?")) return
  try {
    await deleteInstitucion(idToDelete)
    institutions.value = institutions.value.filter(inst => inst.id !== idToDelete)
  } catch (error) {
    console.error("Error eliminando institución:", error)
    errorMsg.value = error.response?.data?.detail || "No se pudo eliminar la institución"
  }
}

onMounted(() => {
  cargarInstituciones()
})
</script>

<template>
  <div class="app-container">
    <!-- NAVBAR -->
    <header class="main-header">
      <div class="header-left">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s" alt="La Salle Logo" class="logo">
        <nav class="main-nav">
          <a href="/ini_estudiante" class="active-link">Inicio</a>
          <a href="/instituciones">Instituciones</a>
        </nav>
      </div>
      <div class="header-right">
        <div class="search-bar">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="white" fill="none"/></svg>
          <input type="text" placeholder="Buscar..." />
        </div>
        <div class="profile-icon"></div>
      </div>
    </header>

    <!-- CONTENIDO PRINCIPAL -->
    <a href="/ini_estudiante" class="back-button">←</a>
    <main class="main-content">
      <div class="content-header">
        <a class="add-button" href="/institucion_registro">Agregar institución</a>
      </div>

      <section class="list-card">
        <h2>Instituciones</h2>

        <!-- Error -->
        <p v-if="errorMsg" style="color: red; font-weight: bold">
          {{ errorMsg }}
        </p>

        <!-- Lista -->
        <ul class="item-list">
          <li v-for="institution in institutions" :key="institution.id">
            <span class="item-name">{{ institution.nombre }}</span>
            <button
              class="delete-button"
              @click="deleteInstitution(institution.id)"
            >
              Eliminar
            </button>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Estilos Generales y del Encabezado */
.app-container {
  height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
}
.main-header {
  background-color: #ff0000;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 60px;
  flex-shrink: 0;
}
.header-left, .header-right { display: flex; align-items: center; gap: 25px; }
.logo { height: 45px; }
.main-nav a { color: white; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; }
.main-nav a.active-link, .main-nav a:hover { background-color: rgba(0, 0, 0, 0.2); }
.search-bar { display: flex; align-items: center; background-color: rgba(0, 0, 0, 0.2); padding: 5px 10px; border-radius: 20px; }
.search-bar svg { width: 18px; height: 18px; margin-right: 5px; }
.search-bar input { background: transparent; border: none; color: white; outline: none; }
.search-bar input::placeholder { color: rgba(255, 255, 255, 0.7); }
.profile-icon { width: 36px; height: 36px; background-color: #28a745; border-radius: 50%; border: 2px solid white; }

/* Contenido Principal */
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
  color: rgb(255, 255, 255);
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}
.add-button:hover { transform: scale(1.05); }

/* Lista */
.list-card {
  background: white;
  border-radius: 20px;
  padding: 25px 35px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.list-card h2 { margin-top: 0; margin-bottom: 20px; font-size: 1.5rem; color: #333; }
.item-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 15px; }
.item-list li { display: flex; justify-content: space-between; align-items: center; }
.item-name { background-color: #e0e0e0; padding: 12px 20px; border-radius: 8px; flex-grow: 1; margin-right: 15px; color: #444; }
.delete-button { background-color: #ff3b30; color: white; border: none; padding: 10px 25px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: background-color 0.2s; }
.delete-button:hover { background-color: #e02b21; }
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
