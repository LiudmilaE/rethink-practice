<template>
  <section class="container">
    <h2 class="title">Welcome to your blog, {{ $root.user.username }}!</h2>
    <button class="button is-dark is-outlined">Write new article</button>
    <section class="container">
      <h3 class="subtitle">My articles</h3>
        <!-- <article-card v-for="(article, index) in articles" :key="article.id" :article="article"
        @deleteArticle="deleteThisArticle(index)></article-card> -->
    </section>
  </section>
</template>

<script>
import { showUser } from '@/api/auth'
import ArticleCard from '@/components/ArticleCard'

export default {
  data() {
      return {
        user: this.$root.user || null,
        articles: [{
          title: "Cool title",
          content: 'Hello world!'
      }],
      }
  },
  methods: {
    deleteThisArticle: function(index) {
		this.article.splice(index, 1);
	},
  },
  created() {
      //TODO showArticles()
    if (this.$root.user) {
      showUser(this.$root.user._id).then(user => {
        this.user = user;
      });
    } 
  },
  components: {
      ArticleCard,
  }
}
</script>

<style scoped>
  
</style>


