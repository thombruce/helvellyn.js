<template lang="pug">
div
  h1 New Upload
  upload-form(:upload="upload" :submit="create")
  router-link(:to="{ name: 'uploads_path' }") Back
</template>

<script>
import UploadForm from './_form.vue'
export default {
  components: {
    UploadForm
  },
  data () {
    return {
      upload: {
        file: null,
        errors: []
      }
    }
  },
  methods: {
    create: function () {
      this.$store.dispatch('uploads/create', { workspaceId: this.$route.params.workspaceId, data: { upload: this.upload } }).then((res) => {
        this.$router.push({ name: 'uploads_path' })
      }).catch((errors) => {
        this.upload.errors = errors
      })
    }
  }
}
</script>
