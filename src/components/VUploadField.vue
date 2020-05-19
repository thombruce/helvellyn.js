<template lang="pug">
v-text-field.ma-0.pa-0(
  :label="label"
  v-model="inputVal"
)
  image-upload-dialog(slot="append" v-model="inputVal")
</template>

<script>
import ImageUploadDialog from './VRichTextEditor/RteImageDialog/ImageUploadDialog'
// TODO: ^ That should be moved.

export default {
  props: [
    'label',
    'value'
  ],
  components: {
    ImageUploadDialog
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
  }
}
</script>
