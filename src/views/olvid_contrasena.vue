<script setup> </script>
<template>
<div class="login-container">
  <div class="login-form">
    <h1 class="logo">AlfaGestion</h1>
    <img alt="vue logo" src="https://media.istockphoto.com/id/1349914017/es/vector/icono-de-candado-plantilla-vectorial-plana-dise%C3%B1o-de-moda.jpg?s=612x612&w=0&k=20&c=CXK_9y7c3bNL2NTLNnCPGjrYX7mY8eVSBs6LwodF8LY=" width=200>
    <h2 class="welcome-title">¿Tienes problema para iniciar sesion?</h2>
    <h3 class="text">Ingresa tu correo electronico, telefono o nombre de usuario  y te enviaremos un enlace para que recuperes el acceso a tu cuenta </h3>



    <form @submit.prevent="handleLogin">


      <div class="input-group">
        <label for="password">Correo Electronico</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit" class="login-button">Enviar</button>
    </form>

  </div>
</div>
</template>

<style scoped>
/* Fuente personalizada similar al logo */
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Roboto:wght@400;500;700&display=swap');

.login-container {
/* Reemplaza esta URL con la URL de tu imagen de fondo */
background-image: url('https://scontent.feoh3-1.fna.fbcdn.net/v/t51.75761-15/481610614_18306353359227867_8885988781752331401_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG48Zk_KecLM9jpd4x-t2rKj7P_FqscypGPs_8WqxzKkZxSA_-z3Fof4PiSfNPs7L6jOELnYlGZlzGvlQLEcX-z&_nc_ohc=_mGcrzTpfGIQ7kNvwEge5VC&_nc_oc=AdkkzlL0pOOyV-hcvk2snjL4QhWpfE8Z-zkAWpDPhzoJr0X2d_uy8GKgaCIjuj6VYwKK-q41zaOoYHPX28WNk1-v&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=hWl9J-dgLl_yZm5Zo6bs5g&oh=00_AfZg3EH2GU7GPpJRh08rIw4pdgVGr5X965b7dV5I-IrrEQ&oe=68CA8FD1');
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
box-sizing: border-box; /* Asegura que el padding no afecte el ancho total */
}

.input-group input:focus {
outline: none;
border-color: #e53935; /* Color rojo del botón */
}

.login-button {
width: 100%;
padding: 0.9rem;
border: none;
border-radius: 25px;
background-color: #e53935; /* Tono de rojo */
color: white;
font-size: 1.1rem;
font-weight: bold;
cursor: pointer;
transition: background-color 0.3s, transform 0.2s;
margin-top: 1rem;
}

.login-button:hover {
background-color: #c62828; /* Rojo más oscuro */
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
</style>