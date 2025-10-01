<script setup> </script>
<template>
  <div class="login-container">
    <div class="main-title-container">
      <h1 class="main-title">Sistema de Gestión de Horas de Alfabetización</h1>
    </div>

    <main class="card-container">
      <div class="login-card">
        <div class="icon-wrapper student-icon">
          <!-- ...SVG... -->
        </div>
        <h2>Estudiantes</h2>
        <p>Accede al registro y seguimiento de tus horas</p>
        <a class="login-button" href="/ing_estudiantes">Ingresar</a>
      </div>

      <div class="login-card">
        <div class="icon-wrapper teacher-icon">
          <!-- ...SVG... -->
        </div>
        <h2>Docentes o Coordinadores</h2>
        <p>Verifica y aprueba los reportes de los estudiantes.</p>
        <a class="login-button" href="/ing_profesores">Ingresar</a>
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
/* Contenedor principal con fondo y centrado */
.login-container {
  height: 100vh;
  width: 100vw;
  background-image: url('/img/fondo 1.jpeg');
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
/* Capa oscura sobre el fondo para mejorar contraste */
.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
/* Contenedor del título principal */
.main-title-container {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 15px 40px;
  margin-bottom: 50px;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.main-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin: 0;
}
/* Contenedor de las tarjetas */
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  z-index: 1;
  flex-wrap: wrap; /* Permite que las tarjetas se ajusten en pantallas pequeñas */
}
/* Estilo de las tarjetas de login */
.login-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
  width: 350px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #333;
}
/* Contenedor de los íconos */
.icon-wrapper {
  border-radius: 50%;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-wrapper.student-icon {
  background-color: rgba(76, 175, 80, 0.2);
}
.icon-wrapper.teacher-icon {
  background-color: rgba(33, 150, 243, 0.2);
}
.icon-wrapper svg {
  width: 48px;
  height: 48px;
}
.student-icon svg {
  color: #2e7d32;
}
.teacher-icon svg {
  color: #1565c0;
}
.login-card h2 {
  font-size: 1.5rem;
  margin: 0 0 10px 0;
  font-weight: 600;
}
.login-card p {
  font-size: 1rem;
  color: #555;
  margin: 0 0 30px 0;
  min-height: 40px; /* Asegura misma altura aunque el texto varíe */
}
/* Botón de Ingresar */
.login-button {
  background-color: #e53935; /* Rojo */
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 40px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.login-button:hover {
  background-color: #c62828; /* Rojo más oscuro */
  transform: translateY(-2px);
}
/* Media Query para pantallas pequeñas */
@media (max-width: 800px) {
  .main-title {
    font-size: 1.8rem;
  }
  .card-container {
    flex-direction: column;
    gap: 30px;
  }
  .login-card {
    width: 90%;
  }
}
</style>