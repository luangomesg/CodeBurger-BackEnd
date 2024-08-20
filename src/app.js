import express from "express"
import routes from "./routes.js"
import cors from "cors"

import { resolve, dirname } from "path"

const __dirname = resolve(dirname(''))

import "./database/index.js"

const corsOptions = {
  origin: 'https://code-burger-front-end-one.vercel.app',
  credentials: true
}
class App {
  constructor() {
    this.app = express()
    this.app.use(cors(corsOptions))

    this.middleware()
    this.routes()
  }

  middleware() {
    this.app.use(express.json())
    this.app.use(
      "/product-file",
      express.static(resolve(__dirname, "..", "uploads"))
    )

    this.app.use(
      "/category-file",
      express.static(resolve(__dirname, "..", "uploads"))
    )
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app
