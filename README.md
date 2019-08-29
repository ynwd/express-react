[![Build Status](https://travis-ci.org/ynwd/express-react.svg?branch=master)](https://travis-ci.org/ynwd/express-react)

# Integrasi Express, React, Webpack dan Firebase

## Langkah sebelumnya
1. [Setup Express dan Webpack](https://github.com/ynwd/express-react/tree/setup-express)
2. [Deploy Express di Firebase](https://github.com/ynwd/express-react/tree/setup-firebase)
3. [Setup CI/CD dengan Travis-CI](https://github.com/ynwd/express-react/tree/setup-travis)
4. [Setup Static Files](https://github.com/ynwd/express-react/tree/setup-static-files)
5. [Setup React](https://github.com/ynwd/express-react/tree/setup-react)

## 6. Setup Babel

1. Update `webpack.config.js`,tambahkan `module` dan `devtool`:
    ```js
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
            test: /\.m?js$/,
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
    ```
2. Update `server.js`:
    ```js
    import { https } from 'firebase-functions'
    import express from 'express'
    import path from 'path'

    const app = express()
    const PUBLIC_DIR = path.join(__dirname, 'public')
    app.use(express.static(PUBLIC_DIR))

    app.get('*', (req, res) => {
      res.sendFile(path.join(PUBLIC_DIR, 'default.html'))
    })

    exports.api = https.onRequest(app)
    ```
3. Jalankan `build` dan `start`:
    ```
    $ npm run build
    $ npm start
    ```