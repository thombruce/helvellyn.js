<template lang="pug">
  div
    component(v-if="sessionLoaded" :is="layout")
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
  async created () {
    await this.fetchSession()
    // See mixins/settings.js
    this.fetchSettings()
  },
  methods: {
    async fetchSession () {
      await this.$store.dispatch('authentication/tokens/init')
    }
  }
}
</script>
