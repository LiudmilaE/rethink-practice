<template>
  <div>
    <div class="hello hero is-warning is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">Blog - Vue.js App </h1>
          <h2 class="subtitle is-3">Lorem ipsum dolor sit amet, ne quo quas vocibus appellantur, sumo soleat vim ex. Ei duo illud malis tacimates.</h2>
        </div>
      </div>
    </div>
      <section class="container" v-if="articles.length>0">
				<h3 class="subtitle">Explore our members' articles! 
					<span v-if="articles && articles.length>0">{{articles.length}} article{{ articles.length===0 ? "" : "s" }}.</span>
					<span v-if="isChanged"> WOW Changes!!!</span>
				</h3>
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
      comments: [],
			isChanged: false,
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
