<template lang="pug">
div
  h2 Users

  router-link(:to="{ name: 'new_user_path' }") New user

  v-simple-table(v-if="users")
    thead
      tr
        th Name
        th Role
        th Actions
    tbody
      tr(v-for="user in users")
        td
          router-link(:to="{ name: 'user_path', params: { userId: user.id } }") {{ user.name || user.email }}
        td {{ user.role }}
        td
          router-link.mr-1(:to="{ name: 'user_path', params: { userId: user.id } }") View
          router-link.mr-1(:to="{ name: 'edit_user_path', params: { userId: user.id } }") Edit

  p.lead.text-center(v-else) No items to show.
</template>

<script>
export default {
  props: ['workspace'],
  data () {
    return {
      users: null
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
      this.users = null
      this.$store.dispatch('users/index', { workspaceId: this.$route.params.workspaceId }).then(() => {
        // this.users = this.$store.state.users.list
        this.users = this.$store.getters['users/forWorkspace'](this.workspace.slug)
        if (!this.workspace.permissions.list_users) {
          this.$router.replace({ name: 'templates_path', params: { workspaceId: this.workspace.slug } })
        }
      })
    }
  }
}
</script>
