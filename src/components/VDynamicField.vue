<template lang="pug">
component(:is="fieldComponent" :label="label" v-model="inputVal" :uploadMethod="uploadMethod")
</template>

<script>
import VMarkdownEditor from './VMarkdownEditor.vue'
import HvnDateSelect from './inputs/HvnDateSelect.vue'

export default {
  props: [
    'value',
    'label',
    'type'
  ],
  components: {
    VMarkdownEditor,
    HvnDateSelect
  },
  computed: {
    inputVal: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    fieldComponent () {
      switch (this.type) {
        case 'String':
          return 'v-text-field'
        case 'Text':
          return 'v-textarea'
        case 'Rich Text':
          return 'bru-text-editor'
        case 'Date':
          return 'hvn-date-select'
        case 'Tags':
          return 'bru-tags-field'
        case 'Upload':
          return 'bru-attachment-field'
        case 'Markdown':
          return 'v-markdown-editor'
        default:
          return 'v-text-field'
      }
    }
  },
  methods: {
    uploadMethod: function (upload) {
      return this.$store.dispatch('uploads/create', { workspaceId: this.$route.params.workspaceId, data: { upload } }).then((res) => {
        return res.file
      }).catch((errors) => {
        upload.errors = errors
      })
    }
  }
}
</script>
