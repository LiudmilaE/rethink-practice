<template>
  <div id="app">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <img src="./assets/logo.png" alt="Vue.js App Blog" height="28">
        </router-link>
        <div class="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-start">
          <router-link v-if="!$root.user" to="/login" class="navbar-item toggle-item">
            Login
          </router-link>
          <router-link v-if="!$root.user" to="/signup" class="navbar-item toggle-item">
            Signup
          </router-link>
          <router-link v-if="$root.user" to="/profile" class="navbar-item toggle-item">
            Profile
          </router-link>
          <a @click.prevent="logout" v-if="$root.user" href="#" class="navbar-item toggle-item">
            Logout
          </a>
        </div>
      </div>
    </nav>
    
    <router-view/>
  </div>
</template>

<script>
import { logout } from '@/api/auth'

export default {
  name: 'app',
  methods: {
		logout () {
			logout(this.$root);
			this.$router.push('/');
		},
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

#logo {
  width: 100px;
  height: 100px;
}
</style>
