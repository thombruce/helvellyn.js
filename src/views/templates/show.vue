<template lang="pug">
div
  div(v-if="template")
    router-view(:workspace="workspace" :template="template")
</template>

<script>
export default {
  props: ['workspace'],
  data () {
    return {
      template: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData () {
      this.template = null
      this.$store.dispatch('templates/show', { workspaceId: this.$route.params.workspaceId, templateId: this.$route.params.templateId }).then(() => {
        // this.template = this.$store.state.templates.list[this.$route.params.templateId]
        this.template = this.$store.getters['templates/findBySlug'](this.workspace.id, this.$route.params.templateId)
        if (!this.template.permissions.view_template) {
          this.$router.replace({ name: 'templates_path', params: { workspaceId: this.workspace.slug } })
        }
      })
    }
  }
}
</script>
