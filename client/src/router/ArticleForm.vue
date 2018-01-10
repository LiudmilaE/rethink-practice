<template>
  <div class="container">
		<h4 class="title is-4">Please, fill in this form to add your new article</h4>
    <b-notification v-if="error" type="is-danger" has-icon>
			{{ error.message }}
		</b-notification>
		<form @submit.prevent="addArticle">
			<b-field label="Title">
				<b-input type="text" v-model="title" placeholder="Lorem ipsum dolor sit amet"></b-input>
			</b-field>
			<b-field label="Content">
				<b-input type="textarea" v-model="content" placeholder="Lorem ipsum dolor sit amet, ne quo quas vocibus appellantur, sumo soleat vim ex."></b-input>
			</b-field>
			<button class="button is-dark is-outlined">Add my article</button>
		</form>
  </div>
</template>

<script>
import { addArticle } from '@/api/articles'

export default {
	data() {
		return {
			title: '',
			content: '',
			error: null,
		}
	},
	methods: {
		addArticle () {
			this.error = null;
			addArticle({
				title: this.title,
				content: this.content,
			})
			.then(() => {
				this.$router.push('/profile');
			}).catch(err => {
				if(err && err.response) {
					this.error = err.response.data.error
				}
				console.error("Article add error ", err)
			})
		}
	}
	
}
</script>

