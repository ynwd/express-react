const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  entry: './src/server.js',
  target: 'node',
  externals: [nodeExternals()]
}