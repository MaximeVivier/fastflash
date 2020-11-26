<template>
  <div v-on:click="goToThatLibrary">
    {{ library.name }}
  </div>
</template>

<script>
export default {
  name: "Todo",
  methods: {
    goToThatLibrary() {
      this.$router.push({ name: `library`, params: { libName: this.library.name } })
    }
  },
  props: {
    library: Object,
  },
}
</script>

<style scoped>

</style>