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