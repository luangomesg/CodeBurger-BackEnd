import { Router } from 'express';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth.js';
import multerConfig from './config/multer.js';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';

const upload = multer(multerConfig);
const routes = new Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


routes.use('/product-file', express.static(path.resolve(__dirname, '..', 'uploads')));

// Rotas públicas
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);


// Rotas protegidas
routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', authMiddleware, ProductController.index);
routes.put('/products/:id', upload.single('file'), ProductController.update);
routes.delete('/products/:id', authMiddleware, ProductController.delete);

routes.post('/categories', upload.single('file'), CategoryController.store);
routes.get('/categories', authMiddleware, CategoryController.index);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);

routes.post('/orders', authMiddleware, OrderController.store);
routes.get('/orders', authMiddleware, OrderController.index);
routes.put('/orders/:id', authMiddleware, OrderController.update);

export default routes;
