// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify)

const opts = {
  theme: {
    dark: null,
    themes: {
      dark: {
        primary: colors.amber.darken1
      },
      light: {
        primary: colors.amber
      }
    }
  }
}

export default new Vuetify(opts)
