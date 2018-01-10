<template>
  <div>
      <h4>Please, signup</h4>
      <section v-if="error">{{ error }}</section>
      <form @submit.prevent="signup">
          <label>Username <input v-model='username' maxlength="10" required type="text"></label> {{username}}
          <br>
          <label>Password <input v-model='password' required type="password"></label> {{password}}
          <br>
          <label>Full name <input v-model='name' maxlength="10" required type="text"></label> {{name}}
          <br>
          <label>Email <input v-model="email" required type="email"></label> {{email}}
          <br>
          <button>Signup </button>
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

