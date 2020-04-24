import { mount } from '@vue/test-utils'
import Login from '@/views/authentication/login.vue'

describe('Login', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Login, {
      data () {
        return { settings: { mailer_configured: true } }
      },
      stubs: ['router-link']
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
