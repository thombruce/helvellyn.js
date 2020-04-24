module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    test: {
      presets: [['@babel/env', { targets: { node: 'current' } }]]
    }
  }
}
