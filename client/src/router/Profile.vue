<template>
  <section v-if="$root.user">
    <div class="hello hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="title">Welcome to your blog, {{ $root.user.username }}!</h2>
        </div>
      </div>
    </div>
    <aside>
      <router-link to="/articles/new">
        <span class="button is-dark is-outlined">Write new article</span>
      </router-link>
    </aside>
    <section class="container" v-if="articles.length>0">
      <h3 class="title is-3">Your articles:
      </h3>
        <article-card v-for="(article, index) in articles" 
          :key="article.id" :article="article"
          @deleteArticle="deleteThisArticle(index)"
          @updateArticle="updateThisArticle(index, $event)"
          @addComment="addComment(index, $event)"></article-card>
    </section>
  </section>
</template>

<script>
import { showUser } from '@/api/auth'
import ArticleCard from '@/components/ArticleCard'
import { showArticles } from '@/api/articles'

export default {
  data() {
      return {
        user: this.$root.user || null,
        articles: [],
      }
  },
  methods: {
    deleteThisArticle: function(index) {
		  this.articles.splice(index, 1);
    },
    updateThisArticle: function(index, article) {
      //emited event shows changes in article
    },
    addComment: function () {

    },
  },
  created() {
    if (this.$root.user) {
      showUser(this.$root.user.id).then(user => {
        this.user = user;
      });
      showArticles().then(articles => {
        let id = this.$root.user.id;
        this.articles = articles.filter(article => article.authorId === id );
      })
    } 
  },
  components: {
    ArticleCard,
  }
}
</script>

<style scoped>
  aside {
    margin: 1%;
  }
</style>


