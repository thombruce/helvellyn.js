<template lang="pug">
div
  h2 Uploads

  router-link(:to="{ name: 'new_upload_path' }") New upload

  v-data-iterator(
    v-if="uploads"
    :items="uploads"
  )
    template(v-slot:default="props")
      v-row
        v-col(
          v-for="item in props.items"
          :key="item.id"
          cols="12"
          sm="6"
          md="4"
        )
          v-card(
            :to="{ name: 'upload_path', params: { uploadId: item.id } }"
          )
            v-img.white--text.align-end(:src="item.file")
              v-card-title(class="subheading font-weight-bold") {{ new Date(item.created_at).toLocaleDateString() }}
</template>

<script>
export default {
  props: ['workspace'],
  data () {
    return {
      uploads: null
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
      this.uploads = null
      this.$store.dispatch('uploads/index', { workspaceId: this.$route.params.workspaceId }).then(() => {
        // this.uploads = this.$store.state.uploads.list
        this.uploads = this.$store.getters['uploads/forWorkspace'](this.workspace.id)
        if (!this.workspace.permissions.list_uploads) {
          this.$router.replace({ name: 'root_path' })
        }
      })
    }
  }
}
</script>
