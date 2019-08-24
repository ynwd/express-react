# Deploy Express Application on Firebase Function

Kata orang, hosting aplikasi node.js itu mahal. Tidak. Dengan firebase, kita bisa mendapatkannya secara gratis. Bagaimana caranya?

## Create Firebase Project

1. Buka [firebase.com](http://firebase.com). Daftar. Klik **get started**:
   ![](images/register.png)
2. Buat proyek baru. Klik **create project**:
   ![](images/create_project.png)
3. Beri nama, misalnya 'hello'. Jangan lupa klik **accept** dan **continue**:
   ![](images/step1.png)
4. Setting Google Analytics. Klik **Continue**:
   ![](images/step2.png)
5. Jangan lupa terima semua option. Lalu klik **create project**:
   ![](images/step3.png)
6. Jika sukses hasilnya begini. Klik **continue**:
   ![](images/create_sukses.png)
7. Berikut tampilan dashboard proyek. Proses pembuatan proyek selesai.
   ![](images/dashboard.png)

## Setup Firebase

1. Instal firebase-tools
   ```
   $ npm install -g firebase-tools
   ```
2. Update file `src/server.js`:
   ```js
   const functions = require("firebase-functions")
   const express = require("express")

   const app = express()

   app.get("*", (req, res) => {
    res.send("Hello from Express on Firebase!")
   })

   exports.api = functions.https.onRequest(app)
   ```
3. Install firebase-functions:
   ```
   $ npm i firebase-functions
   ```   
4. Update webpack.config.js:
   ```js
   const pkg = require('./package')
   const GenerateJsonPlugin = require('generate-json-webpack-plugin')
   const nodeExternals = require('webpack-node-externals')

   const genPackage = () => ({
     main: 'server.js',
     engines: {
       "node": "8"
     },
     dependencies: pkg.dependencies
   })

   module.exports = {
     mode: 'production',
     entry: {
       server: `${__dirname}/src/index.js`
     },
     target: 'node',
     output: {
       libraryTarget: 'commonjs'
     },
     externals: [nodeExternals()],
     plugins: [new GenerateJsonPlugin('package.json', genPackage())]
   }
   ```
5. Install generate-json-webpack-plugin:
   ```
   $ npm i generate-json-webpack-plugin -D
   ```
