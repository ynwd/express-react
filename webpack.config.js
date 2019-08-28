const pkg = require('./package')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const genPackage = () => ({
  main: 'server.js',
  engines: {
    node: '8'
  },
  scripts: {
    build: 'npm install'
  },
  dependencies: pkg.dependencies,
  private: true
})

module.exports = {
  mode: 'production',
  entry: {
    server: './src/server.js'
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  plugins: [new GenerateJsonPlugin('package.json', genPackage())]
}