<template>
  <div class="media-content">
    <div class="field">
      <p class="control">
        Comment goes here
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
  }
}
</script>

<style>

</style>
