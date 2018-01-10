<template>
	<div class="tile is-parent">
		<article class="tile box is-child">
			<section v-if="!showForm">
				<h4 class="title">{{ article.title }}</h4>
				<div class="content">
					<p>{{ article.content }}</p>
				</div>
			</section>
			<section v-else>
				<form @submit.prevent="updateArticle">
					<b-field label="Title">
						<b-input type="text" v-model="article.title"></b-input>
					</b-field>
					<b-field label="Content">
						<b-input type="textarea" v-model="article.content"></b-input>
					</b-field>
					<button class="button is-dark is-outlined">Save changes</button>
				</form>
			</section>
			<footer class="card-footer" v-if="$root.user && article.authorId === $root.user._id">
				<a href="#" class="card-footer-item success" @click.prevent="showForm=!showForm">{{ showForm ? "Cancel" : "Edit"}}</a>
				<a href="#" @click.prevent="deleteArticle" class="card-footer-item danger">Delete</a>
 			</footer>
		</article>
	</div>
</template>

<script>
import { deleteArticle, updateArticle } from "@/api/articles"

export default {
  data() {
    return {
      user: this.$root.user || null,
			comments: [],
			showForm: false,
			error: null,
    }
  },
	props: ['article'],
	methods: {
		deleteArticle () {
			deleteArticle(this.article._id).
				then(this.$emit('deleteArticle', true))
			this.$router.push('/profile');	
		},
		updateArticle () {
			this.error = null;
			let data = {};

			updateArticle(this.article._id, { title: this.article.title, content: this.article.content})
				.then(article => {
					this.$emit('updateArticle', article);
					this.showForm = false;
				}).catch(err => {
					if(err) {
						this.error = err.response.data.error
					console.error('Trip edit err', err.response.data.error);
					}
				});			
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

