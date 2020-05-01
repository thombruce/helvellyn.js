<template lang="pug">
  div
    component(:is="layout")
      router-view(v-if="sessionLoaded")
</template>

<script>
const defaultLayout = 'authentication'

export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  },
  async created () {
    await this.fetchSession()
    // See mixins/settings.js
    this.fetchSettings()
  },
  methods: {
    fetchSession () {
      this.$store.dispatch('authentication/tokens/init')
    }
  }
}
</script>
