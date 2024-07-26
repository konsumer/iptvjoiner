// this will load a local dev-server
import 'dotenv/config'
import ViteExpress from "vite-express"
import app from './app.js'

const { PORT=3000 } = process.env
ViteExpress.listen(app, PORT, () => console.log(`Server is listening on http://localhost:${PORT}`))
