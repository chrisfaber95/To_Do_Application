module.exports = {
  lintOnSave: false,
	devServer: {
	  disableHostCheck: true
	},
    chainWebpack: config => {
      config.module
        .rule('sass')
        .test(/\.sass$/)
        .use('sass-loader')
          .loader('sass-loader')
          .loader('css-loader')
          .loader('style-loader')
        .end()
    }
}