<template>
	<div class="tile is-parent">
		<article class="tile box is-child">
					<h4 class="title">{{ article.title }}</h4>
					<div class="content">
						<p>{{ article.content }}</p>
					</div>
					<footer class="card-footer">
						<!-- <a href="#" class="card-footer-item success" @click.prevent="showForm=!showForm">{{ showForm ? "Cancel" : "Edit"}}</a> -->
						<a href="#" @click.prevent="deleteArticle" v-if="article.authorId === $root.user._id" class="card-footer-item danger">Delete</a>
 					</footer>
		</article>
	</div>
</template>

<script>
import { deleteArticle } from "@/api/articles"

export default {
  data() {
    return {
      user: this.$root.user || null,
      comments: []
    }
  },
	props: ['article'],
	methods: {
		deleteArticle () {
			deleteArticle(this.article._id).
				then(this.$emit('deleteArticle', true))
			this.$router.push('/profile');	
		},
	},
  created() {
			// //show comments
			// showComments().then(comments => { 
			// 	let id = this.article._id
			// 	this.comments = comments.filter(comment => comment.articleId === id);
			//  });
		},
}
</script>

