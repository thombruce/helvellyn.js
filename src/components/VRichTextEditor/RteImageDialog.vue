<template lang="pug">
v-dialog(v-model="dialog" max-width="290")
  template(v-slot:activator="{ on }")
    v-btn(icon v-on="on")
      v-icon mdi-image
  v-card
    v-card-title(class="headline") Add an image
    v-form(@submit.prevent="setImageSrc(command, image)")
      v-card-text
        v-upload-field(
          label="Image URL"
          v-model="image.src"
          )
        v-text-field.ma-0.pa-0(
          label="Alt Text"
          v-model="image.alt"
        )
        v-text-field.ma-0.pa-0(
          label="Hover Text"
          v-model="image.title"
        )
      v-card-actions
        v-spacer
        v-btn(color="green darken-1" text type="submit") Submit
</template>

<script>
import VUploadField from '../VUploadField.vue'

export default {
  props: ['command'],
  components: {
    VUploadField
  },
  data () {
    return {
      dialog: false,
      image: {
        src: null,
        alt: null,
        title: null
      }
    }
  },
  methods: {
    setImageSrc (command, image) {
      command(image)
      this.dialog = false
    }
  }
}
</script>
