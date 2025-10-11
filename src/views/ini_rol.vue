<script setup>
</script>

<template>
  <div class="login-container">
    <div class="main-title-container">
      <img src="../assets/img/frente.png" alt="Logo de AlfaGestion" class="logo-image">
    </div>

    <main class="card-container">
      <div class="login-card">
        <div class="icon-wrapper student-icon">
          <img src="../assets/img/estudiante.png" alt="Icono de Estudiantes">
        </div>
        <h2>Estudiantes</h2>
        <p>Accede al registro y seguimiento de tus horas.</p>
        <a class="login-button" href="/ing_estudiantes">Ingresar</a>
      </div>

      <div class="login-card">
        <div class="icon-wrapper teacher-icon">
          <img src="../assets/img/docente.png" alt="Icono de Docentes o Coordinadores">
        </div>
        <h2>Docentes o Coordinadores</h2>
        <p>Verifica, aprueba los reportes y gestiona las evidencias.</p>
        <a class="login-button" href="/ing_profesores">Ingresar</a>
      </div>
      
      <div class="login-card">
        <div class="icon-wrapper admin-icon">
          <img src="../assets/img/admin.png" alt="Icono de Administrador General">
        </div>
        <h2>Administrador General</h2>
        <p>Gestiona usuarios (Estudiantes/Docentes) y la configuración del sistema.</p>
        <a class="login-button" href="/ing_admin">Ingresar</a>
      </div>
      
    </main>
  </div>
</template>

<script>
export default {
  name: 'LoginScreen'
}
</script>

<style scoped>
/* Estilos Generales (Se mantienen igual) */
.login-container {
  height: 100vh;
  width: 100vw;
  background-image: url('../assets/img/porteria.png'); 
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.main-title-container {
  background: rgb(255, 255, 255);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 15px 40px;
  margin-bottom: 50px;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* ⚠️ NUEVO ESTILO PARA LA IMAGEN DEL LOGO ⚠️ */
.logo-image {
  max-width: 450px; /* Ajusta este valor al ancho deseado de tu logo */
  height: auto;
  margin: 0;
}
/* La clase .logo anterior (para h1) fue eliminada/reemplazada por .logo-image */


/* Modificación: Aumentar el espacio entre tarjetas para 3 */
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px; 
  z-index: 1;
  flex-wrap: wrap;
}

/* Estilo de las tarjetas de login */
.login-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
  width: 300px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #333;
}



.icon-wrapper {
  border-radius: 50%; 
  width: 110px; 
  height: 110px;
  padding: 5px; 
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; 
  border: 4px solid; 
}

/* Estilo para las etiquetas <img> dentro del wrapper */
.icon-wrapper img {
  width: 100%; 
  height: 100%;
  object-fit: cover; 
  border-radius: 50%; 
}


/* ESTUDIANTE: Verde */
.icon-wrapper.student-icon {
  background-color: rgba(76, 175, 80, 0.2); 
  border-color: #2e7d32; /* Borde verde oscuro */
}

/* DOCENTES: Azul */
.icon-wrapper.teacher-icon {
  background-color: rgba(33, 150, 243, 0.2); 
  border-color: #1565c0; /* Borde azul oscuro */
}

/* ADMINISTRADOR: Rojo */
.icon-wrapper.admin-icon {
  background-color: rgba(229, 57, 53, 0.2); 
  border-color: #b71c1c; /* Borde rojo oscuro */
}

.login-button {
  background-color: #e53935;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 40px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-decoration: none; 
}
.login-button:hover {
  background-color: #c62828;
  transform: translateY(-2px);
}
.login-card p {
  font-size: 1rem;
  color: #555;
  margin: 0 0 30px 0;
  min-height: 40px;
}

/* Media Query para pantallas pequeñas */
@media (max-width: 1000px) {
  .login-card {
    width: 350px;
  }
}
@media (max-width: 800px) {
  /* Se eliminó el estilo .main-title del media query anterior */
  .card-container {
    flex-direction: column;
    gap: 30px;
  }
  .login-card {
    width: 90%;
  }
}
</style>