[![Build Status](https://travis-ci.org/ynwd/express-react.svg?branch=master)](https://travis-ci.org/ynwd/express-react)

# Integrasi Express, React, Webpack dan Firebase

## Langkah sebelumnya
1. [Setup Express dan Webpack](https://github.com/ynwd/express-react/tree/setup-express)
2. [Deploy Express di Firebase](https://github.com/ynwd/express-react/tree/setup-firebase)
3. [Setup CI/CD dengan Travis-CI](https://github.com/ynwd/express-react/tree/setup-travis)
4. [Setup Static Files](https://github.com/ynwd/express-react/tree/setup-static-files)
5. [Setup React](https://github.com/ynwd/express-react/tree/setup-react)
6. [Menggunakan Fitur ES6 dengan Babel](https://github.com/ynwd/express-react/tree/setup-babel)

## 7. Penerapan Coding Standard dengan ESLint
1. Install eslint:
    ```
    $ npm i eslint -D
    ```
2. Jalankan `eslint --init`:
    ```
    $ npx eslint --init
    ```
    Pilih yang standard. Proses ini akan menghasilkan file `.eslintrc.js`.

3. Install `babel-eslint`:
    ```
    $ npm i babel-eslint -D
    ```
4. Update `.eslintrc.js`, tambahkan `parser`:
    ```js
    parser: 'babel-eslint'
    ```
6. Update konfigurasi webpack. Tambahkan rule eslint:
    ```js
    {
      enforce: 'pre',
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    },
    ```
7. Rename file `index.js` menjadi `index.jsx`.
8. Buka folder src. Betulkan semua yang masih berwarna merah.