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
          <!-- ... -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
</svg>
<!-- ... -->
          <input type="text" placeholder="Buscar">
        </div>
        <div class="profile-icon"></div>
      </div>
    </header>

    <main class="main-content">
  <aside class="sidebar">
  <ul class="sidebar-nav-list">
    <li>
      <a href="/actividad_registro" style="color: inherit; text-decoration: none; display: flex; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
        </svg>
      </a>
    </li>
    <li class="active">
      <a href="/agregar_actividad" style="color: inherit; text-decoration: none; display: block;">
        Actividad
      </a>
    </li>
  </ul>
</aside>

      <section class="content-form">
        <form @submit.prevent="submitForm">
          <input class="form-input full-width" type="text" placeholder="Nombre Actividad" v-model="formData.nombreActividad">

          <input class="form-input" type="text" placeholder="fecha" v-model="formData.fecha">
          <input class="form-input" type="text" placeholder="Numero de horas" v-model="formData.numeroHoras">

          <select class="form-input" v-model="formData.institucion">
            <option disabled value="">Institucion de proyeccion</option>
            <option>Institución A</option>
            <option>Institución B</option>
          </select>
          <select class="form-input" v-model="formData.encargado">
            <option disabled value="">Encargado</option>
            <option>Encargado 1</option>
            <option>Encargado 2</option>
          </select>

          <textarea class="form-input full-width description" placeholder="Descripcion de la actividad" v-model="formData.descripcion"></textarea>

          <div class="form-input full-width evidence-field">
            <span>Evidencia</span>
            <div class="evidence-actions">
                <button type="button" class="icon-button" title="Adjuntar archivo">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81" /></svg>
                </button>
                <button type="button" class="icon-button" title="Ver documento">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DashboardActividadForm',
  data() {
    return {
      formData: {
        nombreActividad: '',
        fecha: '',
        numeroHoras: '',
        institucion: '',
        encargado: '',
        descripcion: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log('Datos del formulario:', this.formData);
      alert('Revisa la consola para ver los datos del formulario.');
    }
  }
}
</script>

<style scoped>
/* Estilos Generales y de Encabezado (sin cambios) */
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
  display: flex;
  padding: 30px;
  gap: 30px;
}

/* Efecto de Cristal (Glassmorphism) */
.sidebar, .content-form {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
}

/* Barra Lateral (Sidebar) */
.sidebar {
  width: 250px;
  padding: 20px;
  color: #333;
  display: flex;
  flex-direction: column;
}
.sidebar-nav-list { list-style: none; padding: 0; margin: 0; }
.sidebar-nav-list li {
    padding: 15px 20px;
    font-weight: 500;
    border-radius: 8px;
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.sidebar-nav-list li.active { background-color: #ff0000; color: white; font-weight: bold; }
.sidebar-nav-list li.active::before { content: ''; position: absolute; left: -20px; top: 50%; transform: translateY(-50%); border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 10px solid #ff0000; }
.sidebar-nav-list li svg { width: 28px; height: 28px; }

/* Botón "Subir" */
.sidebar-action {
    margin-top: auto;
    padding-top: 20px;
}
.submit-button {
    background-color: #ff0000;
    color: white;
    border: none;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
}
.submit-button:hover {
    background-color: #d60000;
}

/* Formulario Central */
.content-form {
  flex-grow: 1;
  padding: 25px 35px;
}
.content-form h2 { color: #333; margin-top: 0; margin-bottom: 25px; font-size: 24px; }
form {
  display: grid;
  grid-template-columns: 1fr 1fr;
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
}
.form-input::placeholder { color: rgba(255, 255, 255, 0.8); }
.form-input.full-width { grid-column: 1 / -1; }
textarea.description { height: 80px; resize: vertical; }

/* Estilos para los Select (desplegables) */
select.form-input {
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  color: rgba(255, 255, 255, 0.8); /* Color para la opción no seleccionada */
}
select.form-input:focus {
    background-color: rgba(80, 80, 80, 0.7);
}
select.form-input option {
    background-color: #505050;
    color: white;
}
/* Cambia el color del texto cuando se selecciona una opción */
select.form-input:valid {
    color: white;
}

/* Campo de Evidencia */
.evidence-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}
.evidence-actions { display: flex; gap: 10px; }
.icon-button { background: transparent; border: none; cursor: pointer; color: white; padding: 5px; }
.icon-button svg { width: 24px; height: 24px; }
</style>