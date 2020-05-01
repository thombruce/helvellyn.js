const session = {
  computed: {
    sessionLoaded () {
      return this.$store.state.authentication.tokens.sessionLoaded
    },
    currentSession () {
      return this.$store.getters['authentication/tokens/currentSession']
    },
    currentUser () {
      return this.$store.getters['authentication/tokens/currentUser']
    }
  }
}

export default session
