<template lang="pug">
  div
    component(:is="layout")
      router-view
</template>

<script>
const defaultLayout = 'authentication'

export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  },
  created () {
    // See mixins/settings.js
    this.fetchSettings()
  }
}
</script>
