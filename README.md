[![Build Status](https://travis-ci.org/ynwd/express-react.svg?branch=setup-eslint)](https://travis-ci.org/ynwd/express-react)

# Penerapan Coding Standard dengan ESLint
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