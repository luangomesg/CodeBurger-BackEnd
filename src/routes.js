import { Router } from 'express';
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

// Rotas públicas
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);



routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:id', upload.single('file'), ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.post('/categories', upload.single('file'), CategoryController.store);
routes.get('/categories', CategoryController.index);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);

routes.use(authMiddleware);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

export default routes;
