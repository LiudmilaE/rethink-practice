<template>
  <div>
      <h4>Please, login</h4>
      <section v-if="error">{{ error }}</section>
      <form @submit.prevent="login">
          <label>Username<input v-model='username' maxlength="10" required type="text"></label>
          <br>
          <label>Password<input v-model='password' required type="text"></label>
          <br>
          <button>Login</button>
      </form>
  </div>
</template>

<<script>
import { login } from '@/api/auth'

export default {
  data() {
      return {
          username: '',
          password: '',
          error: '',
      }
  },
  methods: {
			login () {
				login(this.username, this.password, this.$root)
				.then(data => {
					this.$router.push('/profile')
				}).catch(err => {
					this.error = err.response.data.error
					console.error('Login err', err.response.data.error);
				});
			},
		},
}
</script>
