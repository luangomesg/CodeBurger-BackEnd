import express from 'express';
import routes from './routes.js';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import './database/index.js';
import cors from 'cors';

const corsOptions = {
  origin: 'https://code-burger-front-end-one.vercel.app',
  credentials: true
};

const filename = fileURLToPath(import.meta.url);
const dirnamePath = dirname(filename);

class App {
  constructor() {
    this.app = express();
    this.app.use(cors(corsOptions));
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(
      '/product-file',
      express.static(resolve(dirnamePath, '..', 'uploads'))
    );

    this.app.use(
      '/category-file',
      express.static(resolve(dirnamePath, '..', 'uploads'))
    );
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
