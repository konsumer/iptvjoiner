// this will load a prod web-server
import 'dotenv/config'
import express from 'express'
import app from './app.js'

const { PORT=3000 } = process.env

app.use(express.static('dist'))

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})
