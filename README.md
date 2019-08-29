[![Build Status](https://travis-ci.org/ynwd/express-react.svg?branch=master)](https://travis-ci.org/ynwd/express-react)

# Integrasi Express, React, Webpack dan Firebase

## Langkah sebelumnya
1. [Setup Express dan Webpack](https://github.com/ynwd/express-react/tree/setup-express)
2. [Deploy Express di Firebase](https://github.com/ynwd/express-react/tree/setup-firebase)
3. [Setup CI/CD dengan Travis-CI](https://github.com/ynwd/express-react/tree/setup-travis)
4. [Setup Static Files](https://github.com/ynwd/express-react/tree/setup-static-files)

## Setup React

1. Sebelumnya, kita telah menentukan function direktori firebase di `dist`. 
    Direktori ini berisi hasil bundling `webpack` dan static files express di folder public. Folder semacam ini, idealnya tidak perlu kita upload di repository git. Jadi kita masukkan ke dalam list `.gitignore`:
    ```git
    node_modules/
    package-lock.json
    .firebase/
    images/
    dist/
    ```

2. Instal paket yang dibutuhkan react:
   ```
   $ npm i react-dom react 
   $ npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader html-webpack-plugin -D
   ```

3. Buat file `index.html`:
    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="Express React App" />
      <title>Express React App</title>
    </head>

    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </body>

    </html>
    ```
4. Buat file `index.js`:
    ```js
    import React from 'react'
    import ReactDOM from 'react-dom'

    ReactDOM.render(
      <div>Hello world! This is react-express app.</div>,
      document.getElementById('root')
    )
    ```
5. Buat file konfigurasi frontend, `webpack.client.js`:
    ```js
    var path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      mode: 'production',
      entry: {
        index: './src/index.js'
      },
      output: {
        path: path.join(__dirname, './dist/public'),
        publicPath: '/',
        filename: '[name].js'
      },
      target: 'web',
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'default.html',
          template: './src/index.html',
        })
      ]
    }
    ```
6. Update NPM Script:
    ```json
     "scripts": {
        "watch:server": "webpack --watch",
        "watch:client": "webpack --watch --config webpack.client.js",
        "build": "webpack && webpack --config webpack.client.js && npm install --prefix dist",
        "start": "firebase serve",
        "deploy": "npm run build && firebase deploy"
      }
    ```
    Untuk menjalankan secara local:
    ```
    $ npm run build
    $ npm start
    ```
    Untuk deploy ke firebase:
    ```
    $ npm run deploy
    ```
7. Update file `.travis.yml`:
    ```yml
    language: node_js
    node_js:
    - 8
    cache: npm
    install:
    - npm install -g firebase-tools
    - npm install
    after_success:
    - npm run build 
    - firebase deploy --token "$FIREBASE_TOKEN"
    ```
