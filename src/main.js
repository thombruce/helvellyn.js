import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Plugins
import vuetify from './plugins/vuetify'

// Global Components
import ApplicationLayout from './views/layouts/Application.vue'
import AuthenticationLayout from './views/layouts/Authentication.vue'

// Global Mixins
import Settings from './mixins/settings.js'
import Session from './mixins/session.js'
Vue.component('application-layout', ApplicationLayout)
Vue.component('authentication-layout', AuthenticationLayout)
Vue.mixin(Settings)
Vue.mixin(Session)

export default new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
