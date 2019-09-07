[![Linux Build][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

# Setup Coveralls

1. Daftar di coverall.io, masukkan repository.
2. Install coverall:
    ```
    $ npm i coveralls -D
    ```
3. Buat file `.coveralls.yml`:
    ```yml
    service_name: travis-pro
    repo_token: 6SU8GadsMaD4znwNebfoTLi23YBHRJvIN
    ```
4. Update NPM Script:
    ```json
    "scripts": {
      "watch:server": "webpack --watch",
      "watch:client": "webpack --watch --config webpack.client.js",
      "build": "webpack && webpack --config webpack.client.js && npm install --prefix dist",
      "start": "firebase serve",
      "test": "jest",
      "coverage": "jest --coverage && cat ./coverage/lcov.info | coveralls",
      "deploy": "firebase deploy",
      "deploy:firebase": "firebase deploy --token"
    }
    ```
5. Update travis:
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
    - npm run coverage
    - npm run deploy:firebase "$FIREBASE_TOKEN"
    ```

[travis-url]: https://travis-ci.org/ynwd/express-react
[coveralls-url]: https://coveralls.io/r/ynwd/express-react?branch=setup-coveralls
[coveralls-image]: https://coveralls.io/repos/github/ynwd/express-react/badge.svg?branch=setup-coveralls
[travis-image]: https://travis-ci.org/ynwd/express-react.svg?branch=setup-coveralls