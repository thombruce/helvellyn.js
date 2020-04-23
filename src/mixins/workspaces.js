const workspaces = {
  data () {
    return {
      workspaces: null,
      currentWorkspace: null
    }
  },
  created () {
    this.fetchWorkspaces()
  },
  watch: {
    $route: 'setCurrentWorkspace'
  },
  methods: {
    fetchWorkspaces () {
      this.$store.dispatch('workspaces/index').then(() => {
        this.workspaces = this.$store.state.workspaces.list
        this.setCurrentWorkspace()
      })
    },
    setCurrentWorkspace () {
      if (this.$route.params.workspaceId) {
        this.currentWorkspace = this.workspaces[this.$route.params.workspaceId]
      } else {
        this.currentWorkspace = null
      }
    }
  }
}

export default workspaces
