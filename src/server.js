import { https } from 'firebase-functions'
import express from 'express'
import path from 'path'

const app = express()
const PUBLIC_DIR = path.join(__dirname, 'public')
app.use(express.static(PUBLIC_DIR))

app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'default.html'))
})

exports.api = https.onRequest(app)