<template>
  <section>
      <h2>Welcome to your blog, {{ $root.user.username }}!</h2>
      <button>Write new article</button>
      <h3>My articles</h3>
      <!-- <article-card v-for="(article, index) in articles" :key="article.id" :article="article"
      @deleteArticle="deleteThisArticle(index)></article-card> -->
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
      //TODO showTrips()
    showUser(this.$root.user._id).then(user => {
		this.user = user;
	});
  },
  components: {
      ArticleCard,
  }
}
</script>

