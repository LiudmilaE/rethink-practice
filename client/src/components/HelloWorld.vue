<template>
  <div class="hello hero is-warning is-bold is-medium">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Blog - Vue.js App </h1>
        <h2 class="subtitle">Lorem ipsum dolor sit amet, ne quo quas vocibus appellantur, sumo soleat vim ex. Ei duo illud malis tacimates.</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      user: null || this.$root.user,
      articles: [],
      comments: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
