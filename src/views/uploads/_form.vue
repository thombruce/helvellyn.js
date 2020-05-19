<template lang="pug">
v-form(ref="form" :model="upload")
  v-file-input(label="File" v-model="upload.file" :error-messages="upload.errors.file")

  v-btn(color="primary" @click="submit") Submit
</template>

<script>
export default {
  props: [
    'upload',
    'submit'
  ]
}
</script>
