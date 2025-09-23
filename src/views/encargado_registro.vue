<script setup> </script>
<template>
  <div class="app-container">
    <header class="main-header">
      <div class="header-left">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s" alt="La Salle Logo" class="logo">
        <nav class="main-nav">
          <a href="#">Inicio</a>
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
      <aside class="sidebar">
  <ul>
    <li :class="{ active: false }">
      <a href="/actividades_registro" style="color: inherit; text-decoration: none; display: block;">Actividad</a>
    </li>
    <li class="active">
      <a href="/encargado_registro" style="color: inherit; text-decoration: none; display: block;">Encargado</a>
    </li>
    <li :class="{ active: false }">
      <a href="/organizacion_registro" style="color: inherit; text-decoration: none; display: block;">Organizacion</a>
    </li>
    <li :class="{ active: false }">
      <a href="/actividades_ver" style="color: inherit; text-decoration: none; display: block;">Volver</a>
    </li>
  </ul>
</aside>

      <section class="content-form">
        <h2>Section 25</h2>
        <form @submit.prevent="submitForm">
          <input class="form-input" type="text" placeholder="Nombre" v-model="formData.nombre">
          <input class="form-input" type="text" placeholder="Apellido" v-model="formData.apellido">

          <input class="form-input" type="text" placeholder="telefono" v-model="formData.telefono">
          <input class="form-input" type="email" placeholder="Correo" v-model="formData.correo">
          <input class="form-input" type="text" placeholder="Cargo" v-model="formData.cargo">

          <textarea class="form-input full-width" placeholder="Observaciones" v-model="formData.observaciones"></textarea>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardEncargado',
  data() {
    return {
      // Objeto actualizado para almacenar los datos del nuevo formulario
      formData: {
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        cargo: '',
        observaciones: ''
      }
    };
  },
  methods: {
    // Método para manejar el envío del formulario
    submitForm() {
      console.log('Datos del formulario:', this.formData);
      alert('Revisa la consola para ver los datos del formulario.');
    }
  }
}
</script>

<style scoped>
/* Estilos Generales (sin cambios) */
.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url('https://scontent.feoh3-1.fna.fbcdn.net/v/t51.75761-15/481610614_18306353359227867_8885988781752331401_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG48Zk_KecLM9jpd4x-t2rKj7P_FqscypGPs_8WqxzKkZxSA_-z3Fof4PiSfNPs7L6jOELnYlGZlzGvlQLEcX-z&_nc_ohc=_mGcrzTpfGIQ7kNvwEge5VC&_nc_oc=AdkkzlL0pOOyV-hcvk2snjL4QhWpfE8Z-zkAWpDPhzoJr0X2d_uy8GKgaCIjuj6VYwKK-q41zaOoYHPX28WNk1-v&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=hWl9J-dgLl_yZm5Zo6bs5g&oh=00_AfZg3EH2GU7GPpJRh08rIw4pdgVGr5X965b7dV5I-IrrEQ&oe=68CA8FD1');
  background-size: cover;
  background-position: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Encabezado (sin cambios) */
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
.main-nav a { color: white; text-decoration: none; font-weight: 500; padding: 8px 15px; border-radius: 6px; transition: background-color 0.2s; }
.main-nav a.active-link, .main-nav a:hover { background-color: rgba(0, 0, 0, 0.2); }
.search-bar { display: flex; align-items: center; background-color: rgba(0, 0, 0, 0.2); padding: 5px 10px; border-radius: 20px; }
.search-bar svg { width: 18px; height: 18px; margin-right: 5px; }
.search-bar input { background: transparent; border: none; color: white; outline: none; }
.search-bar input::placeholder { color: rgba(255, 255, 255, 0.7); }
.profile-icon { width: 36px; height: 36px; background-color: #28a745; border-radius: 50%; border: 2px solid white; }

/* Contenido Principal (sin cambios) */
.main-content {
  flex-grow: 1;
  display: flex;
  padding: 30px;
  gap: 30px;
}

/* Efecto de Cristal (sin cambios) */
.sidebar, .content-form {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

/* Barra Lateral (sin cambios de estilo, solo contenido) */
.sidebar {
  width: 250px;
  padding: 20px;
  color: #333;
}
.sidebar ul { list-style: none; padding: 0; margin: 0; }
.sidebar li { padding: 15px 20px; font-weight: 500; border-radius: 8px; margin-bottom: 5px; cursor: pointer; position: relative; }
.sidebar li.active { background-color: #ff0000; color: white; font-weight: bold; }
.sidebar li.active::before { content: ''; position: absolute; left: -20px; top: 50%; transform: translateY(-50%); border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #ff0000; }

/* Formulario Central (ESTILOS ACTUALIZADOS) */
.content-form {
  flex-grow: 1;
  padding: 25px 35px;
}
.content-form h2 { color: #333; margin-top: 0; margin-bottom: 25px; font-size: 24px; }

/* -- CAMBIO CLAVE: CSS Grid con 6 columnas para flexibilidad -- */
form {
  display: grid;
  /* Se define un grid de 6 columnas para poder alinear filas de 2 y 3 campos fácilmente */
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
}
.form-input {
  background-color: rgba(80, 80, 80, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 15px;
  color: white;
  outline: none;
  transition: background-color 0.3s;
}

/* El primer y segundo campo ocupan 3 de 6 columnas cada uno (la mitad) */
.form-input:nth-child(1), .form-input:nth-child(2) {
  grid-column: span 3;
}
/* El tercer, cuarto y quinto campo ocupan 2 de 6 columnas cada uno (un tercio) */
.form-input:nth-child(3), .form-input:nth-child(4), .form-input:nth-child(5) {
  grid-column: span 2;
}

.form-input.full-width {
  grid-column: 1 / -1; /* Ocupa las 6 columnas */
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}
.form-input:focus {
  background-color: rgba(80, 80, 80, 0.7);
}
textarea.form-input {
  height: 120px; /* Un poco más alto para observaciones */
  resize: vertical;
}

</style>