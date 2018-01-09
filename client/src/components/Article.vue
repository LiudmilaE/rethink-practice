<template>
  <article>
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
  </article>
</template>

<script>
export default {
  data() {
      return {
          title: "My cool title",
          content: 'Hello world'
      }
  }
}
</script>

