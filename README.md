# Setup CI/CD dengan Travis-CI

1. Masuk di https://travis-ci.org menggunakan account https://github.com. Lalu hubungkan travis-ci dan repository.
2. Buat file `.travis.yml` di folder root project.
    ```yml
    language: node_js
    node_js:
    - 8
    cache: yarn
    install:
    - npm install -g firebase-tools
    after_success:
    - firebase deploy --token "$FIREBASE_TOKEN"
    ```
3. Buat **Environment Variables** di menu `More Options > Settings` dengan nama variabel `FIREBASE_TOKEN`. Nilainya berasal dari command berikut:
   ```
   $ firebase login:ci
   ```
4. Simpan dan push perubahan terakhir ke github. Lalu periksa firebase deployment history. Log proses deployment di travis-ci untuk proyek ini bisa diakses di sini: https://travis-ci.org/ynwd/express-react