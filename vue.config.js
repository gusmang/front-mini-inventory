module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? ''
  //   : '/',
  publicPath: '',
  devServer: {
     proxy: 'https://mini-inventory.balikencana-dev.com/api'
  }
}
