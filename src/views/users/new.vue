<template lang="pug">
div
  h1 Invite User
  v-form(ref="form" :model="user" @submit.prevent="submit")
    v-text-field(label="Email" v-model="user.email" :error-messages="user.errors.email")
    v-select(label="Role" :items="roles" v-model="user.role" :error-messages="user.errors.role")
    v-btn(color="primary" type="submit") Submit
</template>

<script>
export default {
  props: ['workspace'],
  data () {
    return {
      user: {
        email: '',
        role: '',
        errors: []
      },
      roles: [
        { text: 'Admin', value: 'admin' },
        { text: 'Moderator', value: 'moderator' },
        { text: 'Author', value: 'author' }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.workspace.permissions.invite_users) {
        return next(from || '/')
      }
    })
  },
  methods: {
    submit () {
      this.$store.dispatch('users/invite', { workspaceId: this.$route.params.workspaceId, data: { user: this.user } }).then((res) => {
        this.$router.push({ name: 'users_path' })
      }).catch((errors) => {
        console.log(errors)
        this.user.errors = errors
      })
    }
  }
}
</script>
