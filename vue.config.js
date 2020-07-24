module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
       symlinks: false
    }
  },
  transpileDependencies: [
    '@coreui/utils'
  ],
  // devServer: {
  //   proxy: {
  //     '/molde/api/v1/rajaongkir/province': {
  //       target: 'https://api.rajaongkir.com/basic',
  //       changeOrigin: true,
  //       pathRewrite: {'^/molde/api/v1/rajaongkir/province': 'https://api.rajaongkir.com/basic/province'}
  //     }
  //   }
  // }
}
