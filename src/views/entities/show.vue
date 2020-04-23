<template lang="pug">
div(v-if="entity")
  h2 {{ template.name }}
  p(v-for="field in template.fields")
    strong {{ field.name }}
    | &nbsp;
    span {{ entity.data[field.slug] }}
  router-link(:to="{ name: 'edit_entity_path', params: { entityId: entity.slug } }") Edit
  router-view
</template>

<script>
export default {
  props: ['workspace', 'template'],
  data () {
    return {
      entity: {
        data: {}
      }
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
      this.entity = null
      this.$store.dispatch('entities/show', { workspaceId: this.$route.params.workspaceId, templateId: this.$route.params.templateId, entityId: this.$route.params.entityId }).then(() => {
        // this.entity = this.$store.state.entities.list[this.$route.params.entityId]
        this.entity = this.$store.getters['entities/findBySlug'](this.template.id, this.$route.params.entityId)
        if (!this.entity.permissions.view_entity) {
          this.$router.replace({ name: 'templates_path', params: { workspaceId: this.workspace.slug } })
        }
      })
    }
  }
}
</script>
