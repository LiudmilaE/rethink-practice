<template>
  <div class="container">
    <b-notification v-if="error" type="is-danger" has-icon>
			{{ error.message }}
		</b-notification>
		<form @submit.prevent="addArticle">
			<b-field label="Title">
				<b-input type="text" v-model="title"></b-input>
			</b-field>
			<b-field label="Content">
				<b-input type="textarea" v-model="content"></b-input>
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

		}
	}
	
}
</script>

