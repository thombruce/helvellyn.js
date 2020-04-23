<template lang="pug">
v-select(:label="label" :items="fieldTypes" v-model="inputVal")
</template>

<script>
import FieldTypes from '../mixins/fieldTypes.js'

export default {
  props: [
    'label',
    'value'
  ],
  mixins: [
    FieldTypes
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
