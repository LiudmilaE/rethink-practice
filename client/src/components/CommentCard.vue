<template>
	<div class="media">
		<div class="media-content">
			<div class="content">
				<p>
					{{comment.text}}
				</p>
			</div>
		</div>
		<div class="media-right" v-if="user && user._id === comment.writerId">
			<button class="delete" @click.prevent="deleteComment"></button>
		</div>
	</div>
</template>

<script>
import { deleteComment } from "@/api/comments"

export default {
  data () {
    return {
      error: null,
      user: this.$root.user || null,
    }    
	},
	props: ['comment'],
	methods: {
		deleteComment() {
			deleteComment(this.comment._id)
				.then(this.$emit('deleteComment', true))
		}
	},
}
</script>

<style>

</style>
