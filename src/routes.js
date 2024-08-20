import { Router } from "express"
import multer from "multer"
import multerConfig from "./config/multer.js"

import UserController from "./app/controllers/UserController.js"
import SessionController from "./app/controllers/SessionController.js"
import ProductController from "./app/controllers/ProductController.js"
import CategoryController from "./app/controllers/CategoryController.js"
import OrderController from "./app/controllers/OrderController.js"

import authMiddleware from "./app/middlewares/auth.js"

const routes = new Router()

const upload = multer(multerConfig)

routes.get("/", (req, res) =>{
    return res.json({message: "Hello to my first API"})
})

routes.post("/users", UserController.store)
routes.post("/sessions", SessionController.store)

routes.use(authMiddleware)

routes.post("/products", upload.single("file"), ProductController.store)
routes.put("/products/:id", upload.single("file"), ProductController.update)
routes.get("/products", ProductController.index)

routes.post("/categories", upload.single("file"), CategoryController.store)
routes.put("/categories/:id", upload.single("file"), CategoryController.update)
routes.get("/categories", CategoryController.index)

routes.post("/orders", OrderController.store)
routes.put("/orders/:id", OrderController.update)
routes.get("/orders", OrderController.index)

export default routes
