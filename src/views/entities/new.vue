<template lang="pug">
div(v-if="entity")
  h2 New {{ template.name }}
  entity-form(:template="template" :entity="entity" :submit="create")
  router-link(:to="{ name: 'entities_path' }") Back
</template>

<script>
import EntityForm from './_form.vue'
export default {
  props: ['workspace', 'template'],
  components: {
    EntityForm
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.workspace.permissions.create_entities) {
        return next(from || '/')
      }
    })
  },
  data () {
    return {
      entity: {
        data: {},
        errors: []
      }
    }
  },
  methods: {
    create: function () {
      this.$store.dispatch('entities/create', { workspaceId: this.$route.params.workspaceId, templateId: this.$route.params.templateId, data: this.entity }).then((res) => {
        this.$router.push({ name: 'entity_path', params: { entityId: res.slug } })
      }).catch((errors) => {
        this.entity.errors = errors
      })
    }
  }
}
</script>
