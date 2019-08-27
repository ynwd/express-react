const pkg = require('./package')
const GenerateJsonPlugin = require('generate-json-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const genPackage = () => ({
  main: 'server.js',
  engines: {
    node: '8'
  },
  scripts: {
    install: 'npm install'
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
  externals: [nodeExternals()],
  plugins: [new GenerateJsonPlugin('package.json', genPackage())]
}