<template>
	<div class="tile is-parent">
		<article class="tile box is-child">
			<section v-if="!showForm">
				<h4 class="title">{{ article.title }}</h4>
				<div class="content">
					<p>{{ article.content }}</p>
				</div>
				<section v-if="$root.user">
					<div class="media-content">
						<form @submit.prevent="addComment">
							<div class="field">
								<textarea class="textarea" 
									placeholder="Add a comment..." v-model="text"></textarea>
						</div>
						<div class="field">
								<button class="button">Post comment</button>
						</div>
						</form>
					</div>
				</section>
				<hr v-if="comments.length>0">
				<div class="control" id="total-comments">
					<span v-if="comments.length>0">{{comments.length}} comment(s)</span>
				</div>
					<ul v-if="comments.length>0" id="comments-list">
						<li><comment-card v-for="(comment, index) in comments"
							:key="comment.id" :comment="comment"
							@deleteComment="deleteThisComment(index)"></comment-card>
						</li>
					</ul>
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
			<br>
			<footer class="card-footer" 
				v-if="$root.user && article.authorId === $root.user._id">
				<a href="#" class="card-footer-item success" 
					@click.prevent="showForm=!showForm">{{ showForm ? "Cancel" : "Edit"}}</a>
				<a href="#" class="card-footer-item danger" 
					@click.prevent="deleteArticle">Delete</a>
 			</footer>
		</article>
	</div>
</template>

<script>
import { deleteArticle, updateArticle } from "@/api/articles"
import CommentCard from '@/components/CommentCard'
import { addComment, deleteComment, showComments } from '@/api/comments'

export default {
  data() {
    return {
      user: this.$root.user || null,
			comments: [],
			showForm: false,
			error: null,
			text: '',
    }
  },
	props: ['article'],
	methods: {
		deleteArticle () {
			let id = this.article._id;
			let arrPromises = this.comments.map((comment) => deleteComment(comment._id));
				Promise.all(arrPromises).then(() => {
					deleteArticle(id).
						then(this.$emit('deleteArticle', true))
					this.$router.push('/profile');
			 })
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
		addComment () {
			this.error = null;
			addComment({
				text: this.text,
				articleId: this.article._id,
			})
			.then((comment) => {
				//console.log(comment)
				this.$emit('addComment', comment)
				showComments().then(comments => { 
				let id = this.article._id
				this.comments = comments.filter(comment => comment.articleId === id);
			 });
			})
		},
		deleteThisComment: function(index) {
		  this.comments.splice(index, 1);
    },
	},
	components: {
    CommentCard,
  },
  created() {
			//show comments
			showComments().then(comments => { 
				let id = this.article._id
				this.comments = comments.filter(comment => comment.articleId === id);
			 });
		},
}
</script>

<style scoped>
	#comments-list {
		margin-left: 2.5rem;
	}

	#total-comments {
		margin: 2rem;
	}
</style>
