<template>
  <div>
    <div class="hello hero is-warning is-bold is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Blog - Vue.js App </h1>
          <h2 class="subtitle">Lorem ipsum dolor sit amet, ne quo quas vocibus appellantur, sumo soleat vim ex. Ei duo illud malis tacimates.</h2>
        </div>
      </div>
    </div>
      <section class="container" v-if="articles.length>0">
        <article-card v-for="article in articles" 
            :key="article.id" :article="article"></article-card>
      </section>
  </div>
</template>

<script>
import { showArticles } from '@/api/articles'
import ArticleCard from '@/components/ArticleCard'

export default {
  name: 'HelloWorld',
  data () {
    return {
      user: null || this.$root.user,
      articles: [],
      comments: []
    }
  },
  created () {
    showArticles().then(articles => {
      this.articles=articles
    })
  },
  components: {
    ArticleCard
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
