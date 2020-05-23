<template lang="pug">
v-combobox(
  :label="label"
  v-model="inputVal"
  multiple
  chips
  deletable-chips
  :append-icon="null"
  :delimiters="[',']"
)
</template>

<script>
export default {
  props: [
    'label',
    'value'
  ],
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
