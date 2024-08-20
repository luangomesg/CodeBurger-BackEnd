import { Router } from 'express';
import express from 'express';
import path from 'path';
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

// Rota para servir arquivos públicos (imagens dos produtos)
routes.use('/product-file', express.static(path.resolve(__dirname, '..', 'uploads')));

// Rotas públicas
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Middleware de autenticação aplicado a partir deste ponto
routes.use(authMiddleware);

// Rotas protegidas
routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:id', upload.single('file'), ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.post('/categories', upload.single('file'), CategoryController.store);
routes.get('/categories', CategoryController.index);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

export default routes;
