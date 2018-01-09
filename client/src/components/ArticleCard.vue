<template>
  <article>
      <h4>{{ article.title }}</h4>
      <p>{{ article.content }}</p>
  </article>
</template>

<script>
export default {
  data() {
      return {
          title: "Cool title",
          content: 'Hello world!',
          comments: []
      }
  },
  props: ['article'],
  created() {
			//show trip's comments
			showComments().then(comments => { 
				let id = this.article._id
				this.comments = comments.filter(comment => comment.articleId === id);
			 });
		},
}
</script>

