<script setup>
import { reactive } from 'vue'
import { registrarDocenteCompleto as apiRegistrarDocenteCompleto } from '../services/registro'

// =========================================================
// Lógica para el Formulario de Datos Personales (Docente)
// =========================================================
const formDatosPersonales = reactive({
  nombre: '',
  apellido: '',
  telefono: '',
  fechaNacimiento: ''
})

// =========================================================
// Lógica para la Tarjeta de Registro de Cuenta (Docente)
// =========================================================
const formDocenteCuenta = reactive({
  rol: 'Docente',
  email: '',
  password: '',
  password_confirm: '',
  cargo: ''
})

// =========================================================
// Función principal de registro
// =========================================================
const registrarDocenteCompleto = async () => {
  if (formDocenteCuenta.password !== formDocenteCuenta.password_confirm) {
    alert('Las contraseñas no coinciden.')
    return
  }

  if (!formDocenteCuenta.cargo.trim()) {
    alert('El campo Cargo no puede estar vacío.')
    return
  }

  const registroData = {
    nombre: formDatosPersonales.nombre,
    apellido: formDatosPersonales.apellido,
    telefono: formDatosPersonales.telefono,
    fecha_nacimiento: formDatosPersonales.fechaNacimiento,
    email: formDocenteCuenta.email,
    password: formDocenteCuenta.password,
    password_confirm: formDocenteCuenta.password_confirm,
    cargo: formDocenteCuenta.cargo,
    rol_nombre: formDocenteCuenta.rol
  }

  try {
    const respuesta = await apiRegistrarDocenteCompleto(registroData)
    console.log('Registro Exitoso:', respuesta)
    alert(`¡Registro completado! Docente: ${respuesta.nombres} - Usuario: ${respuesta.usuario_creado} - Cargo: ${respuesta.cargo}`)
    Object.keys(formDatosPersonales).forEach(key => formDatosPersonales[key] = '')
    Object.keys(formDocenteCuenta).forEach(key => formDocenteCuenta[key] = '')
  } catch (error) {
    console.error('Error durante el registro:', error.response ? error.response.data : error.message)
    const errorData = error.response ? error.response.data : {}
    let errorMessage = 'Error desconocido. Intenta de nuevo.'

    if (errorData.email) {
      errorMessage = `Error en Email: ${errorData.email[0]}`
    } else if (errorData.password_confirm) {
      errorMessage = `Error de contraseña: ${errorData.password_confirm[0]}`
    } else if (typeof errorData === 'object') {
      errorMessage = Object.keys(errorData).map(k => `${k}: ${errorData[k]}`).join('\n')
    }

    alert(`Fallo en el registro:\n${errorMessage}`)
  }
}

const onCancelDatos = () => {
  Object.keys(formDatosPersonales).forEach(key => formDatosPersonales[key] = '')
}

const onCancelCuenta = () => {
  formDocenteCuenta.email = ''
  formDocenteCuenta.password = ''
  formDocenteCuenta.password_confirm = ''
  formDocenteCuenta.cargo = ''
}
</script>

<template>
  <div class="app-container">
    <header class="main-header">
      <div class="header-left">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMmJbMKvDEyFeEF-G5P9V-kci3mquWZwqEg&s"
          alt="La Salle Logo"
          class="logo"
        />
        <nav class="main-nav">
          <a href="#">Inicio</a>
        </nav>
      </div>
      <div class="header-right">
        <div class="profile-icon"></div>
      </div>
    </header>

    <main class="main-content">
      <a href="/ini_admin" class="back-button">←</a>

      <section class="content-card">
        <h2>Datos Personales del Docente</h2>
        <form>
          <div class="form-grid">
            <div class="form-group full-width">
              <label for="nombre">Nombres *</label>
              <input
                id="nombre"
                type="text"
                class="form-input"
                placeholder="Ingresa los nombres"
                v-model="formDatosPersonales.nombre"
                required
              />
            </div>

            <div class="form-group full-width">
              <label for="apellido">Apellidos *</label>
              <input
                id="apellido"
                type="text"
                class="form-input"
                placeholder="Ingresa los apellidos"
                v-model="formDatosPersonales.apellido"
                required
              />
            </div>

            <div class="form-group">
              <label for="telefono">Teléfono </label>
              <input
                id="telefono"
                type="tel"
                class="form-input"
                v-model="formDatosPersonales.telefono"
              />
            </div>

            <div class="form-group">
              <label for="fechaNacimiento">Fecha de Nacimiento *</label>
              <input
                id="fechaNacimiento"
                type="date"
                class="form-input"
                v-model="formDatosPersonales.fechaNacimiento"
              />
            </div>
          </div>

          <div class="form-group full-width button-group">
            <button type="button" class="btn-cancelar" @click="onCancelDatos">Limpiar Datos</button>
          </div>
        </form>
      </section>

      <section class="content-card student-card">
        <h2>Registro de Cuenta y Cargo </h2>
        <form @submit.prevent="registrarDocenteCompleto">
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Rol</label>
              <input class="form-input" type="text" :value="formDocenteCuenta.rol" readonly>
            </div>

            <div class="form-group full-width">
              <label for="doc-cargo">Cargo (Ej: Profesor de Matemáticas, Coordinador) *</label>
              <input
                id="doc-cargo"
                class="form-input"
                type="text"
                placeholder="Ingrese el cargo"
                required
                v-model="formDocenteCuenta.cargo"
              >
            </div>

            <div class="form-group full-width">
              <label for="doc-email">Correo Electrónico (Usuario) *</label>
              <input
                id="doc-email"
                class="form-input"
                type="email"
                placeholder="correo@lasalle.edu.co"
                required
                v-model="formDocenteCuenta.email"
              >
            </div>

            <div class="form-group">
              <label for="doc-password1">Contraseña Inicial *</label>
              <input
                id="doc-password1"
                class="form-input"
                type="password"
                required
                v-model="formDocenteCuenta.password"
              >
            </div>

            <div class="form-group">
              <label for="doc-password2">Confirmar Contraseña *</label>
              <input
                id="doc-password2"
                class="form-input"
                type="password"
                required
                v-model="formDocenteCuenta.password_confirm"
              >
            </div>

            <div class="form-group full-width button-group">
              <button type="submit" class="btn-guardar">Registrar Docente Completo</button>
              <button type="button" class="btn-cancelar" @click="onCancelCuenta">Limpiar Cuenta</button>
            </div>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>



<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  background-image: url('/img/fondo 1.jpeg');
  background-size: cover;
  background-position: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 25px;
}
.logo {
  height: 45px;
}
.main-nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 6px;
  transition: background-color 0.2s;
}
.main-nav a.active-link,
.main-nav a:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.profile-icon {
  width: 36px;
  height: 36px;
  background-color: #28a745;
  border-radius: 50%;
  border: 2px solid white;
}

.main-content {
  flex-grow: 1;
  display: flex;
  gap: 30px; 
  padding: 30px;
  justify-content: center; 
  align-items: flex-start;
  overflow-y: auto;
}

.content-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  padding: 25px 35px;
  flex: 1 1 450px;
  max-width: 500px; 
}

.content-card h2 {
  color: #333;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 24px;
  text-align: center;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    gap: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group.full-width {
  grid-column: 1 / -1; 
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
.form-input[type="date"] {
    color: #f5f5f5;
}
.form-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
label {
    color: #333;
    font-weight: 600;
    margin-bottom: 5px;
}

.button-group {
    display: flex;
    gap: 15px;
    margin-top: 10px;
}
.btn-guardar,
.btn-cancelar {
  cursor: pointer;
  font-weight: 700;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 15px;
  transition: transform 0.08s ease;
  flex-grow: 1;
}
.btn-guardar {
  background: #28a745;
  color: white;
}
.btn-cancelar {
  background: #ff0000;
  color: white;
}
.btn-guardar:hover,
.btn-cancelar:hover {
  transform: translateY(-2px);
}

@media (max-width: 1050px) {
    .main-content {
        flex-direction: column; 
        align-items: center;
    }
    .content-card {
        max-width: 90%; 
        width: 100%;
        margin-bottom: 15px;
    }
}
@media (max-width: 600px) {
    .form-grid {
        grid-template-columns: 1fr; 
    }
    .form-group.full-width {
        grid-column: 1 / -1;
    }
}
.back-button {
  position: fixed;
  top: 100px;
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