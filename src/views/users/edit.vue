<template lang="pug">
div(v-if="user")
  h1 Edit {{ user.name }}
  v-form(ref="form" :model="user" @submit.prevent="submit")
    v-select(label="Role" :items="roles" v-model="user.role" :error-messages="user.errors.role")
    v-btn(color="primary" type="submit") Submit
</template>

<script>
export default {
  props: ['workspace'],
  data () {
    return {
      user: null,
      roles: [
        { text: 'Admin', value: 'admin' },
        { text: 'Moderator', value: 'moderator' },
        { text: 'Author', value: 'author' }
      ]
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    // TODO: Add submit method
    fetchData () {
      this.user = null
      this.$store.dispatch('users/show', { workspaceId: this.$route.params.workspaceId, userId: this.$route.params.userId }).then(() => {
        this.user = this.$store.state.users.list[this.$route.params.userId]
        // this.user = this.$store.getters['users/findBySlug'](this.workspace.id, this.$route.params.userId)
        if (!this.user.permissions.update_user) {
          this.$router.replace({ name: 'users_path', params: { workspaceId: this.workspace.slug } })
        }
      })
    },
    submit () {
      this.$store.dispatch('users/update', { workspaceId: this.$route.params.workspaceId, userId: this.$route.params.userId, data: { user: this.user } }).then((res) => {
        this.$router.push({ name: 'users_path' })
      }).catch((errors) => {
        console.log(errors)
        this.user.errors = errors
      })
    }
  }
}
</script>
