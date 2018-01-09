<template>
  <div id="app">
    <img src="./assets/logo.png" id="logo">
    <nav>
      <router-link v-if="!$root.user" to="/login" class="navbar-item toggle-item">
				Login
			</router-link>
			<router-link v-if="!$root.user" to="/signup" class="navbar-item toggle-item">
				Signup
			</router-link>
      <a @click.prevent="logout" v-if="$root.user" href="#">
				Logout
			</a>
    </nav>
    <br>
    <router-view/>
  </div>
</template>

<script>
//import { logout } from '@/api/auth'

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
  margin-top: 60px;
}

#logo {
  width: 100px;
  height: 100px;
}
</style>
