<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginDocente } from '../services/authDocentes'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()

async function handleLogin() {
  try {
    const data = await loginDocente(email.value, password.value)
    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)
    localStorage.setItem('user', JSON.stringify(data.user))
    router.push('/ini_docentes')
  } catch (error) {
    console.error('Error en login:', error)
    errorMsg.value =
      error.response?.data?.detail || 'Correo o contraseña incorrectos'
  }
}
</script>

<template>
<div class="login-container">
  <div class="login-form">
    <a href="/" class="back-button">←</a>
    <h1 class="logo">AlfaGestion</h1>
    <h2 class="welcome-title">Bienvenido al sistema de Docentes</h2>

    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="email">Correo</label>
        <input type="text" id="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">Ingresar</button>
    </form>

    <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>

  </div>
</div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Roboto:wght@400;500;700&display=swap');
.login-container {
background-image: url('../assets/img/prescolar.png');
background-size: cover;
background-position: center;
height: 100vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
font-family: 'Roboto', sans-serif;
}
.login-form {
background-color: rgba(255, 255, 255, 0.85);
padding: 2.5rem 3rem;
border-radius: 15px;
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.18);
text-align: center;
width: 100%;
max-width: 400px;
}
.logo {
font-family: 'Audiowide', cursive;
font-size: 3.5rem;
color: #fff;
text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
margin-bottom: 1rem;
}
.welcome-title {
font-size: 1.25rem;
color: #333;
margin-bottom: 2rem;
font-weight: 500;
}
.input-group {
text-align: left;
margin-bottom: 1.5rem;
}
.input-group label {
display: block;
font-size: 0.8rem;
color: #555;
margin-bottom: 0.3rem;
margin-left: 0.5rem;
}
.input-group input {
width: 100%;
padding: 0.8rem 1rem;
border-radius: 25px;
border: 2px solid #ccc;
background-color: #fff;
font-size: 1rem;
transition: border-color 0.3s;
box-sizing: border-box; 
}
.input-group input:focus {
outline: none;
border-color: #e53935; 
}
.login-button {
width: 100%;
padding: 0.9rem;
border: none;
border-radius: 25px;
background-color: #e53935; 
color: white;
font-size: 1.1rem;
font-weight: bold;
cursor: pointer;
transition: background-color 0.3s, transform 0.2s;
margin-top: 1rem;
}
.login-button:hover {
background-color: #c62828; 
transform: translateY(-2px);
}
.forgot-password {
display: inline-block;
margin-top: 1.5rem;
font-size: 0.9rem;
color: #333;
text-decoration: none;
transition: color 0.3s;
}
.forgot-password:hover {
color: #e53935;
text-decoration: underline;
}
.error-message {
  color: #e53935;
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: bold;
}
.back-button {
  position: fixed;
  top: 20px;
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