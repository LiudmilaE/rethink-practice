<template>
  <div class="container notification">
        <h4 class="title is-4">Please, login</h4>
        <b-notification v-if="error" type="is-danger" has-icon>
		{{ error }}
	    </b-notification>
        <form @submit.prevent="login">
            <b-field label="Username">
                <b-input v-model='username' maxlength="10" required type="text"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input v-model='password' required type="text"></b-input>
            </b-field>
            <button class="button is-success">Login</button>
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
