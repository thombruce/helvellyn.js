<template lang="pug">
div(v-if="user")
  h2 {{ user.name }}
  p
    strong Name
    | &nbsp;
    span {{ user.name || user.email }}
  p
    strong Role
    | &nbsp;
    span {{ user.role }}
  router-link(:to="{ name: 'edit_user_path', params: { workspaceId: workspace.slug } }") Edit
</template>

<script>
export default {
  props: ['workspace'],
  data () {
    return {
      user: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData () {
      this.user = null
      this.$store.dispatch('users/show', { workspaceId: this.$route.params.workspaceId, userId: this.$route.params.userId }).then(() => {
        this.user = this.$store.state.users.list[this.$route.params.userId]
        // this.user = this.$store.getters['users/findBySlug'](this.workspace.id, this.$route.params.userId)
        if (!this.user.permissions.view_user) {
          this.$router.replace({ name: 'templates_path', params: { workspaceId: this.workspace.slug } })
        }
      })
    }
  }
}
</script>
