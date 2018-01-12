<template>
    <div class="container notification">
        <h4 class="title is-4">Please, signup</h4>
        <b-notification v-if="error" type="is-danger" has-icon>
			{{ error }}
		</b-notification>
        <form @submit.prevent="signup">
            <b-field label="Username">
                <b-input v-model='username' maxlength="10" required type="text"></b-input>
            </b-field>
            <b-field label="Full name"> 
                <b-input v-model='name' maxlength="30" required type="text"></b-input>
            </b-field>
            <b-field label="Email"> 
                <b-input v-model="email" required type="email"></b-input>
            </b-field>
            <b-field label="Password">
                <b-input v-model='password' required type="password"></b-input>
            </b-field>
            <button class="button is-success">Signup</button>
        </form>
     </div>
</template>

<<script>
import { signup } from '@/api/auth'

export default {

  data() {
      return {
          error: null,
          username: '',
          email: '',
          password: '',
          name: '',
      }
  },
  methods : {
        signup () {
            this.error = null;
            signup({
                username: this.username,
                email: this.email,
                password: this.password,
                name: this.name,
            }).then(() => {
                this.$router.push('/login');
            }).catch(err => {
                if(err && err.response) this.error = err.response.data.error
                console.log('Sighup error ', err)
            })
      }
  }
}
</script>

