[![Build Status](https://travis-ci.org/ynwd/express-react.svg?branch=setup-test)](https://travis-ci.org/ynwd/express-react)

# Basic Testing Aplikasi

- [Setup Jest, Supertest, dan Enzyme](#setup-jest-supertest,-dan-enzyme)
- [Test server](#test-server)
- [Test react](#test-react)

## Setup Jest, Supertest, dan Enzyme

1. Update semua konfigurasi webpack. Hapus bagian ini:
    ```js
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react']
    }
    ```
2. Buat file `babel.config.js`:
    ```js
    module.exports = {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react'
      ]
    }
    ```
4. Install jest, supertest, dan enzyme:
    ```
    $ npm i jest supertest enzyme enzyme-adapter-react-16 -D
    ```
5. Update file `.eslintrc.js` bagian `env` dan `parser`:
    ```js
    env: {
      browser: true,
      es6: true,
      node: true,
      jest: true
    },
    parser: 'babel-eslint'
    ```
6. Buat folder `tests`.
    ```
    $ mkdir tests
    ```
## Test Server

7. Jest akan secara otomatis mendeteksi file berakhiran *test.js. 
   
   Untuk test file `server.js`, buat file `tests/server.test.js` :
    ```js
    const supertest = require('supertest')
    const functionsTest = require('firebase-functions-test')()
    const admin = require('firebase-admin')

    let undertest, request

    describe('TEST ENV', () => {
      beforeEach(() => {
        jest.spyOn(admin, 'initializeApp')
        undertest = require('../src/server')
        request = supertest(undertest.api)
      })

      afterEach(() => {
        functionsTest.cleanup()
      })

      it('get app !', async () => {
        const actual = await request.get('/')
        const { ok, status, body } = actual
        expect(ok).toBe(true)
        expect(status).toBeGreaterThanOrEqual(200)
        expect(body).toBeDefined()
      })
    })
    ```

8. Buat folder `public` di dalam `src`. Pindahkan file `index.jsx` dan `index.html` ke folder `public`. Lalu rename file `index.html` menjadi `default.html`.
    ```
    $ mkdir public
    $ mv {index.html,index.jsx} public
    $ mv public/index.html public/default.html
    ```

9. Update file `server.js`:
    ```js
    import { https } from 'firebase-functions'
    import express from 'express'
    import path from 'path'

    const app = express()

    const PUBLIC_DIR = path.join(__dirname, 'public')
    const HTML_FILE = path.join(PUBLIC_DIR, 'default.html')

    app.get('/', (req, res) => {
      res.sendFile(HTML_FILE)
    })

    exports.api = https.onRequest(app)

    ```

8. Jalankan jest:
    ```
    $ npx jest
        PASS  tests/server.test.js
    TEST ENV
      ✓ get app ! (150ms)

    Test Suites: 1 passed, 1 total
    Tests:       1 passed, 1 total
    Snapshots:   0 total
    Time:        1.652s, estimated 2s
    Ran all test suites.
    ```
9. Jalankan test coverage:
    ```
    $ npx jest --coverage
        PASS  tests/server.test.js
    TEST ENV
      ✓ get app ! (145ms)

    -----------|----------|----------|----------|----------|-------------------|
    File       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
    -----------|----------|----------|----------|----------|-------------------|
    All files  |      100 |      100 |      100 |      100 |                   |
      server.js |      100 |      100 |      100 |      100 |                   |
    -----------|----------|----------|----------|----------|-------------------|
    Test Suites: 1 passed, 1 total
    Tests:       1 passed, 1 total
    Snapshots:   0 total
    Time:        1.778s
    Ran all test suites.
    ```
## Test React

10. Update file `index.jsx`:
    ```jsx
    import React from 'react'
    import { render } from 'react-dom'

    export const App = () => {
      return <div>Hello world! This is react-express app.</div>
    }

    render(<App/>, document.getElementById('root') ||
      document.createElement('div')
    )
    ```
11. Buat file `tests/index.test.js`
    ```js
    import React from 'react'
    import { App } from '../src/public/index'
    import { mount, configure } from 'enzyme'
    import Adapter from 'enzyme-adapter-react-16'

    configure({ adapter: new Adapter() })

    describe('The main app', () => {
      it('the app should have text', () => {
        const app = mount(<App />)
        expect(app.contains(<div>Hello world! This is react-express app.</div>)).toBe(true)
      })
    })
    ```
12. Jalankan test:
      ```
      $ npx jest
        PASS  tests/server.test.js
        PASS  tests/index.test.js

      Test Suites: 2 passed, 2 total
      Tests:       2 passed, 2 total
      Snapshots:   0 total
      Time:        4.531s
      Ran all test suites.
      ```
13. Jalankan coverage:
      ```
      $ npm jest --coverage
       PASS  tests/server.test.js
       PASS  tests/index.test.js
      ------------|----------|----------|----------|----------|-------------------|
      File        |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
      ------------|----------|----------|----------|----------|-------------------|
      All files   |      100 |      100 |      100 |      100 |                   |
       src        |      100 |      100 |      100 |      100 |                   |
        server.js |      100 |      100 |      100 |      100 |                   |
       src/public |      100 |      100 |      100 |      100 |                   |
        index.jsx |      100 |      100 |      100 |      100 |                   |
      ------------|----------|----------|----------|----------|-------------------|

      Test Suites: 2 passed, 2 total
      Tests:       2 passed, 2 total
      Snapshots:   0 total
      Time:        6.059s
      Ran all test suites.

      ```
14. Update NPM Script:
    ```json
    "scripts": {
      "watch:server": "webpack --watch",
      "watch:client": "webpack --watch --config webpack.client.js",
      "build": "webpack && webpack --config webpack.client.js && npm install --prefix dist",
      "start": "firebase serve",
      "test": "jest",
      "coverage": "jest --coverage",
      "deploy": "firebase deploy",
      "deploy:firebase": "firebase deploy --token"
    }
    ```
15. Update travis:
    ```yml
    language: node_js
    node_js:
    - 8
    cache: npm
    install:
    - npm install
    after_success:
    - npm run build 
    - npm test
    - npm run deploy:firebase "$FIREBASE_TOKEN"
    ```