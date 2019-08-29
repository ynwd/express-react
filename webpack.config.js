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
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  plugins: [new GenerateJsonPlugin('package.json', genPackage())]
}
