<template lang="pug">
v-dialog(v-model="dialog" max-width="290")
  template(v-slot:activator="{ on }")
    v-btn(icon v-on="on")
      v-icon mdi-paperclip
  v-card
    v-card-title(class="headline") Upload an image
    v-card-text
      upload-form(:upload="upload" :submit="create")
</template>

<script>
import UploadForm from '../../../views/uploads/_form.vue'
export default {
  props: ['value'],
  components: {
    UploadForm
  },
  data () {
    return {
      dialog: false,
      upload: {
        file: null,
        errors: []
      }
    }
  },
  computed: {
    inputVal: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    create: function () {
      this.$store.dispatch('uploads/create', { workspaceId: this.$route.params.workspaceId, data: { upload: this.upload } }).then((res) => {
        this.inputVal = res.file
        this.dialog = false
      }).catch((errors) => {
        this.upload.errors = errors
      })
    }
  }
}
</script>
