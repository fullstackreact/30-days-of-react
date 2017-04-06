module.exports = ctx => {
  return {
    plugins: [
      require('postcss-import')(),
      require('precss')(),
      require('autoprefixer')()
    ]
  }
}