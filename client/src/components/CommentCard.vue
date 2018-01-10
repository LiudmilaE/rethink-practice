<template>
  <div class="media-content">
    <div class="field">
      <p>
				{{comment.text}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      error: null,
      user: this.$root.user || null,
    }    
	},
	props: ['comment'],
}
</script>

<style>

</style>
