# Setup Express dan Webpack

## Setup Express

Install express:
```
$ npm i express
```

Buat folder `src`:
```
$ mkdir src
```

Buat file `src/server.js`:
```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```
Jalankan `server.js`:
```
$ node src/server.js
```

Buka di browser http://localhost:3000

## Setup Webpack

Install webpack:
```
$ npm i webpack webpack-cli -D
```

Jalankan `webpack`:
```
$ npx webpack src/server.js
```

Nanti akan ada error semacam ini:
```
ERROR in ./node_modules/destroy/index.js
Module not found: Error: Can't resolve 'fs' in '/Users/yanu/Documents/learn-react/express-react/node_modules/destroy'
 @ ./node_modules/destroy/index.js 14:17-30
 @ ./node_modules/send/index.js
 @ ./node_modules/express/lib/response.js
 @ ./node_modules/express/lib/express.js
 @ ./node_modules/express/index.js
 @ ./src/server.js

ERROR in ./node_modules/express/lib/request.js
Module not found: Error: Can't resolve 'net' in '/Users/yanu/Documents/learn-react/express-react/node_modules/express/lib'
 @ ./node_modules/express/lib/request.js 18:11-25
 @ ./node_modules/express/lib/express.js
 @ ./node_modules/express/index.js
 @ ./src/server.js
```

Itu terjadi karena secara default, `webpack` menganggap aplikasi yang akan di-bundle adalah aplikasi yang berjalan di browser (Chrome, Firefox, Safari). Module-module yang diperlukan `express` (seperti `fs` dan `net`) tidak akan ada di sana. Module-module tersebut hanya ditemukan di lingkungan server (Node.js). Oleh karena itu kita harus mengkonfigurasi webpack agar menggunakan lingkungan Node.js.

Buat file `webpack.config.js`:
```js
module.exports = {
  mode: 'development',
  entry: './src/server.js',
  target: 'node'
}
```

Jalankan lagi `webpack`:
```
$ npx webpack
```
Kali ini tidak secara eksplisit menulis `src/server.js` karena sudah dituliskan di file konfigurasi. Sekarang error tidak lagi muncul.

Jika tidak ada error, perintah di atas akan menghasilkan file `dist/main.js`. Coba periksa. Ukurannya cukup besar. Itu terjadi karena semua modul yang diperlukan express, di-bundle oleh `webpack`. Tentu saja itu sebuah pemborosan karena di lingkungan server, sudah ada folder `node_modules` yang berisi semua module.

Install `webpack-node-externals`:
```
npm i webpack-node-externals -D
```

Update `webpack.config.js`:

```js
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  entry: './src/server.js',
  target: 'node',
  externals: [nodeExternals()]
}
```
Jalankan lagi `webpack`:
```
$ npx webpack
```

Tidak ada lagi pesan error dan warning. Ukuran file `dist/main.js` juga jauh lebih kecil.

Sekarang jalankan `dist/main.js`:
```
$ node dist/main.js
```

## NPM Script
Update file `package.json`. Pada bagian `script`, tambahkan `start` dan `build`:
```json
  "scripts": {
    "start": "node dist/main.js",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Jalankan start dan build:
```
$ npm run build
$ npm start
```