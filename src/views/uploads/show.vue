<template lang="pug">
div(v-if="upload")
  v-img.white--text.align-end(:src="upload.file")
    v-card-title(class="subheading font-weight-bold") {{ new Date(upload.created_at).toLocaleDateString() }}
</template>

<script>
export default {
  data () {
    return {
      upload: null
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
      this.upload = null
      this.$store.dispatch('uploads/show', { workspaceId: this.$route.params.workspaceId, uploadId: this.$route.params.uploadId }).then(() => {
        this.upload = this.$store.state.uploads.list[this.$route.params.uploadId]
      })
    }
  }
}
</script>
