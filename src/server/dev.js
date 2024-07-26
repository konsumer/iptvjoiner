// this will load a local dev-server
import 'dotenv/config'
import ViteExpress from "vite-express"
import app from './app.js'
ViteExpress.listen(app, 3000, () => console.log("Server is listening on http://localhost:3000/"))