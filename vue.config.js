module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    disableHostCheck: true
  },
  lintOnSave: false,
  chainWebpack: config => {
    config.module
      .rule('element-ui')
      .test(/element-ui.src.*?js$/)
      .use('babel')
      .loader('babel-loader')
      .end()
  }
}
