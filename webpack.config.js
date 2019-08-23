const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  entry: {
    server:'./src/server.js'
  },
  target: 'node',
  externals: [nodeExternals()]
}