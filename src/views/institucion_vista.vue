<script setup> </script>
<template>
  <div class="app-container">
    <header class="main-header">
      <div class="header-left">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s" alt="La Salle Logo" class="logo">
        <nav class="main-nav">
          <a href="/ini_estudiante">Inicio</a>
          <a href="#" class="active-link">Mi perfil</a>
        </nav>
      </div>
      <div class="header-right">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
          <input type="text" placeholder="Buscar">
        </div>
        <div class="profile-icon"></div>
      </div>
    </header>

    <main class="main-content">
      <div class="content-header">
        <a class="add-button" href="/institucion_registro">Agregar institucion</a>
      </div>

      <section class="list-card">
        <h2>Institucion</h2>
        <ul class="item-list">
          <li v-for="institution in institutions" :key="institution.id">
            <span class="item-name">{{ institution.name }}</span>
            <button class="delete-button" @click="deleteInstitution(institution.id)">Eliminar</button>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'InstitutionList',
  data() {
    return {
      // Datos de ejemplo para la lista
      institutions: [
        { id: 1, name: 'Tutoria academica' },
        { id: 2, name: 'Limpieza de parque' },
        { id: 3, name: 'Ayuda a ancianos' },
        { id: 4, name: 'Clases de apoyo escolar' },
        { id: 5, name: 'recaudacion de fondos' }
      ]
    };
  },
  methods: {
    // Método para eliminar una institución de la lista
    deleteInstitution(idToDelete) {
      this.institutions = this.institutions.filter(inst => inst.id !== idToDelete);
    },
    // Método de ejemplo para el botón de agregar
    addInstitution() {
      const newName = prompt("Introduce el nombre de la nueva institución:");
      if (newName) {
        const newId = this.institutions.length > 0 ? Math.max(...this.institutions.map(i => i.id)) + 1 : 1;
        this.institutions.push({ id: newId, name: newName });
      }
    }
  }
}
</script>

<style scoped>
/* Estilos Generales y del Encabezado */
.app-container {
  height: 100vh;
  width: 100vw;
  /* El fondo ahora es un color sólido gris claro */
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

/* Barra de título y botón de agregar */
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
.section-title {
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
}
.add-button {
  background-color: #00ff00; /* Verde brillante */
  color: black;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}
.add-button:hover {
  transform: scale(1.05);
}

/* Tarjeta principal con la lista */
.list-card {
  background: white;
  border-radius: 20px;
  padding: 25px 35px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.list-card h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}
.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.item-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item-name {
  background-color: #e0e0e0;
  padding: 12px 20px;
  border-radius: 8px;
  flex-grow: 1;
  margin-right: 15px;
  color: #444;
}
.delete-button {
  background-color: #ff3b30; /* Rojo */
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}
.delete-button:hover {
  background-color: #e02b21;
}
</style>