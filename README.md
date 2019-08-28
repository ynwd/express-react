# Setup Static Files

1. Pindahkan folder public ke dalam folder dist:
    ```
    $ mv public/ dist/ 
    ```
2. Update file `server.js`:
    ```js
    const functions = require("firebase-functions")
    const express = require("express")
    const path = require("path")

    const app = express()
    const PUBLIC_DIR = path.join(__dirname, 'public')
    app.use(express.static(PUBLIC_DIR))

    app.get("*", (req, res) => {
      res.sendFile(path.join(PUBLIC_DIR, 'default.html'))
    })

    exports.api = functions.https.onRequest(app)
    ```
3. Update `webpack.config.js`. Tambahkan `node`:
    ```js
    node: {
      __dirname: false,
      __filename: false
    },
    ```
4. Jalankan `build` dan `start`
    ```
    $ npm run build
    $ npm start
    ```
5. Deploy:
    ```
    $ npm run deploy
    ```