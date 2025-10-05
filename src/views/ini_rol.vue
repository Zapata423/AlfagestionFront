<script setup>
</script>

<template>
  <div class="login-container">
    <div class="main-title-container">
      <h1 class="main-title">Sistema de Gestión de Horas de Alfabetización</h1>
    </div>

    <main class="card-container">
      <div class="login-card">
        <div class="icon-wrapper student-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.015 60.015 0 0113.84 0M4.26 10.147L3 14h18l-1.26-3.853m-14.48 0L3 14m1.26-3.853a8.943 8.943 0 00-1.8.853A.75.75 0 002.25 15v5.25c0 .414.336.75.75.75h18c.414 0 .75-.336.75-.75V15a.75.75 0 00-.93-1.002 8.943 8.943 0 00-1.8-.853m-14.48 0L21 14m-14.48 0L3 14m1.26-3.853a60.015 60.015 0 0113.84 0m-14.48 0L21 14" />
          </svg>
        </div>
        <h2>Estudiantes</h2>
        <p>Accede al registro y seguimiento de tus horas.</p>
        <a class="login-button" href="/ing_estudiantes">Ingresar</a>
      </div>

      <div class="login-card">
        <div class="icon-wrapper teacher-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 19.5a.75.75 0 01-.75-.75V15.75c0-2.073 1.258-3.85 3.033-4.582.493-.19.968-.316 1.428-.372a5.524 5.524 0 011.668 0c.46.056.935.182 1.428.372 1.775.732 3.033 2.509 3.033 4.582v3.018a.75.75 0 01-.75.75h-10.5z" />
          </svg>
        </div>
        <h2>Docentes o Coordinadores</h2>
        <p>Verifica, aprueba los reportes y gestiona las instituciones.</p>
        <a class="login-button" href="/ing_profesores">Ingresar</a>
      </div>
      
      <div class="login-card">
        <div class="icon-wrapper admin-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zm.75 9h-7.5a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75v-3.75a.75.75 0 00-.75-.75z" />
          </svg>
        </div>
        <h2>Administrador General</h2>
        <p>Gestiona usuarios (Estudiantes/Docentes) y la configuración del sistema.</p>
        <a class="login-button admin-button" href="/ing_admin">Ingresar</a>
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

/* Modificación: Aumentar el espacio entre tarjetas para 3 */
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px; /* Reducido de 50px a 30px para que quepan 3 */
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
  width: 300px; /* Ligeramente más estrecho para que quepan 3 */
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
.icon-wrapper svg {
  width: 48px;
  height: 48px;
}
/* Estilos Específicos de Iconos */
.icon-wrapper.student-icon {
  background-color: rgba(76, 175, 80, 0.2);
}
.student-icon svg {
  color: #2e7d32;
}
.icon-wrapper.teacher-icon {
  background-color: rgba(33, 150, 243, 0.2);
}
.teacher-icon svg {
  color: #1565c0;
}

/* Estilos para Administrador */
.icon-wrapper.admin-icon {
  background-color: rgba(229, 57, 53, 0.2);
}
.admin-icon svg {
  color: #b71c1c;
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
