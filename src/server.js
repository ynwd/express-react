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
